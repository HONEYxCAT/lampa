// html_subs_tizen.js
// Lampa plugin: HTML Subtitles overlay for Tizen
// Автор: специально для вашего кейса. Версия 1.0

(function () {
  const PLUGIN_ID = 'html_subs_tizen';
  const LOG_PREFIX = '[HTMLSubs]';
  const SUPPORT_EXT = ['.vtt', '.srt', '.ass', '.ssa'];
  const DEFAULTS = {
    fontSize: 34,        // px
    lineHeight: 1.35,
    bottom: 8,           // % от высоты
    opacity: 1.0,
    color: '#fff',
    outline: '#000',     // тень/контур
    delayMs: 0           // сдвиг таймкода (мс): +позже, -раньше
  };

  // Хранилище (простое)
  const Store = {
    get(k, d){ try{ return Lampa.Storage.get(PLUGIN_ID + '_' + k, d); }catch(e){ return d; } },
    set(k, v){ try{ Lampa.Storage.set(PLUGIN_ID + '_' + k, v); }catch(e){} }
  };

  let settings = {
    fontSize: Store.get('fontSize', DEFAULTS.fontSize),
    lineHeight: Store.get('lineHeight', DEFAULTS.lineHeight),
    bottom: Store.get('bottom', DEFAULTS.bottom),
    opacity: Store.get('opacity', DEFAULTS.opacity),
    color: Store.get('color', DEFAULTS.color),
    outline: Store.get('outline', DEFAULTS.outline),
    delayMs: Store.get('delayMs', DEFAULTS.delayMs)
  };

  const log = (...a) => { try { console.log(LOG_PREFIX, ...a); } catch(e) {} };

  // ---------- UI: очень лёгкие настройки в общих настройках ----------
  function addSettings() {
    try {
      Lampa.SettingsApi.addParam({
        component: 'interface',
        name: 'HTML-субтитры (Tizen)',
        type: 'button',
        onEnter: openSettings,
        description: 'Отрисовывать субтитры поверх видео. Работает с внешними .srt/.vtt/.ass из торрента.'
      });
    } catch (e) {
      log('SettingsApi not available, skip');
    }
  }

  function openSettings() {
    const items = [
      { title: `Размер: ${settings.fontSize}px`, subtitle: 'Изменить', action: 'font' },
      { title: `Отступ снизу: ${settings.bottom}%`, subtitle: 'Изменить', action: 'bottom' },
      { title: `Непрозрачность: ${settings.opacity}`, subtitle: '0.3—1.0', action: 'opacity' },
      { title: `Сдвиг времени: ${settings.delayMs} мс`, subtitle: 'Плюс/минус', action: 'delay' },
      { title: 'Цвет текста', subtitle: settings.color, action: 'color' },
      { title: 'Контур/тень', subtitle: settings.outline, action: 'outline' },
      { title: 'Сброс', subtitle: 'Вернуть по умолчанию', action: 'reset' }
    ];

    Lampa.Select.show({
      title: 'HTML-субтитры — настройки',
      items,
      onSelect: (it) => {
        switch (it.action) {
          case 'font': askNumber('Размер (px):', settings.fontSize, (v)=>saveSetting('fontSize', clampInt(v, 12, 72))); break;
          case 'bottom': askNumber('Отступ снизу (%):', settings.bottom, (v)=>saveSetting('bottom', clampInt(v, 0, 30))); break;
          case 'opacity': askNumber('Непрозрачность (0.3—1.0):', settings.opacity, (v)=>saveSetting('opacity', clampFloat(v, 0.3, 1.0))); break;
          case 'delay': askNumber('Сдвиг времени (мс):', settings.delayMs, (v)=>saveSetting('delayMs', clampInt(v, -3000, 3000))); break;
          case 'color': askText('Цвет (hex):', settings.color, (v)=>saveSetting('color', v || '#fff')); break;
          case 'outline': askText('Контур/тень (hex):', settings.outline, (v)=>saveSetting('outline', v || '#000')); break;
          case 'reset': Object.keys(DEFAULTS).forEach(k=>saveSetting(k, DEFAULTS[k])); break;
        }
        openSettings();
      },
      onBack: ()=>Lampa.Controller.toggle('settings_component')
    });
  }

  function askNumber(title, current, cb){
    Lampa.Prompt.show(title, String(current), cb, ()=>{}, { type: 'number' });
  }
  function askText(title, current, cb){
    Lampa.Prompt.show(title, String(current), cb, ()=>{});
  }
  function saveSetting(k, v){
    settings[k] = v; Store.set(k, v);
    Lampa.Noty.show('Сохранено');
  }
  function clampInt(v, min, max){ v = parseInt(v||0); return Math.max(min, Math.min(max, v)); }
  function clampFloat(v, min, max){ v = parseFloat(v||0); return Math.max(min, Math.min(max, v)); }

  // ---------- Overlay ----------
  let overlay = null;
  let overlayStyle = null;
  let videoEl = null;
  let cues = [];
  let rafId = 0;
  let active = false;

  function ensureOverlay(){
    if (overlay) return overlay;
    const root = document.querySelector('.player-video') || document.body;
    overlay = document.createElement('div');
    overlay.className = 'html-subs-overlay';
    overlay.setAttribute('data-plugin', PLUGIN_ID);
    overlay.innerHTML = '<div class="html-subs-line"></div><div class="html-subs-line"></div>';
    root.appendChild(overlay);

    overlayStyle = document.createElement('style');
    overlayStyle.textContent = `
      .html-subs-overlay{
        position:absolute; left:5%; right:5%;
        bottom:${settings.bottom}%;
        text-align:center; z-index:5000; pointer-events:none;
      }
      .html-subs-overlay .html-subs-line{
        display:block; margin:0.12em 0;
        font-family: system-ui, sans-serif;
        font-size:${settings.fontSize}px; line-height:${settings.lineHeight};
        color:${settings.color}; opacity:${settings.opacity};
        text-shadow:
          -1px -1px 0 ${settings.outline},
           1px -1px 0 ${settings.outline},
          -1px  1px 0 ${settings.outline},
           1px  1px 0 ${settings.outline};
      }
      .player--fullscreen .html-subs-overlay{ font-size: 1em }
    `;
    document.head.appendChild(overlayStyle);
    return overlay;
  }

  function removeOverlay(){
    cancelAnimationFrame(rafId);
    rafId = 0;
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    if (overlayStyle && overlayStyle.parentNode) overlayStyle.parentNode.removeChild(overlayStyle);
    overlay = overlayStyle = null;
    cues = [];
    active = false;
    videoEl = null;
  }

  function setOverlayText(lines){
    if (!overlay) return;
    const nodes = overlay.querySelectorAll('.html-subs-line');
    const a = lines[0] || '';
    const b = lines[1] || '';
    nodes[0].innerHTML = a;
    nodes[1].innerHTML = b;
  }

  // ---------- Парсеры субтитров ----------
  function parseVTT(text){
    // очень простой парсер VTT: только cue с таймами, поддержка <i> и <b> в виде HTML
    const out = [];
    const blocks = text.replace(/\r/g,'').split(/\n\n+/);
    for (let block of blocks){
      if (!block.trim()) continue;
      const lines = block.split('\n').filter(Boolean);
      // может быть номер cue в первой строке
      if (lines.length >= 2 && lines[0].indexOf('-->') === -1) lines.shift();
      const timeLine = lines.shift() || '';
      const m = timeLine.match(/(\d+:\d{2}:\d{2}\.\d{3}|\d{1,2}:\d{2}\.\d{3})\s+-->\s+(\d+:\d{2}:\d{2}\.\d{3}|\d{1,2}:\d{2}\.\d{3})/);
      if (!m) continue;
      const start = toSeconds(m[1]);
      const end   = toSeconds(m[2]);
      const html  = lines.join('<br>').trim();
      out.push({start, end, html});
    }
    return out;
  }

  function parseSRT(text){
    const out = [];
    const blocks = text.replace(/\r/g,'').split(/\n\n+/);
    for (let block of blocks){
      if (!block.trim()) continue;
      const lines = block.split('\n').filter(Boolean);
      if (lines.length >= 2 && /^\d+$/.test(lines[0])) lines.shift(); // номер
      const timeLine = lines.shift() || '';
      const m = timeLine.match(/(\d+:\d{2}:\d{2}),(\d{3})\s+-->\s+(\d+:\d{2}:\d{2}),(\d{3})/);
      if (!m) continue;
      const start = toSeconds(`${m[1]}.${m[2]}`);
      const end   = toSeconds(`${m[3]}.${m[4]}`);
      const html  = sanitizeSrt(lines.join('\n')).replace(/\n/g,'<br>').trim();
      out.push({start, end, html});
    }
    return out;
  }

  // ASS/SSA — минималистично: берём только текст из Dialogue и базовые \N переносы
  function parseASS(text){
    const out = [];
    const lines = text.replace(/\r/g,'').split('\n');
    const toMs = (t)=> {
      // 0:01:23.45 → сек
      const m = t.trim().match(/(\d+):(\d{2}):(\d{2})\.(\d{1,2})/);
      if (!m) return 0;
      return (+m[1])*3600 + (+m[2])*60 + (+m[3]) + (+('0.'+m[4]));
    };
    for (let ln of lines){
      if (!/^Dialogue:/i.test(ln)) continue;
      // Dialogue: 0,0:01:23.45,0:01:26.00,Style,Actor,MarginL,MarginR,MarginV,Effect,Text
      const parts = ln.split(':')[1].split(',');
      if (parts.length < 10) continue;
      const start = toMs(parts[1]);
      const end   = toMs(parts[2]);
      const textRaw = parts.slice(9).join(','); // поле Text
      const html = sanitizeSrt(textRaw.replace(/\\N/g,'<br>').replace(/{[^}]+}/g,'')); // упрощённо
      out.push({start, end, html});
    }
    return out;
  }

  function sanitizeSrt(s){
    return s
      .replace(/<\/?font[^>]*>/gi,'')    // сносим устаревшие теги
      .replace(/<[^>]+on\w+=["'][^"']*["'][^>]*>/gi,'') // лишние обработчики
      .replace(/&lt;/g,'<').replace(/&gt;/g,'>')
      .replace(/&amp;/g,'&');
  }

  function toSeconds(str){
    // 1:02:03.456 или 02:03.456
    const p = str.split(':').map(Number);
    if (p.length === 3) return p[0]*3600 + p[1]*60 + p[2];
    if (p.length === 2) return p[0]*60 + p[1];
    return parseFloat(str)||0;
  }

  // ---------- Цикл отображения ----------
  function tick(){
    if (!videoEl || !active || cues.length === 0) { rafId = requestAnimationFrame(tick); return; }
    const t = (videoEl.currentTime || 0) + (settings.delayMs/1000);
    // бинпоиск
    let lo=0, hi=cues.length-1, idx=-1;
    while (lo<=hi){
      const mid = (lo+hi)>>1;
      const c = cues[mid];
      if (t < c.start) hi = mid-1;
      else if (t > c.end) lo = mid+1;
      else { idx = mid; break; }
    }
    if (idx === -1){ setOverlayText(['','']); }
    else {
      // делим на 2 строки, чтобы избежать длинных строк на ТВ
      const html = cues[idx].html;
      const parts = html.split(/<br\s*\/?>/i);
      const lines = [parts[0]||'', parts.slice(1).join('<br>')||''];
      setOverlayText(lines);
    }
    rafId = requestAnimationFrame(tick);
  }

  // ---------- Получение списка субтитров из TorrServer ----------
  function getVideoUrl(){
    try {
      // В Lampa есть обёртка плеера — пробуем её
      if (Lampa.PlayerVideo && Lampa.PlayerVideo.video) {
        const el = Lampa.PlayerVideo.video();
        if (el && el.currentSrc) return el.currentSrc;
      }
    } catch(e){}
    // fallback
    const v = document.querySelector('.player video');
    return v ? v.currentSrc : '';
  }

  function parseTorrParams(src){
    // ожидаем /stream/fname?link=...&index=..&play
    try {
      const url = new URL(src);
      const link = url.searchParams.get('link') || '';
      const index = url.searchParams.get('index') || '';
      return { origin: url.origin, path: url.pathname, link, index };
    } catch(e){ return null; }
  }

  async function fetchJson(u){
    const res = await fetch(u, { credentials: 'include' });
    if (!res.ok) throw new Error('HTTP '+res.status);
    return res.json();
  }

  async function fetchText(u){
    const res = await fetch(u, { credentials: 'include' });
    if (!res.ok) throw new Error('HTTP '+res.status);
    return res.text();
  }

  async function discoverSubs(){
    const src = getVideoUrl();
    const info = parseTorrParams(src);
    if (!info || !info.link){ throw new Error('Не удалось разобрать URL видео'); }

    // Используем /stream?…&stat — из README TorrServer
    const statUrl = `${info.origin}${info.path}?link=${encodeURIComponent(info.link)}&stat`;
    const stat = await fetchJson(statUrl); // структура может отличаться в сборках

    // Ищем список файлов — пытаемся угадать ключи
    const files = (stat.files || stat.Files || stat.file_stats || stat.data || stat.list || [])
      .map((f, i)=> {
        const name = (f.name || f.Name || f.path || f.Path || '')+'';
        const idx  = (f.index != null ? f.index : (f.Id != null ? f.Id : i));
        return { name, index: idx };
      });

    const subs = files.filter(f => SUPPORT_EXT.some(ext => f.name.toLowerCase().endsWith(ext)));
    // Преобразуем в элементы выбора
    return subs.map(s => {
      const lower = s.name.toLowerCase();
      const guessLang = (lower.match(/[.\-_](rus|ru|ua|uk|eng|en|spa|es|ita|it|deu|de|fra|fr)[.\-_]/) || [,''])[1] || '';
      const label = (guessLang ? guessLang.toUpperCase()+' · ' : '') + s.name;
      const url = `${info.origin}${info.path}?link=${encodeURIComponent(info.link)}&index=${s.index}&play`;
      const ext = SUPPORT_EXT.find(ext => lower.endsWith(ext)) || '.srt';
      return { title: label, subtitle: ext.toUpperCase(), url, ext, name: s.name };
    });
  }

  function openSubsPicker(list){
    if (!list || !list.length){
      Lampa.Noty.show('В торрente не найдены внешние субтитры (.srt/.vtt/.ass/.ssa)');
      return;
    }
    Lampa.Select.show({
      title: 'HTML-субтитры (из торрента)',
      items: list,
      onBack: ()=> Lampa.Controller.toggle('player'),
      onSelect: async (it)=>{
        try {
          await loadAndRender(it);
          Lampa.Controller.toggle('player');
        } catch (e) {
          log('load error', e);
          Lampa.Noty.show('Не удалось загрузить субтитры');
        }
      }
    });
  }

  async function loadAndRender(item){
    const txt = await fetchText(item.url);

    let parsed = [];
    if (item.ext === '.vtt') parsed = parseVTT(txt);
    else if (item.ext === '.srt') parsed = parseSRT(txt);
    else if (item.ext === '.ass' || item.ext === '.ssa') parsed = parseASS(txt);

    if (!parsed.length) throw new Error('empty');
    parsed.sort((a,b)=>a.start-b.start);

    ensureOverlay();
    videoEl = (Lampa.PlayerVideo && Lampa.PlayerVideo.video) ? Lampa.PlayerVideo.video() : document.querySelector('.player video');
    cues = parsed;
    active = true;
    if (!rafId) rafId = requestAnimationFrame(tick);

    Lampa.Noty.show('HTML-субтитры активированы');
  }

  function clearSubs(){
    setOverlayText(['','']);
    active = false;
  }

  // ---------- Встраивание в плеер ----------
  function addPlayerButton(){
    // Добавим кнопку «HTML SUBS» в стандартный панельный список через Select:
    const items = [
      { title: 'Найти субтитры в торренте', action: 'find' },
      { title: 'Отключить HTML-субтитры', action: 'off' }
    ];
    Lampa.PlayerPanel && Lampa.PlayerPanel.add && Lampa.PlayerPanel.add({
      name: 'htmlsubs',
      icon: '<i class="icon icon--subtitle"></i>',
      title: 'HTML SUBS',
      onSelect: ()=>{
        Lampa.Select.show({
          title: 'HTML-субтитры',
          items,
          onBack: ()=> Lampa.Controller.toggle('player'),
          onSelect: async (it)=>{
            if (it.action === 'find'){
              try{ openSubsPicker(await discoverSubs()); }
              catch(e){ Lampa.Noty.show('Не удалось получить список файлов торрента'); }
            } else if (it.action === 'off'){
              clearSubs();
              Lampa.Controller.toggle('player');
            }
          }
        });
      }
    });
  }

  function onPlayerStart(){
    addPlayerButton();
    // авто-поиск: если найдена ровно одна дорожка — подключим её сами
    discoverSubs().then(list=>{
      if (list.length === 1) loadAndRender(list[0]).catch(()=>{});
    }).catch(()=>{ /* молчим */});
  }

  function onPlayerDestroy(){
    removeOverlay();
  }

  // Иногда Lampa выбрасывает события субтитров — перехватим и выключим «системные»,
  // если пользователь включил наши:
  try {
    if (Lampa.PlayerVideo && Lampa.PlayerVideo.listener) {
      Lampa.PlayerVideo.listener.follow('subs', function (e) {
        // Если включили «None/Off» — гасим наш слой тоже
        if (e && (e.value === 'off' || e.method === 'off')) clearSubs();
      });
    }
  } catch (e){}

  // ---------- Жизненный цикл плагина ----------
  function init(){
    addSettings();

    // Когда приложение готово
    if (Lampa && Lampa.Listener && Lampa.Listener.follow){
      Lampa.Listener.follow('app', function(e){
        if (e.type === 'ready'){
          log('ready');
        }
      });
    }

    // Подпишемся на старт/стоп плеера (официально есть start/destroy)
    try {
      if (Lampa.Player && Lampa.Player.listener) {
        Lampa.Player.listener.follow('start', onPlayerStart);
        Lampa.Player.listener.follow('destroy', onPlayerDestroy);
      }
    } catch(e){
      log('no Player.listener', e);
    }
  }

  if (window.Lampa) init();
  else document.addEventListener('lampaReady', init);
})();