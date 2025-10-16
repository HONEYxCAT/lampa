(function () {
	'use strict';
	
	var Protocol = function Protocol() {
		return window.location.protocol == 'https:' ? 'https://' : 'http://';
	}
	var TRASH_R = ['$$$####!!!!!!!', '^^^^^^##@', '@!^^!@#@@$$$$$', '^^#@@!!@#!$', '@#!@@@##$$@@'];
	var version_modss = '3.2', API = Protocol() + 'api.lampa.stream/', type = '', jackets = {}, cards, ping_auth, manifest, menu_list = [], vip = false, leftVipD = '', user_id = '', uid = '60efb6412cd5083cf154c58d0', IP = '77.51.125.202', logged = false, VAST_url = false;
	
	console.log('Modss', 'plugin', 'LOADED - ' + Protocol() + 'lampa.stream');
	console.log('Modss', 'device', '[UID] ' + uid);
	
	
var Modss = {
		init: function () {
      
			this.collections();
			this.sources();
			//this.buttBack();
			ForkTV.init();
			this.radio();
			this.snow();
			Lampa.Settings.main().render().find('[data-component="plugins"]').unbind('hover:enter').on('hover:enter', function () {
        var fix = function fix() {
          Lampa.Extensions.show();
          setTimeout(function (){
            $('.extensions__item-author', Lampa.Extensions.render()).map(function (i, e){
              if(e.textContent == '@modss_group') $(e).html('💎').append('<span class="extensions__item-premium">VIP buy at @modssmy_bot</span>');
            });
          }, 500);
        }
        if (Lampa.Manifest.app_digital >= 221) {
          Lampa.ParentalControl.personal('extensions', function () {
            fix();
          }, false, true);
        } else fix();
      });
      if (Lampa.Storage.field('mods_tv_butt_ch')) Lampa.Keypad.listener.follow('keydown', function (e) {
    		var next = (e.code == 427 || e.code == 33 || e.code == 39);
    		var prev = (e.code == 428 || e.code == 34 || e.code == 37);
    		var none = !$('.panel--visible .focus').length && Lampa.Controller.enabled().name !== 'select';
    		if (Lampa.Activity.active() && Lampa.Activity.active().component == 'modss_tv' && Lampa.Player.opened()) {
    		  //Lampa.Noty.show('code_ '+e.code);
    			if (prev && none) {
    		    //Lampa.Noty.show('code_prev');
    				Lampa.PlayerPlaylist.prev();
    			}
    			if (next && none) {
    			  //Lampa.Noty.show('code_ next');
    				Lampa.PlayerPlaylist.next();
    			}
    		}
    	});
    	if (!window.FX) {
  			window.FX = {
  				max_qualitie: 720,
  				is_max_qualitie: false, 
  				auth: false
  			};
  		}
  		//if(!IP) 
  		this.getIp('start');
  		var ads_4k = ['<div class="ad-server" style="margin: 1em 1em;">','<div class="ad-server__text"><b>Надоело смотреть в плохом качестве?</b><br>Хочешь смотреть в <b style="color: #ffd402;">FHD</b> и <b style="color: #ffd402;">4K</b>? Сканируй код и подключай <b style="color: #02ff60;">Vip</b></div><img src="https://lampa.stream/qr_bot.png" class="ad-server__qr">','</div>'].join('');
    	Lampa.Controller.listener.follow('toggle', function(e) {
    		if(e.name == 'select' && !vip) {
    			setTimeout(function() {
    				if($('.selectbox .scroll__body div:eq(0)').html() && $('.selectbox .scroll__body div:eq(0)').html().indexOf('.land') >= 0) $('.selectbox .scroll__body div:eq(0)').remove();
    				if($('.selectbox .selectbox-item__icon svg').length && Lampa.Activity.active().component == 'full') $('.selectbox .scroll__body').prepend($(ads_4k));
    			}, 10);
    		}
    	});
    	var mynotice = new Lampa.NoticeClassLampa({name: 'Modss',db_name: 'notice_modss'});
      Lampa.Notice.addClass('modss', mynotice);

      if(!logged && vip) 
      setTimeout(function() {
        Modss.auth();
      }, 100);

      if(Lampa.Storage.get('showModssVip', 'false') && leftVipD && vip && logged) setTimeout(function (){
        Modss.showModssVip();
        Lampa.Storage.set('showModssVip', 'false');
      }, 5000);
      
      setTimeout(function() {
        var m_reload = '<div id="MRELOAD" class="head__action selector m-reload-screen"><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.4800000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z" fill="currentColor"></path></g></svg></div>';
        $('body').find('.head__actions').append(m_reload);
        $('body').find('.head__actions #RELOAD').remove();

        $('#MRELOAD').on('hover:enter hover:click hover:touch', function() {
          location.reload();
        });
      }, 1000);
		},
    snow: function () {
      $(document).snowfall(Lampa.Storage.field('mods_snow') == true ? {
        deviceorientation: true,
        round: true,
        maxSize: 10,
        maxSpeed: 5,
        flakeCount: 30,
        flakeIndex: 9
      } : 'clear');
    },
		radio: function () {
			var ico = '<svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="radioIconTitle" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <path d="M5.44972845 6C2.18342385 9.2663046 2.18342385 14.7336954 5.44972845 18M8.59918369 8C6.46693877 10.1322449 6.46693877 13.8677551 8.59918369 16M18.5502716 18C21.8165761 14.7336954 21.8165761 9.2663046 18.5502716 6M15.4008163 16C17.5330612 13.8677551 17.5330612 10.1322449 15.4008163 8"/> <circle cx="12" cy="12" r="1"/> </svg>';
			var menu_item = $('<li class="menu__item selector" data-action="Radio_n"><div class="menu__ico">' + ico + '</div><div class="menu__text">' + Lampa.Lang.translate('title_radio') + '</div></li>');
			menu_item.on('hover:enter', function () {
				Lampa.Activity.push({
					url: '',
					title: Lampa.Lang.translate('title_radio'),
					component: 'Radio_n',
					page: 1
				});
			});
			if (Lampa.Storage.get('mods_radio')) $('body').find('.menu .menu__list').eq(0).append(menu_item);
			else $('body').find('[data-action="Radio_n"]').remove();
			window.m_play_player = new Player(); window.m_play_player.create();
		},
		tv_modss: function () {
      
    },
    sources: function () {
			var sources;
			if (Lampa.Params.values && Lampa.Params.values['source']) {
        sources = Object.assign({}, Lampa.Params.values['source']);
        sources.pub = 'PUB';
        sources.filmix = 'FILMIX';
      } else {
        sources = {
          'tmdb': 'TMDB',
          'cub': 'CUB',
          'pub': 'PUB',
          'filmix': 'FILMIX'
        };
      }

      Lampa.Params.select('source', sources, 'tmdb');
		},
		showModssVip: function () {
      var enabled = Lampa.Controller.enabled().name;
      Lampa.Modal.open({
        title: '',
        html: Lampa.Template.get('cub_premium'),
        onBack: function onBack() {
          Lampa.Modal.close();
          Lampa.Controller.toggle(enabled);
        }
      });
      Lampa.Modal.render().find('.cub-premium__title').text("MODS's VIP");
      Lampa.Modal.render().find('.cub-premium__descr:eq(0)').text('Поздравляем вас с получением VIP-статуса! Теперь у вас есть возможность наслаждаться видео в высоком разрешении 4К. Кроме того, вас ожидают дополнительные балансеры, которые помогут найти подходящий контент');
      Lampa.Modal.render().find('.cub-premium__descr:eq(1)').text('У вас осталось ' + leftVipD);
      Lampa.Modal.render().find('.cub-premium__descr:eq(1)').after('<div class="cub-premium__descr"><h3>👇 Кнопка для просмотра 👇</h3><img src="http://lampa.stream/but_modss.png"></div>');
      Lampa.Modal.render().find('.cub-premium__url').text('@modssmy_bot');
      Lampa.Modal.render().addClass('modal--cub-premium').find('.modal__content').before('<div class="modal__icon"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 32 32"><path d="m2.837 20.977q-.912-5.931-1.825-11.862a.99.99 0 0 1 1.572-.942l5.686 4.264a1.358 1.358 0 0 0 1.945-.333l4.734-7.104a1.263 1.263 0 0 1 2.1 0l4.734 7.1a1.358 1.358 0 0 0 1.945.333l5.686-4.264a.99.99 0 0 1 1.572.942q-.913 5.931-1.825 11.862z" fill="#D8C39A"></svg></div>');
    },
		online: function (back) {
      
	var params = {
		url: '',
		title: Lampa.Lang.translate('modss_title_online') + leftVipD,
		component: 'modss_online',
		search: cards.title,
		search_one: cards.title,
		search_two: cards.original_title,
		movie: cards,
		page: 1
	};
	this.params = params;
	var _this = this;
	function inf() {
		var file_id = Lampa.Utils.hash(cards.number_of_seasons ? cards.original_name : cards.original_title);
      	var watched = Lampa.Storage.cache('online_watched_last', 5000, {});

		_this.balanser_name = watched[file_id] && watched[file_id].balanser_name || false;
		_this.balanser = watched[file_id] && watched[file_id].balanser || false;
		_this.data = Lampa.Storage.cache('online_choice_' + _this.balanser, 3000, {});
		_this.is_continue = cards.number_of_seasons && _this.data[cards.id] && Lampa.Arrays.getKeys(_this.data[cards.id].episodes_view).length;

		_this.timeline = _this.is_continue ? Lampa.Timeline.details(Lampa.Timeline.view(Lampa.Utils.hash([watched[file_id].season, watched[file_id].season > 10 ? ':' : '', watched[file_id].episode, cards.original_title].join('')))) : false;

		_this.last_s = _this.is_continue ? ('S' + (watched[file_id].season) + ' - ' + watched[file_id].episode + ' ' + Lampa.Lang.translate('torrent_serial_episode').toLowerCase()) : '';
		_this.title = _this.is_continue && Lampa.Storage.field('online_continued') ? '#{title_online_continue} ' : '#{modss_title_online}';
	}
	function openOnline() {
		Lampa.Activity.push(params);
	}
	function shows(last) {
		Lampa.Select.show({
			title: Lampa.Lang.translate('title_continue') + '?',
			items: [{
				title:  _this.last_s,
				subtitle: _this.timeline ? _this.timeline.html() + '<hr>' + _this.balanser_name : '',
				yes: true
			}, {
				title: Lampa.Lang.translate('settings_param_no')
			}],
			onBack: function onBack() {
				Lampa.Select.hide();
				Lampa.Controller.toggle('content');
			},
			onSelect: function onSelect(a) {
				if (a.yes) {
					_this.data[cards.id].continued = true;
					Lampa.Storage.set('online_choice_' + _this.balanser[cards.id], _this.data);

					var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
					last_select_balanser[cards.id] = _this.balanser;
					Lampa.Storage.set('online_last_balanser', last_select_balanser);
				}
				openOnline();
			}
		});
	}
	inf();

	var loader = '<svg class="modss-balanser-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="94px" height="94px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="5" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>';
	var ico = '<svg class="modss-online-icon" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>';
	var button = "<div style='position:relative' data-subtitle='modss_v".concat((manifest && manifest.version) || version_modss, " (21 Balansers, 17 in VIP)' class='full-start__button selector view--modss_online'>" + ico + "<span>" + this.title + "</span></div>");
	var btn = $(Lampa.Lang.translate(button));
	this.btn = btn;
	//	if (Lampa.Storage.field('online_but_first')) Lampa.Storage.set('full_btn_priority', Lampa.Utils.hash(btn.clone().removeClass('focus').prop('outerHTML')));

	if (back == 'delete') Lampa.Activity.active().activity.render().find('.view--modss_online').remove();
	if (back && back !== 'delete') {
		back.find('span').text(Lampa.Lang.translate(this.title));
		Navigator.focus(back[0]);
	}
	///Lampa.Noty.show(back)

	if (!back && Lampa.Storage.field('mods_onl')) {
		setTimeout(function () {
			var activity = Lampa.Activity.active().activity.render();
			var enabled = Lampa.Controller.enabled().name;
			var addButtonAndToggle = function(btn) {
				Lampa.Controller.toggle(enabled);
				Navigator.focus(btn[0]);
			};

			if ((enabled == 'full_start' || enabled == 'settings_component') && !activity.find('.view--modss_online').length) {
				if (activity.find('.button--priority').length) {
					if(Lampa.Storage.field('online_but_first')) {
						activity.find('.full-start-new__buttons').prepend(btn);
						addButtonAndToggle(btn);
					} else {
						activity.find('.view--torrent').after(btn);
					}
				} else if ((Lampa.Storage.field('online_but_first') && activity.find('.button--play').length) || !activity.find('.view--torrent').length) {
					if(activity.find('.full-start__button').length && !activity.find('.view--modss_online').length) {
						activity.find('.full-start__button').first().before(btn);
					} else {
						activity.find('.button--play').before(btn);
					}
					addButtonAndToggle(btn);
				} else {
					//activity.find('.view--torrent').first().before(btn);
					activity.find('.view--torrent').before(btn);
					//addButtonAndToggle(btn);
				}
			}
			//if(Lampa.Storage.field('online_but_first')) Navigator.focus(btn[0]);
		}, 100);

		btn.on('hover:enter', function () {
		//btn.unbind('hover:enter hover.click').on('hover:enter hover.click', function () {
			inf();
			Lampa.Activity.active().activity.render().find('.view--modss_online').html(Lampa.Lang.translate(ico + '<span>' + _this.title + '</span>') + "");
			if (_this.is_continue && Lampa.Storage.field('online_continued')) shows(_this.last_s);
			else openOnline();
		});
	}

    },
    preload: function (e) {
      
    },
		collections: function () {
			var menu_item = $('<li class="menu__item selector" data-action="collection"><div class="menu__ico"><img src="./img/icons/menu/catalog.svg"/></div><div class="menu__text">' + Lampa.Lang.translate('title_collections') + '</div></li>');
			if (Lampa.Storage.get('mods_collection')) $('body').find('.menu .menu__list li:eq(3)').after(menu_item)
			else $('body').find('[data-action="collection"]').remove();
			///* removed anti-tamper reload */
			});
		},
    showTooltip: function(showTime, hideTime) {
      var remember = 1000 * 60 * 60 * 14; // 14 часов
      if (!Lampa.Storage.field('helper')) return;
      var helperMemory = {};
      var storedHelper = Lampa.Storage.get('helper');
      if (storedHelper && typeof storedHelper === 'object') {
        helperMemory = storedHelper;
      }
      var name = 'online_source';
      var help = helperMemory[name];
      
      if (!help) {
        help = {
          time: 0,
          count: 0
        };
        helperMemory[name] = help;
      }
      
      if (help.time + remember < Date.now() && help.count < 3) {
        help.time = Date.now();
        help.count++;
        Lampa.Storage.set('helper', helperMemory);
        
        $('body').find('.online-balanser-tip').remove();
        $('body').find('style#online-balanser-tip-style').remove();
        
        setTimeout(function() {
          var target = Lampa.Activity.active().activity.render().find('.filter--sort');
          if (!target.length) return;
          
          var rect = target[0].getBoundingClientRect();
          var top = rect.bottom + window.scrollY - 10;
          var left = rect.left + window.scrollX + (rect.width / 2) - 90;
          
          var tooltipText = Lampa.Lang.translate('online_click_here');
          
          $('body').append('<div class="online-balanser-tip" style="top:'+top+'px;left:'+left+'px;"><div class="online-balanser-tip__content"><div class="online-balanser-tip__hand"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M44.9928 32.4372L46.2918 31.6872C47.7267 30.8587 49.5615 31.3503 50.3899 32.7852L56.3899 43.1775C57.2183 44.6124 56.7267 46.4472 55.2918 47.2756L42.2082 54.8294C41.207 55.4075 39.9626 55.3588 39.0096 54.7041L22.8051 43.5729C21.544 42.7066 21.2773 40.9549 22.2234 39.7525L22.3798 39.5538C23.1753 38.5428 24.6291 38.3443 25.6665 39.105L29.5775 41.9728C30.7703 42.8473 32.3089 41.468 31.5694 40.1872V40.1872L23.9444 26.9803C23.185 25.665 23.6357 23.9831 24.951 23.2237V23.2237C26.2663 22.4643 27.9482 22.915 28.7075 24.2303L32.5825 30.942M44.9928 32.4372L44.4928 31.5711C43.6644 30.1362 41.8296 29.6446 40.3947 30.473L38.6627 31.473M44.9928 32.4372L45.7428 33.7362M38.6627 31.473L38.4127 31.04C37.5842 29.6052 35.7495 29.1135 34.3146 29.942L32.5825 30.942M38.6627 31.473L40.6627 34.9372M32.5825 30.942L35.0825 35.2721" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M12.6101 30.3487L18.5376 26.9265M30.9314 19.7709L36.8588 16.3487M21.1567 17.1518L17.7345 11.2244M26.5865 16.437L28.3579 9.82576M17.8227 21.4967L11.2115 19.7253" stroke="orange" stroke-width="2" stroke-linecap="round"/></svg></div><div class="online-balanser-tip__text simple-button focus">'+tooltipText+'</div></div></div><style id="online-balanser-tip-style">.online-balanser-tip{position:fixed;z-index:9999;opacity:0;transform:translateY(20px);transition:opacity .3s,transform .3s;pointer-events:none;}.online-balanser-tip--active{opacity:1;transform:translateY(0);}.online-balanser-tip__content{display:flex;flex-direction:column;align-items:center;}.online-balanser-tip__hand{position:relative;margin-bottom:10px;animation:pointHand 1.5s ease-in-out infinite;}.online-balanser-tip__hand svg{width:64px;height:64px;}.online-balanser-tip__text{padding:10px 16px;color:#000;border-radius:8px;font-size:1.1em;text-align:center;}@keyframes pointHand{0%{transform:translateY(0) translateX(0) scale(1);}25%{transform:translateY(-8px) translateX(-3px) scale(1.1);}50%{transform:translateY(-15px) translateX(-8px) scale(1.2);}75%{transform:translateY(-8px) translateX(-3px) scale(1.1);}100%{transform:translateY(0) translateX(0) scale(1);}}</style>');
        
          $('.online-balanser-tip').addClass('online-balanser-tip--active');
          setTimeout(function() {
            $('.online-balanser-tip').removeClass('online-balanser-tip--active');
            setTimeout(function() {
              $('.online-balanser-tip').remove();
            }, 300);
          }, hideTime || 10000);
        }, showTime || 500);
      }
    },
		Notice: function (data) {
		  var id = data.id;
      var card = JSON.parse(data.data).card;
      setTimeout(function() {
        
        if(Lampa.Notice.classes.modss.notices.find(function (n) {
          return n.id == id;
        })) return;
        
        var bals = [];
        for (var b in data.find){
          bals.push('<b>'+b+'</b> - '+data.find[b].join(', '));
        }
        Lampa.Notice.pushNotice('modss',{
          id: id,
          from: 'modss',
          title: card.name,
          text: 'Переводы на балансерах где есть '+data.episode+' серия',
          time: Date.now(), 
          poster: card.poster_path,
          card: card,
          labels: bals
        },function(){
          console.log('Успешно');
        },function(e){
          console.log('Чет пошло не так', e);
        });
      }, 1000);
      
      Lampa.Notice.listener.follow('select',function (e) {
        if(e.element.from == 'modss'){
          Lampa.Notice.close();
        }
      });
		},
    auth: function(kp) {
      function authFn(kp) {
        /* removed anti-tamper reload */
        });
      }
      
      authFn(kp)
      .then(function(start) {
        setTimeout(function() {
          stopAuthInterval();
        }, start.expires_in);
        if(!start.block_ip) ping_auth = setInterval(authFn, start.interval);
      })
      .catch(function(error) {
        console.error(error);
      });

      function stopAuthInterval() {
        clearInterval(ping_auth);
        ping_auth = null;
      }
    
      return {
        stop: stopAuthInterval // Возвращаем функцию остановки интервала
      };
    },    
    balansers: function() {
      var balansers = {"lumex":"Lumex","videx":"ViDEX  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","filmix":"Filmix 4K","kinopub":"KinoPub 4K","hdr":"MODS's [4K, HDR]  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","fxpro":"FXpro 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","mango":"ManGo 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","alloha":"Alloha 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","hdvb":"HDVB  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","iremux":"IRemux 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","hdrezka":"HDRezka  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","zetflix":"Zetflix  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","uakino":"UAKino <img style=\"width:1.3em!important;height:1em!important\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAd0lEQVR4nO3VsQ3AMAhEUVZhiKzKbOyRGpHW8gKni/6T6A0+7AgAAP4g612nChoobmCJ0EkdiWSJSz/V5Bkt/WSTj6w8Km7qAyUNlHmEpp91qqCB5gaWCJ3UkRiWuPVTHZ7R1k92+Mjao+KmPtDQQJtHCACAMPQBoXuvu3x1za4AAAAASUVORK5CYII=\"> 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","eneida":"Eneida <img style=\"width:1.3em!important;height:1em!important\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAd0lEQVR4nO3VsQ3AMAhEUVZhiKzKbOyRGpHW8gKni/6T6A0+7AgAAP4g612nChoobmCJ0EkdiWSJSz/V5Bkt/WSTj6w8Km7qAyUNlHmEpp91qqCB5gaWCJ3UkRiWuPVTHZ7R1k92+Mjao+KmPtDQQJtHCACAMPQBoXuvu3x1za4AAAAASUVORK5CYII=\">  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","aniliberty":"AniLiberty  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","kodik":"Kodik  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","kinotochka":"KinoTochka  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>"};
     // if (Lampa.Storage.get('pro_pub', false)) balansers = Object.assign({"kinopub":"KinoPub"}, balansers);
      return balansers;
    },
    check: function(name, call) {
      var name = name || Lampa.Arrays.getKeys(Modss.jack)[0];
      var json = Modss.jack[name];
      var item = $('.settings-param__status.one');
      var item2 = $('.settings-param__status.act');
      var url = (json && json.url || Lampa.Storage.get('jackett_url'));
      if(!url) return;
      var u = url + '/api/v2.0/indexers/' + (Lampa.Storage.field('jackett_interview') == 'healthy' ? 'status:healthy' : 'all') + '/results?apikey=' + (json && json.key || Lampa.Storage.get('jackett_key'));
      Pub.network.timeout(10000);
      var check = function check (ok) {
        Pub.network["native"](Protocol() + u, function (t) {
          if(name && !call) item2.removeClass('active error wait').addClass('active');
          if(call) {
            if(name && !Modss.jack[name].check) Modss.jack[name].check = true;
            if(name && !Modss.jack[name].ok) Modss.jack[name].ok = true;
            call(true);
          }
        }, function (a, c) {
          console.error('Request', 'parser error - ', Protocol() + u);
          Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - ' + url);
          if(name && !call) item2.removeClass('active error wait').addClass('error');
          if(call) {
            if(ok && name && !Modss.jack[name].check) Modss.jack[name].check = true;
            if(ok && name && !Modss.jack[name].ok) Modss.jack[name].ok = false;
            call(false);
          }
        });
      };
      if(name && !call) check();
      else if(call && name && !Modss.jack[name].check) check(true);
      else {
        if(name && Modss.jack[name].ok) if(call) call(true);
        if(name && !Modss.jack[name].ok) if(call) call(false);
        if(Boolean(Modss.jack[Lampa.Storage.get('jackett_url2')])) item.removeClass('wait').addClass(Modss.jack[Lampa.Storage.get('jackett_url2')].ok ? 'active' : 'error');
      }
    },
    jack: {
      jacred_xyz: { url: 'jacred.xyz', key: '', lang: 'df_lg', interv: 'all' },
      jacred_viewbox: { url: 'jacred.viewbox.dev', key: 'viewbox', lang: 'df_lg', interv: 'all' },
      spawn_pp_ua: { url: 'spawn.pp.ua:59117', key: 2, lang: 'df', interv: 'all' },
      trs_my_to: { url: 'trs.my.to:9117', key: '', lang: 'df_lg', interv: 'all' },
    },
    showModal: function(text, onselect, size, xml, but, title) {
      if (title === undefined || title === null) title = '';
      var modalConfig = {
        title: title,
        align: 'center',
        zIndex: 300,
        size: size == true ? 'full' : size,
        html: typeof text == 'object' ? text : $('<div class="about modssModal">' + text + '</div>'),
        onBack: function onBack() {
          if(xml) xml.abort();
          Lampa.Modal.close();
          Lampa.Controller.toggle('content');
          if (onselect && !but) {
            onselect();
          }
        }
      };
      
      if (onselect && but) {
        modalConfig.buttons = [{
          name: but[0] || Lampa.Lang.translate('settings_param_no'),
          onSelect: function onSelect() {
            if(xml) xml.abort();
            Lampa.Modal.close();
            Lampa.Controller.toggle('content');
          }
        }, {
          name: but[1] || Lampa.Lang.translate('settings_param_yes'),
          onSelect: onselect
        }];
      }
      
      Lampa.Modal.open(modalConfig);
    },
    speedTest: function(url, params) {
      Lampa.Speedtest.start({url: url});
      $('.speedtest__body').prepend('<center style="color:rgba(255, 255, 255, 0.2);font-size:2em;font-weight: 600;">'+params.balanser+'</center>').append('<center style="color:rgba(255, 255, 255, 0.2);font-size:2em;font-weight: 600;">'+params.title+'<br>('+params.info+')</center>');
    },
    balansPrf: 'lumex',
    CACHE_TIME: 1000 * 60 * 60 * 2,
    getCache: function(key, data) {
      var timestamp = new Date().getTime();
			var cache = Lampa.Storage.cache(key, 1, {}); //500 это лимит ключей
			if (cache[key]) {
				if ((timestamp - cache[key].timestamp) > this.CACHE_TIME) {
					// Если кеш истёк, чистим его
					delete cache[key];
					Lampa.Storage.set(data, cache);
					return false;
				}
			} else return false;
			return cache[key];
		}, 
    setCache: function(key, data) {
			var timestamp = new Date().getTime();
			var cache = Lampa.Storage.cache(key, 1, {}); //500 это лимит ключей
			if (!cache[key]) {
				cache[key] = data;
				Lampa.Storage.set(key, cache);
			} else {
				if ((timestamp - cache[key].timestamp) > this.CACHE_TIME) {
					data.timestamp = timestamp;
					cache[key] = data;
					Lampa.Storage.set(key, cache);
				} else data = cache[key];
			}
			return data;
		},
    proxy: function (name) {
      var proxy = '';
      var need = Lampa.Storage.field('mods_proxy_' + name);
      var need_url = Lampa.Storage.get('onl_mods_proxy_' + name);
      var prox = Lampa.Storage.get('mods_proxy_all');
      var main = Lampa.Storage.get('mods_proxy_main', 'false');
      var myprox = Protocol() + 'prox.lampa.stream/';
      var myprox2 = Protocol() + 'cors.lampa.stream/';
      var proxy_apn = (window.location.protocol === 'https:' ? 'https://' : 'http://') + 'byzkhkgr.deploy.cx/';

      //if (Lampa.Storage.field('mods_proxy_main') === true || (need == 'on' && need_url.length == 0 && prox == '')) proxy = myprox;
      if (need == 'on' && name == 'videocdn') return true;
      //if (need == 'on' && name == 'cdnmovies') return proxys;
      if ((need == 'on' || main) && name == 'filmix' && need_url.length == 0 || name == 'filmix') return myprox2;
      if ((need == 'on' || main) && name == 'collaps' && need_url.length == 0) return myprox;
      if ((need == 'on' || main) && name == 'hdrezka' && need_url.length == 0) return myprox;
      if ((need == 'on' || main) && name == 'kinobase' && need_url.length == 0) return proxy_apn;
      else if (need == 'on' && need_url.length >= 0 && prox !== '') proxy = prox;
      else if (need == 'url' || (need == 'on' && need_url.length > 0)) proxy = need_url;
      else if (prox && need == 'on') proxy = prox;
      //else if (main && need == 'on') proxy = myprox;
      if (proxy && proxy.slice(-1) !== '/') {
        proxy += '/';
      }
      return proxy;
    },
    Subscr: {
      network: new Lampa.Reguest(),
      load: null,
      movieId: null,
      movieTitle: null,
      getSubscriptionUrl: function(movieId) {
        return API + 'subscr/' + movieId;
      },
      showManager: function(movieId, movieTitle, load) {
        if (!user_id) return Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        
        if (load) this.load = load;
        if (movieId) this.movieId = movieId;
        if (movieTitle) this.movieTitle = movieTitle;

        Lampa.Loading.start(function () {
          Lampa.Loading.stop();
        });

        this.network.clear();
        this.network.timeout(8000);
        this.network.silent(this.load.requestParams(this.getSubscriptionUrl(this.movieId) + '/voices'), function (data) {
          Lampa.Loading.stop();

          if (data && data.success && data.voices) {
            Modss.Subscr.showVoiceSelectionModal(data.voices, user_id, Modss.Subscr.movieId, Modss.Subscr.movieTitle);
          } else {
            Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
          }
        }, function (a, c) {
          Lampa.Loading.stop();
          console.error('Error loading voices:', a, c);
          Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        });
      },
      showVoiceSelectionModal: function(voices, user_id, movieId, movieTitle) {
        var voiceItems = [];
        var subscribedVoice = null;
        for (var voiceName in voices) {
          var voice = voices[voiceName];
          
          // Если это папка, проверяем озвучки внутри
          if (voice.isFolder && voice.voices) {
            for (var subVoiceName in voice.voices) {
              var subVoice = voice.voices[subVoiceName];
              if (subVoice.isSubscribed) {
                subscribedVoice = Object.assign({voice_name: subVoiceName}, subVoice);
                break;
              }
            }
          } else if (voice.isSubscribed) {
            subscribedVoice = Object.assign({voice_name: voiceName}, voice);
            break;
          }
          
          if (subscribedVoice) break;
        }
        
        voiceItems.push({
          title: '📋 ' + Lampa.Lang.translate('modss_voice_manage_subscriptions'),
          subtitle: Lampa.Lang.translate('modss_voice_manage_subscriptions'),
          show_all_subscriptions: true
        });

        if (subscribedVoice) {
          voiceItems.push({
            title: '❌ ' + Lampa.Lang.translate('modss_voice_unsubscribe'),
            subtitle: subscribedVoice.voice_name,
            voice_data: subscribedVoice,
            isSubscribed: true,
            unsubscribe_action: true
          });
        }
        
        var folders = [];
        var regularVoices = [];
        
        for (var voiceName in voices) {
          var voice = voices[voiceName];
          
          if (voice.isFolder && voice.voices) {
            folders.push({name: voiceName, data: voice});
          } else {
            regularVoices.push({name: voiceName, data: voice});
          }
        }
        
        regularVoices.sort(function(a, b) {
          return a.name.localeCompare(b.name, 'en');
        });
        
        // Сначала добавляем папки
        for (var i = 0; i < folders.length; i++) {
          var folder = folders[i];
          var voicesCount = Object.keys(folder.data.voices).length;
          voiceItems.push({
            title: '📁 ' + folder.name,
            subtitle: voicesCount + ' ' + Lampa.Lang.translate('menu_voice'),
            is_folder: true,
            folder_voices: folder.data.voices,
            folder_name: folder.name
          });
        }
        
        // Потом добавляем обычные озвучки
        for (var i = 0; i < regularVoices.length; i++) {
          var voiceName = regularVoices[i].name;
          var voice = regularVoices[i].data;
          
          var seasonsText = voice.seasons && voice.seasons.length > 1 ?
            Lampa.Lang.translate('title_seasons') + ': ' + voice.seasons.join(', ') :
            voice.seasons ? Lampa.Lang.translate('torrent_parser_season') + ' ' + voice.seasons[0] : '';

          var balancersText = voice.balancers && voice.balancers.length > 1 ?
            Lampa.Lang.translate('settings_rest_source') + ': ' + voice.balancers.join(', ') :
            voice.balancers ? voice.balancers[0] : '';

          var lastSeasonInfo = voice.last_season_episodes > 0 ?
            ' • ' + voice.last_season_episodes + ' ' + Lampa.Lang.translate('torrent_serial_episode') : '';

          voiceItems.push({
            title: (voice.isSubscribed ? '🔔' : '🔕') + ' ' + voiceName,
            subtitle: balancersText + ' • ' + seasonsText + lastSeasonInfo,
            voice_data: Object.assign({voice_name: voiceName}, voice),
            isSubscribed: voice.isSubscribed,
            ghost: !voice.isSubscribed
          });
        }

        Lampa.Select.show({
          title: Lampa.Lang.translate('modss_voice_subscribe'),
          items: voiceItems,
          nohide: true,
          onBack: function () {
            Lampa.Select.hide();
            Lampa.Controller.toggle('content');
          },
          onSelect: function (item) {
            if (item.show_all_subscriptions) {
              Modss.Subscr.showAllUserSubscriptions(user_id);
            } else if (item.is_folder && item.folder_voices) {
              // Открываем папку с озвучками
              Modss.Subscr.showFolderVoices(item.folder_voices, item.folder_name, user_id, movieId, movieTitle);
            } else if (item.voice_data && !item.separator) {
              if (item.unsubscribe_action) Modss.Subscr.unsubscribeFromVoice(item.voice_data, user_id, movieId);
              else Modss.Subscr.subscribeToVoice(item.voice_data, user_id, movieId, movieTitle);
            }
          }
        });
      },
      showFolderVoices: function(folderVoices, folderName, user_id, movieId, movieTitle) {
        var voiceItems = [];
        var voiceNames = Object.keys(folderVoices).sort();
        
        for (var i = 0; i < voiceNames.length; i++) {
          var voiceName = voiceNames[i];
          var voice = folderVoices[voiceName];
          
          var seasonsText = voice.seasons && voice.seasons.length > 1 ?
            Lampa.Lang.translate('title_seasons') + ': ' + voice.seasons.join(', ') :
            voice.seasons ? Lampa.Lang.translate('torrent_parser_season') + ' ' + voice.seasons[0] : '';

          var balancersText = voice.balancers && voice.balancers.length > 1 ?
            Lampa.Lang.translate('settings_rest_source') + ': ' + voice.balancers.join(', ') :
            voice.balancers ? voice.balancers[0] : '';

          var lastSeasonInfo = voice.last_season_episodes > 0 ?
            ' • ' + voice.last_season_episodes + ' ' + Lampa.Lang.translate('torrent_serial_episode') : '';

          voiceItems.push({
            title: (voice.isSubscribed ? '🔔' : '🔕') + ' ' + voiceName,
            subtitle: balancersText + ' • ' + seasonsText + lastSeasonInfo,
            voice_data: Object.assign({voice_name: voiceName}, voice),
            isSubscribed: voice.isSubscribed,
            ghost: !voice.isSubscribed
          });
        }

        Lampa.Select.show({
          title: folderName,
          items: voiceItems,
          onBack: function () {
            Lampa.Select.hide();
            Modss.Subscr.showManager(movieId, movieTitle);
          },
          onSelect: function (item) {
            if (item.voice_data && !item.separator) {
              Modss.Subscr.subscribeToVoice(item.voice_data, user_id, movieId, movieTitle);
            }
          }
        });
      },
      subscribeToVoice: function(voice, user_id, movieId, movieTitle) {
        if (voice.isSubscribed) return Lampa.Bell.push({text: Lampa.Lang.translate('modss_voice_already_subscribed')});

        var seasonNumber = voice.maxSeasonOverall || 1;

        Lampa.Loading.start(function () {
          Lampa.Loading.stop();
        });

        this.network.clear();
        this.network.timeout(8000);
        this.network.silent(Modss.Subscr.load.requestParams(Modss.Subscr.getSubscriptionUrl(movieId) + '/add'), function (data) {
          Lampa.Loading.stop();
          if (data && data.success) {
            if (data.already_subscribed) {
              Lampa.Bell.push({text: Lampa.Lang.translate('modss_voice_already_subscribed')});
            } else if (data.replaced) {
              Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscription_changed') + ' "' + voice.voice_name + '"');
            } else {
              Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_success') + ' "' + voice.voice_name + '"');
            }
            Lampa.Select.hide();
            Modss.Subscr.showManager(movieId, movieTitle);
          } else if (data && data.error === 'SUBSCRIPTION_LIMIT_REACHED') {
            var limitInfo = data.limit_info || {};
            var current = limitInfo.current || 0;
            var max = limitInfo.max;
            Modss.showModal(
              Lampa.Template.get('modss_voice_limit_modal', {current: current, max: max}),
              function() {
                Lampa.Modal.close();
                Modss.Subscr.showAllUserSubscriptions(user_id);
              }, 'smoll', null,
              [Lampa.Lang.translate('modss_voice_limit_close'), Lampa.Lang.translate('modss_voice_limit_my_subscriptions')]
            );
          } else Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        }, function (a, c) {
          Lampa.Loading.stop();
          console.error('Modss', 'Error subscribing:', a, c);
          Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        }, {
          user_id: user_id,
          voice: voice.voice_name,
          season: seasonNumber,
          title: movieTitle,
          last_ep: voice.last_season_episodes || 0
        });
      },
      unsubscribeFromVoice: function(voice, user_id, movieId) {
        Lampa.Loading.start(function () {
          Lampa.Loading.stop();
        });

        this.network.clear();
        this.network.timeout(8000);
        this.network.silent(Modss.Subscr.load.requestParams(Modss.Subscr.getSubscriptionUrl(movieId) + '/del'), function (data) {
          Lampa.Loading.stop();
          if (data && data.success) {
            Lampa.Noty.show(Lampa.Lang.translate('modss_voice_unsubscribe_success') + ' "' + voice.voice_name + '"');
            Lampa.Select.hide();
            Modss.Subscr.showManager(movieId, '');
          } else {
            Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
          }
        }, function (a, c) {
          Lampa.Loading.stop();
          console.error('Modss', 'Error unsubscribing:', a, c);
          Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        }, {
          user_id: user_id
        });
      },
      showAllUserSubscriptions: function(user_id) {
        Lampa.Loading.start(function () {
          Lampa.Loading.stop();
        });

        this.network.clear();
        this.network.timeout(8000);
        this.network.silent(Modss.Subscr.load.requestParams(API + 'subscr/mysubscr'), function (data) {
          Lampa.Loading.stop();

          if (data && data.success) Modss.Subscr.showSubscriptionsListModal(data.subscriptions, user_id);
          else Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        }, function (a, c) {
          Lampa.Loading.stop();
          console.error('Modss', 'Error loading subscriptions:', a, c);
          Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        });
      },
      showSubscriptionsListModal: function(subscriptions, user_id) {
        var $content = $('<div class="modss-subscriptions-grid"></div>');
        
        if (subscriptions.length === 0) {
          $content.append(Lampa.Template.get('modss_subscriptions_empty'));
        } else {
          subscriptions.forEach(function (sub) {
            var labels = ['S - <b>' + sub.season + '</b>', 'E - <b>' + sub.last_ep + '</b>'];
            
            var item = Lampa.Template.get('notice_card', {
              title: sub.title,
              descr: sub.voice, 
              time: 'ADD: ' + Lampa.Utils.parseTime(sub.created_at).short + '<br>UPD: ' + Lampa.Utils.parseTime(sub.updated_at).short
            });
            item.find('.notice__time, .notice__descr').css('text-align', 'left');
            if (labels) {
              item.find('.notice__descr').append($('<div class="notice__footer">' + labels.map(function (label) {
                return '<div>' + label + '</div>';
              }).join(' ') + '</div>'));
            }
            
            item.on('hover:enter', function() {
              Lampa.Modal.close();
              Modss.Subscr.confirmUnsubscribe(sub, user_id);
            });
            
            $content.append(item);
            
            if (sub.imdb_id) {
              Modss.Subscr.network.silent(Lampa.TMDB.api('find/' + sub.imdb_id + '?external_source=imdb_id&language=' + Lampa.Storage.get('language', 'ru') + '&api_key=' + Lampa.TMDB.key()), function(data) {
                var posterPath = null;
                if (data.tv_results && data.tv_results.length > 0) {
                  posterPath = data.tv_results[0].poster_path;
                } else if (data.movie_results && data.movie_results.length > 0) {
                  posterPath = data.movie_results[0].poster_path;
                }
                
                if (posterPath) {
                  var img = item.find('.notice__img img')[0];
                  img.onerror = function() {
                    img.src = './img/img_broken.svg';
                  };
                  img.onload = function() {
                    item.addClass('image--loaded');
                  };
                  img.src = Lampa.TMDB.image('t/p/w300' + posterPath);
                }
              });
            }
          });
        }
        
        Lampa.Select.hide();
        Modss.showModal($content, function() {
          Lampa.Modal.close();
          Lampa.Controller.toggle('content');
          if (Modss.Subscr.movieId && Modss.Subscr.movieTitle) {
            Modss.Subscr.showManager(Modss.Subscr.movieId, Modss.Subscr.movieTitle);
          }
        }, 'large', null, null, subscriptions.length + ' ' + Lampa.Lang.translate('modss_voice_active_subscriptions'));
      },
      confirmUnsubscribe: function(subscription, user_id) {
        Lampa.Select.show({
          title: Lampa.Lang.translate('modss_voice_confirm_unsubscribe'),
          items: [{
            title: '✅ ' + Lampa.Lang.translate('modss_voice_yes_unsubscribe'),
            subtitle: subscription.voice + ' - "' + subscription.title + '"',
            confirm: true
          }, {
            title: '❌ ' + Lampa.Lang.translate('modss_voice_cancel'),
            subtitle: Lampa.Lang.translate('modss_voice_leave_subscription'),
            cancel: true
          }],
          onBack: function () {
            Lampa.Select.hide();
            Modss.Subscr.showAllUserSubscriptions(user_id);
          },
          onSelect: function (item) {
            if (item.confirm) {
              Lampa.Loading.start(function () {
                Lampa.Loading.stop();
              });

              Modss.Subscr.network.clear();
              Modss.Subscr.network.timeout(8000);
              Modss.Subscr.network.silent(Modss.Subscr.load.requestParams(Modss.Subscr.getSubscriptionUrl(subscription.movie_id) + '/del'), function (data) {
                Lampa.Loading.stop();
                if (data && data.success) {
                  Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscription_removed'));
                  Lampa.Select.hide();
                  Modss.Subscr.showAllUserSubscriptions(user_id);
                } else Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
              }, function (a, c) {
                Lampa.Loading.stop();
                console.error('Modss', 'Error removing subscription:', a, c);
                Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
              }, {
                user_id: user_id,
                voice: subscription.voice,
                balancer: subscription.balancer,
                season: subscription.season
              });
            } else if (item.cancel) {
              Modss.Subscr.showAllUserSubscriptions(user_id);
            }
          }
        });
      }
    }
	}; 
	var Filmix = {
  	network: new Lampa.Reguest(),
  	api_url: 'http://filmixapp.vip/api/v2/',
  	token: Lampa.Storage.get('filmix_token', 'aaaabbbbccccddddeeeeffffaaaabbbb'),
  	user_dev: 'app_lang=ru_RU&user_dev_apk=2.2.10.0&user_dev_id=' + Lampa.Utils.uid(16) + '&user_dev_name=Modss&user_dev_os=11&user_dev_vendor=Lampa&user_dev_token=',
  	useProxy: window.location.protocol === 'https:',
  	add_new: function () {
  		var user_code = '';
  		var user_token = '';
  		var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">Ожидаем код...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
  		Lampa.Modal.open({
  			title: '',
  			html: modal,
  			onBack: function onBack() {
  				Lampa.Modal.close();
  				Lampa.Controller.toggle('settings_component');
  				clearInterval(ping_auth);
  			},
  			onSelect: function onSelect() {
  				Lampa.Utils.copyTextToClipboard(user_code, function () {
  					Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
  				}, function () {
  					Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
  				});
  			}
  		});
  		ping_auth = setInterval(function () {
  			Filmix.checkPro(user_token, function (json) {
  				if (json && json.user_data) {
  					Lampa.Modal.close();
  					clearInterval(ping_auth);
  					Lampa.Noty.show('Устройство добавлено');
  					Lampa.Storage.set("filmix_token", user_token);
  					Lampa.Storage.set("filmix_log", 'true');
  					Filmix.token = user_token;
  					$('[data-name="filmix_token"] .settings-param__value').text(user_token);
  					Lampa.Controller.toggle('settings_component');
  				}
  			});
  		}, 2000);
  		this.network.clear();
  		this.network.timeout(10000);
		var dev = this.api_url + 'token_request?' + this.user_dev;
  		var requestUrl = this.useProxy ? Modss.proxy('filmix') + dev : dev;
  		this.network.quiet(requestUrl, function (found) {
  			if (found.status == 'ok') {
  				user_token = found.code;
  				user_code = found.user_code;
  				modal.find('.selector').text(user_code);
  			} else {
  				Lampa.Noty.show(found);
  			}
  		}, function (a, c) {
  			Lampa.Noty.show(Filmix.network.errorDecode(a, c) + ' - Filmix');
  		});
  	},
  	showStatus: function (ch) {
  		var status = Lampa.Storage.get("filmix_status", '{}');
  		var statuss = $('.settings-param__status', ch).removeClass('active error wait').addClass('wait');
  		var info = Lampa.Lang.translate('filmix_nodevice');
  		statuss.removeClass('wait').addClass('error');
  		if (status.login) {
  			statuss.removeClass('wait').addClass('active');
  			var foto = '<img width="30em" src="' + (status.foto.indexOf('noavatar') == -1 ? status.foto : './img/logo-icon.svg') + '"> <span style="vertical-align: middle;"><b style="font-size:1.3em;color:#FF8C00">' + status.login + '</b>';
  			if (status.is_pro || status.is_pro_plus) info = foto + ' - <b>' + (status.is_pro ? 'PRO' : 'PRO_PLUS') + '</b> ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date + '</span>';
  			else info = foto + ' - <b>NO PRO</b> - MAX 720p</span>';
  		}
  		if (ch) $('.settings-param__descr', ch).html(info);
  		else $('.settings-param__descr:eq(0)').html(info);
  	},
  	checkPro: function (token, call, err) {
  		if (!token && typeof call == 'function') return call({});
  		this.network.clear();
  		this.network.timeout(8000);
  		token = token ? token : Lampa.Storage.get("filmix_token");
  		var url = this.api_url + 'user_profile?' + this.user_dev + token;
  		var requestUrl = this.useProxy ? Modss.proxy('filmix') + url : url;
  		this.network.silent(requestUrl, function (json) {
  		  	window.FX.max_qualitie = 480;
		  	window.FX.auth = false;
  		  	window.FX.is_max_qualitie = false;
  			if (json) {
  				if (json.user_data) {
  			    window.FX.max_qualitie = 720;
  					Lampa.Storage.set("filmix_status", json.user_data);
  					Lampa.Storage.set("filmix_log", 'true');
  					if (typeof call == 'function') call(json);
  				} else {
  					Lampa.Storage.set("filmix_status", {});
  					Lampa.Storage.set("filmix_log", 'false');
  					if (typeof call == 'function') call({});
  				}
  				if(call) Filmix.showStatus();
  			}
  		}, function (a, c) {
  			if(err) err();
  			Lampa.Noty.show(Filmix.network.errorDecode(a, c) + ' - Filmix');
  		});
  	}
  };
	var ForkTV = {
		network: new Lampa.Reguest(),
		url: 'https://no_save.forktv.me',
		forktv_id: Lampa.Storage.field('forktv_id'),
		act_forktv_id: Lampa.Storage.field('act_forktv_id'),
		user_dev: function user_dev() {
		  return 'box_client=lg&box_mac=' + this.forktv_id + '&initial=ForkXMLviewer|' + this.forktv_id + '|YAL-L41%20sdk%2029||MTY5NjUyODU3MQR=E1445|078FDD396E182CD|androidapi|0|Android-device_YAL-L41_sdk_29&platform=android-device&country=&tvp=0&hw=1.4&cors=android-device&box_user=&refresh=true';
		},
		openBrowser: function (url) {
			if (Lampa.Platform.is('tizen')) {
				var e = new tizen.ApplicationControl("https://tizen.org/appcontrol/operation/view", url);
				tizen.application.launchAppControl(e, null, function () {}, function (e) {
					Lampa.Noty.show(e);
				});
			} else if (Lampa.Platform.is('webos')) {
				webOS.service.request("luna://com.webos.applicationManager", {
					method: "launch",
					parameters: {
						id: "com.webos.app.browser",
						params: {
							target: url
						}
					},
					onSuccess: function () {},
					onFailure: function (e) {
						Lampa.Noty.show(e);
					}
				});
			} else window.open(url, '_blank');
		},
		init: function () {
			if (Lampa.Storage.get('mods_fork')) this.check_forktv('', true);
			if (this.forktv_id == 'undefined') {
				this.forktv_id = this.create_dev_id();
				Lampa.Storage.set('forktv_id', this.forktv_id);
			}
			if (this.act_forktv_id == 'undefined') {
				this.act_forktv_id = this.create__id();
				Lampa.Storage.set('act_forktv_id', this.act_forktv_id);
			}
		},
		create__id: function () {
		  var randomNum = Math.floor(Math.random() * 900000) + 100000;
			return randomNum;
		},
		create_dev_id: function () {
			var charsets, index, result;
			result = "";
			charsets = "0123456789abcdef";
			while (result.length < 12) {
				index = parseInt(Math.floor(Math.random() * 15));
				result = result + charsets[index];
			}
			return result;
		},
		copyCode: function (id) {
			Lampa.Utils.copyTextToClipboard(id, function () {
				Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
			}, function () {
				Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
			});
		},
		cats_fork: function (json) {
			var item = [];
			var get_cach = Lampa.Storage.get('ForkTv_cat', '');
			if (!get_cach) {
				json.forEach(function (itm, i) {
				//	if (itm.title !== 'Новости' /* && itm.title !== 'IPTV'*/ ) {
						item.push({
							title: itm.title,
							url: itm.playlist_url,
							img: itm.logo_30x30,
							checkbox: true
						});
					//}
				});
			} else item = get_cach.cat;

			function select(where, a) {
				where.forEach(function (element) {
					element.selected = false;
				});
				a.selected = true;
			}

			function main() {
				Lampa.Controller.toggle('settings_component');
				var cache = Lampa.Storage.cache('ForkTv_cat', 1, {});
				var catg = [];
				item.forEach(function (a) {
					catg.push(a);
				});
				if (catg.length > 0) {
					cache = {
						cat: catg
					};
					Lampa.Storage.set('ForkTv_cat', cache);
				}
				Lampa.Controller.toggle('settings');
				Lampa.Activity.back();
				ForkTV.parse();
			}
			Lampa.Select.show({
				items: item,
				title: get_cach ? Lampa.Lang.translate('title_fork_edit_cats') : Lampa.Lang.translate('title_fork_add_cats'),
				onBack: main,
				onSelect: function onSelect(a) {
					select(item, a);
					main();
				}
			});
		},
		but_add: function () {
			var ico = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>';
			var menu_item = $('<li class="menu__item selector" data-action="forktv"><div class="menu__ico">' + ico + '</div><div class="menu__text">ForkTV</div></li>');
			menu_item.on('hover:enter', this.parse);
			$('body').find('[data-action="forktv"]').remove();
			if (Lampa.Storage.get('mods_fork') && Lampa.Storage.get('forktv_auth')) $('.menu .menu__list').eq(0).append(menu_item);
		},
		updMac: function (itm) {
			clearInterval(ping_auth);
			ForkTV.forktv_id = ForkTV.create_dev_id();
			Lampa.Storage.set('forktv_id', ForkTV.forktv_id);
	
			ForkTV.act_forktv_id = ForkTV.create__id();
			Lampa.Storage.set('act_forktv_id', ForkTV.act_forktv_id);

			ForkTV.check_forktv(itm, false, true);
			Lampa.Noty.show('CODE ' + Lampa.Lang.translate('succes_update_noty'));
		},
		parse: function () {
			ForkTV.check(ForkTV.url, function (json) {
				json = json.channels;
				if (json.length === 1) ForkTV.checkAdd();
				else {
					ForkTV.but_add();
					if (Lampa.Storage.get('ForkTv_cat') !== '') {
						var get_cach = Lampa.Storage.get('ForkTv_cat');
						var itms = [];
						get_cach.cat.forEach(function (it) {
							if (it.checked) itms.push({
								title: it.title,
								playlist_url: it.url,
								logo_30x30: it.img,
								home: true
							});
						});
						if (itms.length > 0) {
							Lampa.Activity.push({
								title: 'ForkTV',
								url: {
									channels: itms
								},
								submenu: true,
								component: 'forktv',
								page: 1
							});
						} else ForkTV.cats_fork(json);
					} else ForkTV.cats_fork(json);
				}
			});
		},
		check_forktv: function (itm, ar, upd) {
			var status = $('.settings-param__status', itm).removeClass('active error wait').addClass('wait');
			this.network["native"](ForkTV.url + '?' + ForkTV.user_dev(), function (json) {
				if (json.channels.length === 1) {
					var title = json.channels[0].title;
			    	ForkTV.act_forktv_id = title;
					//console.log('modss',json)
			    	Lampa.Storage.set('act_forktv_id', ForkTV.act_forktv_id);
					if (ar) {
						Lampa.Storage.set('forktv_auth', false);
						status.removeClass('wait').addClass('error');
						$('.settings-param__descr', itm).text(Lampa.Lang.translate('filmix_nodevice'));
						$('body').find('[data-action="forktv"]').remove();
					} else {
					 	if (!upd && (title.indexOf('Много IP') >= 0 || title == 'Ошибка доступа')) {
							ForkTV.forktv_id = ForkTV.create_dev_id();
							Lampa.Storage.set('forktv_id', ForkTV.forktv_id);
						
							ForkTV.act_forktv_id = ForkTV.create__id();
							Lampa.Storage.set('act_forktv_id', ForkTV.act_forktv_id);
						}
						ForkTV.checkAdd();
						$('body').find('[data-action="forktv"]').remove();
						$('.settings [data-static="true"]:eq(1), .settings [data-static="true"]:eq(2)').hide();
						$('.settings [data-static="true"]:eq(0) .settings-param__status').removeClass('active').addClass('error');
						$('.settings [data-static="true"]:eq(0) .settings-param__descr').text(Lampa.Lang.translate('filmix_nodevice'));
					}
				} else {
					ForkTV.but_add();
					Lampa.Storage.set('forktv_auth', 'true');
					status.removeClass('wait').addClass('active');
					if (itm) {
						if (itm.text().indexOf('код') == -1 || itm.text().indexOf('code') == -1) $('.settings-param__descr', itm).html('<img width="30em" src="./img/logo-icon.svg"> <b style="vertical-align: middle;font-size:1.4em;color:#FF8C00">' + Lampa.Lang.translate('account_authorized') + '</b>');
						if (itm.find('.settings-param__name').text().indexOf('раздел') > -1 || itm.find('.settings-param__name').text().indexOf('Sections') > -1) ForkTV.cats_fork(json.channels);
					}
				}
			}, function (e) {
				if (ar) {
					Lampa.Storage.set('forktv_auth', 'false');
					status.removeClass('wait').addClass('error');
					$('.settings-param__descr', itm).text(Lampa.Lang.translate('filmix_nodevice'));
					$('body').find('[data-action="forktv"]').remove();
				} else {
					ForkTV.checkAdd();
					$('body').find('[data-action="forktv"]').remove();
					$('.settings [data-static="true"]:eq(0) .settings-param__status').removeClass('active').addClass('error');
					$('.settings [data-static="true"]:eq(0) .settings-param__descr').text(Lampa.Lang.translate('filmix_nodevice'));
					$('.settings [data-static="true"]:eq(1), .settings [data-static="true"]:eq(2)').hide();
				}
			}, false, {
				dataType: 'json'
			});
		},
		checkAdd: function () {
  			var enabled = Lampa.Controller.enabled().name;
			ForkTV.check(ForkTV.url, function (json) {
				var modal = '';
				var title = json.channels[0].title;
				if (title.indexOf('Много') >=0) {
					clearInterval(ping_auth);
					var dat = json.channels[0].description || '<img src="'+json.channels[0].logo_30x30+'">'
					modal = $('<div><div class="broadcast__text" style="text-align:left">' + dat + '</div></div></div>');
				} else {
					var match = json.channels[0].description.match(/> (\d+)</);
					var id = match ? match[1] : null;
					ForkTV.act_forktv_id = id;
					modal = $('<div><div class="broadcast__text" style="text-align:left">' + Lampa.Lang.translate('fork_auth_modal_title') + '</div><div class="broadcast__device selector" style="background-color:#fff;color:#000;text-align: center">' + ForkTV.act_forktv_id + '</div></div><br><div class="broadcast__scan"><div></div></div><br><div class="broadcast__text">' + Lampa.Lang.translate('fork_modal_wait') + '</div></div>');
				}
				Lampa.Modal.open({
					title: title,
					html: modal,
					size: 'small',
					mask: true,
					onBack: function onBack() {
						clearInterval(ping_auth);
						Lampa.Modal.close();
						Lampa.Controller.toggle(enabled);
					},
					onSelect: function onSelect() {
						ForkTV.copyCode(ForkTV.act_forktv_id);
					}
				});
				if (!Lampa.Platform.tv()) {
					setTimeout(function () {
						if (ForkTV.act_forktv_id) ForkTV.copyCode(ForkTV.act_forktv_id);
					}, 1000);
				}
				modal.find('a').on('click', function () {
					ForkTV.openBrowser('http://forktv.me');
				});
			});
			
			ping_auth = setInterval(function () {
				ForkTV.check(ForkTV.url, function (json) {
					Lampa.Modal.close();
					clearInterval(ping_auth);
					if (enabled == 'settings_component') Lampa.Activity.back();
					Lampa.Controller.toggle(enabled);
					Lampa.Storage.set('forktv_auth', 'true');
					ForkTV.parse();
				}, true);
			}, 5000);
		},
		check: function (url, call, ar) {
			this.network.clear();
			this.network.timeout(8000);
			this.network["native"](url + '?' + ForkTV.user_dev(), function (json) {
				if (json) {
				  	if (ar && json.channels.length > 1) {
						if (call) call(json);
					} else if (!ar) call(json);
					else if(json.channels[0].title.indexOf('Много IP') >= 0) {
					 	Lampa.Modal.title(json.channels[0].title);
						Lampa.Modal.update($('<div><div class="broadcast__text" style="text-align:left">' + json.channels[0].description + '</div></div></div>'));
						clearInterval(ping_auth);
					}
				}
			}, function (a, c) {
				Lampa.Noty.show(ForkTV.network.errorDecode(a, c));
			});
		}
	};
	var Pub = {
  	network: new Lampa.Reguest(),
  	baseurl: 'https://api.service-kp.com/',//api.apweb.vip/',api.srvkp.com
  	tock: 'uirmqgdg5s3w9sq05udmjlca897oxrgk',
  	token: Lampa.Storage.get('pub_access_token', 'uirmqgdg5s3w9sq05udmjlca897oxrgk'),
  	openBrowser: function (url) {
  		if (Lampa.Platform.is('tizen')) {
  			var e = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view", url);
  			tizen.application.launchAppControl(e, null, function (r) {}, function (e) {
  				Lampa.Noty.show(e);
  			});
  		} else if (Lampa.Platform.is('webos')) {
  			webOS.service.request("luna://com.webos.applicationManager", {
  				method: "launch",
  				parameters: {
  					id: "com.webos.app.browser",
  					params: {
  						target: url
  					}
  				},
  				onSuccess: function () {},
  				onFailure: function (e) {
  					Lampa.Noty.show(e);
  				}
  			});
  		} else window.open(url, '_blank');
  	},
  	Auth_pub: function () {
  		Pub.network.silent(Pub.baseurl + 'oauth2/device', function (json) {
  			Lampa.Storage.set('pub_user_code', json.user_code);
  			Lampa.Storage.set('pub_code', json.code);
  			Pub.checkAdd();
  		}, function (a, c) {
  			Lampa.Noty.show('Авторизация ' + Pub.network.errorDecode(a, c) + ' - KinoPub');
  		}, {
  			'grant_type': 'device_code',
  			'client_id': 'xbmc',
  			'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
  		});
  	},
  	checkAdd: function () {
  		var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('pub_modal_title') + '</div><br><div class="broadcast__scan"><div></div></div><div class="broadcast__device selector" style="background-color:#fff;color:#000;text-align: center"><div class="broadcast__text"><b style="font-size:1em">' + Lampa.Lang.translate('pub_title_wait') + '</b></div></div>');
  		Lampa.Modal.open({
  			title: '',
  			html: modal,
  			size: 'small',
  			mask: true,
  			onBack: function onBack() {
  				Lampa.Modal.close();
  				clearInterval(ping_auth);
  				Lampa.Controller.toggle('settings_component');
  			},
  			onSelect: function onSelect() {
  				if (!Lampa.Platform.tv()) {
  					Lampa.Utils.copyTextToClipboard(Lampa.Storage.get('pub_user_code'), function () {
  						Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
  					}, function () {
  						Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
  					});
  				} else Pub.openBrowser('http://kino.pub');
  			}
  		});
  		modal.find('a').on('click', function () {
  			Pub.openBrowser('http://kino.pub');
  		});
  		modal.find('.selector').text(Lampa.Storage.get('pub_user_code'));
  		var check = function check(url, call) {
  			Pub.network.clear();
  			Pub.network.timeout(8000);
  			Pub.network.silent(url, function (json) {
  				Lampa.Storage.set('pub_access_token', json.access_token);
  				Lampa.Storage.set('pub_refresh_token', json.refresh_token);
  				Pub.token = Lampa.Storage.get('pub_access_token');
				var ua = navigator.userAgent.match(/\(([^)]+)\)/i);
                var uas = ua ? ua[1].split(';') : [];
  				Pub.network.silent(Pub.baseurl + 'v1/device/info?access_token=' + json.access_token, function (json) {
  					Pub.network.silent(Pub.baseurl + 'v1/device/notify?access_token=' + Pub.token, function (json) {
  						if (call) call();
  					}, function (a, c) {
  						Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - KinoPub');
  					}, {
  						'title': Lampa.Platform.is('android') ? 'KinoPub Android-Lampa' : uas.length > 3 ? 'Kinopub TV-Lampa' : (uas[0] + ' ' + Lampa.Platform.get().toUpperCase()),
  						'hardware': Lampa.Platform.is('android') ? 'Android 10' : uas[2],
  						'software': Lampa.Platform.is('android') ? 'Android' : uas.length > 3 ? uas[1] : uas[0]
  					});
  				});
  			}, false, {
  				'grant_type': 'device_token',
  				'client_id': 'xbmc',
  				'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh',
  				'code': Lampa.Storage.get('pub_code')
  			});
  		};
  		ping_auth = setInterval(function () {
  			check(Pub.baseurl + 'oauth2/device', function () {
  				clearInterval(ping_auth);
  				Lampa.Modal.close();
  				Lampa.Storage.set('logined_pub', 'true');
  				Lampa.Settings.update();
  			});
  		}, 5000);
  	},
  	refreshTok: function () {
  		this.network.silent(Pub.baseurl + 'oauth2/token', function (json) {
  			Lampa.Storage.set('pub_access_token', json.access_token);
  			Lampa.Storage.set('pub_refresh_token', json.refresh_token);
  			Pub.token = Lampa.Storage.get('pub_access_token');
  			Lampa.Noty.show('ТОКЕН обновлён');
  		}, function (a, c) {
  			Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - KinoPub');
  		}, {
  			'grant_type': 'refresh_token',
  			'refresh_token': Lampa.Storage.get('pub_refresh_token'),
  			'client_id': 'xbmc',
  			'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
  		});
  	},
  	userInfo: function (itm, ur) {
  		var status = $('.settings-param__status', itm).removeClass('active error wait').addClass('wait');
  		if (!Pub.token) status.removeClass('wait').addClass('error');
  		else {
  			this.network.silent(Pub.baseurl + 'v1/user?access_token=' + Pub.token, function (json) {
				  $('.settings-param__' + (!ur ? 'name' : 'descr'), itm).html('<img width="30em" src="' + json.user.profile.avatar + '">  <span style="vertical-align: middle;"><b style="font-size:1.4em;color:#FF8C00">' + json.user.username + '</b> - ' + (json.user.username.indexOf('MODSS') == -1 ? (Lampa.Lang.translate('pub_title_left_days') + '<b>' + json.user.subscription.days + '</b> ' + Lampa.Lang.translate('pub_title_left_days_d')) : 'free') + '</span>');
  				if(json.user.username.indexOf('MODSS') == -1) {
  					$('.settings-param__' + (!ur ? 'descr' : ''), itm).html(Lampa.Lang.translate('pub_title_regdate') + ' ' + Lampa.Utils.parseTime(json.user.reg_date * 1000).full + '<br>' + (json.user.subscription.active ? Lampa.Lang.translate('pub_date_end_pro') + ' ' + Lampa.Utils.parseTime(json.user.subscription.end_time * 1000).full : '<b style="color:#cdd419">' + Lampa.Lang.translate('pub_title_not_pro') + '</b>'));
				}
				// else $('.settings-param__' + (!ur ? 'name' : 'descr'), itm).html(Lampa.Lang.translate('filmix_nodevice'))
				status.removeClass('wait').addClass('active');
  				Lampa.Storage.set('logined_pub', 'true');
  				Lampa.Storage.set('pro_pub', json.user.subscription.active);
  			}, function (a, c) {
				$('.settings-param__' + (!ur ? 'name' : 'descr'), itm).html(Lampa.Lang.translate('filmix_nodevice'));
  				status.removeClass('wait').addClass('error');
  				Lampa.Storage.set('pro_pub', 'false');
  				Lampa.Storage.set('pub_access_token', '');
  				Lampa.Storage.set('logined_pub', 'false');
  				Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
  				//Pub.userInfo(itm, ur);
  			});
  		}
  	},
  	info_device: function () {
  		this.network.silent(Pub.baseurl + 'v1/device/info?access_token=' + Pub.token, function (json) {
  			var enabled = Lampa.Controller.enabled().name;
  			var opt = json.device.settings;
  			var subtitle = {
  				supportSsl: {
  					title: 'Использовать SSL (https) для картинок и видео'
  				},
  				supportHevc: {
  					title: 'HEVC или H.265 — формат Видеосжатия с применением более эффективных алгоритмов по сравнению с H.264/AVC. Убедитесь, что ваше устройство поддерживает Данный формат.'
  				},
  				support4k: {
  					title: '4K или Ultra HD - фильм в сверхвысокой чёткости 2160p. Убедитесь, что ваше устройство и ТВ, поддерживает данный формат.'
  				},
  				mixedPlaylist: {
  					title: 'Плейлист с AVC и HEVC потоками. В зависимости от настроек, устройство будет автоматически проигрывать нужный поток. Доступно только для 4К - фильмов. Убедитесь, что ваше устройство поддерживает данный формат плейлиста.'
  				},
  				HTTP: {
  					title: 'Неадаптивный, качество через настройки (Настройки > плеер > качество видео), все аудио, нет сабов.'
  				},
  				HLS: {
  					title: 'Неадаптивный, качество через настройки, одна аудиодорожка, нет сабов.'
  				},
  				HLS2: {
  					title: 'Адаптивный, качество автоматом, одна аудиодорожка, нет сабов.'
  				},
  				HLS4: {
  					title: 'Рекомендуется! - Адаптивный, качество автоматом, все аудио, сабы.'
  				}
  			};
  			var item = [{
  				title: 'Тип потока',
  				value: opt.streamingType,
  				type: 'streamingType'
  			}, {
  				title: 'Переключить сервер',
  				value: opt.serverLocation,
  				type: 'serverLocation'
  			}];
  			Lampa.Arrays.getKeys(opt).forEach(function (key) {
  				var k = opt[key];
  				if (!k.type && ['supportHevc', 'support4k'].indexOf(key) > - 1) item.push({
  					title: k.label,
  					value: k.value,
  					type: key,
  					subtitle: subtitle[key] && subtitle[key].title,
  					checkbox: k.type ? false : true,
  					checked: k.value == 1 ? true : false
  				});
  			});
  
  			function main(type, value) {
  				var edited = {};
  				item.forEach(function (a) {
  					if (a.checkbox) edited[a.type] = a.checked ? 1 : 0;
  				});
  				if (type) edited[type] = value;
  				Pub.network.silent(Pub.baseurl + 'v1/device/' + json.device.id + '/settings?access_token=' + Pub.token, function (json) {
  					Lampa.Noty.show(Lampa.Lang.translate('pub_device_options_edited'));
  					Lampa.Controller.toggle(enabled);
  				}, function (a, c) {
  					Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - KinoPub');
  				}, edited);
  			}
  			Lampa.Select.show({
  				items: item,
  				title: Lampa.Lang.translate('pub_device_title_options'),
  				onBack: main,
  				onSelect: function (i) {
  					var serv = [];
  					i.value.value.forEach(function (i) {
  						serv.push({
  							title: i.label,
  							value: i.id,
  							subtitle: subtitle[i.label] && subtitle[i.label].title,
  							selected: i.selected
  						});
  					});
  					Lampa.Select.show({
  						items: serv,
  						title: i.title,
  						onBack: main,
  						onSelect: function (a) {
  							main(i.type, a.value);
  						}
  					});
  				}
  			});
  		}, function (a, c) {
  			Lampa.Noty.show(Pub.network.errorDecode(a, c));
  		});
  	},
  	delete_device: function (call) {
  		this.network.silent(Pub.baseurl + 'v1/device/unlink?access_token=' + Pub.token, function (json) {
  			Lampa.Noty.show(Lampa.Lang.translate('pub_device_dell_noty'));
  			Lampa.Storage.set('logined_pub', 'false');
  			Lampa.Storage.set('pub_access_token', '');
			Lampa.Storage.set('pro_pub', 'false');
  			Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
  			if (call) call();
  		}, function (a, c) {
  			Lampa.Noty.show(Lampa.Lang.translate('pub_device_dell_noty'));
  			Lampa.Storage.set('logined_pub', 'false');
  			Lampa.Storage.set('pub_access_token', '');
			Lampa.Storage.set('pro_pub', 'false');
  			Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
  			if (call) call();
  			Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - KinoPub');
  		}, {});
  	}
  };
  	
  function startsWith(str, searchString) {
    return str.lastIndexOf(searchString, 0) === 0;
  }

  function endsWith(str, searchString) {
    var start = str.length - searchString.length;
    if (start < 0) return false;
    return str.indexOf(searchString, start) === start;
  }

  function lumex(component, _object) {
    var network = new Lampa.Reguest();
    var extract = [];
    var object = _object;
    var select_title = '';
    var filter_items = {};
    var is_playlist = false;
  	var wait_similars;
    var fr = encodeURIComponent(btoa(window.location.href));
    var choice = {
      season: 0,
      voice: 0,
      order: 0
    };

    function lumex_search(api, callback, error) {
      var error_check = function error_check(a, c) {
        if (a.status == 404 || a.status == 500 || a.status == 0 && a.statusText !== 'timeout') {
          if (callback) callback('');
        } else if (error) error(network.errorDecode(a, c));
      };

      var success_check = function success_check(json) {
        callback(json);
      };

      network.clear();
      network.timeout(20000);
      network["native"](api, success_check, error_check);
    }

    this.searchs = function (_object) {
      object = _object;
      select_title = object.search || object.movie.title;
      var original_title = object.movie.original_title || object.movie.original_name;
      var search_date = object.search_date || object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
      var search_year = parseInt((search_date + '').slice(0, 4));
      var error = component.empty.bind(component);
      if (!+object.movie.kinopoisk_id && !+object.movie.kinopoisk_ID) return error();

      var api = API + 'lumex/sId/' + object.movie.id + '/mdss/' + (+object.movie.kinopoisk_id || +object.movie.kinopoisk_ID ? encodeURIComponent(object.movie.kinopoisk_id || object.movie.kinopoisk_ID) : 'null') + '/' + (object.movie.imdb_id ? encodeURIComponent(object.movie.imdb_id) : 'null') + '/aXBhdmxpbjk4QHlhbmRleC5ydQ==/' + fr;
      api = Lampa.Utils.addUrlComponent(api, 'ip=' + encodeURIComponent(IP));
      api = Lampa.Utils.addUrlComponent(api, 'search=' + encodeURIComponent(select_title));
      api = Lampa.Utils.addUrlComponent(api, 'original_title=' + encodeURIComponent(original_title));
      api = Lampa.Utils.addUrlComponent(api, 'year=' + search_year);
      lumex_search(api, function (json) {
        if (json && json.folder && Lampa.Arrays.getKeys(json.folder).length) success(json); else component.emptyForQuery(select_title);
      }, error);
    };

    this.extendChoice = function (saved) {
      Lampa.Arrays.extend(choice, saved, true);
    };
    this.reset = function () {
      component.reset();
      choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      filter();
      append(filtred());
      component.saveChoice(choice);
    };
    this.filter = function (type, a, b) {
      choice[a.stype] = b.index;
      if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
      component.reset();
      filter();
      append(filtred());
      component.saveChoice(choice);
    };
    this.destroy = function () {
      network.clear();
      extract = null;
    };
    function success(json) {
      component.loading(false);

      if (json && json.folder && Lampa.Arrays.getKeys(json.folder).length) {
        if (json.folder.forEach) {
          extract = json.folder;
          is_playlist = false;
        } else {
          extract = [];
          is_playlist = true;

          for (var voice in json.folder) {
            var seasons = json.folder[voice];

            if (!seasons.forEach) {
              var _loop = function _loop(season_id) {
                var episodes = seasons[season_id];

                if (episodes.forEach) {
                  var s = extract.filter(function (s) {
                    return s.season_id === season_id;
                  })[0];

                  if (!s) {
                    s = {
                      season_id: season_id,
                      title: Lampa.Lang.translate('torrent_serial_season') + ' ' + season_id,
                      voices: []
                    };
                    extract.push(s);
                  }

                  s.voices.push({
                    title: voice,
                    episodes: episodes
                  });
                }
              };

              for (var season_id in seasons) {
                _loop(season_id);
              }
            }
          }

          extract.sort(function (a, b) {
            return a.season_id - b.season_id;
          });
        }

        filter();
        append(filtred());
      } else component.emptyForQuery(select_title);
    }
    function filter() {
      filter_items = {
        season: is_playlist ? extract.map(function (s) {
          return s.title;
        }) : [],
        voice: [],
        order: []
      };
      if (!filter_items.season[choice.season]) choice.season = 0;

      if (is_playlist) {
        component.order.forEach(function (i) {
          filter_items.order.push(i.title);
        });
        var season = extract[choice.season];

        if (season && season.voices) {
          season.voices.forEach(function (voice) {
            filter_items.voice.push(voice.title);
          });
        }
      }

      if (!filter_items.voice[choice.voice]) choice.voice = 0;

      if (choice.voice_name) {
        var inx = filter_items.voice.indexOf(choice.voice_name);
        if (inx == -1) choice.voice = 0; else if (inx !== choice.voice) {
          choice.voice = inx;
        }
      }

      component.filter(filter_items, choice);
    }
    function filtred() {
      var filtred = [];

      if (is_playlist) {
        var season = extract[choice.season];

        if (season && season.voices) {
          var voice_title = filter_items.voice[choice.voice];
          season.voices.forEach(function (voice) {
            if (voice.title == voice_title && voice.episodes) {
              voice.episodes.forEach(function (episode) {
                filtred.push({
                  title: episode.title,
                  quality: episode.quality,
                  info: voice_title,
                  season: episode.season + '',
                  episode: episode.episode,
                  url: episode.url,
                  stream: episode.stream,
                  subtitles: episode.subtitles,
                  vast_url: episode.vast_url,
                  vast_msg: episode.vast_msg
                });
              });
            }
          });
        }
      } else {
        extract.forEach(function (voice) {
          if (voice.url) {
            filtred.push({
              title: voice.title || select_title,
              quality: voice.quality,
              info: '',
              url: voice.url,
              stream: voice.stream,
              subtitles: voice.subtitles,
              vast_url: voice.vast_url,
              vast_msg: voice.vast_msg
            });
          }
        });
      }

      return filtred;
    }
    function getStream(element, call, error) {
      if (Lampa.Storage.field('player') !== 'inner' && Lampa.Platform.is('apple') && element.stream) {
        element.url = element.stream.replace('?play=true', '/' + encodeURIComponent(IP) + '/' + fr + '?play=true');
        return call(element);
      }

      if (!element.stream) return call(element);
      if (element.stream) lumex_search(element.url + '/' + encodeURIComponent(IP) + '/' + fr, function (json) {
        if (json && json.url) {
          var url = json && json.url ? json.url : '';
          element.url = url;
          delete element.stream;
          element.qualitys = json.qualitys;
          call(element);
        } else error(json);
      }, error);
    }

    function append(items) {
      component.reset();
      component.draw(items, {
        similars: wait_similars,
        onEnter: function onEnter(item, html) {
          getStream(item, function (stream) {
            var first = {
              url: stream.url || stream.stream,
              timeline: item.timeline,
              quality: item.qualitys,
              subtitles: item.subtitles,
              title: item.title,
              vast_url: VAST_url || item.vast_url,
              vast_msg: item.vast_msg,
              error: function (play_item, callback) {
                Lampa.Player.timecodeRecording(false)
                callback(API.replace('api.', '') + 'not_video.mp4');
              },
            };
            Lampa.Player.play(first);

            if (item.season) {
              var playlist = [];
              items.forEach(function (elem) {
                var cell = {
                  url: function url(call) {
                    getStream(elem, function (stream) {
                      cell.url = stream.url || stream.stream;
                      cell.quality = elem.qualitys;
                      cell.subtitles = elem.subtitles;
                      elem.mark();
                      call();
                    }, function () {
                      cell.url = '';
                      call();
                    });
                  },
                  timeline: elem.timeline,
                  title: elem.title,
                  vast_url: VAST_url || elem.vast_url,
                  vast_msg: elem.vast_msg,
                  error: function (play_item, callback) {
                    Lampa.Player.timecodeRecording(false)
                    callback(API.replace('api.', '') + 'not_video.mp4');
                  }
                };
                if (elem == item) cell.url = stream.url;
                playlist.push(cell);
              });
              Lampa.Player.playlist(playlist);
            } else {
              Lampa.Player.playlist([first]);
            }
            item.mark();
          }, function (stream) {
            Lampa.Noty.show(Lampa.Lang.translate('modss_nolink') + '<br>' + JSON.stringify(stream));
          });
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          getStream(item, function (stream) {
            call({
              file: stream,
              quality: item.qualitys
            }, function () {
              Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
            });
          });
        }
      });
    }
  }

  function videx(component, _object) {
    var network = new Lampa.Reguest();
    var extract = [];
    var object = _object;
    var select_title = '';
    var filter_items = {};
    var is_playlist = false;
    var fr = encodeURIComponent(btoa(window.location.href));
    var choice = {
  		season: 0,
  		voice: 0, 
  		order: 0
  	};

    function videx_search(api, callback, error) {
      var error_check = function error_check(a, c) {
        if (a.status == 404 || a.status == 500 || a.status == 0 && a.statusText !== 'timeout') {
          if (callback) callback('');
        } else if (error) error(network.errorDecode(a, c));
      };

      var success_check = function success_check(json) {
        callback(json);
      };

      network.clear();
      network.timeout(20000);
      network["native"](api, success_check, error_check);
    }

    this.searchs = function (_object) {
      object = _object;
      select_title = object.search || object.movie.title;
      var error = component.empty.bind(component);
      if (!+object.movie.kinopoisk_id && !+object.movie.kinopoisk_ID) return error();
      var src = API + 'videx/sId/mds/' + (+object.movie.kinopoisk_id || +object.movie.kinopoisk_ID ? encodeURIComponent(+object.movie.kinopoisk_id || +object.movie.kinopoisk_ID) : 'null') + '/' + (object.movie.imdb_id ? encodeURIComponent(object.movie.imdb_id) : 'null') + '/aXBhdmxpbjk4QHlhbmRleC5ydQ==/' + fr + '?ip=' + IP + '&search=' + encodeURIComponent(select_title);
      videx_search(src, function (json) {
        if (json && json.folder && Lampa.Arrays.getKeys(json.folder).length) success(json);else component.emptyForQuery(select_title);
      }, error);
    };

    this.extendChoice = function (saved) {
      Lampa.Arrays.extend(choice, saved, true);
    };
    this.reset = function () {
      component.reset();
      choice = {
        season: 0,
        voice: 0,
        voice_name: '',
        voice_id: 0
      };
      filter();
      append(filtred());
      component.saveChoice(choice);
    };
    this.filter = function (type, a, b) {
      choice[a.stype] = b.index;
      if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
      component.reset();
      filter();
      append(filtred());
      component.saveChoice(choice);
    };
  	this.destroy = function () {
  		network.clear();
  		extract = null;
  	};
    function success(json) {
        component.loading(false);

        if (json && json.folder && Lampa.Arrays.getKeys(json.folder).length) {
          if (json.folder.forEach) {
            extract = json.folder;
            is_playlist = false;
          } else {
            extract = [];
            is_playlist = true;

            for (var voice in json.folder) {
              var seasons = json.folder[voice];

              if (!seasons.forEach) {
                var _loop = function _loop(season_id) {
                  var episodes = seasons[season_id];

                  if (episodes.forEach) {
                    var s = extract.filter(function (s) {
                      return s.season_id === season_id;
                    })[0];

                    if (!s) {
                      s = {
                        season_id: season_id,
                        title: Lampa.Lang.translate('torrent_serial_season') + ' ' + season_id,
                        voices: []
                      };
                      extract.push(s);
                    }

                    s.voices.push({
                      title: voice,
                      episodes: episodes
                    });
                  }
                };

                for (var season_id in seasons) {
                  _loop(season_id);
                }
              }
            }

            extract.sort(function (a, b) {
              return a.season_id - b.season_id;
            });
          }

          filter();
          append(filtred());
        } else component.emptyForQuery(select_title);
      }
    function filter() {
        filter_items = {
          season: is_playlist ? extract.map(function (s) {
            return s.title;
          }) : [],
          voice: [],
          order: []
        };
        if (!filter_items.season[choice.season]) choice.season = 0;

        if (is_playlist) {
          component.order.forEach(function (i){
  				filter_items.order.push(i.title);
  			});
          var season = extract[choice.season];

          if (season && season.voices) {
            season.voices.forEach(function (voice) {
              filter_items.voice.push(voice.title);
            });
          }
        }

        if (!filter_items.voice[choice.voice]) choice.voice = 0;

        if (choice.voice_name) {
          var inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }

        component.filter(filter_items, choice);
      }
    function filtred() {
        var filtred = [];

        if (is_playlist) {
          var season = extract[choice.season];

          if (season && season.voices) {
            var voice_title = filter_items.voice[choice.voice];
            season.voices.forEach(function (voice) {
              if (voice.title == voice_title && voice.episodes) {
                voice.episodes.forEach(function (episode) {
                  filtred.push({
                    title: episode.title,
                    quality: episode.quality,
                    info: voice_title,
                    season: episode.season + '',
                    episode: episode.episode,
                    url: episode.url,
                    qualitys: episode.qualitys,
                    subtitles: episode.subtitles,
                    vast_url: episode.vast_url,
                    vast_msg: episode.vast_msg
                  });
                });
              }
            });
          }
        } else {
          extract.forEach(function (voice) {
            if (voice.url) {
              filtred.push({
                title: voice.title || select_title,
                quality: voice.quality,
                info: '',
                url: voice.url,
                qualitys: voice.qualitys,
                subtitles: voice.subtitles,
                vast_url: voice.vast_url,
                vast_msg: voice.vast_msg
              });
            }
          });
        }

        return filtred;
      }
    function append(items) {
      component.reset();
      component.draw(items, {
        onEnter: function onEnter(item, html) {
          if (item.url) {
            var playlist = [];
            var first = {
              url: item.url,
              timeline: item.timeline,
              title: item.title,
              subtitles: item.subtitles, 
              translate: {
                tracks: item.audio_tracks
              },
              vast_url: item.vast_url,
              vast_msg: item.vast_msg,
              error: function (play_item, callback) {
                 Lampa.Player.timecodeRecording(false)
                 callback(API.replace('api.', '') + 'not_video.mp4');
              }
            };
  
            if (item.season) {
              items.forEach(function (elem) {
                playlist.push({
                  title: elem.title,
                  url: elem.url,
                  timeline: elem.timeline,
                  subtitles: elem.subtitles,
                  translate: {
                    tracks: elem.audio_tracks
                  },
                  callback: function callback() {
                    elem.mark();
                  },
                  vast_url: item.vast_url,
                  vast_msg: item.vast_msg,
                  error: function (play_item, callback) {
                    Lampa.Player.timecodeRecording(false)
                    callback(API.replace('api.', '') + 'not_video.mp4');
                  }
                });
              });
            } else {
              playlist.push(first);
            }
  
            if (playlist.length > 1) first.playlist = playlist;
            Lampa.Player.play(first);
            Lampa.Player.playlist(playlist);
            item.mark();
          } else Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          call({
            file: item.url,
            quality: item.qualitys
          });
        }
      });
    }
  }

  function filmix(component, _object) {
  	var network = new Lampa.Reguest();
  	var results = [];
  	var object = _object;
  	var embed = Filmix.api_url;
    var prox = Modss.proxy('filmix');
  	var select_title = '';
  	var filter_items = {};
  	var wait_similars;
  	var id_filmix;
  	var count = 0;
  	var choice = {
  		season: 0,
  		voice: 0,
  		order: 0,
  		voice_name: ''
  	};
    var headers = Lampa.Platform.is('android') ? {
      'User-Agent': 'okhttp/3.10.0'
    } : {};
    
    var useProxy = window.location.protocol === 'https:';

  	var dev_token = Filmix.user_dev + Filmix.token;
  	if (!window.FX) {
  		window.FX = {
  			max_qualitie: 720,
  			is_max_qualitie: false, 
  			auth: false
  		};
  	}
  	this.search = function (_object, sim) {
      if (wait_similars) this.find(sim[0].id);
    };
  	this.searchByTitle = function (_object, query) {
  		var _this = this;
  		object = _object;
  		select_title = query || object.search;
  		if (object.movie.source == 'filmix') return this.find(object.movie.id);
  		var search_date = object.search_date || (object.movie.number_of_seasons ? object.movie.first_air_date : object.movie.release_date) || '0000';
  		var search_year = parseInt((search_date + '').slice(0, 4));
  		var orig = object.movie.original_title || object.movie.original_name;
  		var clean_title = component.cleanTitle(select_title).replace(/\b(\d\d\d\d+)\b/g, '+$1');
  		if (search_year) clean_title = clean_title.replace(new RegExp(' +(' + search_year + ')'), ' $1');
  		var url = embed + 'search';
  		url = Lampa.Utils.addUrlComponent(url, 'story=' + encodeURIComponent(clean_title));
  		url = Lampa.Utils.addUrlComponent(url, dev_token);
  		network.clear();
  		network.timeout(15 * 1000);
  		var requestUrl = useProxy ? prox + url : url;
  		network.silent(requestUrl, function (json) {
  			var is_sure = false;
  			if (count == 0 && json.length == 0) _this.searchByTitle(object, object.search_two)&count++;
  			else if (count == 1 && json.length == 0) component.doesNotAnswer(select_title);
  			else {
  		    var cards = json.filter(function (c) {
            if (!c.year && c.alt_name) c.year = parseInt(c.alt_name.split('-').pop());
            return !c.year || !search_year || c.year > search_year - 2 && c.year < search_year + 2;
          });
          
          if (orig) {
            var tmp = cards.filter(function (c) {
              return component.equalTitle(c.original_title, orig);
            });
            if (tmp.length) {
              cards = tmp;
              is_sure = true;
            }
          }
  
          if (select_title) {
            var _tmp = cards.filter(function (c) {
              return component.equalTitle(c.title, select_title);
            });
            if (_tmp.length) {
              cards = _tmp;
              is_sure = true;
            }
          }
  
          if (cards.length > 1 && search_year) {
            var _tmp2 = cards.filter(function (c) {
              return c.year == search_year;
            });
            if (_tmp2.length) cards = _tmp2;
          }
  
          /*    
          if (cards.length > 1) {
            var tmp = cards.filter(function (c) {
              return c.year == search_year;
            });
            if (tmp.length) cards = tmp;
          }
  
          if (cards.length > 1) {
            var _tmp = cards.filter(function (c) {
              return c.original_title == orig;
            });
  
            if (_tmp.length) cards = _tmp;
          }
  
          if (cards.length > 1) {
            var _tmp2 = cards.filter(function (c) {
              return c.title == select_title;
            });
  
            if (_tmp2.length) cards = _tmp2;
          }
    				*/
  				if (cards.length == 1 && is_sure) return _this.find(cards[0].id);
  				else if (json.length) {
  					wait_similars = true;
  					json.forEach(function (c) {
  					  c.type = c.last_episode?'serial':'film';
  					  c.seasons_count = c.last_episode.season;
  					  c.episodes_count = c.last_episode.episode;
  					  c.translations = c.last_episode.translation;
  					});
  					component.similars(json);
  					component.loading(false);
  				} else component.doesNotAnswer(select_title);
  			}
  		}, function (a, c) {
  			component.doesNotAnswer();
  		});
  	};
  	this.find = function (filmix_id) {
      if (!window.FX.is_max_qualitie && !window.FX.auth) {
        Filmix.checkPro(Filmix.token, function (found) {
          window.FX.auth = false;
          window.FX.is_max_qualitie = false;
          window.FX.max_qualitie = 480;
          
					if (found && found.user_data) {
					  window.FX.auth = true;
				    window.FX.date = found.user_data.pro_date;
						window.FX.max_qualitie = 720;
				    if (found.user_data.is_pro || found.user_data.is_pro_plus) window.FX.is_max_qualitie = true;
						if (found.user_data.is_pro) window.FX.max_qualitie = 1080;
						if (found.user_data.is_pro_plus) window.FX.max_qualitie = 2160;
					}
					end_search(filmix_id);
				}, function () {
				  window.FX.auth = false;
				  window.FX.max_qualitie = 480;
				  end_search(filmix_id);
				});
			} else end_search(filmix_id);
      

		  function end_search(filmix_id) {
				id_filmix = filmix_id;
  			network.clear();
  			network.timeout(20 * 1000);
  			
  			var makeRequest = function(url) {
  			  network["native"](url, function (found) {
  			    if(found) {
              found = {
                playlist: found.player_links.playlist,
                movie: found.player_links.movie,
                max: found.quality,
                quality: found.rip && found.rip.split(' ')[0] || found.rip
              };
              if (found && Lampa.Arrays.getKeys(found).length && (found.movie.length || Lampa.Arrays.getKeys(found.playlist).length)) {
      				    success(found);
      				    component.loading(false);
      			    } else {
      			      // Если первый запрос не дал результатов и мы не использовали прокси, пробуем через прокси
      			      if (!useProxy && url.indexOf(prox) === -1) {
      			        makeRequest(prox + embed + 'post/' + filmix_id + '?' + dev_token);
      			      } else {
      			        component.doesNotAnswer(select_title);
      			      }
      			    }
  			    } else {
  			      // Если первый запрос не дал результатов и мы не использовали прокси, пробуем через прокси
  			      if (!useProxy && url.indexOf(prox) === -1) {
  			        makeRequest(prox + embed + 'post/' + filmix_id + '?' + dev_token);
  			      } else {
  			        component.doesNotAnswer(select_title);
  			      }
  			    }
  			  }, function (a, c) {
  			    // Если первый запрос не дал результатов и мы не использовали прокси, пробуем через прокси
  			    if (!useProxy && url.indexOf(prox) === -1) {
  			      makeRequest(prox + embed + 'post/' + filmix_id + '?' + dev_token);
  			    } else {
  			      component.doesNotAnswer();
  			    }
  			  }, false, {
            headers: headers
          });
  			};
  			
  			var requestUrl = useProxy ? prox + embed + 'post/' + filmix_id + '?' + dev_token : embed + 'post/' + filmix_id + '?' + dev_token;
  			makeRequest(requestUrl);
  		}
		};
		this.extendChoice = function (saved) {
  		Lampa.Arrays.extend(choice, saved, true);
  	};
  	this.reset = function () {
  		component.reset();
  		choice = {
  			season: 0,
  			voice: 0,
  			order: 0,
  			voice_name: ''
  		};
  		filter();
  		append(filtred());
  	};
  	this.filter = function (type, a, b) {
  		choice[a.stype] = b.index;
  		if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
  		component.reset();
  		filter();
  		append(filtred());
  	};
  	this.destroy = function () {
  		network.clear();
  		results = null;
  	};
  	function success(json) {
  		results = json;
  		filter();
  		append(filtred());
  	}
  	function filter() {
  		filter_items = {
  			season: [],
  			season_id: [],
  			voice: [],
  			order: [],
  			voice_info: []
  		};
      if (results.playlist && Object.keys(results.playlist).length > 0) {
        component.order.forEach(function (i){
  				filter_items.order.push(i.title);
  			});
  			
  			for (var seasons in results.playlist){
          filter_items.season_id.push(seasons);
          filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + seasons);
        } 
  		  Lampa.Arrays.getKeys(results.playlist[filter_items.season[choice.season].split(' ')[1]]).forEach(function (v){
  		    filter_items.voice.push(v);
  		  });
  			
        if (!filter_items.voice[choice.voice]) choice.voice = 0;
  			choice.seasons = filter_items.season.length;
  		}
  		component.filter(filter_items, choice);
  	}
  	function getQuality(link){
		  var qualities = link.match(/\[([\d,]*)\]\.mp4/i);
		  if (qualities) qualities = qualities[1].split(",").filter(function (elem) {
				return parseInt(elem) <= window.FX.max_qualitie && parseInt(elem) !== 0;
			}).sort(function (a, b) {
        return b - a;
      });
			var qualitie = qualities.length > 0 && Math.max.apply(null, qualities) || false;
			return {
			  max: qualitie,
			  quals: qualities
			};
		}
		function filtred() {
  		var filtred = [];
  		if (results.playlist && Object.keys(results.playlist).length > 0) {
  		for (var seasons in results.playlist){
  		  if(seasons == filter_items.season_id[choice.season]){
    		  var season = results.playlist[seasons][filter_items.voice[choice.voice]];
    		 	for (var episode in season) {
      		  var eps = season[episode]; 
      		  var quality = season[episode].qualities.filter(function (elem) {
      				return parseInt(elem) <= window.FX.max_qualitie && parseInt(elem) !== 0;
      			}).sort(function(a, b) {
    		      return b - a;
    		    });  
    		    filtred.push({
  						episode: parseInt(episode),
  						season: parseInt(seasons),
  						link: season[episode].link,
  						title: Lampa.Lang.translate('torrent_serial_episode') + ' ' +  episode,
  						qualityes: quality, 
  						quality: results.quality + ' - ' + quality[0] + 'p ',
  						info: filter_items.voice[choice.voice], 
  						voice_name: filter_items.voice[choice.voice]
  					});
    		  }
  		  } 
  		}
  		} else if (results.movie && results.movie.length > 0) {
  			for (var keyt in results.movie) {
  				var movie = results.movie[keyt];
  				var q = getQuality(movie.link);
  				if(q.max) filtred.push({
  					title: movie.translation,
  					link: movie.link,
  					qualityes: q.quals, 
  					quality: results.quality + ' - ' + q.max + 'p ',
  					voice_name: movie.translation, 
  					info: ''
  				});
  			}
  		}
  		return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
  	}
  	function getFile(element) {
      var quality = {};
      var files;
      if (element.qualityes) {
        var qualities = element.qualityes//JSON.parse(element.qualityes);
        if (qualities) {
          qualities.forEach(function (q) {
            var files = object.movie.number_of_seasons || element.season ? element.link.replace(/%s(\.mp4)/i, q + "$1"): element.link.replace(/\[[\d,]*\](\.mp4)/i, q + "$1");
            quality[q + 'p'] = files;
          });
          files = Lampa.Arrays.getValues(quality)[0];
        }
      } 
      return {
        file: files,
        quality: quality
      };
    }
    function toPlayElement(element) {
      var ex = getFile(element);
      var play = {
        title: element.title,
        url: ex.file,
        quality: ex.quality,
        timeline: element.timeline,
        callback: element.mark,
        vast_url: VAST_url,
        error: function (play_item, callback) {
            Lampa.Player.timecodeRecording(false)
            callback(API.replace('api.', '') + 'not_video.mp4');
         }
      };
      return play;
    }
    function append(items) {
      component.reset();
      component.draw(items, {
        onEnter: function onEnter(item, html) {
          var ex = getFile(item);
          if (ex.file) {
            var playlist = [];
            var first = toPlayElement(item);

            if (item.season) {
              items.forEach(function (elem) {
                playlist.push(toPlayElement(elem));
              });
            } else {
              playlist.push(first);
            }

            if (playlist.length > 1) first.playlist = playlist;
            Lampa.Player.play(first);
            Lampa.Player.playlist(playlist);
            item.mark();
          } else Lampa.Noty.show(Lampa.Lang.translate(get_links_wait ? 'modss_waitlink' : 'online_nolink'));
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          call(getFile(item));
        }
      });
    }
  }
 
  function kinopub(component, _object) {
  	var network = new Lampa.Reguest();
  	var extract = {};
  	var results = [];
  	var object = _object;
  	var filter_items = {};
  	var embed = Pub.baseurl + 'v1/items';
  	var streamingType;
  	var supportHevc;
  	var wait_similars;
  	var choice = {
  		season: 0,
  		voice: 0,
  		order: 0,
  		type: 0
  	};
  	this.search = function (_object, sim) {
  		if (wait_similars && sim) return this.find(sim[0].id);
  	};
  	this.searchByTitle = function (_object, query) {
  		object = _object;
  		var _this = this;
  		var title = object.search.trim();
  		var relise = object.search_date || (object.movie.number_of_seasons ? object.movie.first_air_date : object.movie.release_date) || '0000';
  		var year = parseInt((relise + '').slice(0, 4));
  		var orig = object.movie.original_title || object.movie.original_name;
  		var imdb = object.movie.imdb_id && parseInt(object.movie.imdb_id.slice(2));
  		var kpID = object.movie.kinopoisk_id || object.movie.kinopoisk_ID;
  		var url = embed + '/search';
  		url = Lampa.Utils.addUrlComponent(url, 'q=' + encodeURIComponent(title));
  		url = Lampa.Utils.addUrlComponent(url, 'access_token=' + Pub.token);
  		network.clear();
  		network.timeout(10000);
  		network.silent(url, function (json) {
  			json = json.items;
  			if (json.length == 0) component.doesNotAnswer(title);
  			else {
  				var cards = json.filter(function (c) {
  					return c.imdb == imdb || c.kinopoisk == kpID;
  				});
  				if (!cards.length) {
  					cards = json.filter(function (c) {
  						return c.year > year - 2 && c.year < year + 2;
  					});
  					var tmp = cards.filter(function (c) {
  						return c.year == year;
  					});
  					if (tmp.length) cards = tmp;
  					else return component.doesNotAnswer(title);
  				}
  				if (cards.length) {
  					var _tmp = cards.filter(function (c) {
  						c.title_ru = c.title.split(' / ')[0];
  						return component.equalTitle(c.title_ru.replace(/\s/, ' '), title.replace(/\s/, ' '));
  					});
  					if (_tmp.length) cards = _tmp;
  					var _tmp2 = cards.filter(function (c) {
  						c.title_org = c.title.split(' / ')[1];
  						if (!c.title_org) return;
  						return component.equalTitle(c.title_org.replace(/\s/, ' '), orig.replace(/\s/, ' '));
  					});
  					if (_tmp2.length) cards = _tmp2;
  				}
  				if (cards.length == 1) return _this.find(cards[0].id);
  				else if (json.length > 1) {
  				  wait_similars = true;
  					component.similars(json);
  					component.loading(false);
  				} else component.doesNotAnswer(title);
  			}
  		}, function (a, c) {
  			component.doesNotAnswer(a.responseJSON || '');
  		});
  	};
  	this.find = function (id) {
  		network.clear();
  		network.timeout(10000);
  		var url = embed + '/' + id;
  		url = Lampa.Utils.addUrlComponent(url, 'access_token=' + Pub.token);
  		network.silent(url, function (json) {
  			if (Lampa.Arrays.getKeys(json.item).length) {
  				network.silent(embed.slice(0, -6) + '/device/info?access_token=' + Pub.token, function (param) {
  					streamingType = param.device.settings.streamingType.value.find(function (t) {
  						return t.selected == 1;
  					});
  					supportHevc = param.device.settings.supportHevc.value == 1;
  					choice.type = streamingType.id - 1;
  					success(json.item);
  					component.loading(false);
  				}, function (a, c) {
  					component.doesNotAnswer();
  				});
  			} else component.doesNotAnswer(object.search);
  		}, function (a, c) {
  			component.doesNotAnswer();
  		});
  	};
  	this.extendChoice = function (saved) {
  		Lampa.Arrays.extend(choice, saved, true);
  	};
  	this.reset = function () {
  		component.reset();
  		choice = {
  			season: 0,
  			voice: 0,
  			order: 0, 
  			type: 0
  		};
  		append(filtred());
  		component.saveChoice(choice);
  	};
  	this.filter = function (type, a, b) {
  		choice[a.stype] = b.index;
  		component.reset();
  		filter();
  		append(filtred());
  		component.saveChoice(choice);
  	};
  	this.destroy = function () {
  		network.clear();
  		results = null;
  	};
  	function success(json) {
  		results = json;
  		filter();
  		append(filtred());
  	}
  	function filter() {
  		filter_items = {
  			season: [],
  			voice: [],
  			type: [], 
  			order: []
  		};
  	  ['HTTP', 'HLS', 'HLS2', 'HLS4'].forEach(function (t) {
  			filter_items.type.push(t);
  		});
  		if (results.seasons) {
  		  component.order.forEach(function (i){
  				filter_items.order.push(i.title);
  			});
  			results.seasons.forEach(function (season) {
  				filter_items.season.push(parseInt(season.number) + ' ' + Lampa.Lang.translate('torrent_serial_season'));
  			});
  			choice.seasons = filter_items.season.length;
  		}
  		if(!filter_items.type[choice.type]) choice.type = 2;
  		component.filter(filter_items, choice);
  	}
  	function filtred() {
  		var filtred = [];
  		var type = filter_items.type[choice.type];
  		var CODEC = supportHevc ? 'HEVC' : 'AVC';
  		if (results.seasons) {
  			results.seasons.forEach(function (season) {
  				if (season.number == parseInt(filter_items.season[choice.season])) {
  					season.episodes.forEach(function (ep) {
  						if(ep.files[0]) filtred.push({
  							title: ep.title || Lampa.Lang.translate('full_episode')+' '+ep.number,
  							season: ep.snumber,
  							episode: ep.number,
  							quality: ep.files[0].quality + ' (' + CODEC + ')',
  							file: ep.files,
  							codec: CODEC,
  							voice: parseTrackss(ep.audios).join('<br>'), 
  							tracks: parseTracks(ep.audios || ''),
  							subtitles: parseSubs(ep.subtitles || ''),
  							info: type
  						});
  					});
  				}
  			});
  		} else {
  			results.videos.forEach(function (movie) {
  				filtred.push({
  					title: object.movie.title,
  					quality: movie.files[0].quality + ' (' + CODEC + ')',
  					file: movie.files,
  					codec: CODEC,
  					voice: parseTrackss(movie.audios).join('<br>'), 
  					tracks: parseTracks(movie.audios || ''),
  					subtitles: parseSubs(movie.subtitles || ''),
  					info: type
  				});
  			});
  		}
  		return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
  	}
  	function parseSubs(vod) {
  		var subtitles = vod.map(function (item) {
  			return {
  				label: item.lang.toUpperCase() + (item.forced && ' - [FORCED]' || ''),
  				url: item.url
  			};
  		});
  		return subtitles.length ? subtitles : false;
  	}
  	function parseTracks(vod) {
  		var tracks = vod.map(function (track) {
  			return {
  				language: track.lang.toUpperCase(),
  				label: track.codec.toUpperCase() + (track.channels && (' - ' + (track.channels == 6 ? '5.1' : track.channels)) || '') + (track.type && ' - ' + track.type.title || '') + (track.author && ' - ' + track.author.title || '')
  			};
  		});
  		return tracks.length ? tracks : false;
  	}
  	function parseTrackss(vod) {
  		var tracks = vod.map(function (track, i) {
  			return (i+1)+ (track.type && '. ' + track.type.title || '') + (track.author && ' - ' + track.author.title || '') + (track.lang && '(' + track.lang+')' || '');
  		});
  		return tracks.length ? tracks : false;
  	}
  	function getFile(element) {
  		var file = '';
  		var quality = {};
  		var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
  		/*
  		var codec = element.file.filter(function (q) {
  			return q.codec == filter_items.codec[choice.codec].toLowerCase();
  		});
  		if (codec.length == 0) codec = element.file;
  		*/
  		element.file.forEach(function (item) {
  			quality[item.quality] = item.url[filter_items.type[choice.type].toLowerCase()];
  		});
  		var max_quality = Lampa.Arrays.getKeys(quality)[0];
  		file = quality[max_quality];
  		if (quality[preferably]) file = quality[preferably];
  		return {
  			stream: file,
  			quality: ['HLS2', 'HLS4'].indexOf(filter_items.type[choice.type]) > - 1 ? '' : quality
  		};
  	}
    function toPlayElement(element) {
      var ex = getFile(element);
      var play = {
        url: ex.stream,
        timeline: element.timeline,
        title: element.title,
        subtitles: element.subtitles,
        translate: {
  				tracks: element.tracks
  			},
        quality: ex.quality,
        callback: element.mark
      };
      return play;
    }
    function append(items) {
      component.reset();
      component.draw(items, {
        similars: wait_similars,
        onEnter: function onEnter(item, html) {
          var ex = getFile(item);
  
          if (ex.stream) {
            var playlist = [];
            var first = toPlayElement(item);
  
            if (item.season) {
              items.forEach(function (elem) {
                playlist.push(toPlayElement(elem));
              });
            } else {
              playlist.push(first);
            }
  
            if (playlist.length > 1) first.playlist = playlist;
            Lampa.Player.play(first);
            Lampa.Player.playlist(playlist);
            item.mark();
          } else Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          call(getFile(item));
        }
      });
    }
  }


  function veoveo(component, _object) {
    var network = new Lampa.Reguest();
    var extract = {};
    var object = _object;
    var select_title = '';
    var filter_items = {};
    var fr = encodeURIComponent(btoa(window.location.href));
    var choice = {
  		season: 0,
  		voice: 0, 
  		order: 0
  	};

    function veo_search(api, callback, error) {
      var error_check = function error_check(a, c) {
        if (a.status == 404 || a.status == 500 || a.status == 0 && a.statusText !== 'timeout') {
          if (callback) callback('');
        } else if (error) error(network.errorDecode(a, c));
      };

      var success_check = function success_check(json) {
        callback(json);
      };

      network.clear();
      network.timeout(20000);
      network["native"](api, success_check, error_check);
    }

    this.searchs = function (_object, kinopoisk_id) {
      object = _object;
      select_title = object.search || object.movie.title;
      var error = component.empty.bind(component);
      if (!+object.movie.kinopoisk_id && !+object.movie.kinopoisk_ID) return error();
      var src = API + 'veoveo/sId/mds/' + (+object.movie.kinopoisk_id || +object.movie.kinopoisk_ID ? encodeURIComponent(+object.movie.kinopoisk_id || +object.movie.kinopoisk_ID) : 'null') + '/aXBhdmxpbjk4QHlhbmRleC5ydQ==/' + fr + '?ip=' + IP + '&search=' + encodeURIComponent(select_title);
      veo_search(src, function (json) {
        if (json && json.folder && Lampa.Arrays.getKeys(json.folder).length) success(json);else component.emptyForQuery(select_title);
      }, error);
    };

    this.extendChoice = function (saved) {
      Lampa.Arrays.extend(choice, saved, true);
    };
    this.reset = function () {
      component.reset();
      choice = {
        season: 0,
        voice: 0,
        voice_name: '',
        voice_id: 0
      };
      filter();
      append(filtred());
      component.saveChoice(choice);
    };
    this.filter = function (type, a, b) {
  		choice[a.stype] = b.index;
  		component.reset();
  		filter();
  		append(filtred());
  		component.saveChoice(choice);
  	};
  	this.destroy = function () {
  		network.clear();
  		extract = null;
  	};
    function success(json) {
      component.loading(false);
      extract = json;
      filter();
      append(filtred());
    }
    function filter() {
  		filter_items = {
  			season: [],
  			voice: [],
  			order: []
  		};

  		if (extract.folder && extract.season.length) {
  			component.order.forEach(function (i){
  				filter_items.order.push(i.title);
  			});
        filter_items.season = extract.season;
  			choice.seasons = filter_items.season.length;
  		}
  		
  		if (!filter_items.season[choice.season]) choice.season = 0;
  		component.filter(filter_items, choice);
  	}
    function filtred() {
      var filtred = [];
      if (filter_items.season.length) {
        for (var season in extract.folder) {
          var season_id = parseInt(filter_items.season[choice.season].split(' ').pop());
          if(season == season_id) {
            var episodes = extract.folder[season_id];
            episodes.forEach(function(el) {
              filtred.push(el);
            });
          }
        }
      } else {
        extract.folder.forEach(function (voice) {
          filtred.push({
            title: voice.title,
            quality: voice.quality,
            url: voice.url,
            subtiles: voice.subtiles,
            vast_url: voice.vast_url,
            vast_msg: voice.vast_msg,
            info: '',
            media: voice
          });
        });
      }

      return filtred;
    }
    function append(items) {
      component.reset();
      component.draw(items, {
        onEnter: function onEnter(item, html) {
          if (item.url) {
            var playlist = [];
            var first = {
              url: item.url,
              timeline: item.timeline,
              title: item.title,
              subtitles: item.subtitles, 
              translate: {
                tracks: item.audio_tracks
              },
              vast_url: item.vast_url,
              vast_msg: item.vast_msg,
              error: function (play_item, callback) {
                 Lampa.Player.timecodeRecording(false)
                 callback(API.replace('api.', '') + 'not_video.mp4');
              }
            };
  
            if (item.season) {
              items.forEach(function (elem) {
                playlist.push({
                  title: elem.title,
                  url: elem.url,
                  timeline: elem.timeline,
                  subtitles: elem.subtitles,
                  translate: {
                    tracks: elem.audio_tracks
                  },
                  callback: function callback() {
                    elem.mark();
                  },
                  vast_url: item.vast_url,
                  vast_msg: item.vast_msg,
                  error: function (play_item, callback) {
                    Lampa.Player.timecodeRecording(false)
                    callback(API.replace('api.', '') + 'not_video.mp4');
                  }
                });
              });
            } else {
              playlist.push(first);
            }
  
            if (playlist.length > 1) first.playlist = playlist;
            Lampa.Player.play(first);
            Lampa.Player.playlist(playlist);
            item.mark();
          } else Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          call({
            file: item.file
          });
        }
      });
    }
  }
 
  function collaps(component, _object) {
  	var network = new Lampa.Reguest();
  	var extract = {};
  	var prox = component.proxy('collaps');
  	var embed = prox ? prox + 'https://api.topdbltj.ws/embed/' : 'https://api.marts.ws/embed/';
  	var select_title = '';
  	var filter_items = {};
  	var prefer_dash = Lampa.Storage.field('online_dash') === true;
  	var choice = {
  		season: 0,
  		voice: 0, 
  		order: 0
  	};
    this.searchByImdbID = function (_object, id) {
      this.searchIn('imdb', id);
    };
    this.searchByKinopoisk = function (_object, id) {
      this.searchIn('kp', id);
    };
    this.searchIn = function (where, id) {
   		select_title = _object.search;
      var url = embed + where + '/' + id;
  		network.clear();
      network.timeout(10000);
     	network.silent(url, function (str) {
  			if (str) {
  				parse(str);
  			} else component.doesNotAnswer(select_title);
  			component.loading(false);
  		}, function (a, c) {
  			component.doesNotAnswer(a.status == 404 && a.responseText && a.responseText.indexOf('видео недоступно') !== -1 ? select_title : '');
  		}, false, {
  			dataType: 'text'
  		});
  	};
  	this.extendChoice = function (saved) {
  		Lampa.Arrays.extend(choice, saved, true);
  	};
  	this.reset = function () {
  		component.reset();
  		choice = {
  			season: 0,
  			voice: 0, 
  			order: 0
  		};
  		filter();
  		append(filtred());
  		component.saveChoice(choice);
  	};
  	this.filter = function (type, a, b) {
  		choice[a.stype] = b.index;
  		component.reset();
  		filter();
  		append(filtred());
  		component.saveChoice(choice);
  	};
  	this.destroy = function () {
  		network.clear();
  		extract = null;
  	};
  	function parse(str) {
  		str = str.replace(/\n/g, '');
  		var find = str.match('makePlayer\\({(.*?)}\\);');
  		var json;
  		try {
  			json = find && eval('({' + find[1] + '})');
  		} catch (e) {}
  		if (json) {
  			extract = json;
  			if (extract.playlist && extract.playlist.seasons) {
  				extract.playlist.seasons.sort(function (a, b) {
  					return a.season - b.season;
  				});
  			}
  			filter();
  			append(filtred());
  		} else component.doesNotAnswer(select_title);
  	}
  	function fixUrl(url) {
        url = (url || '').replace(atob('Ly9oeWUxZWFpcGJ5NHcubWF0aGFtLndzLw=='), atob('Ly9hYi5tYXRoYW0ud3Mv'));
        return url;
      }
  	function filter() {
  		filter_items = {
  			season: [],
  			voice: [],
  			order: []
  		};
  		if (extract.playlist && extract.playlist.seasons) {
  			component.order.forEach(function (i){
  				filter_items.order.push(i.title);
  			});
  			extract.playlist.seasons.forEach(function (season) {
  				filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
  			});
  			choice.seasons = filter_items.season.length;
  		}
  		
  		filter_items.season.sort(function(a,b){
        var n_a = parseInt(a.replace(/\D/g,''));
        var n_b = parseInt(b.replace(/\D/g,''));
        if(n_a > n_b) return 1;
        else if(n_a < n_b) return -1;
        else return 0;
      });
  		
  		if (!filter_items.season[choice.season]) choice.season = 0;
  		component.filter(filter_items, choice);
  	}
  	function filtred() {
  		var filtred = [];
  		if (extract.playlist) {
  			extract.playlist.seasons.forEach(function (season, i) {
  				var season_id = parseInt(filter_items.season[choice.season].split(' ').pop());
  	  	  if(season.season == season_id) {
  				  season.episodes.forEach(function (episode) {
  						var resolution = Lampa.Arrays.getKeys(extract.qualityByWidth).pop();
  						var max_quality = resolution ? extract.qualityByWidth[resolution] || 0 : '';
  						var audio_tracks = episode.audio.names.map(function (name) {
  							return {
  								language: name
  							};
  						});
  						var file = fixUrl(prefer_dash && episode.dash || episode.hls || '');
  						filtred.push({
  							file: file,
  							episode: parseInt(episode.episode),
  							season: parseInt(season.season),
  							title: episode.title,
  							quality: max_quality ? max_quality + 'p' : '',
  							voice: episode.audio.names.join('<br>'),
  							info: episode.audio.names.slice(0, 5).join(', '),
  							subtitles: episode.cc ? episode.cc.map(function (c) {
  								return {
  									label: c.name,
  									url: fixUrl(c.url || '')
  								};
  							}) : false,
  							audio_tracks: audio_tracks.length ? audio_tracks : false
  						});
  					});
  				}
  			});
  		} else if (extract.source) {
  			var resolution = Lampa.Arrays.getKeys(extract.qualityByWidth).pop();
  			var max_quality = extract.qualityByWidth ? extract.qualityByWidth[resolution] || 0 : 0;
  			var audio_tracks = extract.source.audio.names.map(function (name) {
  				return {
  					language: name
  				};
  			});
  			var file = fixUrl(prefer_dash && extract.source.dash || extract.source.hls || '');
  			filtred.push({
  				file: file,
  				title: extract.title,
  				quality: max_quality ? max_quality + 'p' : '',
  				info: extract.source.audio.names.slice(0, 5).join(', '),
  				voice: extract.source.audio.names.join('<br>'),
  				subtitles: extract.source.cc ? extract.source.cc.map(function (c) {
  					return {
  						label: c.name,
  						url: fixUrl(c.url || '')
  					};
  				}) : false,
  				audio_tracks: audio_tracks.length ? audio_tracks : false
  			});
  		}
  		return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
  	}
    function append(items) {
      component.reset();
      component.draw(items, {
        onEnter: function onEnter(item, html) {
          if (item.file) {
            var playlist = [];
            var first = {
              url: item.file,
              timeline: item.timeline,
              title: item.title,
              subtitles: item.subtitles, 
              translate: {
                tracks: item.audio_tracks
              },
              vast_url: VAST_url,
               error: function (play_item, callback) {
                 Lampa.Player.timecodeRecording(false)
                 callback(API.replace('api.', '') + 'not_video.mp4');
               }
            };
  
            if (item.season) {
              items.forEach(function (elem) {
                playlist.push({
                  title: elem.title,
                  url: elem.file,
                  timeline: elem.timeline,
                  subtitles: elem.subtitles,
                  translate: {
                    tracks: elem.audio_tracks
                  },
                  callback: function callback() {
                    elem.mark();
                  },
                  vast_url: VAST_url,
                  error: function (play_item, callback) {
                    Lampa.Player.timecodeRecording(false)
                    callback(API.replace('api.', '') + 'not_video.mp4');
                  }
                });
              });
            } else {
              playlist.push(first);
            }
  
            if (playlist.length > 1) first.playlist = playlist;
            Lampa.Player.play(first);
            Lampa.Player.playlist(playlist);
            item.mark();
          } else Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          call({
            file: item.file
          });
        }
      });
    }
  }
  
  function rezka(component, _object) {
    var network = new Lampa.Reguest();
    var extract = {};
    var prox = component.proxy('hdrezka');
    var embed = prox ? prox + 'http://voidboost.tv/' : 'https://voidboost.tv/';
    var object = _object;
    var select_id = '';
    var filter_items = {};
    var choice = {
      season: 0,
      voice: 0,
      order: 0,
      voice_name: ''
    };
    this.searchByKinopoisk = function (_object, id) {
      object = _object;
      select_id = id;
      getFirstTranlate(id, function (voice) {
        getFilm(id, voice);
      });
    };
    this.searchByImdbID = function (_object, id) {
      object = _object;
      select_id = id;
      getFirstTranlate(id, function (voice) {
        getFilm(id, voice);
      });
    };
    this.extendChoice = function (saved) {
      Lampa.Arrays.extend(choice, saved, true);
    };
    this.reset = function () {
      component.reset();
      choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      component.loading(true);
      getFirstTranlate(select_id, function (voice) {
        getFilm(select_id, voice);
      });
      component.saveChoice(choice);
    };
    this.filter = function (type, a, b) {
      choice[a.stype] = b.index;
      if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
      component.reset();
      filter();
      component.loading(true);
      choice.voice_token = extract.voice[choice.voice].token;
      getFilm(select_id, choice.voice_token);
      component.saveChoice(choice);
      setTimeout(component.closeFilter, 10);
    };
    this.destroy = function () {
      network.clear();
      extract = null;
    };
    function getSeasons(voice, call) {
      var url = embed + 'serial/' + voice + '/iframe?h=gidonline.io';
      network.clear();
      network.timeout(10000);
      network["native"](url, function (str) {
        extractData(str);
        call();
      }, function (a, c) {
        component.doesNotAnswer();
      }, false, {
        dataType: 'text'
      });
    }
    function getChoiceVoice() {
      var res = extract.voice[0];
  
      if (choice.voice_token) {
        extract.voice.forEach(function (voice) {
          if (voice.token === choice.voice_token) res = voice;
        });
      }
  
      return res;
    }
    function getFirstTranlate(id,call) {
      network.clear();
      network.timeout(10000);
      
      network["native"](embed + 'embed/' + id, function (str) {
        extractData(str);
        if (extract.voice.length) call(getChoiceVoice().token);
        else component.doesNotAnswer(object.movie.title);
      }, function (a, c) {
        component.doesNotAnswer(a.status == 404 && a.responseText && (a.responseText.indexOf('Видео не найдено') !== -1 ||  a.responseText.indexOf('Not Found') !== -1) ? object.movie.title : '');
      }, false, {
        dataType: 'text'
      });
    }
    function getEmbed(url) {
      network.clear();
      network.timeout(10000);
      network.silent(url, function (str) {
        component.loading(false);
        extractData(str);
        filter();
        append();
      }, function (a, c) {
        component.doesNotAnswer();
      }, false, {
        dataType: 'text'
      });
    }
    function getFilm(id, voice) {
      var url = embed;
      if (voice) {
        if (extract.season.length) {
          var ses = extract.season[Math.min(extract.season.length - 1, choice.season)].id;
          url += 'serial/' + voice + '/iframe?s=' + ses + '&h=gidonline.io';
          return getSeasons(voice, function () {
            var check = extract.season.filter(function (s) {
              return s.id == ses;
            });
  
            if (!check.length) {
              choice.season = extract.season.length - 1;
              url = embed + 'serial/' + voice + '/iframe?s=' + extract.season[choice.season].id + '&h=gidonline.io';
            }
  
            getEmbed(url);
          });
        } else {
          url += 'movie/' + voice + '/iframe?h=gidonline.io';
          getEmbed(url);
        }
      } else {
        url += 'embed/' + id;
        getEmbed(url);
      }
    }
    function filter() {
      filter_items = {
        season: extract.season.map(function (v) {
          return v.name;
        }),
        voice: extract.season.length ? extract.voice.map(function (v) {
          return v.name;
        }) : []
      };
  
      if (choice.voice_name) {
        var inx = filter_items.voice.map(function (v) {
          return v.toLowerCase();
        }).indexOf(choice.voice_name.toLowerCase());
        if (inx == -1) choice.voice = 0;
        else if (inx !== choice.voice) {
          choice.voice = inx;
        }
      }
      
      if(!extract.season[choice.season]) choice.season = 0;
      else choice.seasons = filter_items.season.length;
  
      component.filter(filter_items, choice);
    }
    function parseSubtitles(str) {
      var subtitles = [];
      var subtitle = str.match("'subtitle': '(.*?)'");
  
      if (subtitle) {
        subtitles = component.parsePlaylist(subtitle[1]).map(function (item) {
          return {
            label: item.label,
            url: item.links[0]
          };
        });
      }
  
      return subtitles.length ? subtitles : false;
    }
    function extractItems(str) {
      try {
        var items = component.parsePlaylist(str).map(function (item) {
          var quality = item.label.match(/(\d\d\d+)p/);
          var links;
  
          links = item.links.filter(function (url) {
            return /\.mp4$/i.test(url);
          });
          
          if (!links.length) links = item.links;
          return {
            label: item.label,
            quality: quality ? parseInt(quality[1]) : NaN,
            file: links[0]
          };
        });
        items.sort(function (a, b) {
          if (b.quality > a.quality) return 1;
          if (b.quality < a.quality) return -1;
          if (b.label > a.label) return 1;
          if (b.label < a.label) return -1;
          return 0;
        });
        return items;
      } catch (e) {}
  
      return [];
    }
    function getStream(element, call, error) {
      if (element.stream) return call(element.stream);
      var url = embed;

      if (element.season) {
        url += 'serial/' + element.voice.token + '/iframe?s=' + element.season + '&e=' + element.episode + '&h=gidonline.io';
      } else {
        url += 'movie/' + element.voice.token + '/iframe?h=gidonline.io';
      }

      if (element.voice.d) url += '&d=' + encodeURIComponent(element.voice.d);

      var call_success = function call_success(str) {
        var videos = str.match("'file': '(.*?)'");

        if (videos) {
          var video = decode(videos[1]),
              file = '',
              quality = false;
          var items = extractItems(video);

          if (items && items.length) {
            file = items[0].file;
            quality = {};
            items.forEach(function (item) {
              quality[item.label] = item.file;
            });
          }

          if (file) {
            element.stream = file;
            element.qualitys = quality;
            element.subtitles = parseSubtitles(str);
            call(element.stream);
          } else error();
        } else error();
      };

      if (false) {
        console.log('Modss','iftame',true);
        component.proxyCall('GET', url, 5000, null, call_success, error);
      } else {
        network.clear();
        network.timeout(5000);
        network["native"](url, call_success, error, false, {
          dataType: 'text'
        });
      }
  }
    function decode(data) {
      if (data.charAt(0) !== '#') return data;
  
      var enc = function enc(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
          return String.fromCharCode('0x' + p1);
        }));
      };
  
      var dec = function dec(str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      };
      
      var trashList = TRASH_R;
  
      var x = data.substring(2);
      trashList.forEach(function (trash) {
        x = x.replace('//_//' + enc(trash), '');
      });
  
      try {
        x = dec(x);
      } catch (e) {
        x = '';
      }
  
      return x;
    }
    function extractData(str) {
      extract.voice = [];
      extract.season = [];
      extract.episode = [];
      str = str.replace(/\n/g, '');
      var voices = str.match('<select name="translator"[^>]+>(.*?)</select>');
      var sesons = str.match('<select name="season"[^>]+>(.*?)</select>');
      var episod = str.match('<select name="episode"[^>]+>(.*?)</select>');
  
      if (sesons) {
        var select = $('<select>' + sesons[1] + '</select>');
        $('option', select).each(function () {
          extract.season.push({
            id: $(this).attr('value'),
            name: $(this).text()
          });
        });
      }
  
      if (voices) {
        var _select = $('<select>' + voices[1] + '</select>');
  
        $('option', _select).each(function () {
          var token = $(this).attr('data-token');
  
          if (token) {
            extract.voice.push({
              token: token,
              name: $(this).text(),
              id: $(this).val()
            });
          }
        });
      }
  
      if (episod) {
        var _select2 = $('<select>' + episod[1] + '</select>');
  
        $('option', _select2).each(function () {
          extract.episode.push({
            id: $(this).attr('value'),
            name: $(this).text()
          });
        });
      }
    }
    function append() {
      component.reset();
      var items = [];
  
      if (extract.season.length) {
        extract.episode.forEach(function (episode) {
          items.push({
            title: episode.name,
            quality: '720p ~ 1080p',
            season: extract.season[Math.min(extract.season.length - 1, choice.season)].id,
            episode: parseInt(episode.id),
            info: extract.voice[choice.voice].name,
            voice: extract.voice[choice.voice],
            voice_name: extract.voice[choice.voice].name
          });
        });
      } else {
        extract.voice.forEach(function (voice) {
          items.push({
            title: voice.name.length > 3 ? voice.name : object.movie.title,
            quality: '720p ~ 1080p',
            voice: voice,
            info: '',
            voice_name: voice.name
          });
        });
      }
  
      component.draw(items, {
        onEnter: function onEnter(item, html) {
          getStream(item, function (stream) {
            var first = {
              url: stream,
              timeline: item.timeline,
              quality: item.qualitys,
              subtitles: item.subtitles,
              title: item.title
            };
            Lampa.Player.play(first);
  
            if (item.season) {
              var playlist = [];
              items.forEach(function (elem) {
                var cell = {
                  url: function url(call) {
                    getStream(elem, function (stream) {
                      cell.url = stream;
                      cell.quality = elem.qualitys;
                      call.subtitles = elem.subtitles;
                      elem.mark();
                      call();
                    }, function () {
                      cell.url = '';
                      call();
                    });
                  },
                  timeline: elem.timeline,
                  title: elem.title
                };
                if (elem == item) cell.url = stream;
                playlist.push(cell);
              });
              Lampa.Player.playlist(playlist);
            } else {
              Lampa.Player.playlist([first]);
            }
            item.mark();
          }, function () {
            Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
          });
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          getStream(item, function (stream) {
            call({
              file: stream,
              quality: item.qualitys
            });
          });
        }
      });
    }
  }
  
  function kinobase(component, _object) {
  	var network = new Lampa.Reguest();
  	var extract = [];
  	var is_playlist = false;
  	var quality_type = '';
  	var translation = '';
  	var prox = component.proxy('kinobase');
    var stream_prox = prox;
    var host = 'https://kinobase.org';
    var ref = host + '/';
    var embed = prox + ref;
  	var object = _object;
  	var data;
  	var select_title = '';
  	var select_id = '';
  	var filter_items = {};
  	var voic = '';
  	var wait_similars;
  	var choice = {
  		season: 0,
  		voice: 0, 
  		order: 0,
  		voice_name:''
  	};
  
  	this.search = function (_object, sim) {
      if (wait_similars && sim) return getPage(sim[0].link);
    };
  	this.searchByTitle = function (_object, query) {
      object = _object;
      select_title = object.search;
      var url = embed + "search?query=" + encodeURIComponent(component.cleanTitle(select_title));
      network.clear();
      network.timeout(1000 * 10);
      network["native"](url, function (str) {
        str = str.replace(/\n/g, '');
        var links = object.movie.number_of_seasons ? str.match(/<div class="title"><a href="\/(serial|tv_show)\/([^"]*)"[^>]*>(.*?)<\/a><\/div>/g) : str.match(/<div class="title"><a href="\/film\/([^"]*)"[^>]*>(.*?)<\/a><\/div>/g);
        var search_date = object.search_date || object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
        var search_year = parseInt((search_date + '').slice(0, 4));

        if (links) {
          var is_sure = false;

          var items = links.map(function (l) {
            var div = $(l),
            link = $('a', div),
            titl = link.attr('title') || link.text() || '';
            var year;
            var found = titl.match(/^(.*)\((\d{4})\)$/);

            if (found) {
              year = parseInt(found[2]);
              titl = found[1].trim();
            }
  
            return {
              year: year,
              title: titl,
              link: link.attr('href')
            };
          });
          var cards = items;

          if (cards.length) {
            if (select_title) {
              var _tmp = cards.filter(function (c) {
                return component.containsTitle(c.title, select_title);
              });

              if (_tmp.length) {
                cards = _tmp;
                is_sure = true;
              }
            }

            if (cards.length > 1 && search_year) {
              var _tmp2 = cards.filter(function (c) {
                return c.year == search_year;
              });

              if (!_tmp2.length) _tmp2 = cards.filter(function (c) {
                return c.year && c.year > search_year - 2 && c.year < search_year + 2;
              });
              if (_tmp2.length) cards = _tmp2;
            }
          }

          if (cards.length == 1 && is_sure) {
            if (search_year && cards[0].year) {
              is_sure = cards[0].year > search_year - 2 && cards[0].year < search_year + 2;
            }

            if (is_sure) {
              is_sure = false;

              if (select_title) {
                is_sure |= component.equalTitle(cards[0].title, select_title);
              }
            }
          }

  
          if (cards.length == 1 && is_sure) getPage(cards[0].link);
          else if (items.length) {
            wait_similars = true;
            var similars = [];
            links.forEach(function (l) {
              var link = $(l),
                  titl = link.attr('title') || link.text();
                  type = link.attr('href') && (link.attr('href').indexOf('film') > -1 ? 'film' : 'serial') || '';
              similars.push({
                title: titl,
                type: type, 
                link: link.attr('href')
              });
            });
            component.similars(similars);
            component.loading(false);
          } else component.doesNotAnswer(select_title);
        } else if (str.indexOf('/recaptcha/api.js') !== -1 || str.indexOf('form action="/check?') !== -1) {
          component.empty(Lampa.Lang.translate('title_kb_captcha_address') + embed);
        } else component.doesNotAnswer(select_title);
      }, function (a, c) {
        component.doesNotAnswer();
      }, false, {
        dataType: 'text'
      });
    };
  	this.extendChoice = function (saved) {
  		Lampa.Arrays.extend(choice, saved, true);
  	};
  	this.reset = function () {
  		component.reset();
  		choice = {
  			season: 0,
  			voice: 0, 
  			order: 0
  		};
  		filter();
  		append(filtred());
  	};
  	this.filter = function (type, a, b) {
  		choice[a.stype] = b.index;
  		component.reset();
  		filter();
  		append(filtred());
  	};
  	this.destroy = function () {
  		network.clear();
  		extract = null;
  	};
  	function filter() {
      filter_items = {
        season: [],
        voice: [],
        order: []
      };
  
      if (is_playlist) {
        component.order.forEach(function (i){
  				filter_items.order.push(i.title);
  			});
        extract.forEach(function (item) {
          if (item.playlist || item.folder) {
            filter_items.season.push(item.title || item.comment || '');
          }
        });
      }
  
      if (!filter_items.season[choice.season]) choice.season = 0;
  
      if (is_playlist) {
        extract.forEach(function (item, i) {
          var playlist = item.playlist || item.folder;
  
          if (playlist) {
            if (i == choice.season) {
              playlist.forEach(function (eps) {
                if (eps.file) {
                  component.parsePlaylist(eps.file).forEach(function (el) {
                    if (el.voice && filter_items.voice.indexOf(el.voice) == -1) {
                      filter_items.voice.push(el.voice);
                    }
                  });
                }
              });
            }
          } else if (item.file) {
            component.parsePlaylist(item.file).forEach(function (el) {
              if (el.voice && filter_items.voice.indexOf(el.voice) == -1) {
                filter_items.voice.push(el.voice);
              }
            });
          }
        });
      }
  
      if (!filter_items.voice[choice.voice]) choice.voice = 0;
      component.filter(filter_items, choice);
    }
  	function filtred() {
  		var filtred = [];
  		if (is_playlist) {
  			var playlist = extract;
  			var season = object.movie.number_of_seasons && 1;
  			if (extract[choice.season] && (extract[choice.season].playlist || extract[choice.season].folder)) {
          playlist = extract[choice.season].playlist || extract[choice.season].folder;
          season = parseInt(extract[choice.season].title || extract[choice.season].comment || '');
          if (isNaN(season)) season = 1;
        }
  			playlist.forEach(function (eps, index) {
  				var items = extractItems(eps.file, filter_items.voice[choice.voice]);
  				if (items.length) {
  					var title = eps.title || eps.comment || '';
  					var alt_voice = (eps.comment || eps.title).match(/\d+ серия (.*)$/i);
  					var info = items[0].voice || (alt_voice && alt_voice[1].trim()) || translation;
  				
  					if (info == title) info = '';
  					if(season){
  					  var episode = parseInt(title);
              if (isNaN(episode)) episode = index + 1;
              filtred.push({
  							file: eps.file,
  							title: title,
  							quality: (quality_type ? quality_type + ' - ' : '') + items[0].quality + 'p',
  							season: season,
  							episode: episode,
  							info: info ? info : '',
  							voice: info,
  							voice_name: info,
  							subtitles: parseSubs(eps.subtitle || '')
  						});
  				  } else {
              filtred.push({
                file: eps.file,
                title: title,
  							quality: (quality_type ? quality_type + ' - ' : '') + items[0].quality + 'p',
                info: info ? ' / ' + info : '',
                voice: items[0].voice,
  							voice_name: info,
                subtitles: parseSubs(eps.subtitle || '')
              });
            }
  				}
  			});
  		} else {
  			filtred = extract;
  		}
  		return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
  	}
  	function parseSubs(vod) {
  		var subtitles = component.parsePlaylist(vod).map(function (item) {
  			return {
  				label: item.label,
  				url: item.links[0]
  			};
  		});
  		return subtitles.length ? subtitles : false;
  	}
  	function extractData(str, page) {
  		var quality_match = page.match(/<li><b>Качество:<\/b>([^<,]+)<\/li>/i);
  		var translation_match = page.match(/<li><b>Перевод:<\/b>([^<,]+)<\/li>/i);
  		quality_type = quality_match ? quality_match[1].trim() : '';
  		translation = translation_match ? translation_match[1].trim() : '';
  		var vod = str.split('|');
  		if (vod[0] == 'file') {
  			var file = vod[1];
  			var found = [];
  			var subtiles = parseSubs(vod[2]);
  			if (file) {
  				var voices = {};
  				component.parsePlaylist(file).forEach(function (item) {
  					var prev = voices[item.voice || ''];
  					var quality_str = item.label.match(/(\d\d\d+)p/);
  					var quality = quality_str ? parseInt(quality_str[1]) : NaN;
  					if (!prev || quality > prev.quality) {
  						voices[item.voice || ''] = {
  							quality: quality
  						};
  					}
  				});
  				for (var voice in voices) {
  					var el = voices[voice];
  					found.push({
  						file: file,
  						title: voice || translation || object.movie.title,
  						quality: (quality_type ? quality_type + ' - ' : '') + el.quality + 'p',
  						info: '',
  						voice: voice,
  						voice_name: voice,
  						subtitles: subtiles
  					});
  				}
  			}
  			extract = found;
  			is_playlist = false;
  		} else if (vod[0] == 'pl') {
  			extract = Lampa.Arrays.decodeJson(vod[1], []);
  			is_playlist = true;
  		} else component.doesNotAnswer(select_title);
  	}
    function getUrlWithParams(url, params) {
      url = url || '';
      url = component.fixLink(url, '', ref);

      if (params) {
        for (var name in params) {
          var value = params[name];
          url = Lampa.Utils.addUrlComponent(url, encodeURIComponent(name) + "=" + encodeURIComponent(value));
        }
      }

      return url;
    }
    function getPage(url) {
      url = component.fixLink(url, '', ref);
      var cookie = 'player_type=new; file_type=mp4';
      var headers = Lampa.Platform.is('android') ? {
        'Origin': host,
        'Referer': url,
        'Cookie': cookie
      } : {};
      var page_prox = prox;

      if (page_prox) {
        page_prox += 'param/Origin=' + encodeURIComponent(host) + '/';
        page_prox += 'param/Referer=' + encodeURIComponent(url) + '/';
        stream_prox = page_prox;
        page_prox += 'param/Cookie=' + encodeURIComponent(cookie) + '/';
      }

      network.clear();
      network.timeout(1000 * 10);
      network["native"](page_prox + url, function (str) {
        str = (str || '').replace(/\n/g, '');
        var MOVIE_ID = str.match(/var MOVIE_ID = (\d+);/);
        var PLAYER_CUID = str.match(/var PLAYER_CUID = "([^"]+)";/);
        var IDENTIFIER = str.match(/var IDENTIFIER = "([^"]+)";/);

        if (MOVIE_ID && PLAYER_CUID && IDENTIFIER) {
          var user_url = page_prox + getUrlWithParams('/user_data', {
            page: 'movie',
            movie_id: MOVIE_ID[1],
            cuid: PLAYER_CUID[1],
            '_': Date.now()
          });
          network.clear();
          network.timeout(1000 * 10);
          network["native"](user_url, function (data) {
            if (data && data.vod_hash2 != null && data.vod_time2 != null) {
              if (data.allow_watch != null && !data.allow_watch) {
                Lampa.Noty.show(Lampa.Lang.translate('modss_blockedlink') + (data.client_country ? ': ' + data.client_country : ''));
              }
              
              var vod_url = page_prox + getUrlWithParams('/vod/' + MOVIE_ID[1], {
                'sbk': '1723021485',
                'identifier': IDENTIFIER[1],
                'player_type': 'new',
                'file_type': "mp4",
                'st': data.vod_hash2,
                'e': data.vod_time2,
                '_': Date.now()
              });
              network.clear();
              network.timeout(1000 * 10);
              network["native"](vod_url, function (files) {
                component.loading(false);
                extractData(files, str);
                filter();
                append(filtred());
              }, function (a, c) {
                component.empty(network.errorDecode(a, c));
              }, false, {
                dataType: 'text',
                withCredentials: !prox,
                headers: headers
              });
            } else component.emptyForQuery(select_title);
          }, function (a, c) {
            component.empty(network.errorDecode(a, c));
          }, false, {
            withCredentials: !prox,
            headers: headers
          });
        } else component.emptyForQuery(select_title);
      }, function (a, c) {
        component.empty(network.errorDecode(a, c));
      }, false, {
        dataType: 'text',
        withCredentials: !prox,
        headers: Lampa.Platform.is('android') ? {
          'Origin': host,
          'Referer': ref
        } : {}
      });
    }
		function extractItems(str, voice) {
  		try {
  			var list = component.parsePlaylist(str);
  			if (voice) {
  				var tmp = list.filter(function (el) {
  					return el.voice == voice;
  				});
  				if (tmp.length) {
  					list = tmp;
  				} else {
  					list = list.filter(function (el) {
  						return typeof el.voice == 'undefined';
  					});
  				}
  			}
  			var items = list.map(function (item) {
          var quality = item.label.match(/(\d\d\d+)p/);
          var file = item.links[0] || '';
          return {
            label: item.label,
            voice: item.voice,
            quality: quality ? parseInt(quality[1]) : NaN,
            file: component.fixLink(file, stream_prox)
          };
        });
  			items.sort(function (a, b) {
  				if (b.quality > a.quality) return 1;
  				if (b.quality < a.quality) return -1;
  				if (b.label > a.label) return 1;
  				if (b.label < a.label) return -1;
  				return 0;
  			});
  			return items;
  		} catch (e) {}
  		return [];
  	}
  	function getFile(element) {
  		var file = '',
  			quality = false;
  		var items = extractItems(element.file, element.voice);
  		if (items && items.length) {
  			file = items[0].file;
  			quality = {};
  			items.forEach(function (item) {
  				quality[item.label] = item.file;
  			});
  			var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
  			if (quality[preferably]) file = quality[preferably];
  		}
  		element.stream = file;
  		element.qualitys = quality;
  		return {
  			file: file,
  			quality: quality
  		};
  	}
  	function toPlayElement(element) {
      getFile(element);
      var play = {
        url: element.stream,
        timeline: element.timeline,
        title: element.title,
        subtitles: element.subtitles,
        quality: element.qualitys,
        callback: element.mark
      };
      return play;
    }
    function append(items) {
      component.reset();
      component.draw(items, {
        similars: wait_similars,
        onEnter: function onEnter(item, html) {
          getFile(item);
  
          if (item.stream) {
            var playlist = [];
            var first = toPlayElement(item);
  
            if (item.season) {
              items.forEach(function (elem) {
                playlist.push(toPlayElement(elem));
              });
            } else {
              playlist.push(first);
            }
  
            if (playlist.length > 1) first.playlist = playlist;
            Lampa.Player.play(first);
            Lampa.Player.playlist(playlist);
            item.mark();
          } else Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          call(getFile(item));
        }
      });
    }
  }
  
  function cdnmovies(component, _object) {
  	var network = new Lampa.Reguest();
  	var extract = [];
  	var medias;
  	var object = _object;
  	var select_title = '';
  	var filter_items = {};
  	var wait_similars;
  	var prefer_old = false;
  	var iframe_proxy = false;
    var choice = { 
  		season: 0,
  		voice: 0, 
  		order: 0
  	}; 
    var old_embed = 'https://1f29036bcf55d.sarnage.cc/';
    var new_embed = 'https://cdnmovies-stream.online/';
    var prox = component.proxy('cdnmovies');
    var host = 'https://cdnmovies.net';
    var embed = prox + 'https://skinny-wilderness.cdnmovies-stream.online/';
    
    function cdn_api_search(api, callback, error) {
      var call_success = function call_success(str) {
        if (callback) callback(str || '');
      };

      var call_error = function call_error(a, c) {
        if ((a.status == 404 || a.status == 403) && a.responseText && (a.responseText.indexOf('<title>Not Found</title>') !== -1 || a.responseText.indexOf('Не найдено!') !== -1 || a.responseText.indexOf('Контент не найден или недоступен в вашем регионе!') !== -1) || a.status == 0 && a.statusText !== 'timeout') {
          if (callback) callback('');
        } else if (error) error(network.errorDecode(a, c));
      };

      if (iframe_proxy) {
        component.proxyCall('GET', embed + api, 10000, null, call_success, call_error);
      } else {
        var meta = $('head meta[name="referrer"]');
        var referrer = meta.attr('content') || 'never';
        meta.attr('content', 'origin');

        try {
          network.clear();
          network.timeout(10000);
          network["native"](embed + api, call_success, call_error, false, {
            dataType: 'text',
            headers: Lampa.Platform.is('android') ? {
              'Origin': host,
              'Referer': host + '/'
            } : {}
          });
        } finally {
          meta.attr('content', referrer);
        }
      }
    }
    
    this.searchs = function (_object, kinopoisk_id) {
      object = _object;
      select_title = object.search || object.movie.title;

      var empty = function empty() {
        component.doesNotAnswer(select_title);
      };

      var error = component.empty.bind(component);
      var api = (+kinopoisk_id ? 'kinopoisk/' : 'imdb/') + kinopoisk_id + '/iframe';
      cdn_api_search(api, function (str) {
        parse(str || '', function () {
          if (!object.clarification && object.movie.imdb_id && kinopoisk_id != object.movie.imdb_id) {
            cdn_api_search('imdb/' + object.movie.imdb_id + '/iframe', function (str) {
              parse(str || '', empty);
            }, error);
          } else empty();
        });
      }, error);
    };  
   
    this.extendChoice = function (saved) {
  		Lampa.Arrays.extend(choice, saved, true);
  	};
  	this.reset = function () {
  		component.reset();
  		choice = {
  			season: 0,
  			voice: 0,
  			order: 0,
  			voice_name: ''
  		};
  		filter();
  		append(filtred());
  		component.saveChoice(choice);
  	};
  	this.filter = function (type, a, b) {
  		choice[a.stype] = b.index;
  		if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
  		component.reset();
  		filter();
  		append(filtred());
  		component.saveChoice(choice);
  	};
  	this.destroy = function () {
  		network.clear();
  	};
  	function parse(str, empty) {

      str = str.replace(/\n/g, '');

      var video;
      var app = str.match(/(<div id="app" data-page=[^>]*>)/);

      if (app) {
        var page = $(app[1] + '</div>').attr('data-page') || '';
        var json;

        try {
          json = page && JSON.parse(page);
        } catch (e) {}

        var player = json && json.props && json.props.player && decode(json.props.player);

        try {
          video = player && JSON.parse(player);
        } catch (e) {}
      }

      if (video) {
        component.loading(false);
        extract = video;
        filter();
        append(filtred());
      } else empty();
    }

    function decode(data) {
      if (data.charAt(0) !== '#') return data;
  
      var enc = function enc(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
          return String.fromCharCode('0x' + p1);
        }));
      };
  
      var dec = function dec(str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      };
  
      var trashList = ['wNp2wBTNcPRQvTC0_CpxCsq_8T1u9Q', 'md-Od2G9RWOgSa5HoBSSbWrCyIqQyY', 'kzuOYQqB_QSOL-xzN_Kz3kkgkHhHit', '6-xQWMh7ertLp8t_M9huUDk1M0VrYJ', 'RyTwtf15_GLEsXxnpU4Ljjd0ReY-VH'];
      var x = data.substring(2);
      trashList.forEach(function (trash) {
        x = x.replace('//' + enc(trash), '');
      });
  
      try {
        x = dec(x);
      } catch (e) {
        x = '';
      }
  
      return x;
    }
  	
  	function extractItemsPlaylist(str, url) {
      if (!str) return [];

      try {
        var items = component.parsePlaylist(str).map(function (item) {
          var quality = item.label.match(/(\d\d\d+)p/);
          var link = item.links[0] || '';
          link = link.replace('/sundb.coldcdn.xyz/', '/sundb.nl/');
          return {
            label: item.label,
            quality: quality ? parseInt(quality[1]) : NaN,
            file: link
          };
        });
        items.sort(function (a, b) {
          if (b.quality > a.quality) return 1;
          if (b.quality < a.quality) return -1;
          if (b.label > a.label) return 1;
          if (b.label < a.label) return -1;
          return 0;
        });
        return items;
      } catch (e) {}

      return [];
    }
    function parseStream(element, call, error, itemsExtractor, str, url) {
      var file = '';
      var quality = false;
      var items = itemsExtractor(str, url);

      if (items && items.length) {
        file = items[0].file;
        quality = {};
        items.forEach(function (item) {
          quality[item.label] = item.file;
        });
      }
      if (file) {
        element.stream = file;
        element.qualitys = quality;
        call(element.stream);
      } else error();
    }
    function getStream(element, call, error) {
      if (element.stream) return call(element.stream);
      var url = element.file || '';

      if (url.charAt(0) === '[') {
        parseStream(element, call, error, extractItemsPlaylist, url, '');
        return;
      }
      link = link.replace('/sundb.coldcdn.xyz/', '/sundb.nl/');

      if (url) {
        element.stream = url;
        element.qualitys = false;
        call(element.stream);
      } else error();
    }

  	function filter() {
			filter_items = {
				season: [],
				voice: [],
				order: []
			};
			extract.forEach(function (season) {
        if (season.folder) filter_items.season.push(season.title);
      });
      if (!filter_items.season[choice.season]) choice.season = 0;

      if (extract[choice.season] && extract[choice.season].folder) {
        component.order.forEach(function (i){
					filter_items.order.push(i.title);
				});
        extract[choice.season].folder.forEach(function (f) {
          f.folder.forEach(function (t) {
            if (filter_items.voice.indexOf(t.title) == -1) filter_items.voice.push(t.title);
          });
        });
      }

      if (!filter_items.voice[choice.voice]) choice.voice = 0;

      if (choice.voice_name) {
        var inx = filter_items.voice.indexOf(choice.voice_name);
        if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
          choice.voice = inx;
        }
      }

			component.filter(filter_items, choice);
		}
  	function parseSubs(str) {
  		var subtitles = component.parsePlaylist(str).map(function (item) {
        link = link.replace('/sundb.coldcdn.xyz/', '/sundb.nl/');
  			return {
  				label: item.label,
  				url: item.links[0]
  			};
  		});
  		return subtitles.length ? subtitles : false;
  	}
  	function filtred() {
  		var filtred = [];
  		extract.forEach(function (data) {
  			if (data.folder) {
  				if (data.title == filter_items.season[choice.season]) {
  					data.folder.forEach(function (se) {
  						se.folder.forEach(function (eps) {
  							if (eps.title == filter_items.voice[choice.voice]) {
  								var m = Lampa.Arrays.getValues(medias).filter(function (itm) {
  									return itm.translation == eps.title;
  								});
  								filtred.push({
  									file: eps.file,
  									title: Lampa.Lang.translate('full_episode') + ' ' + parseInt(se.title.match(/\d+/)),
  									episode: parseInt(se.title.match(/\d+/)),
  									season: parseInt(data.title.match(/\d+/)),
  									quality: m.length ? (m[0].source_quality + ' - ' + m[0].quality + 'p') : '',
  									info: Lampa.Utils.shortText(eps.title, 50)
  								});
  							}
  						});
  					});
  				}
  			} else {
  				var m = Lampa.Arrays.getValues(medias).filter(function (itm) {
  					return itm.translation == data.title;
  				});
  				filtred.push({
  					file: data.file,
  					title: data.title,
  					quality: m.length ? (m[0].source_quality + ' - ' + m[0].quality + 'p') : '',
  					info: '',
  					subtitles: data.subtitle ? parseSubs(data.subtitle) : false
  				});
  			}
  		});
  		return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
  	}
    function append(items) {
      component.reset();
      component.draw(items, {
       // similars: wait_similars, 
        onEnter: function onEnter(item, html) {
          if (item.loading) return;
          item.loading = true;
          getStream(item, function (stream) {
            item.loading = false;
            var first = {
              url: stream,
              timeline: item.timeline,
              quality: item.qualitys,
              subtitle: item.subtitles,
              title: item.title
            };
            Lampa.Player.play(first);
  
            if (item.season) {
              var playlist = [];
              items.forEach(function (elem) {
                var cell = {
                  url: function url(call) {
                    getStream(elem, function (stream) {
                      cell.url = stream;
                      cell.quality = elem.qualitys;
                      cell.subtitles = elem.subtitles;
                      elem.mark();
                      call();
                    }, function () {
                      cell.url = '';
                      call();
                    });
                  },
                  timeline: elem.timeline,
                  title: elem.title
                };
                if (elem == item) cell.url = stream;
                playlist.push(cell);
              });
              Lampa.Player.playlist(playlist);
            } else {
              Lampa.Player.playlist([first]);
            }
  
            if (item.subtitles && Lampa.Player.subtitles) Lampa.Player.subtitles(item.subtitles);
            item.mark();
          }, function (data) {
            item.loading = false;
            Lampa.Noty.show(data ? network.errorDecode(data) : Lampa.Lang.translate('modss_nolink'));
          });
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          getStream(item, function (stream) {
            call({
              file: stream,
              quality: item.qualitys
            });
          }, function (data) {
            Lampa.Noty.show(data ? network.errorDecode(data) : Lampa.Lang.translate('modss_nolink'));
          });
        }
      });
    }
  }
  

  var proxyInitialized = {};
  var proxyWindow = {};
  var proxyCalls = {};
  
  function component(object) {
    var network = new Lampa.Reguest();
    var scroll = new Lampa.Scroll({
      mask: true,
      over: true
    });
    var files = new Lampa.Explorer(object);
    var filter = new Lampa.Filter(object);
    var last;
    var extended;
    var selected_id;
    var sources = {};
    var source;
    var balanser;
    var initialized;
    var balanser_timer;
    var images = [];
    var balansers = Modss.balansers();
    var isVipBal = 4;//(Lampa.Storage.get('pro_pub', false) ? 5 : 5);

    var filter_sources = Lampa.Arrays.getKeys(balansers);
    var filter_translate = {
      season: Lampa.Lang.translate('torrent_serial_season'),
      voice: Lampa.Lang.translate('torrent_parser_voice'),
      source: Lampa.Lang.translate('settings_rest_source')
    };
    this.initialize = function () {
      var _this = this;
      
      try {
        filter_sources.forEach(function(b){
    		  sources[b] = eval(b);
    		});
      } catch (e) {}
  
      source = this.createSource();
  
      filter.onSearch = function (value) {
        Lampa.Activity.replace({
          search: value,
          clarification: true
        });
      };
  
      filter.onBack = function () {
        _this.start();
      };
      
      filter.render().find('.selector').on('hover:enter', function () {
        clearInterval(balanser_timer);
      });

      var kinopubModal = function kinopubModal() {
        var controller = Lampa.Controller.enabled().name;
        // Lampa.Noty.show('Добавьте устройство - Настройки -> Modss -> Онлайн -> KinoPub');
        Lampa.Modal.open({
          title: Lampa.Lang.translate('filmix_params_add_device') + ' KinoPub?',
          size: 'medium',
          mask: true,
          html: $('<div class="about">'+Lampa.Lang.translate('title_settings')+' -> Modss -> Online -> KinoPub</div>'),
          onBack: function () {
            Lampa.Modal.close();
            Lampa.Controller.toggle(controller);
          },
          buttons: [{
            name: Lampa.Lang.translate('settings_param_no'),
            onSelect: function onSelect() {
              Lampa.Modal.close();
              Lampa.Controller.toggle(controller);
            }
          }, {
            name: Lampa.Lang.translate('settings_param_yes'),
            onSelect: function onSelect() {
              Lampa.Modal.close();
              Lampa.Controller.toggle('settings');
              Lampa.Settings.create('pub_param');
              Pub.Auth_pub();
            }
          }]
        });
      };
  
      filter.onSelect = function (type, a, b) {
        if (a.bal) {
					filter.render().find('.filter--sort').trigger('hover:enter');
				} else if (type == 'filter') {
          if (a.reset) {
            if (extended) source.reset();else _this.start();
          } else {
            source.filter(type, a, b);
          }
        } else if (type == 'sort') {
          Lampa.Select.close();
          if (Lampa.Arrays.getKeys(sources).indexOf(a.source) !== -1) {
            if (!Lampa.Storage.get('pro_pub', 'false') && a.source == 'kinopub') return kinopubModal();
            Modss.getIp(a.source);
            _this.changeBalanser(a.source);
         } else {
            if(a.source == 'kinopub') return kinopubModal();
    	      var controller = Lampa.Controller.enabled().name;
            Lampa.Modal.open({
              title: '',
              align: 'center',
              html: $('<div class="modssModal account-add-device loaded"><img src="https://lampa.stream/qr_bot.png" class="account-add-device__qr" style="padding: 0;margin-bottom: 0;background: #3c3e3f;"><div class="ad-server__text about" style="margin-bottom: 0;"><b>Надоело смотреть в плохом качестве?</b><br>Хочешь смотреть в <b style="color: #ffd402;">FHD</b> и <b style="color: #ffd402;">4K</b>? Сканируй код или переходи @modssmy_bot и подключай <b style="color: #02ff60;">Vip</b></div></div>'),
              onBack: function () {
                Lampa.Modal.close();
                Lampa.Controller.toggle(controller);
              }
            });
            //Lampa.Noty.show('Будет Доступно для VIP пользователей<br>Через бот @modssmy_bot');
         }
        }
        if (object.movie.number_of_seasons || balanser == 'kinopub' || balanser == 'bazon') filter.render().find('.filter--filter').show();
  		  else filter.render().find('.filter--filter').hide();
      };
  
      if (object.movie.number_of_seasons || balanser == 'kinopub' || balanser == 'bazon') filter.render().find('.filter--filter').show();
  	  else filter.render().find('.filter--filter').hide();
  	  filter.render().find('.filter--sort').on('hover:enter', function () {
  			$('body').find('.selectbox__title').text(Lampa.Lang.translate('modss_balanser'));
  		});
  		if (filter.addButtonBack) filter.addButtonBack();
      filter.render().find('.filter--sort span').text(Lampa.Lang.translate('modss_balanser'));
      files.appendFiles(scroll.render());
      files.appendHead(filter.render());
      filter.render().find('.filter--filter').after(filter.render().find('.filter--search'));
      scroll.body().addClass('torrent-list');
      scroll.minus(files.render().find('.explorer__files-head'));
      this.search();
    };
    this.changeBalanser = function (balanser_name) {
      var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
      last_select_balanser[object.movie.id] = balanser_name;
      Lampa.Storage.set('online_last_balanser', last_select_balanser);
      var to  = this.getChoice(balanser_name);
      var from = this.getChoice();
      if(from.voice_name) to.voice_name = from.voice_name;
      this.saveChoice(to, balanser_name);
      Lampa.Activity.replace();
    };
    this.createSource = function () {
      var priority_balanser = Lampa.Storage.get('priority_balanser', Modss.balansPrf);
      if(priority_balanser == undefined) priority_balanser = Modss.balansPrf;
      var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
      if (last_select_balanser[object.movie.id]) {
        balanser = last_select_balanser[object.movie.id];
        Lampa.Storage.set('online_last_balanser', last_select_balanser);
      } else balanser = priority_balanser;
      
      if (!sources[balanser]) balanser = priority_balanser;
      
      if (balanser == 'undefined') balanser = priority_balanser;
      if (!sources[balanser]) balanser = Lampa.Arrays.getKeys(sources)[0];
      return new sources[balanser](this, object);
    };
    this.proxy = function (name) {
  		return Modss.proxy(name);
  	};
    this.create = function () {
      return this.render();
    };
    this.search = function () {
      this.activity.loader(true);
      this.filter({
        source: filter_sources
      }, this.getChoice());
      this.find();
    };
    this.find = function () {
  		var _this2 = this;
  		var query = (object.search || object.movie.title).trim();
  		var search_date = object.search_date || object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
  		var search_year = parseInt((search_date + '').slice(0, 4));
  		var orig = object.movie.original_title || object.movie.original_name;
  		
  		var display = function display(items) {
        if (items && items.length) {
          var is_sure = false;
          if (object.movie.imdb_id) {
            var tmp = items.filter(function (elem) {
              return (elem.imdb_id || elem.imdbId) == object.movie.imdb_id;
            });
  
            if (tmp.length) {
              items = tmp;
              is_sure = true;
            }
          }
          var cards = items.filter(function (c) {
            var year = c.start_date || c.year || '0000';
            c.tmp_year = parseInt((year + '').slice(0, 4));
            return !c.tmp_year || !search_year || c.tmp_year > search_year - 2 && c.tmp_year < search_year + 2;
          });
          
          if(cards.length) {
            if (orig) {
              var _tmp = cards.filter(function (elem) {
                return _this2.equalTitle(elem.orig_title || elem.nameOriginal || elem.en_title || elem.nameEn || elem.ru_title || elem.nameRu, orig);
              });
  
              if (_tmp.length) {
                cards = _tmp;
                is_sure = true;
              }
            }
  
            if (query) {
              var _tmp2 = cards.filter(function (elem) {
                return _this2.equalTitle(elem.title || elem.ru_title || elem.nameRu || elem.en_title || elem.nameEn || elem.orig_title || elem.nameOriginal, query);
              });
  
              if (_tmp2.length) {
                cards = _tmp2;
                is_sure = true;
              }
            }
  
            if (cards.length > 1 && search_year) {
              var _tmp3 = cards.filter(function (c) {
                return c.tmp_year == search_year;
              });
              if (_tmp3.length) cards = _tmp3;
            }
          } else cards = items;
          
          if (cards.length == 1 && is_sure) {
            _this2.extendChoice();
            var kinopoisk_id = cards[0].kinopoisk_id || cards[0].kinopoisk_ID || cards[0].kp_id || cards[0].kinopoiskId || cards[0].filmId;
  
            if (kinopoisk_id && source.searchByKinopoisk) {
              source.searchByKinopoisk(object, kinopoisk_id);
            } else if (cards[0].imdb_id && source.searchByImdbID) {
              source.searchByImdbID(object, cards[0].imdb_id);
            } else if (source.search) {
              source.search(object, cards);
            } else {
              _this2.doesNotAnswer();
            }
          } else {
            _this2.similars(items);
            _this2.loading(false);
          }
        } else _this2.doesNotAnswer(query);
      };
  
  		var vcdn_search = function vcdn_search() {
  			var url;
        if (balanser == 'videoapi') {
          url = Protocol() +'5100.svetacdn.in/api/short';
          url = Lampa.Utils.addUrlComponent(url, 'api_token=qR0taraBKvEZULgjoIRj69AJ7O6Pgl9O');
        } else {
          var prox = _this2.proxy('videocdn');
          url = Protocol() +'videocdn.tv/api/short';
          url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
        }
  			var url_by_title = Lampa.Utils.addUrlComponent(url, 'title=' + encodeURIComponent(query));
  			if (object.movie.imdb_id) url = Lampa.Utils.addUrlComponent(url, 'imdb_id=' + encodeURIComponent(object.movie.imdb_id));
  			if (object.movie.kinopoisk_id || object.movie.kinopoisk_ID) url = Lampa.Utils.addUrlComponent(url, 'kinopoisk_id=' + encodeURIComponent(object.movie.kinopoisk_id || object.movie.kinopoisk_ID));
  			else url = url_by_title;
  			network.timeout(1000 * 15);
  			network.silent(url, function (json) {
  				if (json.data && json.data.length) display(json.data);
  				else if (object.movie.imdb_id) {
  					network.timeout(1000 * 15);
  					network.silent(url_by_title, function (json) {
  						if (json.data && json.data.length) display(json.data);
  						else display([]);
  					}, function (a, c) {
              _this2.doesNotAnswer();
            });
  				} else display([]);
  			}, function (a, c) {
          _this2.doesNotAnswer();
        });
  		};
  		
  		var kp_search = function kp_search() {
  			var url = API + 'KPfind/' + encodeURIComponent(query);
  			if(object.movie.imdb_id) url = API + 'KPimdb/' + encodeURIComponent(object.movie.imdb_id);
  			network.timeout(1000 * 15);
  			network.silent(url, function (json) {
  			  if (json.items && json.items.length) display(json.items);
  			  else if (json.films && json.films.length) display(json.films);
  			  else display([]);
  			}, function (a, c) {
  				vcdn_search();
  			});
  		};
  		
  	  var letgo = function letgo(imdb_id) {
  			if (['videocdn', 'videoapi'].indexOf(balanser) >= 0) vcdn_search();
  			else if(source.searchByKinopoisk) kp_search();
  			else if (imdb_id && source.searchByImdbID) {
          _this2.extendChoice();
          source.searchByImdbID(object, imdb_id);
        } else {
          var url = Protocol() +'videocdn.tv/api/short';
          url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
          var url_end = Lampa.Utils.addUrlComponent(url, imdb_id ? 'imdb_id=' + encodeURIComponent(imdb_id) : 'title=' + encodeURIComponent(query));
          network.timeout(1000 * 15);
          network["native"](url_end, function (json) {
            if (json.data && json.data.length) display(json);else {
              network["native"](Lampa.Utils.addUrlComponent(url, 'title=' + encodeURIComponent(query)), display.bind(_this2), kp_search());
            }
          }, kp_search());
        }
  		};
  	  
  	  if (source.searchByTitle) {
        this.extendChoice();
        source.searchByTitle(object, query);
  	  } else if (object.movie.imdb_id && source.searchByImdbID) {
        this.extendChoice();
        source.searchByImdbID(object, object.movie.imdb_id);
      } else if ((object.movie.kinopoisk_id || object.movie.kinopoisk_ID) && source.searchByKinopoisk) {
        this.extendChoice();
        source.searchByKinopoisk(object, object.movie.kinopoisk_id || object.movie.kinopoisk_ID);
  	  } else if (source.searchs) {
        this.extendChoice();
        source.searchs(object, object.movie.kinopoisk_id || object.movie.kinopoisk_ID || object.movie.imdb_id);
  	  } else if (object.movie.imdb_id) {
        letgo(object.movie.imdb_id);
      } else if (!object.movie.imdb_id && (object.movie.source == 'tmdb' || object.movie.source == 'cub')) {
        var tmdburl = (object.movie.name ? 'tv' : 'movie') + '/' + object.movie.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru';
        var baseurl = Lampa.TMDB.api(tmdburl);
        network.timeout(1000 * 10);
        network["native"](baseurl, function (ttid) {
  		    object.movie.imdb_id = ttid.imdb_id;
          letgo(ttid.imdb_id);
        }, function (a, c) {
          letgo();
        });
      } else letgo();
  	};
  	this.cleanTitle = function (str) {
      return str.replace(/[\s.,:;’'\`!?]+/g, ' ').trim();
    };
    this.normalizeTitle = function (str) {
      return this.cleanTitle(str.toLowerCase().replace(/—/g, '-').replace(/ё/g, 'е'));
    };
    this.equalTitle = function (t1, t2) {
      return typeof t1 === 'string' && typeof t2 === 'string' && this.normalizeTitle(t1) === this.normalizeTitle(t2);
    };
    this.containsTitle = function (str, title) {
      return typeof str === 'string' && typeof title === 'string' && this.normalizeTitle(str).indexOf(this.normalizeTitle(title)) !== -1;
    };
    this.parsePlaylist = function (str) {
  		var pl = [];
  		try {
  			if (str.charAt(0) === '[') {
  				str.substring(1).split(',[').forEach(function (item) {
  					if (item.endsWith(',')) item = item.substring(0, item.length - 1);
  					var label_end = item.indexOf(']');
  					if (label_end >= 0) {
  						var label = item.substring(0, label_end);
  						if (item.charAt(label_end + 1) === '{') {
  							item.substring(label_end + 2).split(';{').forEach(function (voice_item) {
  								if (voice_item.endsWith(';')) voice_item = voice_item.substring(0, voice_item.length - 1);
                  var voice_end = voice_item.indexOf('}');
  								if (voice_end >= 0) {
  									var voice = voice_item.substring(0, voice_end);
  									pl.push({
  										label: label,
  										voice: voice,
  										links: voice_item.substring(voice_end + 1).split(' or ')
  									});
  								}
  							});
  						} else {
  							pl.push({
  								label: label,
  								links: item.substring(label_end + 1).split(' or ')
  							});
  						}
  					}
  					return null;
  				});
  			}
  		} catch (e) {}
  		return pl;
  	};
  	this.parseM3U = function (str) {
      var pl = [];
  
      try {
        var width = 0;
        var height = 0;
        str.split('\n').forEach(function (line) {
          if (line.charAt(0) == '#') {
            var resolution = line.match(/\bRESOLUTION=(\d+)x(\d+)\b/);
  
            if (resolution) {
              width = parseInt(resolution[1]);
              height = parseInt(resolution[2]);
            }
          } else if (line.trim().length) {
            pl.push({
              width: width,
              height: height,
              link: line
            });
            width = 0;
            height = 0;
          }
        });
      } catch (e) {}
  
      return pl;
    };
    this.fixLink = function (link, proxy, referrer) {
      function startsWith(str, searchString) {
        return str.lastIndexOf(searchString, 0) === 0;
      }
      if (link) {
        if (!referrer || link.indexOf('://') !== -1) return proxy + link;
        var url = new URL(referrer);
        if (startsWith(link, '//')) return proxy + url.protocol + link;
        if (startsWith(link, '/')) return proxy + url.origin + link;
        if (startsWith(link, '?')) return proxy + url.origin + url.pathname + link;
        if (startsWith(link, '#')) return proxy + url.origin + url.pathname + url.search + link;
        var base = url.href.substring(0, url.href.lastIndexOf('/') + 1);
        return proxy + base + link;
      }

      return link;
    };
    this.proxyUrlCall = function (proxy_url, method, url, timeout, post_data, call_success, call_fail, withCredentials) {
      var process = function process() {
        if (proxyWindow[proxy_url]) {
          timeout = timeout || 60 * 1000;
          var message_id;

          try {
            message_id = crypto.getRandomValues(new Uint8Array(16)).toString();
          } catch (e) {}

          if (!message_id) message_id = Math.random().toString();
          proxyCalls[message_id] = {
            success: call_success,
            fail: call_fail
          };
          proxyWindow[proxy_url].postMessage({
            message: 'proxyMessage',
            message_id: message_id,
            method: method,
            url: url,
            timeout: timeout,
            post_data: post_data,
            withCredentials: withCredentials
          }, '*');
          setTimeout(function () {
            var call = proxyCalls[message_id];

            if (call) {
              delete proxyCalls[message_id];
              if (call.fail) call.fail({
                status: 0,
                statusText: 'timeout',
                responseText: ''
              }, 'timeout');
            }
          }, timeout + 1000);
        } else {
          if (call_fail) call_fail({
            status: 0,
            statusText: 'abort',
            responseText: ''
          }, 'abort');
        }
      };

      if (!proxyInitialized[proxy_url]) {
        proxyInitialized[proxy_url] = true;
        var proxyOrigin = proxy_url.replace(/(https?:\/\/[^\/]+)\/.*/, '$1');
        var proxyIframe = document.createElement('iframe');
        proxyIframe.setAttribute('src', proxy_url);
        proxyIframe.setAttribute('width', '0');
        proxyIframe.setAttribute('height', '0');
        proxyIframe.setAttribute('tabindex', '-1');
        proxyIframe.setAttribute('title', 'empty');
        proxyIframe.setAttribute('style', 'display:none');
        proxyIframe.addEventListener('load', function () {
          proxyWindow[proxy_url] = proxyIframe.contentWindow;
          window.addEventListener('message', function (event) {
            var data = event.data;

            if (event.origin === proxyOrigin && data && data.message === 'proxyResponse' && data.message_id) {
              var call = proxyCalls[data.message_id];

              if (call) {
                delete proxyCalls[data.message_id];

                if (data.status === 200) {
                  if (call.success) call.success(data.responseText);
                } else {
                  if (call.fail) call.fail({
                    status: data.status,
                    statusText: data.statusText,
                    responseText: data.responseText
                  });
                }
              }
            }
          });
          if (process) process();
          process = null;
        });
        document.body.appendChild(proxyIframe);
        setTimeout(function () {
          if (process) process();
          process = null;
        }, 10000);
      } else {
        process();
      }
    };
    this.proxyCall = function (method, url, timeout, post_data, call_success, call_fail, withCredentials) {
      var proxy_url = API.replace('api.', '').slice(0,-1) + '/proxy.html';
      this.proxyUrlCall(proxy_url, method, url, timeout, post_data, call_success, call_fail, withCredentials);
    };
    this.decodeHtml = function (html) {
      var text = document.createElement("textarea");
      text.innerHTML = html;
      return text.value;
    };
  	this.ReverseObject = function (Obj){
      var TempArr = [];
      var NewObj = {};
      for (var Key in Obj){
          TempArr.push(Key);
      }
      for (var i = TempArr.length-1; i >= 0; i--){
          NewObj[TempArr[i]] = Obj[TempArr[i]];
      }
      return NewObj;
    };
    this.getChoice = function (for_balanser) {
      var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
      var save = data[selected_id || object.movie.id] || {};
      Lampa.Arrays.extend(save, {
        season: 0,
        voice: 0,
        voice_name: '',
        voice_id: 0,
        episodes_view: {},
        movie_view: ''
      });
      return save;
    };
    this.extendChoice = function () {
      extended = true;
      source.extendChoice(this.getChoice());
    };
    this.saveChoice = function (choice, for_balanser) {
      var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
      data[selected_id || object.movie.id] = choice;
      Lampa.Storage.set('online_choice_' + (for_balanser || balanser), data);
      var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
      last_select_balanser[object.movie.id] = (for_balanser || balanser);
      Lampa.Storage.set('online_last_balanser', last_select_balanser);
    };
    this.similars = function (json) {
      var _this3 = this;
      json.forEach(function (elem) {
        var info = [];
        var year = ((elem.start_date || elem.year || '') + '').slice(0, 4);
      	var transl = elem.translations ? String(elem.translations).split(',').slice(0, 2) : '';
  			var count_s = elem.seasons_count ? elem.seasons_count + ' ' + Lampa.Lang.translate('torrent_serial_season').toLowerCase() + _this3.num_word(elem.seasons_count, ['', 'а', 'ов']) : '';
  			var count_eps = elem.episodes_count ? elem.episodes_count + ' эпизод' + _this3.num_word(elem.episodes_count, ['', 'а', 'ов']) : '';
        if (year) info.push(year);
  			if (elem.type) info.push(elem.type == 'serial' || elem.type == 'MINI_SERIES' ? ('Cериал' + (count_s && ' - ' + count_s + ' из них ' + count_eps)) : 
  			           elem.type == 'TV_SHOW' ? 'Тв-Шоу' : 
  			           elem.type == ('movie' || 'film' || 'FILM') ? 'Фильм' : elem.type);
  			if (transl) info.push(transl);
        if (elem.rating && elem.rating !== 'null' && elem.filmId) info.push(Lampa.Template.get('modss_online_rate', {
          rate: elem.rating
        }, true));
        if (elem.quality && elem.quality.length) info.push(elem.quality);
  
        if (elem.countries && elem.countries.length) {
          info.push((elem.filmId ? elem.countries.map(function (c) {
            return c.country;
          }) : elem.countries.map(function(c){
            return c.title || c;
          })).join(', '));
        }
  
        if (elem.categories && elem.categories.length) {
        //  info.push(elem.categories.slice(0, 4).join(', '));
        }
  
        var name = elem.title || elem.ru_title || elem.en_title || elem.nameRu || elem.nameEn;
        var orig = elem.orig_title || elem.nameEn || '';
        elem.title = name + (orig && orig !== name ? ' / ' + orig : '');
        elem.time = elem.filmLength || '';
        elem.info = info.join('<span class="online_modss-split">●</span>');
        var item = Lampa.Template.get('modss_online_folder', elem);
        item.on('hover:enter', function () {
          _this3.activity.loader(true);
  
          _this3.reset();
  
          object.search_date = year;
          selected_id = elem.id;
  
          _this3.extendChoice();
  
          var kinopoisk_id = elem.kp_id || elem.filmId;
  
          if (kinopoisk_id && source.searchByKinopoisk) {
            source.searchByKinopoisk(object, kinopoisk_id);
          } else if (source.search) {
            source.search(object, [elem]);
          } else {
            _this3.doesNotAnswer();
          }
        }).on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        scroll.append(item);
      });
    };
    this.clearImages = function () {
      images.forEach(function (img) {
        img.onerror = function () {};
  
        img.onload = function () {};
  
        img.src = '';
      });
      images = [];
    };
    this.reset = function () {
      last = false;
      clearInterval(balanser_timer);
      network.clear();
      this.clearImages();
      scroll.render().find('.empty').remove();
      scroll.clear();
    };
    this.loading = function (status) {
      if (status) this.activity.loader(true);else {
        this.activity.loader(false);
        this.activity.toggle();
      }
    };
    this.filter = function (filter_items, choice) {
      var _this4 = this;
      var select = [];
  
      var add = function add(type, title) {
        var need = _this4.getChoice();
        var items = filter_items[type];
        var subitems = [];
        var value = need[type];
        items.forEach(function (name, i) {
          subitems.push({
            title: name,
            selected: value == i,
            index: i
          });
        });
        select.push({
          title: title,
          subtitle: items[value],
          items: subitems,
          stype: type
        });
      };
  
      filter_items.source = filter_sources;
      choice.source = filter_sources.indexOf(balanser);
      select.push({
        title: Lampa.Lang.translate('torrent_parser_reset'),
        reset: true
      }, {
				title: Lampa.Lang.translate('modss_balanser'),
				subtitle: sources[balanser].name,
				bal: true
			});
      this.saveChoice(choice);
      if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
      if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
      if (filter_items.type && filter_items.type.length) add('type', Lampa.Lang.translate('filter_video_stream') + '');
  		if (filter_items.server && filter_items.server.length) add('server', Lampa.Lang.translate('filter_video_server') + '');
  		if (filter_items.order && filter_items.order.length) add('order', Lampa.Lang.translate('filter_series_order') + '');
  		
  		filter.set('filter', select);
      filter.set('sort', filter_sources.map(function (e, i) {
        var vip = i >= isVipBal ? true : false;
        var tpl = {
				  title: vip ? balansers[e] : balansers[e].split(' ')[0],
          source: e,
          selected: e == balanser, 
          ghost: vip
        };
        if(vip) {
          tpl.template = 'selectbox_icon';
          tpl.icon = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" viewBox="0 0 401.998 401.998" xml:space="preserve"><path d="M357.45 190.721c-5.331-5.33-11.8-7.993-19.417-7.993h-9.131v-54.821c0-35.022-12.559-65.093-37.685-90.218C266.093 12.563 236.025 0 200.998 0c-35.026 0-65.1 12.563-90.222 37.688-25.126 25.126-37.685 55.196-37.685 90.219v54.821h-9.135c-7.611 0-14.084 2.663-19.414 7.993-5.33 5.326-7.994 11.799-7.994 19.417V374.59c0 7.611 2.665 14.086 7.994 19.417 5.33 5.325 11.803 7.991 19.414 7.991H338.04c7.617 0 14.085-2.663 19.417-7.991 5.325-5.331 7.994-11.806 7.994-19.417V210.135c.004-7.612-2.669-14.084-8.001-19.414zm-83.363-7.993H127.909v-54.821c0-20.175 7.139-37.402 21.414-51.675 14.277-14.275 31.501-21.411 51.678-21.411 20.179 0 37.399 7.135 51.677 21.411 14.271 14.272 21.409 31.5 21.409 51.675v54.821z" fill="currentColor"></path></svg>'
        };
        return tpl;
      }));
      
      this.selected(filter_items);
    };
    this.closeFilter = function () {
      if ($('body').hasClass('selectbox--open')) Lampa.Select.close();
    };
    this.selected = function (filter_items) {
      var need = this.getChoice(), 
          select = [];
  
      for (var i in need) {
        if (filter_items[i] && filter_items[i].length) {
          if (i == 'voice') {
            select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
          } else if (i !== 'source') {
            if (filter_items.season.length >= 1) {
              select.push(filter_translate.season + ': ' + filter_items[i][need[i]]);
            }
          }
        }
      }
  
      filter.chosen('filter', select);
      filter.chosen('sort', [balanser]);
      this.new_seria();
    };
    this.getEpisodes = function (season, call) {
      var episodes = [];
      if (typeof object.movie.id == 'number' && object.movie.name) {
        var tmdburl = 'tv/' + object.movie.id + '/season/' + season + '?api_key=4ef0d7355d9ffb5151e987764708ce96&language=' + Lampa.Storage.get('language', 'ru');
        var baseurl = Lampa.TMDB.api(tmdburl);
        if(object.movie.source == 'pub') baseurl = Pub.baseurl+'v1/items/'+object.movie.id+'?access_token='+ Pub.token;
        network.timeout(1000 * 10);
        network["native"](baseurl, function (data) {
          if(object.movie.source == 'pub') {
            episodes = data.item.seasons.find(function (s){
              return s.number == season;
            });
            episodes = episodes && episodes.episodes || [];
          } else episodes = data.episodes || [];
          call(episodes);
        }, function (a, c) {
          call(episodes);
        });
      } else call(episodes);
    };
    this.append = function (item) {
      item.on('hover:focus', function (e) {
        last = e.target;
        scroll.update($(e.target), true);
      });
      scroll.append(item);
    };
    this.draw = function (items) {
      var _this4 = this;
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var choice = _this4.getChoice();
      if (!items.length) return this.empty();
      scroll.append(Lampa.Template.get('modss_online_watched', {}));
      this.updateWatched();
    
      this.getEpisodes((object.movie.source == 'pub' || balanser == 'pub') || (object.movie.original_language !== 'ja' || object.movie.number_of_seasons >= choice.seasons) ? items[0].season : 1, function (episodes) {
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var serial = object.movie.name ? true : false;
        var fully = window.innerWidth > 480;
        var scroll_to_element = false;
        var scroll_to_mark = false;
        
        var more = object.movie.original_language == 'ja' && episodes.length > items.length && (object.movie.number_of_seasons < choice.seasons)
        var ismore = true;
        if (more){
          var ep = more ? episodes.slice(items.length) : episodes;
          ismore = items[items.length-1].episode >= episodes[ep.length].episode_number;
          if(ismore) ep = episodes.slice(items.length-((episodes.length-items.length) < items.length-1 ? 2 : 1));
        }
        
        items.forEach(function (element, index) {
          var episode = serial && episodes.length && !params.similars ? ((ismore && more) ? ep : episodes).find(function (e, i) {
            return (ismore && more) ? index == i : ((e.episode_number || e.number) == element.episode);
          }) : false;
          var episodee = serial && episodes.length && !params.similars ? episodes.find(function (e, i) {
            return (e.episode_number || e.number) == element.episode;
          }) : false;
          
          var episode_num = element.episode || index + 1;
          var episode_last = choice.episodes_view[element.season];
          Lampa.Arrays.extend(element, {
            serv: '',
            info: '',
            quality: '',
            time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true)
          });
          var hash_timeline = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var hash_behold = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, element.voice_name].join('') : object.movie.original_title + element.voice_name);
          var data = {
            hash_timeline: hash_timeline,
            hash_behold: hash_behold
          };
          var info = [];
  
          if (element.season) {
            element.translate_episode_end = _this4.getLastEpisode(items);
            element.translate_voice = element.voice_name;
          }
  
          element.timeline = Lampa.Timeline.view(hash_timeline);
          
          if (episode) {
            element.title = (element.episode_name || episode.name || episode.title || element.title);
            if (!element.info && episode.vote_average) info.push(Lampa.Template.get('modss_online_rate', {
              rate: parseFloat(episode.vote_average + '').toFixed(1)
            }, true));
            if (episode.air_date && fully) info.push(Lampa.Utils.parseTime(episode.air_date).full);
          } else if (object.movie.release_date && object.movie.release_date.length > 4 && fully) {
            info.push(Lampa.Utils.parseTime(object.movie.release_date).full);
          }
  
          if (!serial && object.movie.tagline && element.info.length < 30) info.push(object.movie.tagline);
          if (element.info) info.push(element.info);
          if (info.length) element.info = info.map(function (i) {
            return '<span>' + i + '</span>';
          }).join('<span class="online_modss-split">●</span>');
          var html = Lampa.Template.get('modss_online_full', element);
          var loader = html.find('.online_modss__loader');
          var image = html.find('.online_modss__img');
  
          if (!serial) {
            if (choice.movie_view == hash_behold) scroll_to_element = html;
          } else if (typeof episode_last !== 'undefined' && episode_last == episode_num) {
            scroll_to_element = html;
    		    var cont = _this4.getChoice();
            if(Lampa.Storage.field('online_continued') && cont && cont.continued) { 
        			cont.continued = false;
        			_this4.saveChoice(cont);
        			_this4.extendChoice();
              setTimeout(function(){
        			  $(html).trigger('hover:enter');
        		  }, balanser == 'videocdn' ? 2000 : 50);
      			}
          }
          
          if (serial && element.episode) image.append('<div class="online_modss__episode-number-season">S' + (element.season || episode.snumber || episode.season_number || 0) + ':E' + (element.episode || episode.number || episode.episode_number || 0) + '</div>');
          if (serial && !episode) {
            image.append('<div class="online_modss__episode-number">' + ('0' + (element.episode || index + 1)).slice(-2) + '</div>');
            loader.remove();
          } else {
            var img = html.find('img')[0];
  
            img.onerror = function () {
              img.src = './img/img_broken.svg';
            };
  
            img.onload = function () {
              image.addClass('online_modss__img--loaded');
              loader.remove();
            };
            img.src = object.movie.source == 'filmix' ? object.movie.img : object.movie.source == 'pub' ? (episode && episode.thumbnail || object.movie.background_image) : Lampa.TMDB.image('t/p/w300' + (episode ? episode.still_path : object.movie.backdrop_path));
            images.push(img);
          }
  
          html.find('.online_modss__timeline').append(Lampa.Timeline.render(element.timeline));
          
          if (Lampa.Timeline.details) {
            html.find('.online_modss__timeline').append(Lampa.Timeline.details(element.timeline));
          }
  
          if (viewed.indexOf(hash_behold) !== -1) {
            scroll_to_mark = html;
            html.find('.online_modss__img').append('<div class="online_modss__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          }
  
          element.mark = function () {
            viewed = Lampa.Storage.cache('online_view', 5000, []);
  
            if (viewed.indexOf(hash_behold) == -1) {
              viewed.push(hash_behold);
              Lampa.Storage.set('online_view', viewed);
  
              if (html.find('.online_modss__viewed').length == 0) {
                html.find('.online_modss__img').append('<div class="online_modss__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
              }
            }
  
            choice = _this4.getChoice();
  
            if (!serial) {
              choice.movie_view = hash_behold;
            } else {
              choice.episodes_view[element.season] = episode_num;
            }
  
            _this4.saveChoice(choice);
            _this4.new_seria();
          };
          element.unmark = function () {
            viewed = Lampa.Storage.cache('online_view', 5000, []);
  
            if (viewed.indexOf(hash_behold) !== -1) {
              Lampa.Arrays.remove(viewed, hash_behold);
              Lampa.Storage.set('online_view', viewed);
              if(Lampa.Manifest.app_digital >= 177) Lampa.Storage.remove('online_view', hash_behold);
              html.find('.online_modss__viewed').remove();
              _this4.new_seria();
            }
          };
          element.timeclear = function () {
            element.timeline.percent = 0;
            element.timeline.time = 0;
            element.timeline.duration = 0;
            Lampa.Timeline.update(element.timeline);
            _this4.new_seria();
          };
  
          html.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            if (params.onEnter) params.onEnter(element, html, data);
          }).on('hover:focus', function (e) {
            last = e.target;
            if(['kinopub', 'collaps'].indexOf(balanser) >= 0){
              $('.voices').remove();
              $('.explorer-card__descr').hide().after('<div class="voices"></div>');
              //$('.explorer-card__descr').html(Lampa.Lang.translate('<b>#{torrent_parser_voice}:</b><br>' +element.voice));
              $('.voices').html(Lampa.Lang.translate('<b>#{torrent_parser_voice}:</b><br>' +element.voice));
            } 
            
            if (params.onFocus) params.onFocus(element, html, data);
            scroll.update($(e.target), true);
          });
          if (params.onRender) params.onRender(element, html, data);
  
          _this4.contextMenu({
            html: html,
            element: element,
            onFile: function onFile(call) {
              if (params.onContextMenu) params.onContextMenu(element, html, data, call);
            },
            onClearAllMark: function onClearAllMark() {
              items.forEach(function (elem) {
                elem.unmark();
              });
            },
            onClearAllTime: function onClearAllTime() {
              items.forEach(function (elem) {
                elem.timeclear();
              });
            }
          });
  
          scroll.append(html);
        });
        
        if (serial && object.movie.number_of_seasons >= choice.seasons && episodes.length > items.length && !params.similars) {
          var left = episodes.slice(items.length);
          left.forEach(function (episode) {
            var info = [];
            if (episode.vote_average) info.push(Lampa.Template.get('modss_online_rate', {
              rate: parseFloat(episode.vote_average + '').toFixed(1)
            }, true));
            if (episode.air_date) info.push(Lampa.Utils.parseTime(episode.air_date).full);
            var air = new Date((episode.air_date + '').replace(/-/g, '/'));
            var now = Date.now();
            var day = Math.round((air.getTime() - now) / (24 * 60 * 60 * 1000));
            var txt = Lampa.Lang.translate('full_episode_days_left') + ': ' + day;
            var html = Lampa.Template.get('modss_online_full', {
              time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true),
              info: info.length ? info.map(function (i) {
                return '<span>' + i + '</span>';
              }).join('<span class="online_modss-split">●</span>') : '',
              title: episode.name,
              quality: day > 0 ? txt : ''
            });
            html.css('opacity','0.3');
            
            var loader = html.find('.online_modss__loader');
            var image = html.find('.online_modss__img');
            var season = items[0] ? items[0].season : 1;
            html.find('.online_modss__timeline').append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([season, episode.episode_number, object.movie.original_title].join('')))));
            var img = html.find('img')[0];
  
            if (episode.still_path) {
              img.onerror = function () {
                img.src = './img/img_broken.svg';
              };
  
              img.onload = function () {
                image.addClass('online_modss__img--loaded');
                loader.remove();
                image.append('<div class="online_modss__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
              };
  
              img.src = Lampa.TMDB.image('t/p/w300' + episode.still_path);
              images.push(img);
            } else {
              loader.remove();
              image.append('<div class="online_modss__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
            }
  
            html.on('hover:focus', function (e) {
              last = e.target;
              scroll.update($(e.target), true);
            });
            scroll.append(html);
          });
        }
  
        if (scroll_to_element) {
          last = scroll_to_element[0];
        } else if (scroll_to_mark) {
          last = scroll_to_mark[0];
        }
  
        Lampa.Controller.enable('content');
      });
    };
    this.contextMenu = function (params) {
      params.html.on('hover:long', function () {
        function show(extra) {
          var enabled = Lampa.Controller.enabled().name;
          var menu = [];
  
          if (Lampa.Platform.is('webos')) {
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Webos',
              player: 'webos'
            });
          }
  
          if (Lampa.Platform.is('android')) {
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Android',
              player: 'android'
            });
          }
          
  
          menu.push({
            title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
            player: 'lampa'
          });
          menu.push({
            title: Lampa.Lang.translate('speedtest_button'),
            speed: true
          });
          menu.push({
            title: Lampa.Lang.translate('modss_video'),
            separator: true
          });
          menu.push({
            title: Lampa.Lang.translate('torrent_parser_label_title'),
            mark: true
          });
          menu.push({
            title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
            unmark: true
          });
          menu.push({
            title: Lampa.Lang.translate('time_reset'),
            timeclear: true
          });
  
          if (extra) {
            menu.push({
              title: Lampa.Lang.translate('copy_link'),
              copylink: true
            });
          }
  
          menu.push({
            title: Lampa.Lang.translate('more'),
            separator: true
          });
  
          if (Lampa.Account.logged() && params.element && typeof params.element.season !== 'undefined' && params.element.translate_voice) {
            menu.push({
              title: Lampa.Lang.translate('modss_voice_subscribe'),
              subscribe: true
            });
          }
  
          menu.push({
            title: Lampa.Lang.translate('modss_clear_all_marks'),
            clearallmark: true
          });
          menu.push({
            title: Lampa.Lang.translate('modss_clear_all_timecodes'),
            timeclearall: true
          });
          Lampa.Select.show({
            title: Lampa.Lang.translate('title_action'),
            items: menu,
            onBack: function onBack() {
              Lampa.Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              if (a.mark) params.element.mark();
              if (a.unmark) params.element.unmark();
              if (a.timeclear) params.element.timeclear();
              if (a.clearallmark) params.onClearAllMark();
              if (a.timeclearall) params.onClearAllTime();
              Lampa.Controller.toggle(enabled);
  
              if (a.player) {
                Lampa.Player.runas(a.player);
                params.html.trigger('hover:enter');
              }
              
              if (a.speed) {
                Modss.speedTest(extra.file && extra.file.url && extra.file.url || extra.stream && extra.stream || extra.file, {title:object.search, info:[params.element.title, params.element.quality].join(' - '), balanser: (['kinopub', 'hdr'].indexOf(balanser) >= 0 && params.element.info && params.element.info.split('<span class="online_modss-split">●</span>').pop() + ' - ' || '') + sources[balanser].name});
              }
  
              if (a.copylink) {
                if (extra.quality) {
                  var qual = [];
  
                  for (var i in extra.quality) {
                    qual.push({
                      title: i,
                      file: extra.quality[i]
                    });
                  }
  
                  Lampa.Select.show({
                    title: Lampa.Lang.translate('settings_server_links'),
                    items: qual,
                    onBack: function onBack() {
                      Lampa.Controller.toggle(enabled);
                    },
                    onSelect: function onSelect(b) {
                      Lampa.Utils.copyTextToClipboard(b.file, function () {
                        Lampa.Bell.push({
                          text: Lampa.Lang.translate('copy_secuses')
                        });
                      }, function () {
                        Lampa.Bell.push({
                          text: Lampa.Lang.translate('copy_error')
                        });
                      });
                    }
                  });
                } else {
                  Lampa.Utils.copyTextToClipboard(extra.file || extra.stream, function () {
                    Lampa.Bell.push({
                      text: Lampa.Lang.translate('copy_secuses')
                    });
                  }, function () {
                    Lampa.Bell.push({
                      text: Lampa.Lang.translate('copy_error')
                    });
                  });
                }
              }
  
              if (a.subscribe) {
                Lampa.Account.subscribeToTranslation({
                  card: object.movie,
                  season: params.element.season,
                  episode: params.element.translate_episode_end,
                  voice: params.element.translate_voice
                }, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('modss_voice_success'));
                }, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('modss_voice_error'));
                });
              }
            }
          });
        }
  
        params.onFile(show);
      }).on('hover:focus', function () {
        if (Lampa.Helper) {
          Lampa.Helper.show('online_file', Lampa.Lang.translate('helper_online_file'), params.html);
          Modss.showTooltip();
        }
      });
    };
    this.watched = function (set) {
      var file_id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title);
      var watched = Lampa.Storage.cache('online_watched_last', 5000, {});
  
      if (set) {
        if (!watched[file_id]) watched[file_id] = {};
        Lampa.Arrays.extend(watched[file_id], set, true);
        Lampa.Storage.set('online_watched_last', watched);
        this.updateWatched();
      } else {
        return watched[file_id];
      }
    };
    this.updateWatched = function () {
      var watched = this.watched();
      var body = scroll.body().find('.online-modss-watched .online-modss-watched__body').empty();
  
      if (watched) {
        var line = [];
        if (watched.balanser_name) line.push(watched.balanser_name);
        if (watched.voice_name) line.push(watched.voice_name);
        if (watched.season) line.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + watched.season);
        if (watched.episode) line.push(Lampa.Lang.translate('torrent_serial_episode') + ' ' + watched.episode);
        line.forEach(function (n) {
          body.append('<span>' + n + '</span>');
        });
      } else body.append('<span>' + Lampa.Lang.translate('online_no_watch_history') + '</span>');
    };
    this.empty = function (msg) {
      var empty = Lampa.Template.get('list_empty');
      if (msg) empty.find('.empty__descr').text(msg);
      scroll.append(empty);
      this.loading(false);
    };
    this.empty = function (er) {
      var html = Lampa.Template.get('modss_does_not_answer', {});
      html.find('.online-empty__buttons').remove();
      html.find('.online-empty__title').text(er && er.vip ? er.vip.title : Lampa.Lang.translate('empty_title_two'));
      html.find('.online-empty__time').text(er && er.vip ? er.vip.msg : er ? er: Lampa.Lang.translate('empty_text'));
      scroll.append(html);
      this.loading(false);
      var balanser = files.render().find('.filter--sort');
      Navigator.focus(balanser[0]);
    };
    this.doesNotAnswer = function (query) {
      console.log(typeof query, query,query && query.length);
      var _this6 = this;
      this.reset();
      var html = Lampa.Template.get('modss_does_not_answer', {
        title: (query && query.length) ? (Lampa.Lang.translate('online_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_query_end') + Lampa.Lang.translate('modss_balanser_dont_work_from')) : typeof query == 'object' ? Lampa.Lang.translate('modss_balanser_dont_work') + ' -> ' + query.error + ' (' + query.status + ')' : Lampa.Lang.translate('modss_balanser_dont_work'), 
        balanser: balansers[balanser]
      });
      var tic = 10;
      html.find('.cancel').on('hover:enter', function () {
        clearInterval(balanser_timer);
      });
      html.find('.change').on('hover:enter', function () {
        clearInterval(balanser_timer);
        filter.render().find('.filter--sort').trigger('hover:enter');
      });
      balanser_timer = setInterval(function () {
        tic--;
        html.find('.timeout').text(tic);
  
        if (tic == 0) {
          clearInterval(balanser_timer);
          var keys = Lampa.Arrays.getKeys(sources);
          var indx = keys.indexOf(balanser);
          var next = keys[indx + 1];
          if (!next) next = keys[0];
          balanser = next;
          if (Lampa.Activity.active().activity == _this6.activity) _this6.changeBalanser(balanser);
        }
      }, 1000);
      scroll.append(html);
      this.loading(false);
      Lampa.Controller.enable('content');
    };
    this.emptyForQuery = function (query) {
      this.empty(Lampa.Lang.translate('online_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_query_end'));
    };
    this.getLastEpisode = function (items) {
      var last_episode = 0;
      items.forEach(function (e) {
        if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
      });
      return last_episode;
    };
    this.new_seria = function () {
  		if (object.movie.number_of_seasons) {
  			setTimeout(function () {
  				$('.card--new_ser, .card--viewed, .full-start__right .time-line, .card--last_view').remove();
  				if ($('body').find('.online').length !== 0) {
  					if ($('body').find('.online:last-child .torrent-item__viewed').length == 1 || $('body').find('.online:last-child .time-line.hide').length == 0) $('body').find('.full-start__poster').append("<div class='card--viewed' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;top: 0.8em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate('online_viewed') + "</div>");
  					else $('body').find('.full-start__poster').append("<div class='card--new_ser' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;top: 0.8em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate('season_new') + " " + Lampa.Lang.translate('torrent_serial_episode') + "</div>");
  				}
  				Modss.last_view(object.movie);
  			}, 50);
  		}
  	};
    this.num_word = function (value, words) {
  		value = Math.abs(value) % 100;
  		var num = value % 10;
  		if (value > 10 && value < 20) return words[2];
  		if (num > 1 && num < 5) return words[1];
  		if (num == 1) return words[0];
  		return words[2];
  	};
    this.order = [{title: 'Стандартно', id: 'normal'}, {title: 'Инвертировать', id: 'invers'}];
    this.start = function () {
      var _this7 = this;
      if (Lampa.Activity.active().activity !== this.activity) return;
  
      if (!initialized) {
        initialized = true;
        this.initialize();
      }
  
      Lampa.Background.immediately(Lampa.Utils.cardImgBackgroundBlur(object.movie));
      Lampa.Controller.add('content', {
        toggle: function toggle() {
          Lampa.Controller.collectionSet(scroll.render(), files.render());
          Lampa.Controller.collectionFocus(last || false, scroll.render());
        },
        up: function up() {
          if (Navigator.canmove('up')) {
            Navigator.move('up');
          } else Lampa.Controller.toggle('head');
        },
        down: function down() {
          Navigator.move('down');
        },
        right: function right() {
          if (Navigator.canmove('right')) Navigator.move('right');
          else if (object.movie.number_of_seasons) filter.show(Lampa.Lang.translate('title_filter'), 'filter');
  				else filter.show(Lampa.Lang.translate('modss_balanser'), 'sort');
        },
        left: function left(){
          var poster = files.render().find('.explorer-card__head-img');
          if(poster.hasClass('focus')) Lampa.Controller.toggle('menu');
          else if(Navigator.canmove('left')) Navigator.move('left');
          else Navigator.focus(poster[0]);
        },
        gone: function gone() {
          clearInterval(balanser_timer);
        },
        back: this.back
      });
      Lampa.Controller.toggle('content');
    };
    this.render = function () {
      return files.render();
    };
    this.back = function () {
      Lampa.Activity.backward();
    };
    this.pause = function () {};
    this.stop = function () {};
    this.destroy = function () {
      network.clear();
      this.clearImages();
      files.destroy();
      scroll.destroy();
      clearInterval(balanser_timer);
      if (source) source.destroy();
    };
  }
	
  function forktv(object) {
  	var network = new Lampa.Reguest();
  	var scroll = new Lampa.Scroll({
  		mask: true,
  		over: true,
  		step: 250
  	});
  	var items = [];
  	var contextmenu_all = [];
  	var html = $('<div class="forktv"></div>');
  	var body = $('<div class="category-full"></div>');
  	var last;
  	var waitload = false;
  	var active = 0;
  	this.create = function () {
  		var _this = this;
  		this.activity.loader(true);
  		if (object.submenu) _this.build(object.url);
  		else {
  			var u = object.url && object.url.indexOf('?') > -1 ? '&' : '?';
  			network["native"](object.url + u + ForkTV.user_dev(), function (found) {
  				_this.build(found);
  			}, function (a, c) {
  				_this.build(a);
  				Lampa.Noty.show(network.errorDecode(a, c));
  			});
  		}
  		return this.render();
  	};
  	this.next = function (next_page_url) {
  		var _this2 = this;
  		if (waitload) return;
  		if (object.page < 90) {
  			waitload = true;
  			object.page++;
  			network["native"](next_page_url + '&' + ForkTV.user_dev(), function (result) {
  				_this2.append(result);
  				if (result.channels.length) waitload = false;
  				Lampa.Controller.enable('content');
  				_this2.activity.loader(false);
  			}, function (a, c) {
  				Lampa.Noty.show(network.errorDecode(a, c));
  			});
  		}
  	};
  	this.stream = function (data, title, youtube, subs, element, view) {
  		var _this = this;
  		if (data.indexOf('getstream') == -1 && (data.indexOf('rgfoot') > -1 || data.indexOf('torrstream') > -1 || data.indexOf('torrent') > -1)) {
  			this.activity.loader(true);
  			network.timeout(10000);
  			network["native"](data + '&' + ForkTV.user_dev(), function (json) {
  				_this.activity.loader(false);
  				if (json.channels.length > 0) {
  					var playlist = [];
  					var data = json.channels[0];
  					if (data.stream_url) {
  						var first = {
  							title: data.title,
  							url: data.stream_url,
  							timeline: view
  						};
  						if (json.channels.length > 1) {
  							json.channels.forEach(function (elem) {
  								playlist.push({
  									title: elem.title,
  									url: elem.stream_url
  								});
  							});
  						} else playlist.push(first);
  						if (playlist.length > 1) first.playlist = playlist;
  						Lampa.Player.play(first);
  						Lampa.Player.playlist(playlist);
  					} else Lampa.Noty.show(data.title);
  				} else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
  			}, function (a, e) {
  				_this.activity.loader(false);
  				Lampa.Noty.show(network.errorDecode(a, e));
  			}, false, {
  				dataType: 'json'
  			});
  		} else if (data && data.match(/magnet|videos|stream\\?|mp4|mkv|m3u8/i)) {
  			if (object.title == 'IPTV') {
  				Lampa.Activity.push({
  					url: data + '?' + ForkTV.user_dev(),
  					title: "MODS's TV",
  					component: 'modss_tv',
  					page: 1
  				});
  			} else {
  				var subtitles = [];
  				if (subs) {
  					subs.forEach(function (e) {
  						subtitles.push({
  							label: e[0],
  							url: e[1]
  						});
  					});
  				}
  				var playlist = [];
  				var first = {
  					title: title,
  					url: data,
  					subtitles: subtitles,
  					timeline: view
  				};
  				if (element.length > 1) {
  					JSON.parse(element).forEach(function (elem) {
  						if (elem.title.match('Описание|Торрент|Трейлер|Страны|Жанр|Похож|Модел|Студи|Катег|Превь|Тег|Порноз') == null) playlist.push({
  							title: elem.title,
  							url: elem.stream_url
  						});
  					});
  				} else playlist.push(first);
  				if (playlist.length > 1) first.playlist = playlist;
  				Lampa.Player.play(first);
  				Lampa.Player.playlist(playlist);
  			}
  		} else if (youtube) {
  			var id = youtube.split('=')[1];
  			if (Lampa.Platform.is('android')) Lampa.Android.openYoutube(id);
  			else _this.YouTube(id);
  		}
  	};
  	this.append = function (data) {
  		var _this3 = this;
  		var viewed = Lampa.Storage.cache('online_view', 5000, []);
  		var bg_img = JSON.stringify(data).replace('background-image', 'background_image');
  		bg_img = JSON.parse(bg_img);
  		bg_img.background_image && Lampa.Background.immediately(bg_img.background_image);
  		if (data.channels && data.channels.length == 0) {
  			Lampa.Noty.show('Ничего не найдено');
  		} else {
  			var json = data.channels && data.menu && data.menu.length > 0 && data.menu[0].title != 'Трейлер' && data.next_page_url && data.next_page_url.indexOf('page=1') > -1 ? data.menu.concat(data.channels) : (object.title == 'SerialHD' && data.next_page_url && data.next_page_url.split('page=')[1] != 2) ? data.channels.slice(1) : data.channels;
  			json = JSON.stringify(json).replace('<br \/>', '<br>').replace(/\)|\(|%20/g, '');
  			if (data.title == 'HDGO') {
  					[{
  					name: 'Быстрый доступ',
  					id: [0, 1, 2, 3]
  					}, {
  					name: 'Фильмы',
  					id: [4, 14,15,16,17]
  					}, {
  					name: 'Сериалы',
  					id: [5, 18,19,20,21,22]
  					}, {
  					name: 'Мультфильмы',
  					id: [6, 23,24,25]
  					}, {
  					name: 'Мультсериалы',
  					id: [7, 26,27,28,29]
  					}, {
  					name: 'Аниме',
  					id: [8, 30,31,32,33]
  					}, {
  					name: 'Тв-Шоу',
  					id: [9, 34, 35,36]
  					}, {
  					name: 'Док. Сериалы',
  					id: [10, 37,38,39]
  					}, {
  					name: 'Док. Фильмы',
  					id: [11, 40,41]
  					}].map(function (i) {
  					_this3.appendHdgo({
  						title: i.name,
  						results: JSON.parse(json).filter(function (element, id) {
  							if (i.id.indexOf(id) > -1) return element;
  						})
  					});
  				});
  			} else {
  				var element = JSON.parse(json)[0];
  				var infos = element.description ? element.description : element.template;
  				var voic = infos && infos.match(/Озвучка:(.*?)<br/) || infos && infos.match(/Перевод:(.*?)(<br|Разм|Обн|Реж|Вр|Фор)/) || '';
  				if (element.template && element.template.indexOf('film.') > -1 || element.logo_30x30 && element.logo_30x30.match('mediafil') || element.logo_30x30 && element.logo_30x30.match('folder') && element.playlist_url && element.playlist_url.indexOf('torrstream?magnet') > -1) {
  					var image = element.before && element.before.indexOf('src') > -1 ? $('img', element.before).attr('src') : element.template && element.template.indexOf('src') > -1 ? $('img', element.template).attr('src') : element.description && element.description.indexOf('src') > -1 ? $('img', element.description).attr('src') : element.logo_30x30 && element.logo_30x30.indexOf('png') > -1 ? element.logo_30x30 : element.details && element.details.poster ? element.details.poster : './img/icons/film.svg';
  					object.movie = {
  						img: image,
  						title: object.title,
  						original_title: '',
  						id: 1
  					};
  					var files = new Lampa.Files(object);
  					files.append(scroll.render());
  					html.append(files.render());
  					html.find('.selector').unbind('hover:enter').on('hover:enter', function () {
  						if (element.description || element.template) Lampa.Modal.open({
  							title: element.title,
  							size: 'medium',
  							html: $(element.description ? $(element.description).attr('style', '') : element.template),
  							onBack: function onBack() {
  								Lampa.Modal.close();
  								Lampa.Controller.toggle('content');
  							}
  						});
  					});
  				}
  				JSON.parse(json).forEach(function (element) {
  					var stream = element.stream_url ? element.stream_url : element.playlist_url;
  					if (element.title.match('Описание|Трейлер') == null) {
  						if (element.template && element.template.indexOf('film.') > -1 || element.logo_30x30 && element.logo_30x30.match('mediafil') || element.logo_30x30 && element.logo_30x30.match('folder') && element.playlist_url && element.playlist_url.indexOf('torrstream?magnet') > -1) {
  							body.attr('class', '');
  							scroll.body().addClass('torrent-list');
  							element.quality = (voic && voic[0]) || '';
  							element.info = '';
  							if (element.logo_30x30 && element.logo_30x30.match(/folder|mediafil/) && stream && stream.match(/torrstream\\?magnet|getstream|kinomix/)) {
  								var des = $(element.template || element.description).text();
  								var vo = des.match(/Озвучка(.*?)Вид/) || des.match(/Перевод:(.*?)Разм/);
  								var vid = des.match(/Видео[:](.*?)[|]/) || des.match(/Видео[:](.*?)Длит/) || des.match(/Видео(.*?)$/);
  								var sed_per = des.match(/Раздают:(.*?)Качают:(.*?)(Обн|Кач|Длит)/) || des.match(/Раздают:(.*?)\\s[|]\\sКачают:(.*?)(Обн|Кач|Длит)/);
  								var size1 = des.match(/t\/s(.*?)Озв/) || des.match(/Размер:(.*?)Разд/) || $(element.template || element.description).find('.trt-size').text();
  								var sizes = size1 && size1[1] || $(element.template || element.description).find('.trt-size').text();
  								element.quality = '';
  								if (sed_per || vid || sizes || vo) element.info = (sed_per ? '<b style="color:green">&#8679;' + parseInt(sed_per[1]) + '</b><b style="color:red">&#8659;' + parseInt(sed_per[2]) + '</b> - ' : '') + (vo ? vo[1] + ' / ' : '') + (sizes && ' <b>' + sizes + '</b><br><hr>' || '') + (vid ? vid[0].replace(/Аудио|Звук/, ' | Аудио') : '');
  							}
  							var card = Lampa.Template.get('onlines_v1', element);
  							var hash = Lampa.Utils.hash([element.title, element.ident, stream].join(''));
  							var view = Lampa.Timeline.view(hash);
  							var hash_file = Lampa.Utils.hash([element.title, element.ident, stream].join(''));
  							element.timeline = view;
  							card.append(Lampa.Timeline.render(view));
  							if (Lampa.Timeline.details) card.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
  							if (viewed.indexOf(hash_file) !== -1) card.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
  						} else {
  							var image = element.before && element.before.indexOf('src') > -1 ? $('img', element.before).attr('src') : element.template && element.template.indexOf('src') > -1 ? $('img', element.template).attr('src') : element.description && element.description.indexOf('src') > -1 ? $('img', element.description).attr('src') : element.logo_30x30 && element.logo_30x30.indexOf('png') > -1 ? element.logo_30x30 : element.details && element.details.poster ? element.details.poster : './img/icons/film.svg';
  							if (!element.search_on) {
  								var time = $($(element.description).children()[0]).parent().text();
  								time = time.match(/Продолжительность: (.*?)?./i);
  								time = time && time.shift() + ' - ' || '';
  								var descr = !element.ident && element.description && $($(element.description).children()[1]) ? $($(element.description).children()[1]).text().slice(0, 130) || $($(element.description).children()[0]).parent().text().slice(0, 130) : '';
  								var info = element.description ? element.description : element.template;
  								var voice = info && info.match(/Озвучка[:](.*?)(Субтит|<\/div><\/div>|<br)/) || info && info.match(/Перевод:(.*?)(<br|Разм|Обн|Реж|Вр|Фор)/) || '';
  								var size = info && info.match(/(Размер|Size):(.*?)<br/) || '';
  								var qual = info && info.match(/Качество:(.*?)<br/) || '';
  								var qual2 = qual ? qual[1].split(' ')[1] : voice ? voice[1] && voice[1].split('>')[2].trim().split(/,\\s|\\s/)[0] : '';
  								var rating = $(element.template).find('.a-r').text();
  								var peer = info && info.split(/<br[^>]*>|<\/div>/).find(function (itm) {
  									if (itm.match(/Качают|Скачивают|Leechers/)) return itm;
  								});
  								var seed = info && info.split(/<br[^>]*>|<\/div>/).find(function (itm) {
  									if (itm.match('Раздают|Seeders')) return itm;
  								});
  							}
  							var card = Lampa.Template.get('card', {
  								title: element.title || element.details && element.details.name,
  								release_year: (size && size[0] + ' | ') + voice && voice[1] ? (voice[1].indexOf(',') > -1 ? voice[1].split(',')[0] : voice[1]) : ''
  							});
  							if (rating) card.find('.card__view').append('<div class="card__type a-r' + (rating <= 5 ? ' b' : (rating >= 5 && rating <= 7) ? ' de' : ' g') + '" style="background-color: #ff9455;">' + rating + '</div>');
  							if (qual2) card.find('.card__view').append('<div class="card__quality">' + qual2 + '</div>');
  							if (seed) card.find('.card__view').append('<div class="card__type" style="background:none;font-size:1em;left:-.2em;top:-.5em"><b style="position:relative ;background: green;color: #fff;" class="card__type">' + parseInt(seed.match(/ \\d+/) ? seed.match(/ \\d+/)[0] : seed.match(/\\d+/)[0]) + '</b><b class="card__type" style="position:relative;background: #ff4242;color: #fff;left:-1em!important;border-bottom-left-radius: 0;border-top-left-radius: 0" class="info_peer">' + parseInt(peer.match(/ \\d+/) ? peer.match(/ \\d+/)[0] : peer.match(/\\d+/)[0]) + '</b></div>');
  							card.addClass(isNaN(element.ident) && (element.home || typeof element.details != 'undefined' || element.title == 'Все' || element.title.match(/Всі|Обновлен|жанры|сезон|Наше|Зарубеж|Женск|Муж|Отеч|Фил|Сериал|Мул|Худ/g) !== null || element.template && element.template.indexOf('svg') > -1 || element.logo_30x30 && element.logo_30x30.match(/ttv|right|succes|server|info|cloud|translate|error|trailer|uhd|webcam|mediafile|viewed|new|top|country|genre|similarmenu|filter/g) != null || stream && (stream.indexOf('browse') > -1 || stream.indexOf('viewforum') > -1 || stream.indexOf('me/list?actor=') > -1 || stream.indexOf('genre=') > -1) || element.playlist_url && element.playlist_url.indexOf('actor') == -1 && element.playlist_url && element.playlist_url.indexOf('voice?') == -1 && element.playlist_url && element.playlist_url.match(/cat=|page=|year=|list\\?direc|genre|list\\?actor|country/g) !== null || element.playlist_url && element.playlist_url.indexOf('view?id') == -1 && element.playlist_url && element.playlist_url.indexOf('stream?id') == -1 && element.playlist_url && element.playlist_url.indexOf('details?') == -1 && object.title.indexOf('HDGO') > -1 || element.logo_30x30 && element.logo_30x30.indexOf('webcam') > -1) ? 'card--collection' : 'card--category');
  							if (!data.landscape && !data.details && ((/iPhone|android/i.test(navigator.userAgent) || Lampa.Platform.is('android')))) card.addClass('mobile');
  							if (/iPhone|x11|nt/i.test(navigator.userAgent) && !Lampa.Platform.is('android')) card.addClass('pc');
  							if (/Mozilla/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent) || Lampa.Platform.tv()) card.addClass('tv');
  							if (data.details && !data.details.images && stream && stream.match(/subcategory|submenu|page=|year=|list\\?direc|genre|list\\?actor|country/g) !== null) card.addClass('mobiles');
  							if (element.description && element.description.indexOf('linear-gradientto') > -1 || data.landscape || data.next_page_url && data.next_page_url.indexOf('girl') > -1) card.addClass('nuam');
  							if (data.next_page_url && data.next_page_url.indexOf('girl') > -1 && stream.indexOf('vporn/list?cat')) card.addClass('card--category').removeClass('card--collection');
  							if (element.logo_30x30 && element.logo_30x30.match(/country|genre|filter|mediafolder/g) != null) card.addClass('hdgo');
  							if (element.logo_30x30 && element.logo_30x30.match(/\/folder\./g) && stream.match(/stream|magnet|view\?|view=|\/details/g)) card.addClass('mobile card--category').removeClass('card--collection');
  							if (element.logo_30x30 && element.logo_30x30.indexOf('/folder.') > -1 && stream.match(/view=/g)) card.addClass('card--category hdgo').removeClass('card--collection nuam mobile');
  							if (element.logo_30x30 && element.logo_30x30.match(/mediafolder/g)) card.addClass('card--category').removeClass('card--collection');
  							if (bg_img.background_image && bg_img.background_image.indexOf('18') > -1 && ((data.next_page_url && data.next_page_url.indexOf('girl') > -1) && stream.match(/pornst|models/g) !== null)) card.addClass('card--category').removeClass('nuam hdgo mobile card--collection');
  							if (image && image.indexOf('film.svg') > -1) card.addClass('card--collection nuam');
  							if (bg_img.background_image && bg_img.background_image.indexOf('18') > -1 && stream.match(/view\\?|hdporn|channel=/g)) card.addClass('card--collection').removeClass('nuam hdgo mobile card--category');
  							if (object.title.match(/Торренты|ForkTV|18\\+/g)) card.addClass('home');
  							if (element.logo_30x30 && element.logo_30x30.match(/country|genre|filter/g)) card.addClass('sort');
  							if ((stream && stream.match(/filmix\\?subcategory|rutor/) || element.submenu && element.submenu[0] && element.submenu[0].playlist_url && element.submenu[0].playlist_url.indexOf('rutor') > -1) && element.logo_30x30 && element.logo_30x30.match(/filter/g)) card.addClass('two');
  							if (element.title == 'Поиск' && (stream && stream.match(/coldfilm/) || object.title == 'SerialHD')) card.addClass('searc');
  							var img = card.find('img')[0];
  							img.onload = function () {
  								card.addClass('card--loaded');
  							};
  							img.onerror = function (e) {
  								img.src = './img/img_broken.svg';
  							};
  							var picture = image && image.indexOf('yandex') > -1 ? 'https://cors.eu.org/' + image : image && image.indexOf('svg') > -1 ? image : image;
  							img.src = image;
  						}
  						//console.log ('class', card[0].className, window.innerWidth)
  						card.on('hover:focus hover:touch', function () {
  							if (this.className.indexOf('card--category') > -1) {
  								if (Lampa.Helper) Lampa.Helper.show('online_file', 'Удерживайте клавишу (ОК) для просмотра описания', card);
  								//Lampa.Background.immediately(image);
  							}
  							last = card[0];
  							scroll.update(card, true);
  							var maxrow = Math.ceil(items.length / 7) - 1;
  							if (Math.ceil(items.indexOf(card) / 7) >= maxrow)
  								if (data.next_page_url) _this3.next(data.next_page_url);
  						}).on('hover:enter', function () {
  							if (stream || data.channels.length > 0) {
  								if (element.event || (stream && stream.match(/youtube|stream\\?|mp4|mkv|m3u8/i))) {
  									_this3.stream(stream, element.title, element.infolink || element.stream_url, element.subtitles, json, view);
  									if (viewed.indexOf(hash_file) == -1) {
  										viewed.push(hash_file);
  										card.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
  										Lampa.Storage.set('online_view', viewed);
  									}
  								} else if (element.search_on) {
  									Lampa.Input.edit({
  										value: element.playlist_url.indexOf('newserv') > -1 && Lampa.Storage.get('server_ip') ? Lampa.Storage.get('server_ip') : '',
  										free: true
  									}, function (new_value) {
  										if (new_value == '') {
  											Lampa.Controller.toggle('content');
  											return;
  										}
  										if (element.playlist_url.indexOf('newserv') > -1) Lampa.Storage.set('server_ip', new_value);
  										var query = element.playlist_url.indexOf('newserv') > -1 ? Lampa.Storage.get('server_ip') : new_value;
  										var u = element.playlist_url && element.playlist_url.indexOf('?') > -1 ? '&' : '/?';
  										network["native"](element.playlist_url + u + 'search=' + query + '&' + ForkTV.user_dev(), function (json) {
  											if (json.channels && json.channels[0].title.indexOf('по запросу') > -1) {
  												if (json.channels.length == 0) {
  													Lampa.Controller.toggle('content');
  													return;
  												}
  												Lampa.Modal.open({
  													title: '',
  													size: 'medium',
  													html: Lampa.Template.get('error', {
  														title: 'Ошибка',
  														text: json.channels[0].title
  													}),
  													onBack: function onBack() {
  														Lampa.Modal.close();
  														Lampa.Controller.toggle('content');
  													}
  												});
  											} else {
  												Lampa.Activity.push({
  													title: element.title,
  													url: json,
  													submenu: true,
  													component: 'forktv',
  													page: 1
  												});
  											}
  										});
  									});
  								} else if (stream == '' || image.indexOf('info.png') > -1) {
  									Lampa.Modal.open({
  										title: element.title,
  										size: 'medium',
  										html: $('<div style="font-size:4vw">' + $(element.description)[0].innerHTML + '</div>'),
  										onBack: function onBack() {
  											Lampa.Modal.close();
  											Lampa.Controller.toggle('content');
  										}
  									});
  								} else if (stream) {
  									var goto = function goto() {
  										var title = /*stream == 'submenu' ? element.submenu && element.submenu[0].title : */ element.details && element.details.title ? element.details.title : element.title && element.title.indexOf('l-count') > -1 ? element.title.split(' ').shift() : element.details && element.details.name ? element.details.name : element.title;
  										//console.log (element.submenu)
  										var url = stream == 'submenu' ? {
  											channels: element.submenu
  										} : stream;
  										Lampa.Activity.push({
  											title: title,
  											url: url,
  											submenu: stream == 'submenu',
  											component: 'forktv',
  											page: 1
  										});
  									};
  									if (element.title == '18+' && Lampa.Storage.get('mods_password')) {
  										Lampa.Input.edit({
  											value: "",
  											title: "Введите пароль доступа",
  											free: true,
  											nosave: true
  										}, function (t) {
  											if (Lampa.Storage.field('mods_password') == t) goto();
  											else {
  												Lampa.Noty.show('Неверный пароль.');
  												Lampa.Controller.toggle('content');
  											}
  										});
  									} else goto();
  								} else if (element.description && element.description.indexOf('доступа') > -1) {
  									ForkTV.checkAdd('content');
  								}
  							}
  						}).on('hover:long', function () {
  							if (stream && stream.match('bonga|chatur|rgfoot') == null && stream.match(/stream\\?|mp4|mkv|m3u8/i)) {
  								_this3.contextmenu({
  									item: card,
  									view: view,
  									viewed: viewed,
  									hash_file: hash_file,
  									file: stream
  								});
  							}
  							if ((element.template || element.description) && stream && stream.match('torrstream|getstream|mp4|kinomix') == null && stream.match(/viewtube|details|season|view\\?|voice|magnet|stream\\?id|mp4|m3u8/i) && (element.description || element.template)) {
  								Lampa.Modal.open({
  									title: element.title,
  									size: 'medium',
  									html: $(element.description ? $(element.description).attr('style', '') : element.template),
  									onBack: function onBack() {
  										Lampa.Modal.close();
  										Lampa.Controller.toggle('content');
  									}
  								});
  							}
  						});
  						body.append(card);
  						items.push(card);
  					}
  				});
  			}
  		}
  	};
  	this.build = function (data) {
  		if (data && data.channels && data.channels.length) {
  			scroll.minus();
  			html.append(scroll.render());
  			this.append(data);
  			scroll.append(body);
  			this.activity.toggle();
  		} else {
  			this.activity.toggle();
  			html.append(scroll.render());
  			this.empty();
  		}
  		this.activity.loader(false);
  	};
  	this.createHdGO = function (data) {
  		var content = Lampa.Template.get('items_line', {
  			title: data.title
  		});
  		var body = content.find('.items-line__body');
  		var scroll = new Lampa.Scroll({
  			horizontal: true,
  			step: 300
  		});
  		var items = [];
  		var active = 0;
  		var last;
  		this.create = function () {
  			scroll.render().find('.scroll__body').addClass('items-cards');
  			content.find('.items-line__title').text(data.title);
  			data.results.forEach(this.append.bind(this));
  			body.append(scroll.render());
  		};
  		this.item = function (data) {
  			var item = Lampa.Template.get('hdgo_item', {
  				title: data.title
  			});
  			if (/iPhone|x11|nt|Mozilla/i.test(navigator.userAgent) || Lampa.Platform.tv()) item.addClass('card--collection').find('.card__age').remove();
  			if (/iPhone|x11|nt/i.test(navigator.userAgent) && !Lampa.Platform.is('android')) item.addClass('hdgo pc');
  			if (Lampa.Platform.tv()) item.addClass('hdgo tv');
  			var logo = data.logo_30x30 ? data.logo_30x30 : data.template && data.template.indexOf('src') > -1 ? $('img', data.template).attr('src') : 'img/actor.svg';
  			var img = item.find('img')[0];
  			img.onerror = function () {
  				img.src = './img/img_broken.svg';
  			};
  			img.src = logo;
  			this.render = function () {
  				return item;
  			};
  			this.destroy = function () {
  				img.onerror = function () {};
  				img.onload = function () {};
  				img.src = '';
  				item.remove();
  			};
  		};
  		this.append = function (element) {
  			var _this = this;
  			var item$1 = new _this.item(element);
  			item$1.render().on('hover:focus hover:touch', function () {
  				scroll.render().find('.last--focus').removeClass('last--focus');
  		    item$1.render().addClass('last--focus');

  				last = item$1.render()[0];
  				active = items.indexOf(item$1);
  				scroll.update(items[active].render(), true);
  			}).on('hover:enter', function () {
  				if (element.search_on) {
  					Lampa.Input.edit({
  						value: '',
  						free: true
  					}, function (new_value) {
  						var query = new_value;
  						var u = element.playlist_url && element.playlist_url.indexOf('?') > -1 ? '&' : '/?';
  						network["native"](element.playlist_url + u + 'search=' + query + '&' + ForkTV.user_dev(), function (json) {
  							if (json.channels[0].title.indexOf('Нет результатов') == -1) {
  								Lampa.Activity.push({
  									title: element.title,
  									url: json,
  									submenu: true,
  									component: 'forktv',
  									page: 1
  								});
  							} else {
  								Lampa.Modal.open({
  									title: '',
  									size: 'medium',
  									html: Lampa.Template.get('error', {
  										title: 'Ошибка',
  										text: json.channels[0].title
  									}),
  									onBack: function onBack() {
  										Lampa.Modal.close();
  										Lampa.Controller.toggle('content');
  									}
  								});
  							}
  						});
  					});
  				} else {
  					Lampa.Activity.push({
  						title: element.title,
  						url: element.playlist_url,
  						submenu: false,
  						component: 'forktv',
  						page: 1
  					});
  				}
  			});
  			scroll.append(item$1.render());
  			items.push(item$1);
  		};
  		this.toggle = function () {
  			var _this = this;
  			Lampa.Controller.add('hdgo_line', {
  				toggle: function toggle() {
  					Lampa.Controller.collectionSet(scroll.render());
  					Lampa.Controller.collectionFocus(last || false, scroll.render());
  				},
  				right: function right() {
  					Navigator.move('right');
  					Lampa.Controller.enable('hdgo_line');
  				},
  				left: function left() {
  					if (Navigator.canmove('left')) Navigator.move('left');
  					else if (_this.onLeft) _this.onLeft();
  					else Lampa.Controller.toggle('menu');
  				},
  				down: this.onDown,
  				up: this.onUp,
  				gone: function gone() {},
  				back: this.onBack
  			});
  			Lampa.Controller.toggle('hdgo_line');
  		};
  		this.render = function () {
  			return content;
  		};
  		this.destroy = function () {
  			Lampa.Arrays.destroy(items);
  			scroll.destroy();
  			content.remove();
  			items = null;
  		};
  	};
  	this.appendHdgo = function (data) {
  		var _this = this;
  		var item = new _this.createHdGO(data);
  		item.create();
  		item.onDown = this.down.bind(this);
  		item.onUp = this.up.bind(this);
  		item.onBack = this.back.bind(this);
  		scroll.append(item.render());
  		items.push(item);
  	};
  	this.YouTube = function (id) {
  		var player, html$7, timer$1;
  
  		function create$f(id) {
  			html$7 = $('<div class="youtube-player"><div id="youtube-player"></div><div id="youtube-player__progress" class="youtube-player__progress"></div></div>');
  			$('body').append(html$7);
  			player = new YT.Player('youtube-player', {
  				height: window.innerHeight,
  				width: window.innerWidth,
  				playerVars: {
  					'controls': 0,
  					'showinfo': 0,
  					'autohide': 1,
  					'modestbranding': 1,
  					'autoplay': 1
  				},
  				videoId: id,
  				events: {
  					onReady: function onReady(event) {
  						event.target.playVideo();
  						update$2();
  					},
  					onStateChange: function onStateChange(state) {
  						if (state.data == 0) {
  							Lampa.Controller.toggle('content');
  						}
  					}
  				}
  			});
  		}
  
  		function update$2() {
  			timer$1 = setTimeout(function () {
  				var progress = player.getCurrentTime() / player.getDuration() * 100;
  				$('#youtube-player__progress').css('width', progress + '%');
  				update$2();
  			}, 400);
  		}
  
  		function play(id) {
  			create$f(id);
  			Lampa.Controller.add('youtube', {
  				invisible: true,
  				toggle: function toggle() {},
  				right: function right() {
  					player.seekTo(player.getCurrentTime() + 10, true);
  				},
  				left: function left() {
  					player.seekTo(player.getCurrentTime() - 10, true);
  				},
  				enter: function enter() {},
  				gone: function gone() {
  					destroy$2();
  				},
  				back: function back() {
  					Lampa.Controller.toggle('content');
  				}
  			});
  			Lampa.Controller.toggle('youtube');
  		}
  
  		function destroy$2() {
  			clearTimeout(timer$1);
  			player.destroy();
  			html$7.remove();
  			html$7 = null;
  		}
  		play(id);
  	};
  	this.contextmenu = function (params) {
  		var _this = this;
  		contextmenu_all.push(params);
  		var enabled = Lampa.Controller.enabled().name;
  		var menu = [{
  			title: Lampa.Lang.translate('torrent_parser_label_title'),
  			mark: true
  			}, {
  			title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
  			clearmark: true
  			}, {
  			title: Lampa.Lang.translate('online_title_clear_all_mark'),
  			clearmark_all: true
  			}, {
  			title: Lampa.Lang.translate('time_reset'),
  			timeclear: true
  			}, {
  			title: Lampa.Lang.translate('online_title_clear_all_timecode'),
  			timeclear_all: true
  			}, {
  			title: Lampa.Lang.translate('copy_link'),
  			copylink: true
  			}];
  		if (Lampa.Platform.is('webos')) {
  			menu.push({
  				title: Lampa.Lang.translate('player_lauch') + ' - Webos',
  				player: 'webos'
  			});
  		}
  		if (Lampa.Platform.is('android')) {
  			menu.push({
  				title: Lampa.Lang.translate('player_lauch') + ' - Android',
  				player: 'android'
  			});
  		}
  		menu.push({
  			title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
  			player: 'lampa'
  		});
  		Lampa.Select.show({
  			title: Lampa.Lang.translate('title_action'),
  			items: menu,
  			onBack: function onBack() {
  				Lampa.Controller.toggle(enabled);
  			},
  			onSelect: function onSelect(a) {
  				if (a.clearmark) {
  					Lampa.Arrays.remove(params.viewed, params.hash_file);
  					Lampa.Storage.set('online_view', params.viewed);
  					params.item.find('.torrent-item__viewed').remove();
  				}
  				if (a.clearmark_all) {
  					contextmenu_all.forEach(function (params) {
  						Lampa.Arrays.remove(params.viewed, params.hash_file);
  						Lampa.Storage.set('online_view', params.viewed);
  						params.item.find('.torrent-item__viewed').remove();
  					});
  				}
  				if (a.mark) {
  					if (params.viewed.indexOf(params.hash_file) == -1) {
  						params.viewed.push(params.hash_file);
  						params.item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
  						Lampa.Storage.set('online_view', params.viewed);
  					}
  				}
  				if (a.timeclear) {
  					params.view.percent = 0;
  					params.view.time = 0;
  					params.view.duration = 0;
  					Lampa.Timeline.update(params.view);
  					Lampa.Arrays.remove(params.viewed, params.hash_file);
  					params.item.find('.torrent-item__viewed').remove();
  					Lampa.Storage.set('online_view', params.viewed);
  				}
  				if (a.timeclear_all) {
  					contextmenu_all.forEach(function (params) {
  						params.view.percent = 0;
  						params.view.time = 0;
  						params.view.duration = 0;
  						Lampa.Timeline.update(params.view);
  						Lampa.Arrays.remove(params.viewed, params.hash_file);
  						params.item.find('.torrent-item__viewed').remove();
  						Lampa.Storage.set('online_view', params.viewed);
  					});
  				}
  				Lampa.Controller.toggle(enabled);
  				if (a.player) {
  					Lampa.Player.runas(a.player);
  					params.item.trigger('hover:enter');
  				}
  				if (a.copylink) {
  					Lampa.Utils.copyTextToClipboard(params.file, function () {
  						Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
  					}, function () {
  						Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
  					});
  				}
  			}
  		});
  	};
  	this.empty = function () {
  		var empty = new Lampa.Empty();
  		scroll.append(empty.render());
  		this.start = empty.start;
  		this.activity.loader(false);
  		this.activity.toggle();
  	};
  	this.start = function () {
  		Lampa.Controller.add('content', {
  			toggle: function toggle() {
  				if (object.title == 'HDGO' && items.length) {
  					items[active].toggle();
  				} else {
  					Lampa.Controller.collectionSet(scroll.render(), html);
  					Lampa.Controller.collectionFocus(last || false, scroll.render());
  				}
  			},
  			left: function left() {
  				if (Navigator.canmove('left')) {
  					Navigator.move('left');
  				} else Lampa.Controller.toggle('menu');
  			},
  			right: function right() {
  				Navigator.move('right');
  			},
  			up: function up() {
  				if (Navigator.canmove('up')) Navigator.move('up');
  				else Lampa.Controller.toggle('head');
  			},
  			down: function down() {
  				if (Navigator.canmove('down')) Navigator.move('down');
  			},
  			back: this.back
  		});
  		Lampa.Controller.toggle('content');
  	};
  	this.down = function () {
  		active++;
  		active = Math.min(active, items.length - 1);
  		items[active].toggle();
  		scroll.update(items[active].render());
  	};
  	this.up = function () {
  		active--;
  		if (active < 0) {
  			active = 0;
  			Lampa.Controller.toggle('head');
  		} else {
  			items[active].toggle();
  		}
  		scroll.update(items[active].render());
  	};
  	this.back = function () {
  		Lampa.Activity.backward();
  	};
  	this.pause = function () {};
  	this.stop = function () {};
  	this.render = function () {
  		return html;
  	};
  	this.destroy = function () {
  		network.clear();
  		scroll.destroy();
  		html.remove();
  		body.remove();
  		network = null;
  		items = null;
  		html = null;
  		body = null;
  	};
  }
	
	function collection(object) {
  	var network = new Lampa.Reguest();
  	var scroll = new Lampa.Scroll({
  		mask: true,
  		over: true,
  		step: 250
  	});
  	var items = [];
  	var html = $('<div></div>');
  	var body = $('<div class="category-full"></div>');
  	var cors = object.sour == 'rezka' || object.sourc == 'rezka' ? '' : object.sour == 'filmix' || object.sourc == 'filmix' ? '' + Protocol() + 'cors.lampa.stream/' : '';
  	var cache = Lampa.Storage.cache('my_colls', 5000, {});
  	var info;
  	var last;
  	var waitload = false;
  	var relises = [];
  	var total_pages;
  	var _this1 = this;
  	this.create = function () {
  		var _this = this;
  		var url;
  		if (object.sourc == 'my_coll') {
  			_this.build({
  				card: cache
  			});
  		} else {
  			if (object.card && isNaN(object.id)) url = object.id;
  			else if (object.sourc == 'pub') {
  				if (object.search) url = object.url + '?title=' + object.search + '&sort=views-&access_token=' + Pub.token;
  				else url = object.url + '?sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
  			} else if (object.sourc == 'rezka') url = object.url + '?filter=last';
				else url = object.url;
				
  			if ((object.page == 1 && object.card_cat) || object.cards || (!object.card && !Lampa.Storage.field('light_version') && object.card_cat)) {
  				this.activity.loader(true);
  				network.silent(cors + url, function (str) {
  					var data = _this.card(str);
  					_this.build(data);
  					if (object.card) $('.head__title').append(' - ' + data.card.length);
  				}, function (a, c) {
  					_this.empty(network.errorDecode(a, c));
  				}, false, {
  					dataType: 'text'
  				});
  			} else _this.build(object.data);
  		}
  		return this.render();
  	};
  	this.next = function (page) {
  		var _this2 = this;
  		var url;
  		if (total_pages == 0 || total_pages == page) waitload = true;
  		if (waitload) return;
  		waitload = true;
  		object.page++;
  		network.clear();
  		network.timeout(1000 * 40);
  		if (typeof page == 'undefined') return;
  		if (object.sourc == 'pub' && object.sour !== 'rezka') url = object.url + '?page=' + object.page + '&sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
  		else if ((object.sourc == 'rezka' || object.sour == 'rezka') && object.data && object.data.page) url = object.data.page;
  		else url = page.replace(/(\d+)\/\?filter/, object.page+'/?filter');
		  /* removed anti-tamper reload */
							});
						});
						if(Lampa.Storage.field('parser_use')) {
							item.show();
							if(Boolean(Modss.jack[Lampa.Storage.get('jackett_url2')])) $('.settings-param__name', item).before('<div class="settings-param__status one '+(Modss.jack[Lampa.Storage.get('jackett_url2')].ok ? "active" : "error")+'"></div>');
							$('[data-name="jackett_url"] .settings-param__name').before('<div class="settings-param__status wait act"></div>');
							$('.settings-param__name', item).css('color','#f3d900');
							$('div[data-name="jackett_url2"]').insertAfter('div[data-children="parser"]');
							Modss.check($('.settings-param__value', item).text().toLowerCase().replace(/\./g,'_'), function(e){
								Modss.check(Lampa.Storage.get('jackett_url'));
								$($('.settings-param__status', item)).removeClass('active error wait').addClass(e ? 'active' : 'error');
							});
						} else item.hide();
					}, 50);
				}
			});
		}

		function addButton(data) {
			cards = data;
			Modss.serialInfo(cards);
			Modss.online();
			Modss.rating_kp_imdb(cards).then(function (e) {
				
			})['catch'](function(e){
				
			});
			$('.view--torrent').addClass('selector').empty().append('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" width="48px" height="48px"><path d="M 23.501953 4.125 C 12.485953 4.125 3.5019531 13.11 3.5019531 24.125 C 3.5019531 32.932677 9.2467538 40.435277 17.179688 43.091797 L 17.146484 42.996094 L 7 16 L 15 14 C 17.573 20.519 20.825516 32.721688 27.728516 30.929688 C 35.781516 28.948688 28.615 16.981172 27 12.076172 L 34 11 C 38.025862 19.563024 39.693648 25.901226 43.175781 27.089844 C 43.191423 27.095188 43.235077 27.103922 43.275391 27.113281 C 43.422576 26.137952 43.501953 25.140294 43.501953 24.125 C 43.501953 13.11 34.517953 4.125 23.501953 4.125 z M 34.904297 29.314453 C 34.250297 34.648453 28.811359 37.069578 21.943359 35.517578 L 26.316406 43.763672 L 26.392578 43.914062 C 33.176993 42.923925 38.872645 38.505764 41.660156 32.484375 C 41.603665 32.485465 41.546284 32.486418 41.529297 32.486328 C 38.928405 32.472567 36.607552 31.572967 34.904297 29.314453 z"/></svg><span>' + Lampa.Lang.translate('full_torrents') + '</span>');
			$('.view--trailer').empty().append("<svg enable-background='new 0 0 512 512' id='Layer_1' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path fill='currentColor' d='M260.4,449c-57.1-1.8-111.4-3.2-165.7-5.3c-11.7-0.5-23.6-2.3-35-5c-21.4-5-36.2-17.9-43.8-39c-6.1-17-8.3-34.5-9.9-52.3   C2.5,305.6,2.5,263.8,4.2,222c1-23.6,1.6-47.4,7.9-70.3c3.8-13.7,8.4-27.1,19.5-37c11.7-10.5,25.4-16.8,41-17.5   c42.8-2.1,85.5-4.7,128.3-5.1c57.6-0.6,115.3,0.2,172.9,1.3c24.9,0.5,50,1.8,74.7,5c22.6,3,39.5,15.6,48.5,37.6   c6.9,16.9,9.5,34.6,11,52.6c3.9,45.1,4,90.2,1.8,135.3c-1.1,22.9-2.2,45.9-8.7,68.2c-7.4,25.6-23.1,42.5-49.3,48.3   c-10.2,2.2-20.8,3-31.2,3.4C366.2,445.7,311.9,447.4,260.4,449z M205.1,335.3c45.6-23.6,90.7-47,136.7-70.9   c-45.9-24-91-47.5-136.7-71.4C205.1,240.7,205.1,287.6,205.1,335.3z'/></g></svg><span>" + Lampa.Lang.translate('full_trailers') + "</span>");
		}

		if(Lampa.Activity.active() && Lampa.Activity.active().component == 'full'){
			if(!Lampa.Activity.active().activity.render().find('.view--modss_online').length){
				addButton(Lampa.Activity.active().card);
			}
		}
		Lampa.Listener.follow('full', function (e) {
			if (e.type == 'complite') {
				addButton(e.data.movie);
			}
		});
		Lampa.Listener.follow('activity', function (e) { 
			if (e.component == 'full' && e.type == 'start') { 
				var button = Lampa.Activity.active().activity.render().find('.view--modss_online');
				if(button.length) {
					cards = e.object.card;
					Modss.online(button);
					Modss.last_view(e.object.card);
				}
			}
		});
		Lampa.Storage.listener.follow('change', function (e) {
		  //if(e.name == 'jackett_key' || e.name == 'jackett_url') Modss.check(e.value);
		});
		Lampa.Settings.listener.follow('open', function (e) {
			if (e.name == 'main') {
			
				if (Lampa.Settings.main().render().find('[data-component="pub_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'pub_param',
						name: 'KinoPub',
						icon: '<svg viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zM13 14.6H8.6c-.3 0-.5.2-.5.5v4.2H6V4.7h7c2.7 0 5 2.2 5 5 0 2.7-2.2 4.9-5 4.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path><path d="M13 6.8H8.6c-.3 0-.5.2-.5.5V12c0 .3.2.5.5.5H13c1.6 0 2.8-1.3 2.8-2.8.1-1.6-1.2-2.9-2.8-2.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="fork_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'fork_param',
						name: 'ForkTV',
						icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="rezka_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'rezka_param',
						name: 'HDRezka',
						icon: '<svg height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="filmix_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'filmix_param',
						name: 'Filmix',
						icon: '<svg height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="modss_tv_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'modss_tv_param',
						name: 'Modss-TV',
						icon: '<svg height="57px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="modss_online_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'modss_online_param',
						name: 'Modss-Online',
						icon: '<svg height="57px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="modss_radio_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'modss_radio_param',
						name: 'Modss-Radio',
						icon: '<svg height="57px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>'
					});
				}
				Lampa.Settings.main().update();
				Lampa.Settings.main().render().find('[data-component="modss_radio_param"], [data-component="modss_online_param"], [data-component="filmix"], [data-component="rezka_param"], [data-component="pub_param"], [data-component="filmix_param"], [data-component="fork_param"], [data-component="modss_tv_param"]').addClass('hide');
				
				var interfaceElement = Lampa.Settings.main().render().find('div[data-component="account"]');
				var settingsElement = Lampa.Settings.main().render().find('div[data-component="settings_modss"]');

				interfaceElement.after(settingsElement);

			}
			if (e.name == 'mods_proxy') {
				$('.settings__title').text(Lampa.Lang.translate('title_proxy') + " MODS's");
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{online_proxy_title_descr}</div>', '</div>', '</div>'].join('');
				e.body.find('[data-name="mods_proxy_all"]').before(Lampa.Lang.translate(ads));
			} else $('.settings__title').text(Lampa.Lang.translate('menu_settings'));
			if (e.name == 'fork_param') $('.settings__title').append(" ForkTV");
			if (e.name == 'filmix_param') {
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{filmix_info_descr}</div>', '</div>', '</div>'].join('');
				e.body.find('[data-static="true"]:eq(0)').after(Lampa.Lang.translate(ads));
				$('.settings__title').append(" Filmix");
			}
			if (e.name == 'pub_param') {
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{info_pub_descr} <span style="color: #24b4f9">kino.pub</span></div>', '</div>', '</div>'].join('');
				e.body.find('[data-static="true"]:eq(0)').after(Lampa.Lang.translate(ads));
				$('.settings__title').append(" KinoPub");
			}
			if (e.name == 'modss_online_param') {
			  $('.settings__title').text("MODS's Online");
			  var title = $('[data-name="priority_balanser"] .settings-param__value', e.body);
			  title.text(title.text().split('<').shift());
			}
			if (e.name == 'modss_radio_param') {
			  $('.settings__title').text("MODS's Radio");
			}
			if (e.name == 'settings_modss') {
			  $('.settings__title').text("MODS's ");
			  var title = $('[data-name="priority_balanser"] .settings-param__value', e.body);
			  title.text(title.text().split('<').shift());
			}
			if (e.name == 'parser') FreeJaketOpt();
			
		});
		if (Lampa.Manifest.app_digital >= 177) {
			Lampa.Storage.sync('my_colls', 'object_object');
			Lampa.Storage.sync('fav_chns', 'object_object');
			Lampa.Storage.sync('online_watched_last', 'object_object');
			
			var balansers_sync = ["lumex","videx","filmix","kinopub","hdr","fxpro","mango","alloha","filmix","kinopub","kodik","aniliberty","eneida","uakino","hdrezka","hdvb","iremux","kinotochka","lumex","videx","zetflix","veoveo","anilibria","hdfilmtr","bazon","cdnmovies","collaps","kinobase","hydraflix","kinokrad","kinofit","seasonvar","videodb","voidboost"];
			balansers_sync.forEach(function (name) {
				Lampa.Storage.sync('online_choice_' + name, 'object_object');
			});
		}
		function add() {
			Modss.init();
			$('body').append(Lampa.Template.get('modss_styles', {}, true));
			$('body').append(Lampa.Template.get('hdgo_style', {}, true));
			$('body').append(Lampa.Template.get('mods_radio_style', {}, true));
			$('body').append(Lampa.Template.get('modss_online_css', {}, true));
			$('body').append(Lampa.Template.get('radio_style_modss', {}, true));
      
			//	Lampa.Storage.set('guide', '');
			setTimeout(function () {
				//if (window.innerHeight > 700 && Lampa.Storage.field('guide') == 'undefined') guide();
			}, 3000);
			
			
			Lampa.SettingsApi.addComponent({
				component: 'settings_modss',
				name: "MODS's ",
				icon: "<svg viewBox='0 0 24 24' xml:space='preserve' xmlns='https://www.w3.org/2000/svg'><path d='M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zm-2.1 16.4c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1V8.4l-3.2 5.4-.1.1-.1.1h-.6s-.1 0-.1-.1l-.1-.1-3-5.4v8.5h1c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1V7.1h-1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1.7c.1 0 .2.1.2.2l3.7 6.2 3.7-6.2.2-.2h1.7c.3 0 .5.2.5.5s-.2.5-.5.5h-1v9.8h1z' fill='#ffffff' class='fill-000000'></path></svg>"
			});
			
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_status',
					type: 'title'
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:3em;height:2.3em;margin-top:-.5em;padding-right:.5em"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z"></path><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 5.5v7h2v-7h-2zm-.285 0H8.601l-1.497 4.113L5.607 8.5H3.493l2.611 6.964h2L10.715 8.5zm5.285 5h1.5a2.5 2.5 0 1 0 0-5H14v7h2v-2zm0-2v-1h1.5a.5.5 0 1 1 0 1H16z" fill="#ffffff" class="fill-000000"></path></svg></div><div style="font-size:1.3em">Не подключён</div></div>',
					description: '❇️ <b>💻 Windows NT 10.0 (x64)</b><br><br>⚠️ <span style="font-weight:700;color:#ffda00">Не вошли в аккаунт или не верный email</span><br><br><div class="ad-server" style="margin: 0em 0em;"><div class="ad-server__text">Для активации <b style="color: #ffd402;">Vip</b> статуса перейдите в телеграм бот</div><img src="http://lampa.stream/group.png" class="ad-server__qr"><div class="ad-server__label">@modssmy_bot</div></div>'
				},
				onRender: function (item) {
					setTimeout(function () {
						var parts = leftVipD.match(/(💎)?(\d+)(.*)/);
						if (!parts) return;
						var numberPart = parts[2];
						var textPart = parts[3].trim();
						$('#modss_left').html(numberPart);
						$('#modss_left_text').html(textPart);
					}, 100);
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_password',
					type: 'static', //доступно select,input,trigger,title,static
					placeholder: Lampa.Lang.translate('placeholder_password'),
					values: '',
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_parent_contr'),
					description: Lampa.Lang.translate('placeholder_password')
				},
				onRender: function (item) {
					function pass() {
						Lampa.Input.edit({
							value: '' + Lampa.Storage.get('mods_password') + '',
							free: true,
							nosave: true
						}, function (t) {
							Lampa.Storage.set('mods_password', t);
							Lampa.Settings.update();
						});
					}
					item.on('hover:enter', function () {
						if (Lampa.Storage.get('mods_password')) Lampa.Input.edit({
							value: '',
							title: 'Введите старый пароль',
							free: true,
							nosave: true
						}, function (t) {
							if (t == Lampa.Storage.get('mods_password')) pass();
							else Lampa.Noty.show('Неверный пароль');
						});
						else pass();
					});
					if (Lampa.Storage.get('mods_password')) item.find('.settings-param__descr').text('Изменить пароль');
					else item.find('.settings-param__descr').text(Lampa.Lang.translate('placeholder_password'));
				},
				onChange: function (value) {
					if (value) $('body').find('.settings-param__descr').text('Изменить пароль');
					else $('body').find('.settings-param__descr').text(Lampa.Lang.translate('placeholder_password'));
				}
			});
			        //Add-ons
        Lampa.SettingsApi.addParam({
            component: 'settings_modss',
            param: {
                name: 'mods_onl',
                type: 'trigger', //доступно select,input,trigger,title,static
                default: true
            },
            field: {
                name: Lampa.Lang.translate('params_pub_on') + ' online ' + Lampa.Lang.translate('modss_title_online').toLowerCase(),
                description: Lampa.Lang.translate('onl_enable_descr')
            },
            onChange: function (value) {
                if (cards) Modss.online(value == "true" ? false : 'delete');
                Lampa.Settings.update();
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'settings_modss',
            param: {
                name: 'modss_online_param',
                type: 'static', //доступно select,input,trigger,title,static
                default: true
            },
            field: {
                name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg></div><div style="font-size:1.3em">Online</div></div>'
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) {
                    item.show();
                } else item.hide();

                item.on('hover:enter', function () {
                    Lampa.Settings.create('modss_online_param');
                    Lampa.Controller.enabled().controller.back = function () {
                        Lampa.Settings.create('settings_modss');
                        setTimeout(function () {
                            Navigator.focus($('body').find('[data-static="true"]:eq(1)')[0]);
                        }, 100);
                    }
                });
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'modss_online_param',
            param: {
                name: 'priority_balanser',
                type: 'select', //доступно select,input,trigger,title,static
                values: Modss.balansers(),
                default: Modss.balansPrf
            },
            field: {
                name: Lampa.Lang.translate('title_prioriry_balanser'),
                description: Lampa.Lang.translate('title_prioriry_balanser_descr')
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) item.show();
                else item.hide();
            },
            onChange: function (values) {
                var title = $('body').find('[data-name="priority_balanser"] .settings-param__value');
                title.text(title.text().split('<').shift());
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'modss_online_param',
            param: {
                name: 'online_but_first',
                type: 'trigger', //доступно select,input,trigger,title,static
                default: true
            },
            field: {
                name: Lampa.Lang.translate('title_online_first_but'),
            },
            onChange: function (item) {
                Lampa.Storage.set('full_btn_priority', '');
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) item.show();
                else item.hide();
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'modss_online_param',
            param: {
                name: 'online_continued',
                type: 'trigger', //доступно select,input,trigger,title,static
                default: false
            },
            field: {
                name: Lampa.Lang.translate('title_online_continued'),
                description: Lampa.Lang.translate('title_online_descr')
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) item.show();
                else item.hide();
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'modss_online_param',
            param: {
                name: 'online_dash',
                type: 'trigger', //доступно select,input,trigger,title,static
                default: false
            },
            field: {
                name: Lampa.Lang.translate('online_dash'),
                description: Lampa.Lang.translate('modss_balanser') + ' Collaps'
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) item.show();
                else item.hide();
            }
        });
			        //Filmix
        Lampa.SettingsApi.addParam({
            component: 'modss_online_param',
            param: {
                name: 'filmix_param',
                type: 'static', //доступно select,input,trigger,title,static
                default: true
            },
            field: {
                name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg height="26" width="26" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg></div><div style="font-size:1.3em">Filmix</div></div>',
                description: ' '
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) {
                    item.show();
                    $('.settings-param__name', item).before('<div class="settings-param__status"></div>');
                    Filmix.checkPro(Filmix.token);
                    Filmix.showStatus(item);
                } else item.hide();
                item.on('hover:enter', function () {
                    Lampa.Settings.create('filmix_param');
                    Lampa.Controller.enabled().controller.back = function () {
                        Lampa.Settings.create('modss_online_param');
                        setTimeout(function () {
                            Navigator.focus($('body').find('[data-static="true"]:eq(0)')[0]);
                        }, 100);
                    }
                });
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'filmix_param',
            param: {
                name: 'filmix_status',
                type: 'title', //доступно select,input,trigger,title,static
                default: ''
            },
            field: {
                name: '<b style="color:#fff">' + Lampa.Lang.translate('title_status') + '</b>',
                description: ' '
            },
            onRender: function (item) {
                $('.settings-param__descr', item).before('<div class="settings-param__status"></div>');
                Filmix.showStatus(item);
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'filmix_param',
            param: {
                name: 'filmix_add',
                type: 'static', //доступно select,input,trigger,title,static
                default: ''
            },
            field: {
                name: Lampa.Lang.translate('filmix_params_add_device') + ' Filmix',
                description: Lampa.Lang.translate('pub_auth_add_descr')
            },
            onRender: function (item) {
                item.on('hover:enter', function () {
                    Filmix.add_new();
                });
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'filmix_param',
            param: {
                name: 'filmix_token',
                type: 'input', //доступно select,input,trigger,title,static
                values: '',
                placeholder: Lampa.Lang.translate('filmix_param_placeholder'),
                default: ''
            },
            field: {
                name: Lampa.Lang.translate('filmix_param_add_title'),
                description: Lampa.Lang.translate('filmix_param_add_descr')
            },
            onChange: function (value) {
                if (value) {
                    Filmix.checkPro(value, true);
                    Filmix.token = value;
                } else {
                    Lampa.Storage.set("filmix_status", {});
                    Filmix.token = Lampa.Storage.get('filmix_token', 'aaaabbbbccccddddeeeeffffaaaabbbb');
                    Filmix.showStatus();
                }
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'filmix_param',
            param: {
                name: 'filmix_token_clear',
                type: 'static', //доступно select,input,trigger,title,static
                default: ''
            },
            field: {
                name: 'Очистить токен',
                description: 'Уберет привязку в Lampa'
            },
            onRender: function (item) {
                if (Lampa.Storage.field('filmix_status')) item.show(); else item.hide();

                item.on('hover:enter', function () {
                    Lampa.Noty.show('Токен очищен');
                    Lampa.Storage.set("filmix_token", '');
                    Lampa.Storage.set("filmix_status", {});
                    Filmix.token = Lampa.Storage.get('filmix_token', 'aaaabbbbccccddddeeeeffffaaaabbbb');
                    $('[data-name="filmix_token"] .settings-param__value').text('');
                    Filmix.showStatus();
                });
            }
        });
				//Pub
	Lampa.SettingsApi.addParam({
		component: 'modss_online_param',
		param: {
			name: 'pub_param',
			type: 'static', //доступно select,input,trigger,title,static
			default: true
		},
		field: {
			name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg height="26" width="26" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zM13 14.6H8.6c-.3 0-.5.2-.5.5v4.2H6V4.7h7c2.7 0 5 2.2 5 5 0 2.7-2.2 4.9-5 4.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path><path d="M13 6.8H8.6c-.3 0-.5.2-.5.5V12c0 .3.2.5.5.5H13c1.6 0 2.8-1.3 2.8-2.8.1-1.6-1.2-2.9-2.8-2.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path></svg></div><div style="font-size:1.3em">KinoPub</div></div>',
			description: Lampa.Lang.translate('filmix_nodevice')
		},
		onRender: function (item) {
			if (Lampa.Storage.field('mods_onl')) {
				item.show();
				$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
				Pub.userInfo(item, true);
			} else item.hide();
			item.on('hover:enter', function () {
				Lampa.Settings.create('pub_param');
				Lampa.Controller.enabled().controller.back = function () {
					Lampa.Settings.create('modss_online_param');
					setTimeout(function () {
						Navigator.focus($('body').find('[data-static="true"]:eq(1)')[0]);
					}, 100);
				};
			});
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_auth',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: ' ',
			description: ' ',
		},
		onRender: function (item) {
			$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
			Pub.userInfo(item);
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_auth_add',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: Lampa.Lang.translate('filmix_params_add_device') + ' KinoPub',
			description: Lampa.Lang.translate('pub_auth_add_descr')
		},
		onRender: function (item) {
			item.on('hover:enter', function () {
				Pub.Auth_pub();
			});
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_speed',
			type: 'static', //доступно select,input,trigger,title,static
		},
		field: {
			name: 'SpeedTest',
			description: 'Выбор лучшего сервера KinoPub'
		},
		onRender: function (item) {
			item.on('hover:enter', function () {
				Lampa.Iframe.show({
					url: Protocol() + 'zamerka.com/',
					onBack: function onBack() {
						Lampa.Controller.toggle('settings_component');
					}
				});
			});
			if (!Lampa.Storage.field('mods_onl')) item.hide();
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_parametrs',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: Lampa.Lang.translate('title_settings'),
			description: Lampa.Lang.translate('descr_pub_settings')
		},
		onRender: function (item) {
			if (!Lampa.Storage.get('logined_pub')) item.hide();
			item.on('hover:enter', function () {
				Pub.info_device();
			});
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_source',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: Lampa.Lang.translate('params_pub_add_source'),
			description: Lampa.Lang.translate('params_pub_add_source_descr')
		},
		onRender: function (item) {
			item.on('hover:enter', function () {
				Lampa.Noty.show(Lampa.Lang.translate('pub_source_add_noty'));
				Lampa.Storage.set('source', 'pub');
			});
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_del_device',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: Lampa.Lang.translate('params_pub_dell_device'),
			description: Lampa.Lang.translate('params_pub_dell_descr')
		},
		onRender: function (item) {
			if (Pub.token.indexOf('bt6r3') == 0) item.hide();
			item.on('hover:enter', function () {
				Pub.delete_device(function () {
					Lampa.Settings.create('pub_param');
				});
			});
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_clear_tocken',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: Lampa.Lang.translate('params_pub_clean_tocken')
		},
		onRender: function (item) {
			item.on('hover:enter', function () {
				Lampa.Storage.set('pub_access_token', Pub.token);
				Lampa.Storage.set('logined_pub', 'false');
				Lampa.Noty.show('Cleared');
				Lampa.Settings.update();
			});
		}
	});

      		Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_title',
					type: 'title', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_addons')
				}
			});

      		
      		            //ForkTV
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_fork',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_pub_on') + ' ForkTV',
					description: Lampa.Lang.translate('fork_enable_descr')
				},
				onChange: function (value) {
					if (value) ForkTV.check_forktv('', true);
					Lampa.Settings.update();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'fork_param',
					type: 'static', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-alpha-f-box-outline" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9,7H15V9H11V11H14V13H11V17H9V7M3,5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5M5,5V19H19V5H5Z" /></svg></div><div style="font-size:1.3em">ForkTV</div></div>',
					description: Lampa.Lang.translate('filmix_nodevice')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_fork')) {
						item.show();
						$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
						ForkTV.check_forktv(item, true);
					} else item.hide();
					item.on('hover:enter', function () {
						Lampa.Settings.create('fork_param');
						Lampa.Controller.enabled().controller.back = function(){
							Lampa.Settings.create('settings_modss');
							setTimeout(function() {
								Navigator.focus($('body').find('[data-static="true"]:eq(3)')[0]);
							}, 100);
						}
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'forktv_url',
					type: 'static' //доступно select,input,trigger,title,static
				},
				field: {
					name: ForkTV.url,
					description: Lampa.Lang.translate('filmix_nodevice')
				},
				onRender: function (item) {
					$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
					ForkTV.check_forktv(item, false);
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'ForkTV_add',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Storage.get('ForkTv_cat') ? Lampa.Lang.translate('title_fork_edit_cats') : Lampa.Lang.translate('title_fork_add_cats'),
					description: ''
				},
				onRender: function (item) {
					if (Lampa.Storage.get('forktv_auth')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function () {
						ForkTV.check_forktv(item);
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'ForkTV_clear',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_fork_clear'),
					description: Lampa.Lang.translate('title_fork_clear_descr')
				},
				onRender: function (item) {
					if (Lampa.Storage.get('forktv_auth')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function () {
						Lampa.Storage.set('ForkTv_cat', '');
						Lampa.Noty.show(Lampa.Lang.translate('title_fork_clear_noty'));
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'ForkTV_clearMac',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_fork_reload_code'),
					description: ' '
				},
				onRender: function (item) {
					item.on('hover:enter', function () {
						ForkTV.updMac(item);
					});
				}
			});
      		            //Radio
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_radio',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_radio_enable'),
					description: Lampa.Lang.translate('params_radio_enable_descr')
				},
				onChange: function (value) {
					Modss.radio();
					Lampa.Settings.update();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'modss_radio_param',
					type: 'static', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg width="38" height="31" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="17.613" width="3" height="16.3327" rx="1.5" transform="rotate(63.4707 17.613 0)" fill="currentColor"></rect><circle cx="13" cy="19" r="6" fill="currentColor"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M0 11C0 8.79086 1.79083 7 4 7H34C36.2091 7 38 8.79086 38 11V27C38 29.2091 36.2092 31 34 31H4C1.79083 31 0 29.2091 0 27V11ZM21 19C21 23.4183 17.4183 27 13 27C8.58173 27 5 23.4183 5 19C5 14.5817 8.58173 11 13 11C17.4183 11 21 14.5817 21 19ZM30.5 18C31.8807 18 33 16.8807 33 15.5C33 14.1193 31.8807 13 30.5 13C29.1193 13 28 14.1193 28 15.5C28 16.8807 29.1193 18 30.5 18Z" fill="currentColor"></path></svg></div><div style="font-size:1.3em">Modss Radio</div></div>'
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_radio')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function () {
						Lampa.Settings.create('modss_radio_param');
						Lampa.Controller.enabled().controller.back = function(){
							Lampa.Settings.create('settings_modss');
							setTimeout(function() {
								Navigator.focus($('body').find('[data-static="true"]:eq(4)')[0]);
							}, 100);
						}
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_radio_param',
				param: {
					name: 'modssdm_use_aac',
					type: 'trigger',
					default: false
				},
				field: {
					name: Lampa.Lang.translate('modssfm_use_aac_title'),
					description: Lampa.Lang.translate('modssfm_use_aac_desc')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_radio')) item.show();
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_radio_param',
				param: {
					name: 'modssfm_show_info',
					type: 'trigger',
					default: true
				},
				field: {
					name: Lampa.Lang.translate('modssfm_show_info_title'),
					description: Lampa.Lang.translate('modssfm_show_info_desc')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_radio')) item.show();
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_radio_param',
				param: {
					name: 'modssfm_fetch_covers',
					type: 'trigger',
					default: true
				},
				field: {
					name: Lampa.Lang.translate('modssfm_fetch_covers_title'),
					description: Lampa.Lang.translate('modssfm_fetch_covers_desc')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_radio')) item.show();
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_radio_param',
				param: {
					name: 'modssfm_show_analyzer',
					type: 'select',
					values: {
						hide: 'Не показывать',
						line: 'Линейний',
						ball: 'Шар'
					},
					default: 'ball'
				},
				field: {
					name: Lampa.Lang.translate('modssfm_show_analyzer_title'),
					description: Lampa.Lang.translate('modssfm_show_analyzer_desc')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_radio')) item.show();
					else item.hide();
				}
			});
			
			//Collection
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_collection',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_pub_on') + ' ' + Lampa.Lang.translate('menu_collections').toLowerCase(),
					description: Lampa.Lang.translate('params_collections_descr')
				},
				onChange: function (value) {
					if (value == 'true') Modss.collections();
					else $('body').find('.menu [data-action="collection"]').remove();
				}
			});
			//Styles
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_title',
					type: 'title', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('params_styles_title')
				}
			});

			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_snow',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: 'Снег'
				},
				onChange: function (value) {
					Modss.snow();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_rating',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_enable_rating'),
					description: Lampa.Lang.translate('title_enable_rating_descr')
				},
				onChange: function (value) {
					if (value == 'true') {
  				  		$('body').find('.rate--kp, .rate--imdb').removeClass('hide');
						Modss.rating_kp_imdb(cards);
					} else $('body').find('.rate--kp, .rate--imdb').addClass('hide');
  				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_serial_info',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_info_serial'),
					description: Lampa.Lang.translate('title_info_serial_descr')
				},
				onChange: function (value) {
					if (value == 'true' && $('body').find('.full-start__poster').length) Modss.serialInfo(cards);
					else $('body').find('.files__left .time-line, .card--last_view, .card--new_seria').remove();
				}
			});
			/*if (/iPhone|iPad|iPod|android|x11/i.test(navigator.userAgent) || (Lampa.Platform.is('android') && window.innerHeight < 1080)) {
				Lampa.SettingsApi.addParam({
					component: 'settings_modss',
					param: {
						name: 'mods_butt_back',
						type: 'trigger', //доступно select,input,trigger,title,static
						default: false
					},
					field: {
						name: Lampa.Lang.translate('title_add_butback'),
						description: Lampa.Lang.translate('title_add_butback_descr')
					},
					onChange: function (value) {
						Lampa.Settings.update();
						if (value == 'true') Modss.buttBack();
						else $('body').find('.elem-mobile-back').remove();
					}
				});
				Lampa.SettingsApi.addParam({
					component: 'settings_modss',
					param: {
						name: 'mods_butt_pos',
						type: 'select', //доступно select,input,trigger,title,static
						values: {
							right: Lampa.Lang.translate('buttback_right'),
							left: Lampa.Lang.translate('buttback_left')
						},
						default: 'right'
					},
					field: {
						name: Lampa.Lang.translate('title_butback_pos'),
					},
					onRender: function (item) {
						if (Lampa.Storage.field('mods_butt_back')) item.show();
						else item.hide();
					},
					onChange: function (value) {
						Modss.buttBack(value);
					}
				});
			}*/
		  	
			//Close_app 
			if (Lampa.Platform.is('android')) {
				Lampa.SettingsApi.addComponent({
					component: 'mods_exit',
					name: Lampa.Lang.translate('title_close_app'),
					icon: '<svg data-name="Layer 1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><rect height="46" rx="4" ry="4" width="46" x="1" y="1" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" class="stroke-1d1d1b"></rect><path d="m12 12 24 24M12 36l24-24" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" class="stroke-1d1d1b"></path></svg>'
				});
				Lampa.SettingsApi.addParam({
					component: 'mods_exit',
					param: {
						name: 'close_app',
						type: 'static', //доступно select,input,trigger,title,static
						default: true
					},
					field: {
						name: ''
					},
					onRender: function (item) {
						Lampa.Android.exit();
					}
				});
			}
			FreeJaketOpt();
		}
		
		if (window.appready) add();else {
			Lampa.Listener.follow('app', function (e) {
				if (e.type == 'ready') add();
			});
    	}
		
				function url$1(u) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			if (params.genres) u = add$4(u, 'genre=' + params.genres);
			if (params.page) u = add$4(u, 'page=' + params.page);
			if (params.query) u = add$4(u, 'q=' + params.query);
			if (params.type) u = add$4(u, 'type=' + params.type);
			if (params.field) u = add$4(u, 'field=' + params.field);
			if (params.id) u = add$4(u, 'actor=' + params.id);
			if (params.perpage) u = add$4(u, 'perpage=' + params.perpage);
			u = add$4(u, 'access_token=' + Pub.token);
			if (params.filter) {
				for (var i in params.filter) {
					u = add$4(u, i + '=' + params.filter[i]);
				}
			}
			return Pub.baseurl + u;
		}
		function add$4(u, params) {
			return u + (/\?/.test(u) ? '&' : '?') + params;
		}
		function get$6(method, call) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
			var onerror = arguments.length > 3 ? arguments[3] : undefined;
			var u = url$1(method, params);
			Pub.network.silent(u, function (json) {
				json.url = method;
				oncomplite(json);
			}, onerror);
		}
		function tocard(element) {
			return {
				url: '',
				id: element.id,
				type: element.type,
				title: element.title.split('/')[0],
				promo_title: element.title.split('/')[0],
				original_title: element.title.split('/')[1] || element.title,
				release_date: (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
				first_air_date: element.type == 'serial' || element.type == 'docuserial' || element.type == 'tvshow' ? element.year : '',
				vote_averagey: parseFloat((element.imdb_rating || 0) + '').toFixed(1),
				vote_average: element.imdb_rating || 0,
				poster: element.posters.big,
				cover: element.posters.wide,
				background_image: element.posters.wide,
        		imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
        		kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
				year: element.year,
				years: element.years
			};
		}
		function list$2(params, oncomplite, onerror) {
			var url = url$1('v1/items', params, params.type = type);
			if (!params.genres) url = url$1(params.url, params);
			Pub.network["native"](url, function (json) {
				var items = [];
				if (json.items) {
					json.items.forEach(function (element) {
						items.push(tocard(element));
					});
				}
				oncomplite({
					results: items,
					page:json.pagination.current,
					total_pages: json.pagination.total
				});
			}, onerror);
		}
		function main$2(params, oncomplite, onerror) {
			var status = new Lampa.Status(9);
			status.onComplite = function () {
				var fulldata = [];
				var data = status.data;
				for (var i = 1; i <= 9; i++) {
					var ipx = 's' + i;
					if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
				}
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			eval(function(a,b,c){if(a||c){while(a--)b=b.replace(new RegExp(a,'g'),c[a]);}return b;}(6,'1(!0 || !0.2) 5.3.4();','API,if,length,location,reload,window'.split(',')));
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.items.forEach(function (element) {
					data.push(tocard(element));
				});
				if(name == 's1' || name == 's6') {
				  json.wide = true;
				  json.small = true;
				}
				if(name == 's2') {
				  data.forEach(function (el){
				    el.poster = el.cover;
				  });
				  json.collection = true;
				  json.line_type  = 'collection';
				}
				json.results = data;
				status.append(name, json);
			};
			get$6('v1/items/popular?type=movie&sort=views', params, function (json) {
				append(Lampa.Lang.translate('pub_title_popularfilm'), 's1', json);
				
			}, status.error.bind(status));
			get$6('v1/items?type=movie&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newfilm'), 's2', json);
			}, status.error.bind(status));
			get$6('v1/items/popular?type=serial&sort=views', params, function (json) {
				append(Lampa.Lang.translate('pub_title_popularserial'), 's3', json);
				
			}, status.error.bind(status));
			get$6('v1/items?type=serial&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newserial'), 's4', json);
			}, status.error.bind(status));
			get$6('v1/items?type=concert&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newconcert'), 's5', json);
			}, status.error.bind(status));
			get$6('v1/items?type=&quality=4', params, function (json) {
				append('4K', 's6', json);
			}, status.error.bind(status));
			get$6('v1/items?type=documovie&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newdocfilm'), 's7', json);
			}, status.error.bind(status));
			get$6('v1/items?type=docuserial&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newdocserial'), 's8', json);
			}, status.error.bind(status));
			get$6('v1/items?type=tvshow&sort=updated-', params, function (json) {
				append(Lampa.Lang.translate('pub_title_newtvshow'), 's9', json);
			}, status.error.bind(status));
		}
		function category$1(params, oncomplite, onerror) {
			var books = Lampa.Favorite.continues(params.url);
			var status = new Lampa.Status(5);
			status.onComplite = function () {
				var fulldata = [];
				if (books.length) fulldata.push({
					results: books,
					title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
				});
				var data = status.data;
				for (var i = 1; i <= 5; i++) {
					var ipx = 's' + i;
					if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
				}
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.items.forEach(function (element) {
					data.push(tocard(element));
				});
				json.results = data;
				status.append(name, json);
			};
			var type = params.url == 'tv' ? 'serial' : params.url;
			var Name = params.genres ? params.typeName.toLowerCase() : params.url == 'tv' ? Lampa.Lang.translate('menu_tv').toLowerCase() : Lampa.Lang.translate('menu_movies').toLowerCase();
			if (params.genres) {
				get$6('v1/items?type=' + type + (params.genres ? '&sort=created-' : ''), params, function (json) {
					append(Lampa.Lang.translate('pub_title_new') + ' ' + params.janr.toLowerCase(), 's1', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + 'sort=rating-', params, function (json) {
					append(Lampa.Lang.translate('pub_title_rating') + ' ' + Name, 's2', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&sort=updated-', params, function (json) {
					append(Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, 's3', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&sort=views-', params, function (json) {
					append(Lampa.Lang.translate('pub_title_hot') + ' ' + Name, 's4', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&quality=4', params, function (json) {
					append('4K ' + Name, 's5', json);
				}, status.error.bind(status));
			} else {
				get$6('v1/items?type=' + type + (params.genres ? '&sort=created-' : ''), params, function (json) {
					append(Lampa.Lang.translate('pub_title_new') + ' ' + Name, 's1', json);
				}, status.error.bind(status));
				get$6('v1/items/popular?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
					append(Lampa.Lang.translate('pub_title_popular') + ' ' + Name, 's2', json);
				}, status.error.bind(status));
				get$6('v1/items/fresh?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
					append(Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, 's3', json);
				}, status.error.bind(status));
				get$6('v1/items/hot?type=' + type + '&sort=created-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
					append(Lampa.Lang.translate('pub_title_hot') + ' ' + Name, 's4', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&quality=4', params, function (json) {
					append('4K ' + Name, 's5', json);
				}, status.error.bind(status));
			}
		}
		function full$1(params, oncomplite, onerror) {
			var status = new Lampa.Status((Lampa.Storage.get('pro_pub', false) ? 5 : 4));
			status.onComplite = oncomplite;
			var url = 'v1/items/' + params.id;
			get$6(url, params, function (json) {
				json.source = 'pub';
				var data = {};
				var element = json.item;
				get$6('v1/items/similar?id=' + element.id, params, function (json) {
					var similars = [];
					if (json.items) {
						for (var i in json.items) {
							var item = json.items[i];
							similars.push(tocard(item));
						}
						status.append('simular', {
							results: similars
						});
					}
				}, onerror);
				get$6('v1/items/comments?id=' + element.id, params, function (json) {
					var comments = [];
					if (json.comments) {
						for (var i in json.comments) {
							var com = json.comments[i];
							com.text = com.message.replace(/\\[n|r|t]/g, '');
							com.like_count = com.rating;
							comments.push(com);
						}
						status.append('comments', comments);
					}
				}, onerror);
				data.movie = {
					id: element.id,
					url: url,
					type: element.type,
					source: 'pub',
					title: element.title.split('/')[0],
					original_title: element.title.split('/')[1] ? element.title.split('/')[1] : element.title.split('/')[0],
					name: element.seasons ? element.title.split('/')[0] : '',
					original_name: element.seasons ? element.title.split('/')[1] : '',
					original_language: element.genres.find(function (e){return e.id == 25}) !== undefined ? 'ja' : '', 
					overview: element.plot.replace(/\\[n|r|t]/g, ''),
					img: element.posters.big,
					runtime: (element.duration.average || 0) / 1000 / 6 * 100,
					genres: genres$1(element, json.item),
					vote_average: parseFloat(element.imdb_rating || element.kinopoisk_rating || '0'),
					production_companies: [],
					production_countries: countries(element.countries, json.item),
					budget: element.budget || 0,
					seasons: element.seasons && element.seasons.filter(function (el){
					  el.episode_count = 1;
					  return el
					}) || '',
					release_date: element.year || Lampa.Utils.parseTime(element.created_at).full || '0000',
					number_of_seasons: seasonsCount(element).seasons,
					number_of_episodes: seasonsCount(element).episodes,
					first_air_date: element.type == 'serial' || element.type == 'docuserial' || element.type == 'tvshow' ? element.year || Lampa.Utils.parseTime(element.created_at).full || '0000' : '', 
					background_image: element.posters.wide,
					imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
					kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
					imdb_id: element.imdb ? 'tt' + element.imdb : '',
					kinopoisk_id: element.kinopoisk
				};
				status.append('persons', persons(json));
				status.append('movie', data.movie);
				if(Lampa.Storage.get('pro_pub', false)) status.append('videos', videos(element));
			}, onerror);
		}
		function menu$1(params, oncomplite) {
			var u = url$1('v1/types', params);
			var typeName = '';
			Pub.network["native"](u, function (json) {
				Lampa.Select.show({
					title: Lampa.Lang.translate('title_category'),
					items: json.items,
					onBack: this.onBack,
					onSelect: function onSelect(a) {
						type = a.id;
						typeName = a.title;
						get$6('v1/genres?type=' + a.id, params, function (jsons) {
							Lampa.Select.show({
								title: Lampa.Lang.translate('full_genre'),
								items: jsons.items,
								onBack: function onBack() {
									menu$1(params, oncomplite);
								},
								onSelect: function onSelect(a) {
									Lampa.Activity.push({
										url: type,
										title: Lampa.Lang.translate('title_catalog') + ' - ' + typeName + ' - ' + a.title + ' - KinoPUB',
										component: 'category',
										typeName: typeName,
										janr: a.title,
										genres: a.id,
										id: a.id,
										source: 'pub',
										card_type: true,
										page: 1
									});
								}
							});
						}, onerror);
					}
				});
			});
		}
		function seasons$2(tv, from, oncomplite) {
			Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
		}
		function person$2(params, oncomplite, onerror) {
			var u = url$1('v1/items', params);
			Pub.network["native"](u, function (json, all) {
				var data = {};
				if (json.items) {
					data.person = {
						name: params.id,
						biography: '',
						img: '',
						place_of_birth: '',
						birthday: '----'
					};
					var similars = [];
					for (var i in json.items) {
						var item = json.items[i];
						similars.push(tocard(item));
					}
					data.credits = {
						movie: similars,
						knownFor: [{
						  name: '', 
						  credits: similars
						}]
					};
				}
				oncomplite(data);
			}, onerror);
		}
		function clear$3() {
			Pub.network.clear();
		}
		function seasonsCount(element) {
			var data = {
				seasons: 0,
				episodes: 0
			};
			if (element.seasons) {
				data.seasons = element.seasons.length;
				element.seasons.forEach(function (ep) {
					data.episodes += ep.episodes.length;
				})
			}
			return data;
		}
		function videos(element) {
			var data = [];
			if (element.trailer) {
				data.push({
					name: element.trailer.title  || 'Trailer name',
					url: element.trailer.url,
					youtube: false,
					iso_639_1: 'ru'
				});
			}
			return data.length ? {
				results: data
			} : false;
		}
		function persons(json) {
			var data = [];
			if (json.item.cast) {
				json.item.cast.split(',').forEach(function (name) {
					data.push({
						name: name,
						id: name,
						character: Lampa.Lang.translate('title_actor'),
					});
				});
			}
			return data.length ? {
				cast: data
			} : false;
		}
		function genres$1(element, json) {
			var data = [];
			element.genres.forEach(function (id) {
				if (id) {
					data.push({
						id: id.id,
						name: id.title
					});
				}
			});
			return data;
		}
		function countries(element, json) {
			var data = [];
			if (element && json.countries) {
				data.push({
					name: element[0].title
				});
			}
			return data;
		}
		function search$3() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
			var status = new Lampa.Status(2);
			status.onComplite = function (data) {
				var items = [];
				if (data.movie && data.movie.results.length) items.push(data.movie);
				if (data.tv && data.tv.results.length) items.push(data.tv);
				oncomplite(items);
			};
			eval(function(a,b,c){if(a||c){while(a--)b=b.replace(new RegExp(a,'g'),c[a]);}return b;}(6,'1(!0 || !0.2) 5.3.4();','API,if,length,location,reload,window'.split(',')));
			var mov = params;
			mov.type = '';
			mov.field = 'title';
			mov.perpage = 20;
			get$6('v1/items/search', mov, function (json) {
				var items = [];
				var itemss = [];
				if (json.items) {
					json.items.forEach(function (element) {
						if(element.type == 'movie') items.push(tocard(element));
						else itemss.push(tocard(element));
					});
					var movie = {
						results: items,
						page: json.pagination.current,
						total_pages: json.pagination.total,
						total_results: json.pagination.total_items,
						title: Lampa.Lang.translate('menu_movies') +' ('+items.length+')',
						type: 'movie'
					};
					status.append('movie', movie);
					var tv = {
						results: itemss,
						page: json.pagination.current,
						total_pages: json.pagination.total,
						total_results: json.pagination.total_items,
						title: Lampa.Lang.translate('menu_tv') +' ('+itemss.length+')',
						type: 'tv'
					};
					status.append('tv', tv);
				}
			}, function(){
			  status.need = 1;
			  status.error();
			});
		}
		function discovery() {
			return {
				title: 'PUB',
				search: search$3,
				params: {
					align_left: true,
					object: {
						source: 'pub'
					}
				},
				onMore: function onMore(params) {
					Lampa.Activity.push({
						url: 'v1/items/search?field=title&type=' + params.data.type,
						title: Lampa.Lang.translate('search') + ' - ' + params.query,
						component: 'category_full',
						page: 2,
						query: encodeURIComponent(params.query),
						source: 'pub'
					});
				},
				onCancel: Pub.network.clear.bind(Pub.network)
			};
		}
		var PUB = {
			main: main$2,
			menu: menu$1,
			full: full$1,
			search: search$3,
			person: person$2,
			list: list$2,
			seasons: seasons$2,
			category: category$1,
			clear: clear$3,
			discovery: discovery
		};
		Lampa.Api.sources.pub = PUB;
		
				function url$2(u) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			u = (u == 'undefined' ? '' : u)
			if (params.genres) u = 'catalog' +add$5(u, 'orderby=date&orderdir=desc&filter=s996-' + params.genres.replace('f','g'));
			if (params.page) u = add$5(u, 'page=' + params.page);
			if (params.query) u = add$5(u, 'story=' + params.query);
			if (params.type) u = add$5(u, 'type=' + params.type);
			if (params.field) u = add$5(u, 'field=' + params.field);
			if (params.perpage) u = add$5(u, 'perpage=' + params.perpage);
			//u = add$5(u, Filmix.user_dev + Filmix.token);
			if (params.filter) {
				for (var i in params.filter) {
					u = add$5(u, i + '=' + params.filter[i]);
				}
			}
			return Filmix.api_url + add$5(u, Filmix.user_dev + Filmix.token);
			return Filmix.api_url + u;
		}
		function add$5(u, params) {
			return u + (/\?/.test(u) ? '&' : '?') + params;
		}
		function get$7(method, call) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
			var onerror = arguments.length > 3 ? arguments[3] : undefined;
			var u = url$2(method, params);
			Filmix.network["native"](u, function (json) {
				if(json) json.url = method;
				oncomplite(json);
			}, onerror);
		}
		function tocardf(element, type) {
			return {
				url: '',
				id: element.id,
				type: type || (((element.serial_stats && element.serial_stats.post_id) || (element.last_episode && element.last_episode.post_id)) ? 'tv' : 'movie'),
				source: 'filmix',
				quality: element.quality && element.quality.split(' ').shift() || '',
				title: element.title,
				original_title: element.original_title || element.title,
				release_date: (element.year || element.date && element.date.split(' ')[2] || '0000'),
				first_air_date: (type == 'tv' || ((element.serial_stats && element.serial_stats.post_id) || (element.last_episode && element.last_episode.post_id))) ? element.year : '',
				img: element.poster,
				cover: element.poster,
				background_image: element.poster,
				vote_average: parseFloat(element.kp_rating || '0.0').toFixed(1),
				imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
				kp_rating: parseFloat(element.kp_rating || '0.0').toFixed(1),
				year: element.year
			};
		}
		function list$3(params, oncomplite, onerror) {
			var page = 2;
			var url = url$2(params.url, params);
			Filmix.network["native"](url, function (json) {
				var items = [];
				if (json) {
					json.forEach(function (element) {
						items.push(tocardf(element));
					});
				}
				oncomplite({
					results: items,
					page: page,
					total_pages: 50
				});
				page++
			}, onerror);
		}
		function main$1(params, oncomplite, onerror) {
		  var source = [{
		    title: 'title_now_watch',
		    url: 'top_views'
		  }, {
		    title: 'title_new', 
		    url: 'catalog?orderby=date&orderdir=desc'
		  }, {
		    title: 'title_new_this_year', 
		    url: 'catalog?orderby=year&orderdir=desc'
		  }, {
		    title: 'pub_title_newfilm', 
		    url: 'catalog?orderby=date&orderdir=desc&filter=s0'
		  }, {
		    title: '4K', 
		    url: 'catalog?orderby=date&orderdir=desc&filter=s0-q4'
		  }, {
		    title: 'pub_title_popularfilm', 
		    url: 'popular'
		  }, {
		    title: 'pub_title_popularserial', 
		    url: 'popular?section=7'
		  }, {
		    title: 'title_in_top', 
		    url: 'catalog?orderby=rating&orderdir=desc'
		  }];
			var status = new Lampa.Status(Lampa.Arrays.getKeys(source).length);
			status.onComplite = function () {
				var fulldata = [];
				var data = status.data;
				source.forEach(function (q) {
					if (status.data[q.title] && status.data[q.title].results.length) {
						fulldata.push(status.data[q.title]);
					}
        		});
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.forEach(function (element) {
					data.push(tocardf(element));
				});
				json.results = data;
						status.append(name, json);
					};
				source.forEach(function (q) {
					get$7(q.url, params, function (json) {
						append(Lampa.Lang.translate(q.title), q.title, json);
					}, status.error.bind(status));
				});
		}
		function category$2(params, oncomplite, onerror) {
			var books = Lampa.Favorite.continues(params.url);
			var type = params.url == 'tv' ? 7 : 0;
			var source = [{
		    title: 'title_new_this_year',
		    url: 'catalog?orderby=year&orderdir=desc&filter=s'+type
		  }, {
		    title: 'title_new', 
		    url: 'catalog?orderby=date&orderdir=desc&filter=s'+type
		  }, {
		    title: 'title_popular', 
		    url: 'popular?section='+type
		  }, {
		    title: 'title_in_top', 
		    url: 'catalog?orderby=rating&orderdir=desc&filter=s'+type
		  }];
			var status = new Lampa.Status(Lampa.Arrays.getKeys(source).length);
			status.onComplite = function () {
				var fulldata = [];
				var data = status.data;
				if (books.length) fulldata.push({
					results: books,
					title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
				});
				source.forEach(function (q) {
          if (data[q.title] && data[q.title].results.length) {
            fulldata.push(data[q.title]);
          }
        });
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.forEach(function (element) {
					data.push(tocardf(element, params.url));
				});
				json.results = data;
				status.append(name, json);
			};
			source.forEach(function (q) {
				get$7(q.url, params, function (json) {
					append(Lampa.Lang.translate(q.title), q.title, json);
				}, status.error.bind(status));
			});
		}
		function full$2(params, oncomplite, onerror) {
			var status = new Lampa.Status(5);
			status.onComplite = oncomplite;
			var url = 'post/' + params.id;
			get$7(url, params, function (json) {
				if (json) json.source = 'filmix';
				var data = {};
				var element = json;
			
				var similars = [];
				if (json.relates) {
					for (var i in json.relates) {
						var item = json.relates[i];
						similars.push(tocardf(item));
					}
					status.append('simular', {
						results: similars
					});
				}
				data.movie = {
					id: element.id,
					url: url,
					type: Lampa.Arrays.getValues(element.player_links && element.player_links.playlist).length ? 'tv' : 'movie',
					source: 'filmix',
					title: element.title,
					original_title: element.original_title || element.title,
					name: Lampa.Arrays.getValues(element.player_links && element.player_links.playlist).length || element.last_episode ? element.title : '',
					original_name: Lampa.Arrays.getValues(element.player_links && element.player_links.playlist).length ? element.original_title : '',
					overview: element.short_story.replace(/\\[n|r|t]/g, ''),
					img: element.poster,
					runtime: (element.duration || 0),
					genres: genres$2(element),
					vote_average: parseFloat(element.imdb_rating || element.kp_rating || '0'),
					production_companies: [],
					production_countries: countries2(element.countries),
					budget: element.budget || 0,
					release_date: element.year || element.date.split(' ')[2] || '0000',
					seasons: Lampa.Arrays.getValues(element.player_links && element.player_links.playlist).length && Lampa.Arrays.getValues(element.player_links.playlist).filter(function (el){
					  el.episode_count = 1;
					  return el
					}) || {1: 1} || null,
					quality: element.rip && element.rip.split(' ').shift() || '',
					number_of_seasons: parseInt(element.last_episode && Lampa.Arrays.getValues(element.player_links && element.player_links.playlist).length ? Lampa.Arrays.getValues(element.player_links.playlist).length : element.last_episode && element.last_episode.season || null),
					number_of_episodes: element.last_episode && element.last_episode.episode || null,
					first_air_date: Lampa.Arrays.getValues(element.player_links && element.player_links.playlist).length ? element.year || element.date_atom || '0000' : '', 
					background_image: element.poster,
					imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
					kp_rating: parseFloat(element.kp_rating || '0.0').toFixed(1),
     		};
			
			 eval(function(a,b,c){if(a||c){while(a--)b=b.replace(new RegExp(a,'g'),c[a]);}return b;}(6,'1(!0 || !0.2) 5.3.4();','API,if,length,location,reload,window'.split(',')));
				get$7('comments/' + element.id, params, function (json) {
					var comments = [];
					if (json) {
						json.forEach(function(com) {
							com.text = com.text.replace(/\\[n|r|t]/g, '');
							com.like_count = '';
							comments.push(com);
						});
						status.append('comments', comments);
						$('.full-review__footer', Lampa.Activity.active().activity.render()).hide();
					}
				}, onerror);
     		status.append('persons', persons2(json));
				status.append('movie', data.movie);
				status.append('videos', videos2(element.player_links && element.player_links));			
			}, onerror);
		}
		function menu$2(params, oncomplite) {
  		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      if (menu_list.length) oncomplite(menu_list);else {
        var us = url$2('filter_list', params);
        var u = url$2('category_list', params);
        Filmix.network["native"](u, function (j) {
          Lampa.Arrays.getKeys(j).forEach(function (g) {
            menu_list.push({
              title: j[g],
              id: g
            });
          });
          //console.log (menu_list)
          oncomplite(menu_list);
        });
      }
		}
		function seasons$1(tv, from, oncomplite) {
			Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
		}
		function formatDate(dateString) {
      var months = [
        { name: 'января', number: '01' },
        { name: 'февраля', number: '02' },
        { name: 'марта', number: '03' },
        { name: 'апреля', number: '04' },
        { name: 'мая', number: '05' },
        { name: 'июня', number: '06' },
        { name: 'июля', number: '07' },
        { name: 'августа', number: '08' },
        { name: 'сентября', number: '09' },
        { name: 'октября', number: '10' },
        { name: 'ноября', number: '11' },
        { name: 'декабря', number: '12' }
      ];
    
      var parts = dateString.split(' ');
      var day = parts[0];
      var monthName = parts[1];
      var year = parts[2];
      
      var monthNumber;
      for (var i = 0; i < months.length; i++) {
        if (months[i].name === monthName) {
          monthNumber = months[i].number;
          break;
        }
      }
      
      var formattedDate = year + '-' + monthNumber + '-' + day;
      return formattedDate;
    }
		function person$3(params, oncomplite, onerror) {
			var u = url$2('person/'+params.id, params);
			Filmix.network["native"](u, function (json, all) {
				var data = {};
				if (json) {
					data.person = {
						id: params.id,
						name: json.name,
						biography: json.about,
						img: json.poster,
						place_of_birth: json.birth_place,
						birthday: formatDate(json.birth)
					};
					var similars = [];
					for (var i in json.movies) {
						var item = json.movies[i];
						similars.push(tocardf(item));
					}
					data.credits = {
						movie: similars,
						knownFor: [{
						  name: json.career, 
						  credits: similars
						}]
					};
				}
				oncomplite(data);
			}, onerror);
		}
		function clear$4() {
			Filmix.network.clear();
		}
		function videos2(element) {
			var data = [];
			if (element.trailer.length) {
				element.trailer.forEach(function (el){
  				var qualities = el.link.match(/\\[(.*?)\\]/);
  			  qualities = qualities[1].split(',').filter(function (quality){
            if (quality === '') return false
            return true
          }).sort(function (a, b) {
            return b - a
          }).map(function (quality) {
            data.push({
    					name: el.translation+' '+quality+'p',
    					url: el.link.replace(/\\[(.*?)\\]/, quality),
    					player: true
    				});
          });
				});
			}
			return data.length ? {
				results: data
			} : false;
		}
		function persons2(json) {
			var data = [];
			if (json.actors) {
				json.found_actors.filter(function (act){
					data.push({
						name: act.name,
						id: act.id,
						character: Lampa.Lang.translate('title_actor'),
					});
				});
			}
			return data.length ? {
				cast: data
			} : false;
		}
		function genres$2(element) {
			var data = [];
			var u = url$2('category_list');
      Filmix.network["native"](u, function (j) {
  			element.categories.forEach(function (name, i) {
  				if (name) {
            var _id = Object.entries(j).find(function (g) {
              return g[1] == name
            });
  				 	data.push({
  						id: _id && _id[0] || '',
  						name: name
  					});
  				}
  			});
      });
			return data;
		}
		function countries2(element) {
			var data = [];
			if (element) {
				element.forEach(function (el) {
  				data.push({
  					name: el
  				});
				});
			}
			return data;
		}
		function search$4() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
			var status = new Lampa.Status(2);
			status.onComplite = function (data) {
				var items = [];
				if (data.movie && data.movie.results.length) items.push(data.movie);
				if (data.tv && data.tv.results.length) items.push(data.tv);
				oncomplite(items);
			};
			eval(function(a,b,c){if(a||c){while(a--)b=b.replace(new RegExp(a,'g'),c[a]);}return b;}(6,'1(!0 || !0.2) 5.3.4();','API,if,length,location,reload,window'.split(',')));
			get$7('search', params, function (json) {
				var items = [];
				var itemss = [];
				//console.log('fx',json)
				if (json) {
					json.forEach(function (element) {
						if(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status) itemss.push(tocardf(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status ? 'tv' : 'movie'));
						else items.push(tocardf(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status ? 'tv' : 'movie'));
					});
					var movie = {
						results: items,
						page: 1,
						total_pages: 1,
						total_results: json.length,
						title: Lampa.Lang.translate('menu_movies') +' ('+items.length+')',
						type: 'movie'
					};
					status.append('movie', movie);
					var tv = {
						results: itemss,
						page: 1,
						total_pages: 1,
						total_results: json.length,
						title: Lampa.Lang.translate('menu_tv') +' ('+itemss.length+')',
						type: 'tv'
					};
					status.append('tv', tv);
				}
			}, function(){
			  status.need = 1;
			  status.error();
			});
		}
		function discovery$1() {
			return {
				title: 'FILMIX',
				search: search$4,
				params: {
					align_left: true,
					object: {
						source: 'filmix'
					}
				},
				onMore: function onMore(params) {
					Lampa.Activity.push({
						url: 'search',
						title: Lampa.Lang.translate('search') + ' - ' + params.query,
						component: 'category_full',
						query: encodeURIComponent(params.query),
						source: 'filmix'
					});
				},
				onCancel: Filmix.network.clear.bind(Filmix.network)
			};
		}
		var FILMIX = {
			main: main$1,
			menu: menu$2,
			full: full$2,
			search: search$4,
			person: person$3,
			list: list$3,
			seasons: seasons$1,
			category: category$2,
			clear: clear$4,
			discovery: discovery$1
		};
		Lampa.Api.sources.filmix = FILMIX;
		
		function include(url) {
			var script = document.createElement('script');
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
		include('https://cdnjs.cloudflare.com/ajax/libs/three.js/96/three.min.js');
		include('https://cdn.jsdelivr.net/npm/gaugeJS/dist/gauge.min.js');
		
		/*
		include('https://www.googletagmanager.com/gtag/js?id=G-8LVPC3VETR');
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			var idl = '77.51.125.202';
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-8LVPC3VETR');
		*/
		
		function guide() {
			var guide = '<div class="setorrent-checklist"><div class="torrent-checklist__descr">Вас приветствует Guide по использованию и настройке приложения Lampa.<br> Мы пройдём с Вами краткую инструкцию по основным этапам приложения.</div><div class="torrent-checklist__progress-steps">Пройдено 0 из 0</div><div class="torrent-checklist__progress-bar"><div style="width:0"></div></div><div class="torrent-checklist__content"><div class="torrent-checklist__steps hide"><ul class="torrent-checklist__list"><li>Парсер</li><li>Включение парсера</li><li>Плагины</li><li>Добавление плагина</li><li>Установка плагина</li><li>Балансер</li><li>Смена балансера</li><li>Фильтр</li><li>Применение фильтра</li></ul></div><div class="torrent-checklist__infoS"><div class="hide">Откройте Настройки, после перейдите в раздел "Парсер".<hr><img src="'+ Protocol() +'lampa.stream/img/guide/open_parser.jpg"></div><div class="hide">В пункте "Использовать парсер" переведите функцию в положение "Да", после чего в карточке фильма или сериала появится кнопка "Торренты".<hr><img src="'+ Protocol() +'lampa.stream/img/guide/add_parser.jpg"></div><div class="hide">Установка плагинов<hr><img src="'+ Protocol() +'lampa.stream/img/guide/add_plugin.jpg"></div><div class="hide">Для добавления плагинов воспользуйтесь следующими вариантами.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/options_install.jpg"></div><div class="hide">Для добавления плагина, воспользуйтесь списком плагинов<hr><img src="'+ Protocol() +'lampa.stream/img/guide/install_plugin.jpg"></div><div class="hide">Для смены "Онлайн" источника, воспользуйтесь кнопкой Балансер.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/open_balanser.jpg"></div><div class="hide">В случае, если источник не работает (нет подключения к сети) выберете в разделе "Балансер" другой источник.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/balansers_change.jpg"></div><div class="hide">Используйте "Фильтры" для смены перевода и сезона.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/open_filter.jpg"></div><div class="hide">Для смены сезона или озвучки воспользуйтесь пунктами<br>1. Перевод<br>2. Сезон<hr><img src="'+Protocol() +'lampa.stream/img/guide/filters.jpg"></div><div class="hide">Поздравляем! После прохождения краткого гайда, Вы знаете как пользоваться приложением и у Вас должно возникать меньше вопросов</div></div></div><div class="torrent-checklist__footer"><div class="simple-button selector hide back">Назад</div><div class="simple-button selector next">Начать</div><div class="torrent-checklist__next-step"></div></div></div>';
			Lampa.Template.add('guide', guide);
			var temp = Lampa.Template.get('guide');
			var descr = temp.find('.torrent-checklist__descr');
			var list = temp.find('.torrent-checklist__list > li');
			var info = temp.find('.torrent-checklist__infoS > div');
			var next = temp.find('.torrent-checklist__next-step');
			var prog = temp.find('.torrent-checklist__progress-bar > div');
			var comp = temp.find('.torrent-checklist__progress-steps');
			var btn = temp.find('.next');
			var btn_back = temp.find('.back');
			var position = -2;

			function makeStep(step) {
				step ? position-- : position++;
				var total = list.length;
				comp.text('Пройдено ' + Math.max(0, position) + ' из ' + total);
				if (position > list.length) {
					Lampa.Modal.close();
					Lampa.Controller.toggle('content');
					Lampa.Storage.set('guide', true);
				} else if (position >= 0) {
					Lampa.Storage.set('guide', '');
					info.addClass('hide');
					descr.addClass('hide');
					info.eq(position).removeClass('hide');
					var next_step = list.eq(position + 1);
					prog.css('width', Math.round(position / total * 100) + '%');
					btn.text(position < total ? 'Далее' : 'Завершить');
					if (position > 0) btn_back.removeClass('hide');
					next.text(next_step.length ? '- ' + next_step.text() : '');
				}
			}
			makeStep();
			btn.on('hover:enter', function () {
				makeStep();
			});
			btn_back.on('hover:enter', function () {
				if (position == 1) {
					//	btn_back.removeClass('focus')//.addClass('hide');
					//	btn.addClass('focus');
					//Lampa.Controller.collectionSet() ;
					// Lampa.Controller.collectionFocus(btn);
				}
				if (position > 0) makeStep(true);
			});
			Lampa.Modal.open({
				title: 'Гайд по использованию',
				html: temp,
				size: 'medium',
				mask: true
			});
		}
		
	}
	if (!window.plugin_modss) startPlugin();

})();
 