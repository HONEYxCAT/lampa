/* tizen-subtitle-bridge.js
   Плагин Lampa для Tizen: внешний поиск и подключение субтитров через AVPlay.
   Автор: вы. Лицензия: MIT.
*/
(function () {
  const NS = 'tizen_sub_bridge_v1';
  const DEF = {
    server: 'http://192.168.1.2:5544', // поменяйте на IP вашего ПК с сервисом
    langs: 'ru,en',
    auto_restart: true,
    os_api_key: '' // если захотите передавать ключ на сервер (обычно хранится на сервере)
  };

  // Хранилище
  const Storage = {
    get(k, d){ try{ const v = localStorage.getItem(NS+':'+k); return v ? JSON.parse(v) : (d ?? DEF[k]); }catch(e){ return d ?? DEF[k]; } },
    set(k, v){ try{ localStorage.setItem(NS+':'+k, JSON.stringify(v)); }catch(e){} }
  };

  // Нотификации
  function toast(msg){ try{ Lampa.Noty.show(msg); }catch(e){ console.log('[TSB]', msg); } }

  // Определение названия/года
  function detectTitleYear(){
    let title = '';
    let year = '';
    try{
      if (Lampa?.Activity?.active) {
        const act = Lampa.Activity.active();
        if (act?.card?.title) title = act.card.title;
        if (act?.card?.release_date) year = String(act.card.release_date).slice(0,4);
        if (!year && act?.card?.first_air_date) year = String(act.card.first_air_date).slice(0,4);
      }
    }catch(e){}
    if (!title){
      const t = document.querySelector('.player-info__title, .full-title, .card__title');
      if (t) title = t.textContent.trim();
    }
    if (!year){
      const s = document.querySelector('.player-info__sub-title, .full-tagline, .card__age');
      const m = s?.textContent?.match?.(/(19|20)\d{2}/);
      if (m) year = m[0];
    }
    const m2 = title.match(/\((19|20)\d{2}\)$/);
    if (m2){ year = m2[0].replace(/[()]/g,''); title = title.replace(/\s*\((19|20)\d{2}\)\s*$/,''); }
    return {title: title.trim(), year: year.trim()};
  }

  // Служебное состояние
  const State = {
    lastUrl: '',                 // URL, который передавали в avplay.open(...)
    pendingSubPath: '',          // локальный путь к TTML/SAMI, который нужно подложить до prepare()
    lastAttachTime: 0
  };

  // Патч AVPlay: перехват open/prepare, чтобы знать URL и вовремя подложить путь субтитров
  function patchAVPlay(){
    if (!window.webapis || !webapis.avplay || webapis.avplay.__tsbPatched) return;
    const av = webapis.avplay;
    const origOpen = av.open ? av.open.bind(av) : null;
    const origPrepare = av.prepare ? av.prepare.bind(av) : null;
    const origPrepareAsync = av.prepareAsync ? av.prepareAsync.bind(av) : null;

    if (origOpen){
      av.open = function(url){
        try{ State.lastUrl = url || State.lastUrl; }catch(e){}
        return origOpen(url);
      };
    }

    function trySetSubPath(){
      if (State.pendingSubPath){
        try {
          // Важно: по гайду Samsung делать это в IDLE до prepare()
          webapis.avplay.setExternalSubtitlePath(State.pendingSubPath);
          toast('Подключаю субтитры для AVPlay');
        } catch(e){
          console.log('setExternalSubtitlePath error', e);
        }
      }
    }

    if (origPrepare){
      av.prepare = function(){
        trySetSubPath();
        return origPrepare();
      };
    }
    if (origPrepareAsync){
      av.prepareAsync = function(cb){
        trySetSubPath();
        return origPrepareAsync(cb);
      };
    }

    av.__tsbPatched = true;
    console.log('[TSB] AVPlay patched');
  }

  // Скачивание файла субтитров на ТВ через Tizen Download API и возврат локального абсолютного пути
  function downloadOnTizen(url){
    return new Promise((resolve, reject) => {
      if (typeof tizen === 'undefined' || !tizen.download) return reject(new Error('Tizen Download API недоступен'));
      try{
        const req = new tizen.DownloadRequest(url, 'wgt-private-tmp'); // рекомендуемое хранилище
        const id = tizen.download.start(req, {
          oncompleted: function(downloadId, fullPath){
            resolve(fullPath); // готовый абсолютный путь
          },
          onfailed: function(err){
            reject(new Error('Не удалось скачать субтитры: '+(err?.message||String(err))));
          }
        });
        console.log('[TSB] download start id=', id);
      }catch(e){ reject(e); }
    });
  }

  // Запрос к локальному серверу: подобрать лучший вариант и вернуть ссылку на TTML
  async function askServerForTTML(title, year){
    const base = Storage.get('server', DEF.server).replace(/\/+$/,'');
    const langs = Storage.get('langs', DEF.langs);
    const url = `${base}/api/best?title=${encodeURIComponent(title)}${year?`&year=${encodeURIComponent(year)}`:''}&langs=${encodeURIComponent(langs)}`;
    const res = await fetch(url, {headers:{'Accept':'application/json'}});
    if (!res.ok) throw new Error('Локальный сервис не отвечает: '+res.status);
    const json = await res.json();
    if (!json || !json.ttmlUrl) throw new Error('Сервис не вернул ссылку на субтитры');
    return json.ttmlUrl; // http://PC:5544/subs/uuid.ttml
  }

  // Мягкий перезапуск воспроизведения, чтобы AVPlay заново прошёл prepare и увидел подложенный путь
  function softRestartAtSamePos(){
    try{
      if (!webapis?.avplay) return false;
      const pos = Math.max(0, (webapis.avplay.getCurrentTime?.()|0) - 500); // отнимем полсекунды
      const url = State.lastUrl;
      if (!url) return false;

      // Внимание: мы вмешиваемся минимально и не трогаем отображение — Lampa сразу вернёт UI.
      webapis.avplay.stop?.();
      webapis.avplay.close?.();
      webapis.avplay.open?.(url);
      // pendingSubPath уже выставлен, патч prepare сам подложит путь
      try{ webapis.avplay.prepare?.(); }catch(e){ try{ webapis.avplay.prepareAsync?.(()=>{}); }catch(_){} }
      try{ webapis.avplay.seekTo?.(pos); }catch(_){}
      try{ webapis.avplay.play?.(); }catch(_){}
      return true;
    }catch(e){
      console.log('softRestart error', e);
      return false;
    }
  }

  // Основное действие: найти → скачать → подложить → перезапустить (по возможности)
  async function attachNow(){
    const {title, year} = detectTitleYear();
    if (!title) { toast('Не удалось определить название текущего видео'); return; }
    toast(`Ищу субтитры: ${title}${year?` (${year})`:''}`);

    try{
      const ttmlUrl = await askServerForTTML(title, year);
      toast('Нашёл субтитры, скачиваю на ТВ');
      const fullPath = await downloadOnTizen(ttmlUrl);
      State.pendingSubPath = fullPath; // увидит avplay.prepare

      const auto = !!Storage.get('auto_restart', DEF.auto_restart);
      let restarted = false;
      if (auto) restarted = softRestartAtSamePos();
      toast(restarted ? 'Субтитры подключены и воспроизведение перезапущено' : 'Субтитры подключены. Подействуют при следующем запуске плеера');
    }catch(e){
      toast(e.message || String(e));
    }
  }

  // Плавающая кнопка в плеере
  function ensureFloatingButton(){
    if (document.querySelector('.tsb-fab')) return;
    const btn = document.createElement('div');
    btn.className = 'tsb-fab selector';
    btn.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:999999;background:#1f1f1f;color:#fff;padding:10px 14px;border-radius:14px;opacity:.9;display:flex;gap:8px;align-items:center;box-shadow:0 4px 14px rgba(0,0,0,.3);';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M4 5h16a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H7l-3 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2m3 6v2h5v-2zm8 0v2h3v-2z"/></svg><span>Субтитры</span>`;
    const go = () => attachNow();
    try{ btn.addEventListener('hover:enter', go); }catch(_){ btn.addEventListener('click', go); }
    document.body.appendChild(btn);
  }

  // Простейшая страница настроек внутри Lampa
  function openSettingsOverlay(){
    const wrap = document.createElement('div');
    wrap.className = 'tsb-settings';
    wrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:999998;display:flex;align-items:center;justify-content:center;font-family:inherit;color:#fff;';
    const box = document.createElement('div');
    box.style.cssText = 'width:min(92vw,920px);max-height:82vh;overflow:auto;background:#161616;border-radius:16px;padding:18px;';
    box.innerHTML = `
      <div style="font-size:20px;font-weight:600;margin-bottom:12px">Субтитры (Tizen Bridge)</div>
      <div style="display:grid;grid-template-columns:180px 1fr;gap:12px;align-items:center">
        <div>Сервер</div>
        <input id="tsb-server" style="width:100%;padding:10px;border-radius:10px;border:none;background:#222;color:#fff" placeholder="http://ПК:5544" value="${Storage.get('server', DEF.server)}"/>
        <div>Языки</div>
        <input id="tsb-langs" style="width:100%;padding:10px;border-radius:10px;border:none;background:#222;color:#fff" placeholder="ru,en" value="${Storage.get('langs', DEF.langs)}"/>
        <div>Автоперезапуск</div>
        <label style="display:flex;align-items:center;gap:8px">
          <input id="tsb-auto" type="checkbox" ${Storage.get('auto_restart', DEF.auto_restart)?'checked':''}/>
          <span>Перезапускать воспроизведение после подключения субтитров</span>
        </label>
      </div>
      <div style="display:flex;gap:10px;margin-top:14px">
        <button id="tsb-save" class="selector" style="background:#2979ff;border:none;border-radius:12px;color:#fff;padding:10px 14px">Сохранить</button>
        <button id="tsb-test" class="selector" style="background:#444;border:none;border-radius:12px;color:#fff;padding:10px 14px">Тест соединения</button>
        <button id="tsb-now" class="selector" style="background:#1b5e20;border:none;border-radius:12px;color:#fff;padding:10px 14px">Подключить сейчас</button>
        <div style="flex:1"></div>
        <button id="tsb-close" class="selector" style="background:#333;border:none;border-radius:12px;color:#fff;padding:10px 14px">Закрыть</button>
      </div>
    `;
    wrap.appendChild(box);
    document.body.appendChild(wrap);
    box.querySelector('#tsb-save').onclick = () => {
      Storage.set('server', box.querySelector('#tsb-server').value.trim());
      Storage.set('langs', box.querySelector('#tsb-langs').value.trim());
      Storage.set('auto_restart', box.querySelector('#tsb-auto').checked);
      toast('Сохранено');
    };
    box.querySelector('#tsb-test').onclick = async () => {
      try{
        const base = Storage.get('server', DEF.server).replace(/\/+$/,'');
        const res = await fetch(`${base}/health`, {cache: 'no-store'});
        toast(res.ok ? 'Связь с сервером есть' : 'Сервер не отвечает');
      }catch(e){ toast('Сервер недоступен'); }
    };
    box.querySelector('#tsb-now').onclick = () => attachNow();
    const close = () => document.body.removeChild(wrap);
    box.querySelector('#tsb-close').onclick = close;
    wrap.onclick = e => { if (e.target === wrap) close(); };
  }

  // Встраивание пункта в «Настройки Lampa → Расширения»
  function injectSettingsEntryObserver(){
    const obs = new MutationObserver(() => {
      const container = document.querySelector('.settings, .settings__content, .menu, .app') || document.body;
      if (!container) return;
      const already = document.querySelector('.tsb-entry');
      const holder = document.querySelector('.settings__content') || document.querySelector('.menu__list') || container;
      if (!already && holder){
        const btn = document.createElement('div');
        btn.className = 'tsb-entry selector';
        btn.style.cssText = 'margin:10px 0;padding:12px 14px;border-radius:12px;background:#1f1f1f;color:#fff;display:inline-flex;gap:8px;align-items:center;cursor:pointer;';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12,20A8,8 0 1,0 4,12A8,8 0 0,0 12,20M11,6H13V13H11M11,16H13V18H11"/></svg><span>Субтитры (Tizen Bridge)</span>`;
        try{ btn.addEventListener('hover:enter', openSettingsOverlay); }catch(_){ btn.addEventListener('click', openSettingsOverlay); }
        holder.appendChild(btn);
      }
      // Кнопку в плеере держим активной
      const player = document.querySelector('.player, .video-player, .player-panel');
      if (player) ensureFloatingButton();
    });
    obs.observe(document.documentElement, {subtree:true, childList:true});
  }

  // Инициализация
  patchAVPlay();
  injectSettingsEntryObserver();
  ensureFloatingButton();

  console.log('[TSB] plugin loaded');
})();
