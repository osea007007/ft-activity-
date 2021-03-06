//@prepros-prepend indexPage.js

// ========= ie用的遮罩 ==============================================================================================================================
Vue.component('ieMask', {
	data: function(){
		return {
			ieUseMask: true,
		};
	},
	template: ` <div class="ieUseMask" v-if="ieUseMask">
					<div class="ieUseMask-text">
						<strong>建議您使用現代化瀏覽器瀏覽</strong><br/><strong>以獲得最佳瀏覽效果</strong><br />(例：Chrome、Firefox)
						<div class="ieUseMask-dot"></div>
					</div>
				</div>`,
	mounted() {
		this.hideIeMask();
	},
	methods: {
		hideIeMask() {
			// ie用的遮罩
			setTimeout(() => {
				this.ieUseMask = false
			}, 4000);
		},
	},
});

// ========= 固定在右側的按鍵 ==============================================================================================================================
Vue.component('fixedRightBtn', {
	template: ` <div>
					<sice-web-show>
						<div class="fixedRightBtn-area clearfix">
							<div class="fixedRightBtn">
								<a href="https://etrade.franklin.com.tw/Open/Entrance" target="_blank" title="申辦國民e帳戶">
									申辦國民e帳戶 <i class="fas fa-chevron-right"></i>
								</a>
							</div>
							<div class="fixedRightBtn type2">
								<a href="https://etrade.franklin.com.tw/Home/Login" target="_blank" title="立即下單享優惠">
									立即下單享優惠 <i class="fas fa-chevron-right"></i>
								</a>
							</div>
						</div>
					</sice-web-show>
					<sice-app-show>
						<div class="fixedRightBtn-area clearfix">
							<sice-login-hide>
								<div class="fixedRightBtn oneBtn" v-app-login>
									<a target="_blank" title="申辦國民e帳戶">
										申辦國民e帳戶 <i class="fas fa-chevron-right"></i>
									</a>
								</div>
							</sice-login-hide>
							<sice-login-show>
								<div class="fixedRightBtn type2 oneBtn">
									<sice-fund target="_blank" title="立即下單享優惠">
										立即下單享優惠 <i class="fas fa-chevron-right"></i>
									</sice-fund>
								</div>
							</sice-login-show>
						</div>
					</sice-app-show>
				</div>`,
});

// ========= header ==============================================================================================================================
Vue.component('headerArea', {
	data: function(){
		return {
			menuBtnActive: false,
			navbarShow: false,
		};
	},
	props: ['activeNumber'],
	template: ` <header class="header">
					<div class="container clearfix">
						<div class="logo">
							<sice-web-link href="https://www.franklin.com.tw/" target="_blank" title="富蘭克林證券投顧">
								<picture>
									<source media="(max-width: 991px)" srcset="images/logo2019.svg">
									<img src="images/header-logo.png" alt="富蘭克林‧國民的基金">
								</picture>
								<div class="logo-text">
									富蘭克林‧國民的基金
								</div>
							</sice-web-link>
						</div>
						<nav class="navBar" :class="{show: navbarShow}">
							<ul>
								<li :class="{active : (activeNumber == 0)}">
									<a href="index.html" title="首頁">
										首頁
									</a>
								</li>
								<li :class="{active : (activeNumber == 1)}">
									<a href="latest-offers.html" title="最新優惠">
										最新優惠
									</a>
								</li>
								<li :class="{active : (activeNumber == 2)}">
									<a href="benefits.html" title="會員權益">
										會員權益
									</a>
								</li>
								<li :class="{active : (activeNumber == 3)}">
									<a href="bonus.html" title="紅利折抵攻略">
										紅利折抵攻略
									</a>
								</li>
								<li :class="{active : (activeNumber == 4)}">
									<a href="open-account.html" title="開戶優惠">
										開戶優惠
									</a>
								</li>
								<li :class="{active : (activeNumber == 5)}">
									<a href="recommend.html" title="推薦優惠">
										推薦優惠
									</a>
								</li>
							</ul>
						</nav>

						<!--手機menu按鍵-->
						<div class="menuBtn" data-wow-delay="0.8s" :class="{active: menuBtnActive}" @click="toggleMobileNavbar()">
							<span>
							</span>
							<span>
							</span>
							<span>
							</span>
							<span>
							</span>
							<span>
							</span>
						</div>
					</div>
				</header>`,
	methods: {
		toggleMobileNavbar() {
			this.menuBtnActive === false ? (this.menuBtnActive = true) : (this.menuBtnActive = false);
			this.navbarShow === false ? (this.navbarShow = true) : (this.navbarShow = false);
		},
		hideMobileNavbar() {
			this.menuBtnActive = false;
			this.navbarShow = false;
		},
	},
});

