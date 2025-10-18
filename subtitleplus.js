/* subtitleplus.js — Внешние субтитры для Lampa (включая Tizen)
   Автор: вы. Лицензия: MIT.
   Требуется: Lampa 1.4+ (любой актуальный релиз), доступ в интернет.
   Настройка: вставьте свой OpenSubtitles API key ниже, либо оставьте пустым, тогда плагин попробует «старый» публичный REST-поиск без ключа (менее надежно).
*/

// ====== НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ ======
const OPEN_SUBTITLES_API_KEY = ''; // Вставьте свой API Key с https://www.opensubtitles.com/ (Account -> API)
const PREFERRED_LANGS = ['ru', 'en']; // Порядок приоритета языков субтитров
const MAX_RESULTS = 20; // Сколько вариантов показывать в выборе
// ====================================

(function () {
  // Утилиты DOM и событий Lampa
  const $ = window.$ || window.jQuery || (sel => document.querySelector(sel));
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const onEnter = (el, handler) => {
    // В Lampa вместо click на пульте приходит кастомное событие 'hover:enter'
    try { el.addEventListener('hover:enter', handler); } catch (e) { el.addEventListener('click', handler); }
  };

  // Помощники: преобразование SRT -> VTT для HTML5 <track>
  function srtToVtt(srt) {
    const fix = srt
      .replace(/\r+/g, '')
      .trim()
      .split('\n')
      .map(line => line.replace(/,/g, '.')) // 00:00:01,000 -> 00:00:01.000
      .join('\n');
    const parts = fix
      .replace(/^\d+\s*$/gm, '') // убрать порядковые номера
      .replace(/\n{2,}/g, '\n\n'); // нормализовать пустые строки
    return 'WEBVTT\n\n' + parts;
  }

  // Вспомогательная «тост»-нотификация, если есть Lampa.Noty
  function notify(text) {
    if (window.Lampa && Lampa.Noty && Lampa.Noty.show) Lampa.Noty.show(text);
    else console.log('[SubtitlePlus]', text);
  }

  // Достаём текущие метаданные: название и год — через DOM и/или активность
  function detectCurrentTitleAndYear() {
    // Попытка №1: DOM плеера Lampa
    const titleEl = document.querySelector('.player-info__title') || document.querySelector('.full-title, .card__title');
    const subEl = document.querySelector('.player-info__sub-title') || document.querySelector('.full-tagline, .card__age');
    let title = titleEl ? titleEl.textContent.trim() : '';
    let year = '';

    // Часто год сидит отдельно либо в скобках после названия — попробуем выцепить
    const yearFromTitle = title.match(/\((19|20)\d{2}\)$/);
    if (yearFromTitle) {
      year = yearFromTitle[0].replace(/[()]/g, '');
      title = title.replace(/\s*\((19|20)\d{2}\)\s*$/, '');
    } else if (subEl) {
      const y = subEl.textContent.match(/(19|20)\d{2}/);
      if (y) year = y[0];
    }

    // Попытка №2: если есть Lampa.Activity — возьмём оттуда
    try {
      if (window.Lampa && Lampa.Activity && Lampa.Activity.active && !title) {
        const act = Lampa.Activity.active();
        if (act && act.card && act.card.title) title = act.card.title;
        if (act && act.card && act.card.release_date && !year) year = String(act.card.release_date).slice(0, 4);
        if (act && act.card && act.card.first_air_date && !year) year = String(act.card.first_air_date).slice(0, 4);
      }
    } catch (e) {}

    return { title: (title || '').trim(), year: (year || '').trim() };
  }

  // Поиск субтитров через новый API
  async function searchOSNewAPI(query, year) {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (year) params.set('year', year);
    if (PREFERRED_LANGS.length) params.set('languages', PREFERRED_LANGS.join(','));
    params.set('order_by', 'download_count');
    params.set('ai_translated', 'exclude');
    params.set('hearing_impaired', 'exclude');
    params.set('page', '1');

    const res = await fetch(`https://api.opensubtitles.com/api/v1/subtitles?${params.toString()}`, {
      headers: {
        'Api-Key': OPEN_SUBTITLES_API_KEY,
        'Accept': 'application/json'
      }
    });
    if (!res.ok) throw new Error(`OpenSubtitles search failed: ${res.status}`);
    const json = await res.json();
    return (json.data || []).slice(0, MAX_RESULTS).map(it => ({
      id: it.id,
      lang: it.attributes.language,
      release: it.attributes.release || it.attributes.uploader?.name || '',
      file_id: (it.attributes.files && it.attributes.files[0]?.file_id) || null
    }));
  }

  // Получить прямую ссылку на файл через новый API
  async function getDownloadLinkNewAPI(file_id) {
    const res = await fetch('https://api.opensubtitles.com/api/v1/download', {
      method: 'POST',
      headers: {
        'Api-Key': OPEN_SUBTITLES_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ file_id })
    });
    if (!res.ok) throw new Error(`OpenSubtitles download ticket failed: ${res.status}`);
    const json = await res.json();
    return json.link; // прямая ссылка на .srt (или zip)
  }

  // Fallback: старый публичный REST поиск (без ключа)
  async function searchOSLegacy(query, year) {
    const q = encodeURIComponent(query);
    const lang = encodeURIComponent(PREFERRED_LANGS.join(','));
    const yearPart = year ? `/year-${encodeURIComponent(year)}` : '';
    const url = `https://rest.opensubtitles.org/search/query-${q}/sublanguageid-${lang}${yearPart}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`Legacy search failed: ${res.status}`);
    const arr = await res.json();
    return (arr || []).slice(0, MAX_RESULTS).map(it => ({
      id: it.IDSubtitle,
      lang: it.SubLanguageID,
      release: it.MovieReleaseName || it.SubFileName || '',
      legacy: true,
      download: it.SubDownloadLink // уже готовая ссылка
    }));
  }

  function buildChoiceOverlay(items, onPick, onCancel) {
    // Небольшое нейтральное окно выбора, без опоры на внутренние шаблоны.
    const wrap = document.createElement('div');
    wrap.className = 'subtitleplus-overlay';
    wrap.style.cssText = `
      position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);
      display:flex;align-items:center;justify-content:center;
      font-family:inherit;color:#fff;
    `;
    const box = document.createElement('div');
    box.style.cssText = `
      width:min(90vw,900px);max-height:80vh;overflow:auto;background:#161616;border-radius:16px;padding:18px 16px;
      box-shadow:0 10px 30px rgba(0,0,0,.5)
    `;
    const h = document.createElement('div');
    h.textContent = 'Выберите субтитры';
    h.style.cssText = 'font-size:20px;font-weight:600;margin:0 0 12px';
    box.appendChild(h);

    const list = document.createElement('div');
    items.forEach((it, idx) => {
      const row = document.createElement('div');
      row.className = 'selector'; // чтобы работала фокус-навигация Lampa
      row.tabIndex = 0;
      row.style.cssText = `
        padding:10px 12px;border-radius:12px;margin:6px 0;outline:none;
        background:#1f1f1f;display:flex;gap:10px;align-items:center;cursor:pointer
      `;
      row.innerHTML = `<div style="opacity:.7;width:44px;text-transform:uppercase">${it.lang || ''}</div>
                       <div style="flex:1">${(it.release || '').replace(/</g,'&lt;')}</div>`;
      row.addEventListener('mouseenter', () => row.style.background = '#272727');
      row.addEventListener('mouseleave', () => row.style.background = '#1f1f1f');
      onEnter(row, () => { try { onPick(it); } finally { document.body.removeChild(wrap); } });
      list.appendChild(row);
      if (idx === 0) setTimeout(() => row.focus(), 0);
    });
    box.appendChild(list);

    const foot = document.createElement('div');
    foot.style.cssText = 'margin-top:10px;opacity:.7';
    foot.textContent = 'ОК — выбрать, Назад — закрыть';
    box.appendChild(foot);

    wrap.addEventListener('keyup', e => { if (e.key === 'Escape' || e.key === 'Backspace') { document.body.removeChild(wrap); onCancel && onCancel(); } });
    wrap.addEventListener('click', e => { if (e.target === wrap) { document.body.removeChild(wrap); onCancel && onCancel(); } });

    wrap.appendChild(box);
    document.body.appendChild(wrap);
  }

  async function fetchText(url) {
    const res = await fetch(url, { headers: { 'Accept': 'text/plain,*/*' } });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    // Иногда OpenSubtitles отдает gzip/zip — это уже слишком для чистого JS без JSZip.
    // В новом API чаще отдают «сырые» srt; если придёт zip — предупредим.
    const ct = res.headers.get('Content-Type') || '';
    if (/zip|octet-stream/i.test(ct)) throw new Error('Получен ZIP — распаковка не поддерживается в этом плагине.');
    return await res.text();
  }

  function attachTrackToVideo(vttText, label) {
    const video = document.querySelector('video');
    if (!video) throw new Error('Видеоэлемент не найден.');
    // Создаём Blob: text/vtt
    const blob = new Blob([vttText], { type: 'text/vtt' });
    const url = URL.createObjectURL(blob);

    // Удалим прежний «наш» track, если есть
    $$('.subtitleplus-track').forEach(t => t.remove());

    const track = document.createElement('track');
    track.kind = 'subtitles';
    track.label = label || 'External';
    track.srclang = 'xx';
    track.default = true;
    track.className = 'subtitleplus-track';
    track.src = url;
    video.appendChild(track);

    // Включаем дорожку (некоторые движки требуют явного показа)
    const tt = Array.from(video.textTracks || []);
    const ours = tt[tt.length - 1];
    if (ours) ours.mode = 'showing';

    notify('Субтитры подключены');
  }

  async function runSearchAndPick() {
    const { title, year } = detectCurrentTitleAndYear();
    if (!title) throw new Error('Не удалось определить название текущего видео.');
    notify(`Ищу субтитры: ${title}${year ? ' (' + year + ')' : ''}`);

    let items = [];
    if (OPEN_SUBTITLES_API_KEY) {
      items = await searchOSNewAPI(title, year);
    } else {
      items = await searchOSLegacy(title, year);
    }
    if (!items.length) throw new Error('Субтитры не найдены.');

    // Если всего один вариант — скачиваем сразу, иначе предлагаем выбор
    const proceed = async pick => {
      let link = pick.download || '';
      if (!link) {
        if (!pick.file_id) throw new Error('У выбранного результата нет file_id.');
        if (!OPEN_SUBTITLES_API_KEY) throw new Error('Для скачивания по новому API нужен API-ключ OpenSubtitles.');
        link = await getDownloadLinkNewAPI(pick.file_id);
      }
      const srt = await fetchText(link);
      const vtt = srtToVtt(srt);
      attachTrackToVideo(vtt, `${(pick.lang || '').toUpperCase()} — ${pick.release || 'OpenSubtitles'}`);
    };

    if (items.length === 1) return proceed(items[0]);

    buildChoiceOverlay(items, proceed, () => notify('Выбор субтитров отменён'));
  }

  // Создаём кнопку в панели плеера, когда плеер отрисован
  function ensureButtonOnce(root) {
    if (root.querySelector('.subtitleplus-btn')) return;

    const btn = document.createElement('div');
    btn.className = 'player-panel__button selector subtitleplus-btn';
    btn.style.cssText = 'display:inline-flex;align-items:center;gap:8px;white-space:nowrap';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 5h16a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H7l-3 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2m3 6v2h5v-2zm8 0v2h3v-2z"/></svg>
      <span>Субтитры</span>
    `;
    onEnter(btn, async () => {
      try { await runSearchAndPick(); }
      catch (e) { notify(e.message || String(e)); }
    });

    // В разных скинах панель может называться по-разному: попробуем типичные контейнеры
    const place = root.querySelector('.player-panel__body') || root;
    place.appendChild(btn);
  }

  // Ждём появления панели плеера через MutationObserver
  function installWhenPlayerReady() {
    const observer = new MutationObserver(() => {
      const panel = document.querySelector('.player-panel, .video-player, .player');
      if (panel) {
        const body = panel.querySelector('.player-panel__body') || panel;
        if (body) ensureButtonOnce(panel);
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  // Попробуем ещё и через «шину» Lampa — если доступна
  try {
    if (window.Lampa && Lampa.Listener && Lampa.Listener.follow) {
      Lampa.Listener.follow('activity', e => {
        if (e && (e.type === 'start' || e.type === 'play')) {
          setTimeout(installWhenPlayerReady, 0);
        }
      });
    }
  } catch (e) {}

  // На всякий случай — стартуем наблюдатель сразу
  installWhenPlayerReady();

  console.log('[SubtitlePlus] loaded');
})();
