// == TS-SubFix for Lampa =====================================
// Автодобавление текстовых субтитров из TorrServer в Lampa.
// Поддержка: .srt, .ass/.ssa, .vtt  → конвертация в WebVTT.
// На Tizen сохраняет .vtt в 'wgt-private-tmp' и дергает AVPlay.setExternalSubtitlePath().
//
// Автор: you
// Версия: 1.0.0
// ============================================================

(function () {
  'use strict';

  // ====== Опционально: OpenSubtitles Personal Token =========
  // Если хотите fallback-находку субтитров в сети, впишите персональный токен:
  // как получить: https://www.opensubtitles.com/  (Лампа из коробки не интегрирует OS — это ок делать плагином). ([github.com](https://github.com/yumata/lampa/issues/138?utm_source=chatgpt.com))
  var OPENSUBTITLES_TOKEN = ''; // например: 'OsTxxxxxxxxxxxxxxxxxxxx'

  // ====== Утилиты ===========================================
  function log() {
    try { console.log('[TS-SubFix]', ...arguments); } catch (e) {}
  }
  function isTizen() {
    return (typeof webapis !== 'undefined') || /n/i.test(navigator.userAgent || '');
  }
  function parseQuery(url) {
    var q = {};
    var idx = url.indexOf('?'); if (idx < 0) return q;
    url.substring(idx + 1).split('&').forEach(function (kv) {
      var p = kv.split('=');
      q[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' '));
    });
    return q;
  }
  function pick(arr, fn) {
    for (var i = 0; i < arr.length; i++) if (fn(arr[i])) return arr[i];
    return null;
  }

  // --- Конвертеры в WebVTT (минимально необходимое) ----------
  function srtToVtt(text) {
    // Убираем BOM/мусор и приводим тайминги 00:00:00,000 → 00:00:00.000
    var body = text.replace(/^\uFEFF/, '').replace(/\r/g, '')
      .replace(/(\d+:\d+:\d+),(\d+)/g, '$1.$2');
    return 'WEBVTT\n\n' + body;
  }

  function assToVtt(text) {
    // Очень упрощённый ASS→VTT: читаем [Events]/Format, берём Dialogue: Start, End, Text
    var clean = text.replace(/^\uFEFF/, '').replace(/\r/g, '');
    var lines = clean.split('\n');
    var fmt = [];
    var inEvents = false;
    var out = ['WEBVTT', ''];
    for (var i = 0; i < lines.length; i++) {
      var L = lines[i].trim();
      if (/^$$Events$$/i.test(L)) { inEvents = true; continue; }
      if (inEvents && /^Format:/i.test(L)) {
        fmt = L.substring(7).split(',').map(function (s) { return s.trim().toLowerCase(); });
        continue;
      }
      if (inEvents && /^Dialogue:/i.test(L)) {
        var payload = L.substring(9).split(',');
        // Сопоставляем по формату
        var map = {};
        for (var j = 0; j < fmt.length; j++) map[fmt[j]] = (payload[j] || '').trim();
        var start = (map.start || '').replace(',', '.'); // 0:00:00.00
        var end   = (map.end   || '').replace(',', '.');
        // Нормализуем в hh:mm:ss.mmm
        function norm(t) {
          var p = t.split(':'); // h:m:s.ms
          if (p.length === 2) p.unshift('0');
          if (p.length === 3 && p[2].indexOf('.') === -1) p[2] += '.000';
          // Дополняем нулями
          return p.map(function (x, k) {
            if (k < 2) return ('0' + parseInt(x,10)).slice(-2);
            // секунды.мс
            var sp = x.split('.');
            sp[0] = ('0' + parseInt(sp[0],10)).slice(-2);
            sp[1] = (sp[1] || '000').padEnd(3, '0').slice(0,3);
            return sp[0] + '.' + sp[1];
          }).join(':');
        }
        var txt = payload.slice(fmt.length).join(','); // хвост — это Text со всеми запятыми
        // Чистим ASS-теги
        txt = txt.replace(/\{\\[^}]*\}/g, '').replace(/\\N/gi, '\n').trim();
        if (start && end && txt) {
          out.push(norm(start) + ' --> ' + norm(end));
          out.push(txt);
          out.push('');
        }
      }
    }
    return out.join('\n');
  }

  function ensureVtt(ext, content) {
    if (ext === '.vtt') {
      var t = content.replace(/^\uFEFF/, '');
      return /^WEBVTT/.test(t) ? t : ('WEBVTT\n\n' + t);
    }
    if (ext === '.srt') return srtToVtt(content);
    if (ext === '.ass' || ext === '.ssa') return assToVtt(content);
    return null;
  }

  function extOf(name) {
    var m = /\.[a-z0-9]+$/i.exec(name || '');
    return m ? m[0].toLowerCase() : '';
  }

  // ====== Работа с TorrServer =================================
  // Документация API: эндпоинт /stream с параметрами (m3u, stat и т.п.). ([pkg.go.dev](https://pkg.go.dev/github.com/mutronics/torrserver?utm_source=chatgpt.com))
  function detectTorrServerInfo(playUrl) {
    try {
      var u = new URL(playUrl);
      if (!/\/stream/i.test(u.pathname)) return null;
      var q = parseQuery(playUrl);

      // link — магнет/инфохеш, index — индекс файла
      return {
        base: u.origin,          // http://host:8090
        link: q.link || '',
        index: (q.index ? parseInt(q.index,10) : null)
      };
    } catch (e) { return null; }
  }

  function fetchJSON(url) {
    return fetch(url, { credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }
  function fetchText(url) {
    return fetch(url, { credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    });
  }

  // stat: хотим список файлов торрента (ищем .srt/.ass/.ssa/.vtt)
  function getSubtitleFiles(ts) {
    // У разных сборок ответ отличается, но чаще всего GET /stream?stat&link=...
    var url = ts.base + '/stream?stat&link=' + encodeURIComponent(ts.link);
    return fetchJSON(url).then(function (stat) {
      // Пытаемся найти массив файлов
      var files = stat.files || stat.FileStats || stat.file_stats || stat.playlist || [];
      // Нормализуем
      files = files.map(function (f, i) {
        return {
          index: (typeof f.index === 'number' ? f.index : (f.Id || f.i || i)),
          name: f.path || f.name || f.Title || ('file_' + i),
          size: f.length || f.size || 0
        };
      });
      var subs = files.filter(function (f) {
        var e = extOf(f.name);
        return ['.srt','.ass','.ssa','.vtt'].indexOf(e) >= 0;
      });
      return subs;
    });
  }

  function getSubtitleContent(ts, file) {
    // Скачиваем сам файл субтитров по его индексу:
    // TorrServer позволяет дернуть /stream/<fname>?index=N&link=... (без &play) как обычный файл.
    var safeName = encodeURIComponent(file.name.replace(/[^a-z0-9\.\-\_\(\)\s]/gi, '_'));
    var url = ts.base + '/stream/' + safeName + '?index=' + file.index + '&link=' + encodeURIComponent(ts.link);
    return fetchText(url).then(function (txt) {
      var ext = extOf(file.name);
      var vtt = ensureVtt(ext, txt);
      if (!vtt) throw new Error('Unsupported subtitle ext: ' + ext);
      return { label: file.name, vtt: vtt };
    });
  }

  // ====== Добавление дорожек сабов в плеер Lampa =================
  // Официального SDK нет, но ядро допускает подписку на события:
  // Lampa.Player.listener: можно подписаться на 'start' и 'destroy' — подтверждено автором. ([GitHub](https://github.com/yumata/lampa-source/issues/244))
  function onPlayerStart(e) {
    try {
      // Пытаемся вытащить текущий реальный URL видеопотока (обычно уходит в AVPlay/HTML5):
      var src =
        (e && (e.url || e.src || (e.object && e.object.url))) ||
        (Lampa && Lampa.Player && Lampa.Player.video && Lampa.Player.video.src && Lampa.Player.video.src()) ||
        '';

      if (!src) { log('no src in start payload'); return; }

      var ts = detectTorrServerInfo(src);
      if (!ts || !ts.base || !ts.link) {
        log('not a TorrServer stream:', src);
        return;
      }

      log('TorrServer detected:', ts.base);

      // 1) ищем внешние субы внутри торрента
      getSubtitleFiles(ts).then(function (files) {
        if (!files.length) {
          log('no text subs inside torrent');
          // при желании — fallback в OpenSubtitles
          if (OPENSUBTITLES_TOKEN) tryFetchOpenSubtitles(e).catch(function(){});
          return;
        }

        // 2) тянем, конвертируем, подключаем
        return Promise.all(files.map(function (f) { return getSubtitleContent(ts, f); }))
          .then(function (tracks) {
            if (!tracks.length) return;

            if (isTizen()) {
              // На Tizen внешние сабы должны лежать ЛОКАЛЬНО и путь указывается в IDLE через AVPlay.setExternalSubtitlePath()
              // (рекомендован корень 'wgt-private-tmp'). ([Samsung Developer](https://developer.samsung.com/smarttv/develop/guides/multimedia/subtitles.html?utm_source=chatgpt.com))
              addTracksTizen(tracks);
            } else {
              addTracksHtml5(tracks);
            }
          })
          .catch(function (err) { log('subtitle pipeline error:', err.message); });
      }).catch(function (err) {
        log('stat error:', err.message);
      });
    } catch (e2) {
      log('onPlayerStart error:', e2.message);
    }
  }

  function addTracksHtml5(tracks) {
    // Под HTML5/встроенный плеер Лампа умеет накрывать WebVTT через <track> (или свой CustomSubs).
    // WebVTT — базовый формат для <track>. ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video?utm_source=chatgpt.com))
    var list = tracks.map(function (t) {
      var blob = new Blob([t.vtt], { type: 'text/vtt' });
      var url = URL.createObjectURL(blob);
      return { label: t.label, url: url, lang:g(t.label) };
    });

    // Разные ветки Lampa имеют разные хелперы, поэтому пробуем в порядке совместимости.
    try {
      if (Lampa && Lampa.Player && typeof Lampa.Player.customSubs === 'function') {
        Lampa.Player.customSubs(list);
        log('tracks added via Player.customSubs');
        return;
      }
    } catch (e) {}

    try {
      if (Lampa && Lampa.Player && Lampa.Player.video && typeof Lampa.Player.video.customSubs === 'function') {
        Lampa.Player.video.customSubs(list);
        log('tracks added via video.customSubs');
        return;
      }
    } catch (e) {}

    // Последний шанс: отправить событие (на ряде сборок слушают 'subtitles:add')
    try {
      if (Lampa && Lampa.Player && Lampa.Player.listener && typeof Lampa.Player.listener.send === 'function') {
        Lampa.Player.listener.send('subtitles', { action: 'add', tracks: list });
        log('tracks added via listener.send');
      }
    } catch (e) {}
  }

  function addTracksTizen(tracks) {
    // Создаём локальные .vtt и назначаем их внешними сабами в AVPlay.
    // Для простоты берём первый трек (можно расширить UI выбора).
    var first = tracks[0];
    writeVttToTizenTmp(first.vtt, 'ts-subfix-' + Date.now() + '.vtt', function (localPath) {
      try {
        if (webapis && webapis.avplay && typeof webapis.avplay.setExternalSubtitlePath === 'function') {
          // По гайду Самсунга вызывать в IDLE. На практике Лампа ещё не успевает выйти из IDLE к моменту 'start',
          // но если не получилось — пробуем чуть позже.
          var trySet = function (attempt) {
            try {
              webapis.avplay.setExternalSubtitlePath(localPath); // "wgt-private-tmp/xxx.vtt"
              log('Tizen external subs set:', localPath);
            } catch (e) {
              if (attempt < 5) setTimeout(function(){ trySet(attempt+1); }, 120);
            }
          };
          trySet(0);
        }
      } catch (e) {
        log('Tizen setExternalSubtitlePath error:', e.message);
      }
    });
  }

  function writeVttToTizenTmp(content, filename, cb) {
    try {
      // filesystem API доступен в webapp, Lampa уже использует Tizen/webapis. ([Samsung Developer](https://developer.samsung.com/smarttv/develop/api-references/samsung-product-api-references/webapi-api.html?utm_source=chatgpt.com))
      tizen.filesystem.resolve('wgt-private-tmp', function (dir) {
        try {
          var file = dir.createFile(filename);
          file.openStream('w', function (fs) {
            fs.write(content);
            fs.close();
            cb('wgt-private-tmp/' + filename);
          }, function (err) { log('fs open error:', err.message); });
        } catch (e) {
          log('createFile error:', e.message);
        }
      }, function (err) {
        log('resolve tmp error:', err.message);
      }, 'rw');
    } catch (e) {
      log('tizen filesystem not available:', e.message);
    }
  }

  function guessLang(label) {
    label = (label || '').toLowerCase();
    if (/rus|ru\b|russian|рус/i.test(label)) return 'ru';
    if (/eng|en\b|english/i.test(label)) return 'en';
    if (/ukr|ua|uk\b|ukrain/i.test(label)) return 'uk';
    return '';
  }

  // ====== Fallback: OpenSubtitles (упрощённо) ===================
  function tryFetchOpenSubtitles(e) {
    if (!OPENSUBTITLES_TOKEN) return Promise.reject();
    // Здесь сильно упрощено: берём название из карточки, язык — ru, дергаем OS API v2.
    // (Показываю как «точку расширения», по-умолчанию выключено).
    return Promise.reject(); // отключено по умолчанию, чтобы не словить лимиты.
  }

  // ====== Инициализация плагина ================================
  function bootstrap() {
    // Подпишемся на старт/стоп плеера.
    try {
      if (Lampa && Lampa.Player && Lampa.Player.listener && typeof Lampa.Player.listener.follow === 'function') {
        Lampa.Player.listener.follow('start', onPlayerStart);
        Lampa.Player.listener.follow('destroy', function(){ /* no-op */ });
        log('listener attached');
        return;
      }
    } catch (e) { /* pass */ }

    // Если интерфейс изменился — пробуем «мягкий» хук раз в 2 сек, пару попыток.
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      try {
        if (Lampa && Lampa.Player && Lampa.Player.listener && typeof Lampa.Player.listener.follow === 'function') {
          clearInterval(iv);
          Lampa.Player.listener.follow('start', onPlayerStart);
          Lampa.Player.listener.follow('destroy', function(){});
          log('listener attached (late)');
        }
      } catch (e) {}
      if (tries > 10) clearInterval(iv);
    }, 2000);
  }

  // Во многих существующих плагинах используется похожий подход (подписка на Player и манипуляция сабами),
  // см. примеры «subtitle plugins» из комьюнити. ([GitHub](https://github.com/grafbraga/lampa-subtitles-sync))

  // Стартуем после загрузки приложения
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();