// ========= footer ==============================================================================================================================
// footer
Vue.component("footerArea", {
	template: ` <footer class="footer">
					<div class="container">
						<div class="footer-header clearfix">
							<div class="footer-header-left">
								<div class="footer-header-left-logo">
									<a href="http://www.franklin.com.tw/" target="_blank" title="富蘭克林證券投顧">
										<img src="images/footer-logo.png" alt="富蘭克林證券投顧">
									</a>
								</div>
								<div class="footer-header-left-companyName">
									富蘭克林證券投資顧問(股)公司
								</div>
								<div class="footer-header-left-idCode">
									101年金管投顧新字第025號 | 富蘭克林證券投顧獨立經營管理
								</div>
							</div>
							<div class="footer-header-right">
								<ul class="footer-header-right-socialMedia">
									<li>
										<a href="https://www.facebook.com/franklin.taiwan/" target="_blank" title="粉絲團">
											<i class="fab fa-facebook-square"></i>
										</a>
									</li>
									<li>
										<a href="http://line.naver.jp/ti/p/%40franklin" target="_blank" title="Line">
											<i class="fab fa-line"></i>
										</a>
									</li>
									<li>
										<a href="https://www.youtube.com/user/franklin0800885888" target="_blank" title="youtube">
											<i class="fab fa-youtube"></i>
										</a>
									</li>
								</ul>
								<div class="footer-header-right-phone">
									<div class="footer-header-right-phone-tit">
										國民理財專線：
									</div>
									<div class="footer-header-right-phone-phone">
										<a href="tel:0800-885-888" title="國民理財專線">
											0800-885-888
										</a>
									</div>
								</div>
								<div class="footer-header-right-address">
									106台北市大安區忠孝東路四段87號8樓
								</div>
								<div class="footer-header-right-telAndFax">
									電話: (02)2781-0088　傳真: (02)2781-7788
								</div>
							</div>
						</div>
						<footer-warning></footer-warning>
						<div class="copyright">
							<div>
								版權所有富蘭克林證券投顧  FRANKLIN TEMPLETON INVESTMENTS
							</div>
						</div>
					</div>
				</footer>`,
});
Vue.component("footer-warning", {
	data: function () {
		return {
			list: [{
					id: 0,
					info: `本公司所提供之資訊，僅供接收人之參考用途。本公司當盡力提供正確之資訊，所載資料均來自或本諸我們相信可靠之來源，但對其完整性、即時性和正確性不做任何擔保，如有錯漏或疏忽，本公司或關係企業與其任何董事或受僱人，並不負任何法律責任。任何人因信賴此等資料而做出或改變投資決策，須自行承擔結果。本網頁所載資料或任何部份均不可以進行抄錄、翻印或另作派發。`
				},
				{
					id: 1,
					info: `本境外基金經金融監督管理委員會核准或申報生效在國內募集及銷售，惟不表示絕無風險。基金經理公司以往之經理績效不保證基金之最低投資收益；基金經理公司除盡善良管理人之注意義務外，不負責本基金之盈虧，亦不保證最低之收益，投資人申購前應詳閱基金公開說明書。`
				},
				{
					id: 2,
					info: `由於高收益債券之信用評等未達投資等級或未經信用評等，且對利率變動的敏感度甚高，故本基金可能會因利率上升、市場流動性下降，或債券發行機構違約不支付本金、利息或破產而蒙受虧損。本基金不適合無法承擔相關風險之投資人。基金經理公司以往之經理績效不保證基金之最低投資收益；基金經理公司除盡善良管理人之注意義務外，不負責本基金之盈虧，亦不保證最低之收益，投資人申購前應詳閱基金公開說明書。本基金較適合投資屬性中風險承受度較高之投資人，投資人投資高收益債券為訴求基金不宜占其投資組合過高之比重，投資人應審慎評估。`
				},
				{
					id: 3,
					info: `由於新興市場基金之主要投資風險除包含一般股票型基金之投資組合跌價與匯率風險外，與成熟市場相比須承受較高之政治與金融管理風險，而因市值及制度性因素，流動性風險也相對較高，新興市場投資組合波動性普遍高於成熟市場。基金投資均涉及風險且不負任何抵抗投資虧損之擔保。投資風險之詳細資料請參閱基金公開說明書。`
				},
				{
					id: 4,
					info: `境外基金投資大陸地區證券市場之有價證券以掛牌上市有價證券為限，且投資前述有價證券總金額不得超過本基金淨資產價值之20%，另投資香港地區紅籌股及H股並無限制。本基金並非完全投資於大陸地區之有價證券，投資人仍須留意中國市場特定政治、經濟與市場之投資風險。`
				},
				{
					id: 5,
					info: `基金的配息可能由基金的收益或本金中支付。部分基金進行配息前未先扣除應負擔之費用。任何涉及由本金支出的部份，可能導致原始投資金額減損。由本金支付配息之相關資料已揭露於本公司網站，投資人可至本公司網站(
							<a href="https://www.Franklin.com.tw" target="_blank">https://www.Franklin.com.tw</a>)查閱。`
				},
				{
					id: 6,
					info: `投資基金所應承擔之相關風險及應負擔之費用(含分銷費用)已揭露於基金公開說明書及投資人須知中，投資人可至境外基金資訊觀測站(<a href="https://www.fundclear.com.tw/" target="_blank">https://www.fundclear.com.tw/</a>)下載，或逕向本公司網站(<a href="https://www.franklin.com.tw/" target="_blank">https://www.franklin.com.tw/</a>)查閱。`
				},
			]
		};
	},
	template: `<div class="footer-warning">
                    <ul>
                        <li v-for="item in list" v-bind:key="item.id" v-html="item.info"></li>
                    </ul>
                </div>`
});

// ========= 燈箱 ==============================================================================================================================
Vue.component("light-box", {
	props: ["canClose"],
	data: function() {
		return {
			toggle: false,
			isFixedHeight: false
		};
	},
	template: ` <transition>
					<div class="lightBox" v-if="toggle">
						<div class="lightBox-bg" @click="closeLightBox()" v-if="canClose == true"></div>
						<div class="lightBox-bg" v-if="canClose == false"></div>
						<div class="lightBox-container" :class="{fixedHeight: isFixedHeight}" ref="lightBoxContainer" id="lightBoxContainer">
							<div class="lightBox-close closeBtn" @click="closeLightBox()" v-if="canClose == true">
								<i class="fa fa-times" aria-hidden="true"></i>
							</div>
							<div class="lightBox-container-infoArea">
								<slot name="infoArea"></slot>
							</div>
						</div>
					</div>
				</transition>`,
	methods: {
		closeLightBox() {
			this.toggle = false;
		}
	}
});

var content = new Vue({
	el: "#content",
	mixins: [indexPage],
	data: {
		name: "富蘭克林證券投顧",
		screenWidth: document.body.clientWidth,
		screenHeight: document.body.clientHeight,
		windowWidth: $(window).innerWidth(),
		windowHeight: $(window).innerHeight(),
		thisPath: location.protocol + "//" + location.host,
	},
	mounted() {
		// this.signature();
		this.addNoOpener();
		this.useJq();
		this.showTarget();
		// this.sameHeight('concept-item-text');


		$(window).resize(() => {
			this.windowWidth = $(window).innerWidth();
			this.windowHeight = $(window).innerHeight();
			// this.sameHeight('concept-item-text');
		});
	},
	methods: {
		signature() {
			console.log(
				"%cMade by Captain%c2020/01",
				"color: #fff; border-radius: 5px; background: #1a4f9c; padding: 2px 10px; font-weight: bold;",
				"color: #000; border-radius: 5px; background: #ffde00; padding: 2px 10px; margin: 0px 5px;"
			);
		},
		toggleLightBox(name) {
			this.$refs[name].toggle = !this.$refs[name].toggle;
		},
		sameHeight(name) {
			let item = $("." + name),
				itemLeight = item.length,
				giftItemHeight = [];

			item.removeAttr("style");

			for (let n = 0; n < itemLeight; n++) {
				giftItemHeight[n] = item.eq(n).innerHeight();
			}
			let height = Math.max.apply(null, giftItemHeight);
			item.css("height", height);
		},
		addNoOpener() {
			// 資安用  target="_blank" 加 rel="nofollow me noopener noreferrer"
			var _linkHasTargetBlank = $('a[target="_blank"]');
			for (var n = 0; n < _linkHasTargetBlank.length; n++) {
				// 如果要連的網址跟這網站網域不同  加[rel="nofollow me noopener noreferrer"]
				_linkHasTargetBlank
					.eq(n)
					.attr("href")
					.indexOf(this.thisPath) ?
					_linkHasTargetBlank.eq(n).attr("rel", "nofollow me noopener noreferrer") :
					"";
			};
		},
		showTarget() {
			// 抓網址參數判斷要馬上顯示的區塊
			var url = location.href,
				i,
				openInfo = '';

			if (url.indexOf('?') != -1) {

				// 抓取網址參數判斷 --- Start
				function getUrlParams(url) {
					// 回傳網址參數Object
					var params = {};
					(url + "?").split("?")[1].split("&").forEach(function (pair) {
						pair = (pair + "=").split("=").map(decodeURIComponent);
						if (pair[0].length) {
							params[pair[0]] = pair[1];
						}
					});
					return params;
				}

				var obj = getUrlParams(location.href);
				// 因為#hash會直接串在最後一個參數後面, 故需要取代處理
				if (Object.keys(obj).length && obj.hasOwnProperty('openInfo')) openInfo = obj.openInfo.indexOf('#') > -1 ? obj.openInfo.replace(location.hash, "") : obj.openInfo;
				// 抓取網址參數判斷 --- End

				if ( $('#' + openInfo).length > 0 ) {
					setTimeout(function () {
						var targetOffset = $('#' + openInfo).offset().top;
						window.scrollTo(0, targetOffset);
					}, 500);
				};
                /*
                    例 /index.html?openInfo=q1
                */
			};
		},

		//-------------------------------------使用jq區塊
		useJq() {
			new WOW().init();
			
			//-------------------------------------錨點平滑滾動效果
			$('a[href*="#"]').click(function () {
				if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
					var $target = $(this.hash);
					$target = ($target.length && $target) || $("[name=" + this.hash.slice(1) + "]");
					if ($target.length) {
						var targetOffset = $target.offset().top;
						$("html,body").animate({
							scrollTop: targetOffset
						},
							1000
						);
						return false;
					}
				}
			});

			//-------------------------------------qa收合
			$('.qaList-tit').on('click', function(){
				var _thisPosition = $(this).offset().top;
				if ($(this).parent('li').hasClass('active') == false) {
					$("html,body").animate({
						scrollTop: _thisPosition
					}, 1000);
				};
				
				$(this).parent('li').toggleClass('active');
				$(this).siblings('.qaList-content').slideToggle();
			});
		},

		//-------------------------------------播放聲音
		playVoice(hz) {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			(function () {
				if (!window.AudioContext) {
					console.log("當前瀏覽器不支援Web Audio API");
					return;
				}

				// 創建新的音頻上下文接口
				var audioCtx = new AudioContext();

				// 發出的聲音頻率數據，表現為音調的高低(赫茲Hz)
				var arrFrequency = [hz, hz];

				// 音調依次遞增或者遞減處理需要的參數
				var start = 0,
					direction = 1;

				// 當前頻率
				var frequency = arrFrequency[start];
				// 如果到頭，改變音調的變化規則（增減切換）
				if (!frequency) {
					direction = -1 * direction;
					start = start + 2 * direction;
					frequency = arrFrequency[start];
				}
				// 改變索引，下一次hover時候使用
				start = start + direction;

				// 創建一個OscillatorNode, 它表示一個週期性波形（振盪），基本上來說創造了一個音調
				var oscillator = audioCtx.createOscillator();
				// 創建一個GainNode,它可以控制音頻的總音量
				var gainNode = audioCtx.createGain();
				// 把音量，音調和終節點進行關聯
				oscillator.connect(gainNode);
				// audioCtx.destination返回AudioDestinationNode對象，表示當前audio context中所有節點的最終節點，一般表示音頻渲染設備
				gainNode.connect(audioCtx.destination);
				// 指定音調的類型，其他還有sine|square|triangle|sawtooth
				oscillator.type = "sine";
				// 設置當前播放聲音的頻率，也就是最終播放聲音的調調
				oscillator.frequency.value = frequency;
				// 當前時間設置音量為0
				gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
				// 0.01秒後音量為1
				gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
				// 音調從當前時間開始播放
				oscillator.start(audioCtx.currentTime);
				// 1秒內聲音慢慢降低，是個不錯的停止聲音的方法
				gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
				// 1秒後完全停止聲音
				oscillator.stop(audioCtx.currentTime + 1);
			})();
		},
	},
	watch: {
		screenWidth(val) {
			this.screenWidth = val
		},
		screenHeight(val) {
			this.screenHeight = val
		},
		windowWidth(val) {
			this.windowWidth = val
		},
		windowHeight(val) {
			this.windowHeight = val
		},
	},
});