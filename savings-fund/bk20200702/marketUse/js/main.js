// ========= header ==============================================================================================================================
Vue.component("navbar", {
	props: ["activeNumber", "navbarShow"],
	template: ` <nav class="navBar" :class="{show: navbarShow}">
					<ul>
						<li :class="{active : (activeNumber == 0)}">
							<a href="index.html#questionnaire" title="國民理財大調查" class="focusLink" @click.prevent="$scrollTo('#questionnaire')">
							<i class="fas fa-star"></i> 國民理財大調查 <i class="fas fa-star"></i>
							</a>
						</li>
						<li :class="{active : (activeNumber == 1)}">
							<a href="index.html#newThought" title="國民理財新思維" @click.prevent="$scrollTo('#newThought')">
								國民理財新思維
							</a>
						</li>
						<!--li :class="{active : (activeNumber == 2)}">
							<a href="index.html#talk" title="老司機開講">
								老司機開講
							</a>
						</li>
						<li :class="{active : (activeNumber == 3)}">
							<a href="together.html" title="#一起存基金">
								#一起存基金
							</a>
						</li-->
					</ul>
				</nav>`,
});
Vue.component("headerArea", {
	data: function () {
		return {
			menuBtnActive: false,
			navbarShow: false,
		};
	},
	props: ["activeNumber"],
	template: ` <header class="header">
					<div class="container clearfix">
						<div class="logo">
							<a href="http://www.franklin.com.tw/" target="_blank" title="富蘭克林證券投顧">
								<picture>
									<source media="(max-width: 991px)" srcset="https://event.franklin.com.tw/commonResources/images/logo2019.svg">
									<img src="https://event.franklin.com.tw/commonResources/images/header-logo.png" alt="富蘭克林‧國民的基金">
								</picture>
								<div class="logo-text">
									富蘭克林‧國民的基金
								</div>
							</a>
						</div>
						<!--navbar :active-number="activeNumber" :navbar-show="navbarShow"></navbar-->

						<!--手機menu按鍵-->
						<!--div class="menuBtn" data-wow-delay="0.8s" :class="{active: menuBtnActive}" @click="toggleMobileNavbar()">
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
						</div-->
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
										<img src="https://event.franklin.com.tw/commonResources/images/footer-logo.png" alt="富蘭克林證券投顧">
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
					info: `本公司所提供之資訊，僅供接收人之參考用途。本公司當盡力提供正確之資訊，所載資料均來自或本諸我們相信可靠之來源，但對其完整性、即時性和正確性不做任何擔保，如有錯漏或疏忽，本公司或關係企業與其任何董事或受僱人，並不負任何法律責任。任何人因信賴此等資料而做出或改變投資決策，須自行承擔結果。`,
				},
				{
					id: 1,
					info: `投資中國比重指掛牌於大陸、香港、新加坡、美國等地區中國企業之投資比重，依規定投資大陸地區證券市場之有價證券不得超過本基金淨資產價值之20%，另投資香港地區紅籌股及H股並無限制。本基金並非完全投資於大陸地區之有價證券，投資人仍須留意中國市場特定政治、經濟與市場之投資風險。本基金之主要投資風險除包含一般股票型基金之投資組合跌價與匯率風險外，與成熟市場相比須承受較高之政治與金融管理風險，而因市值及制度性因素，流動性風險也相對較高，新興市場投資組合波動性普遍高於成熟市場。基金投資均涉及風險且不負任何抵抗投資虧損之擔保。投資風險之詳細資料請參閱基金公開說明書。`,
				},
				{
					id: 2,
					info: `本基金經金融監督管理委員會核准或申報生效在國內募集及銷售，惟不表示絕無風險。基金經理公司以往之經理績效不保證基金之最低投資收益；基金經理公司除盡善良管理人之注意義務外，不負責本基金之盈虧，亦不保證最低之收益，投資人申購前應詳閱基金公開說明書。本資料提及之經濟走勢預測，不必然代表基金之績效。投資基金所應承擔之相關風險及應負擔之費用(含分銷費用)已揭露於基金公開說明書及投資人須知中，投資人可至境外基金資訊觀測站(<a href="http://www.fundclear.com.tw" target="_blank">http://www.fundclear.com.tw</a>)下載，或逕向本公司網站(<a href="https://www.Franklin.com.tw" target="_blank">https://www.Franklin.com.tw</a>)查閱。`,
				},
				{
					id: 3,
					info: `基金的配息可能由基金的收益或本金中支付。任何涉及由本金支出的部份，可能導致原始投資金額減損。部份基金進行配息前未先扣除應負擔之費用。由本金支付配息之相關資料已揭露於本公司網站，投資人可至本公司網站(<a href="https://www.franklin.com.tw" target="_blank">https://www.franklin.com.tw</a>)查閱。基金配息率不代表基金報酬率，且過去配息率不代表未來配息率；基金淨值可能因市場因素而上下波動，投資人於獲配息時，宜一併注意基金淨值之變動。`
				}
			],
		};
	},
	template: `<div class="footer-warning">
                    <ul>
                        <li v-for="item in list" v-bind:key="item.id" v-html="item.info"></li>
                    </ul>
                </div>`,
});

// ========= 燈箱 ==============================================================================================================================
Vue.component("modal", {
	props: ["canClose"],
	data: function () {
		return {
			toggle: false,
			isFixedHeight: false,
		};
	},
	template: ` <transition name="modal">
					<div class="modal" v-if="toggle">
						<div class="modal-bg" @click="closeModal()" v-if="canClose == true"></div>
						<div class="modal-bg" v-if="canClose == false"></div>
						<div class="modal-container" :class="{fixedHeight: isFixedHeight}" ref="modalContainer" id="modalContainer">
							<div class="modal-close closeBtn" @click="closeModal()" v-if="canClose == true">
								<i class="fa fa-times" aria-hidden="true"></i>
							</div>
							<div class="modal-container-infoArea">
								<slot name="infoArea"></slot>
							</div>
						</div>
					</div>
				</transition>`,
	methods: {
		closeModal() {
			this.toggle = false;
		},
	},
});

// ========= vue版 slick ==============================================================================================================================
Vue.component("slick", {
	props: {
		options: {
			type: Object,
			default: function () {
				return {};
			},
		},
	},
	mounted() {
		this.create();
	},
	destroyed: function () {
		$(this.$el).slick("unslick");
	},
	methods: {
		create: function () {
			const $slick = $(this.$el);
			$slick.on("after-change", this.onAfterChange);
			$slick.on("before-change", this.onBeforeChange);
			$slick.on("breakpoint", this.onBreakpoint);
			$slick.on("destroy", this.onDestroy);
			$slick.on("edge", this.onEdge);
			$slick.on("init", this.onInit);
			$slick.on("reInit", this.onReInit);
			$slick.on("set-position", this.onSetPosition);
			$slick.on("swipe", this.onSwipe);
			$slick.on("lazyLoaded", this.onLazyLoaded);
			$slick.on("lazyLoadError", this.onLazyLoadError);
			$slick.slick(this.options);
		},
		destroy: function () {
			const $slick = $(this.$el);
			$slick.off("after-change", this.onAfterChange);
			$slick.off("before-change", this.onBeforeChange);
			$slick.off("breakpoint", this.onBreakpoint);
			$slick.off("destroy", this.onDestroy);
			$slick.off("edge", this.onEdge);
			$slick.off("init", this.onInit);
			$slick.off("reInit", this.onReInit);
			$slick.off("set-position", this.onSetPosition);
			$slick.off("swipe", this.onSwipe);
			$slick.off("lazyLoaded", this.onLazyLoaded);
			$slick.off("lazyLoadError", this.onLazyLoadError);
			$(this.$el).slick("unslick");
		},
		reSlick: function () {
			this.destroy();
			this.create();
		},
		next: function () {
			$(this.$el).slick("slickNext");
		},
		prev: function () {
			$(this.$el).slick("slickPrev");
		},
		pause: function () {
			$(this.$el).slick("slickPause");
		},
		play: function () {
			$(this.$el).slick("slickPlay");
		},
		goTo: function (index, dontAnimate) {
			$(this.$el).slick("slickGoTo", index, dontAnimate);
		},
		currentSlide: function () {
			return $(this.$el).slick("slickCurrentSlide");
		},
		add: function (element, index, addBefore) {
			$(this.$el).slick("slickAdd", element, index, addBefore);
		},
		remove: function (index, removeBefore) {
			$(this.$el).slick("slickRemove", index, removeBefore);
		},
		filter: function (filterData) {
			$(this.$el).slick("slickFilter", filterData);
		},
		unfilter: function () {
			$(this.$el).slick("slickUnfilter");
		},
		getOption: function (option) {
			$(this.$el).slick("slickGetOption", option);
		},
		setOption: function (option, value, refresh) {
			$(this.$el).slick("slickSetOption", option, value, refresh);
		},
		setPosition: function () {
			$(this.$el).slick("set-position");
		},
		// Events
		onAfterChange: function (event, slick, currentSlide) {
			this.$emit("after-change", event, slick, currentSlide);
		},
		onBeforeChange: function (event, slick, currentSlide, nextSlide) {
			this.$emit("before-change", event, slick, currentSlide, nextSlide);
		},
		onBreakpoint: function (event, slick, breakpoint) {
			this.$emit("breakpoint", event, slick, breakpoint);
		},
		onDestroy: function (event, slick) {
			this.$emit("destroy", event, slick);
		},
		onEdge: function (event, slick, direction) {
			this.$emit("edge", event, slick, direction);
		},
		onInit: function (event, slick) {
			this.$emit("init", event, slick);
		},
		onReInit: function (event, slick) {
			this.$emit("reInit", event, slick);
		},
		onSetPosition: function (event, slick) {
			this.$emit("set-position", event, slick);
		},
		onSwipe: function (event, slick, direction) {
			this.$emit("swipe", event, slick, direction);
		},
		onLazyLoaded: function (event, slick, image, imageSource) {
			this.$emit("lazyLoaded", event, slick, image, imageSource);
		},
		onLazyLoadError: function (event, slick, image, imageSource) {
			this.$emit("lazyLoadError", event, slick, image, imageSource);
		},
	},
	template: ` <div>
                    <slot></slot>
                </div>`,
});
var slickFunction = {
	data() {
		return {
			slickOptions: {
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				pauseOnHover: false,
				infinite: true,
				autoplaySpeed: 5000,
				speed: 500,
				adaptiveHeight: true,
				// arrows: false,
				// fade: true,
			},
		};
	},
	methods: {
		next() {
			this.$refs.slick.next();
		},

		prev() {
			this.$refs.slick.prev();
		},

		reInit() {
			// Helpful if you have to deal with v-for to update dynamic lists
			this.$nextTick(() => {
				this.$refs.slick.reSlick();
			});
		},

		// Events listeners
		handleAfterChange(event, slick, currentSlide) {
			// console.log('handleAfterChange', event, slick, currentSlide);
		},
		handleBeforeChange(event, slick, currentSlide, nextSlide) {
			// console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
		},
		handleBreakpoint(event, slick, breakpoint) {
			// console.log('handleBreakpoint', event, slick, breakpoint);
		},
		handleDestroy(event, slick) {
			// console.log('handleDestroy', event, slick);
		},
		handleEdge(event, slick, direction) {
			// console.log('handleEdge', event, slick, direction);
		},
		handleInit(event, slick) {
			// console.log('handleInit', event, slick);
		},
		handleReInit(event, slick) {
			// console.log('handleReInit', event, slick);
		},
		handleSetPosition(event, slick) {
			// console.log('handleSetPosition', event, slick);
		},
		handleSwipe(event, slick, direction) {
			// console.log('handleSwipe', event, slick, direction);
		},
		handleLazyLoaded(event, slick, image, imageSource) {
			// console.log('handleLazyLoaded', event, slick, image, imageSource);
		},
		handleLazeLoadError(event, slick, image, imageSource) {
			// console.log('handleLazeLoadError', event, slick, image, imageSource);
		},
	},
};

var content = new Vue({
	el: "#content",
	mixins: [slickFunction],
	data: {
		name: "富蘭克林證券投顧",
		screenWidth: document.body.clientWidth,
		screenHeight: document.body.clientHeight,
		windowWidth: $(window).innerWidth(),
		windowHeight: $(window).innerHeight(),
		menuBtnActive: false,
		navbarShow: false,
		ieUseMask: true,
		thisPath: location.protocol + "//" + location.host,
		fundList1: [
			{
				fundLink: `https://event.franklin.com.tw/C2018_07_Q3_0797/index.html`,
				img: `marketUse/images/img-4.jpg`,
				tit: `科技基金`,
				fundWarning: ``,
				text: `聚焦「雲端運算」、「人工智慧」和「電子商務」三大主軸的全球領導品牌，瞄準科技創新成長動能，掌握疫後宅經濟需求，非存不可！`,
				link1: `https://etrade.franklin.com.tw/Trade/Sip/ShowForm/0797`,
				link2: `https://etrade.franklin.com.tw/Trade/LumpSum/ShowForm/0797`,
			},
			{
				fundLink: `https://event.franklin.com.tw/C2018_07_Q3_0796/index.html`,
				img: `marketUse/images/img-5.jpg`,
				tit: `生技領航基金`,
				fundWarning: ``,
				text: `聚焦「醫藥創新」與「併購熱潮」帶來的投資機會，掌握生技產業發展動能，同時滿足老年化趨勢與疫苗開發需求二大熱潮，非存不可！`,
				link1: `https://etrade.franklin.com.tw/Trade/Sip/ShowForm/0796`,
				link2: `https://etrade.franklin.com.tw/Trade/LumpSum/ShowForm/0796`,
			},
			{
				fundLink: `https://event.franklin.com.tw/C2018_12_Q4_0799/index.html`,
				img: `marketUse/images/img-6.jpg`,
				tit: `美國機會基金`,
				fundWarning: ``,
				text: `把關嚴謹，精選高品質成長績優股；多元佈局，全方位聚焦美股新機會。同時掌握科技與生技雙主流，堪稱美國旗艦型基金，非存不可！`,
				link1: `https://etrade.franklin.com.tw/Trade/Sip/ShowForm/0799`,
				link2: `https://etrade.franklin.com.tw/Trade/LumpSum/ShowForm/0799`,
			},
		],
		fundList2: [
			{
				fundLink: `https://event.franklin.com.tw/global-climate-change-fund/index.html`,
				img: `marketUse/images/img-7.jpg`,
				tit: `全球氣候變遷基金`,
				fundWarning: ``,
				text: `秉持ESG核心投資價值(環境-Environmental、社會-Social和治理因素-Governance)，創造投資人、企業與環境的三贏局面，非存不可！`,
				link1: `https://etrade.franklin.com.tw/Trade/Sip/ShowForm/2108`,
				link2: `https://etrade.franklin.com.tw/Trade/LumpSum/ShowForm/2108`,
			},
			{
				fundLink: `https://www.franklin.com.tw/Fund/BasicInformation/0786`,
				img: `marketUse/images/img-8.jpg`,
				tit: `亞洲成長基金`,
				fundWarning: ``,
				text: `著重各國利基產業，聚焦經濟成長驅動的「金融服務」、科技進步帶動的「資訊生活」與中產階級推動的「消費動能」領域，非存不可！`,
				link1: `https://etrade.franklin.com.tw/Trade/Sip/ShowForm/0786`,
				link2: `https://etrade.franklin.com.tw/Trade/LumpSum/ShowForm/0786`,
			},
			{
				fundLink: `https://www.franklin.com.tw/Fund/BasicInformation/132`,
				img: `marketUse/images/img-9.jpg`,
				tit: `黃金基金`,
				fundWarning: `(本基金之配息來源可能為本金)`,
				text: `把關嚴謹，精選高品質成長績優股；多元佈局，全方位聚焦美股新機會。同時掌握科技與生技雙主流，堪稱美國旗艦型基金，非存不可！`,
				link1: `https://etrade.franklin.com.tw/Trade/Sip/ShowForm/132`,
				link2: `https://etrade.franklin.com.tw/Trade/LumpSum/ShowForm/132`,
			},
		],
	},
	mounted() {
		// this.signature();
		this.addNoOpener();
		this.useJq();
		this.hideIeMask();
		this.showTarget();
		this.topBtn();
		// this.sameHeight('concept-item-text');
		// this.scrollMagic();

		$(window).resize(() => {
			this.windowWidth = $(window).innerWidth();
			this.windowHeight = $(window).innerHeight();
			// this.sameHeight('concept-item-text');
		});

		// setTimeout(() => {
		// 	this.playVoice(277.18);
		// 	setTimeout(()=>{
		// 		this.playVoice(349.23);
		// 		setTimeout(() => {
		// 			this.playVoice(392.00);
		// 		}, 200);
		// 	}, 400);
		// }, 1000);
	},
	methods: {
		signature() {
			console.log(
				"%cMade by Captain%c2020/06",
				"color: #fff; border-radius: 5px; background: #1a4f9c; padding: 2px 10px; font-weight: bold;",
				"color: #000; border-radius: 5px; background: #ffde00; padding: 2px 10px; margin: 0px 5px;"
			);
		},
		toggleModal(name) {
			this.$refs[name].toggle = !this.$refs[name].toggle;
		},
		toggleMobileNavbar() {
			this.menuBtnActive === false ? (this.menuBtnActive = true) : (this.menuBtnActive = false);
			this.navbarShow === false ? (this.navbarShow = true) : (this.navbarShow = false);
		},
		hideMobileNavbar() {
			this.menuBtnActive = false;
			this.navbarShow = false;
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
				_linkHasTargetBlank.eq(n).attr("href").indexOf(this.thisPath) ? _linkHasTargetBlank.eq(n).attr("rel", "nofollow me noopener noreferrer") : "";
			}
		},
		hideIeMask() {
			// ie用的遮罩
			setTimeout(() => {
				this.ieUseMask = false;
			}, 4000);
		},
		showTarget() {
			// 抓網址參數判斷要馬上顯示的區塊
			var url = location.href,
				i,
				openInfo = "";

			if (url.indexOf("?") != -1) {
				// 抓取網址參數判斷 --- Start
				function getUrlParams(url) {
					// 回傳網址參數Object
					var params = {};
					(url + "?")
					.split("?")[1]
						.split("&")
						.forEach(function (pair) {
							pair = (pair + "=").split("=").map(decodeURIComponent);
							if (pair[0].length) {
								params[pair[0]] = pair[1];
							}
						});
					return params;
				}

				var obj = getUrlParams(location.href);
				// 因為#hash會直接串在最後一個參數後面, 故需要取代處理
				if (Object.keys(obj).length && obj.hasOwnProperty("openInfo"))
					openInfo = obj.openInfo.indexOf("#") > -1 ? obj.openInfo.replace(location.hash, "") : obj.openInfo;
				// 抓取網址參數判斷 --- End

				if (this.$refs[openInfo] != undefined) {
					this.$refs[openInfo].toggle = true;
					if (openInfo == "q1" || openInfo == "q2" || openInfo == "q3" || openInfo == "q4") {
						setTimeout(function () {
							var targetOffset = $(".qa").offset().top;
							window.scrollTo(0, targetOffset);
						}, 500);
					}
					if (openInfo == "fund1" || openInfo == "fund2" || openInfo == "fund3" || openInfo == "fund4") {
						setTimeout(function () {
							var targetOffset = $("#recommend").offset().top;
							window.scrollTo(0, targetOffset - 100);
						}, 500);
					}
				}
				if (openInfo == "recommend") {
					setTimeout(function () {
						var targetOffset = $("#recommend").offset().top;
						window.scrollTo(0, targetOffset - 100);
						// console.log(openInfo, targetOffset);
					}, 500);
				}
				/*
						例 /index.html?openInfo=q1
				*/
			}
		},
		topBtn() {
			$(window)
				.bind("scroll resize", function () {
					var $this = $(this);
					var $this_Top = $this.scrollTop();

					//當高度小於100時，關閉區塊
					if ($this_Top < 100) {
						$(".topBtn").stop().css({
							transform: "matrix(1, 0, 0, 1, 0, 400)",
							opacity: 0,
						});
					}
					if ($this_Top > 100) {
						$(".topBtn").stop().css({
							transform: "matrix(1, 0, 0, 1, 0, 0)",
							opacity: 1,
						});
					}
				})
				.scroll();
		},

		//-------------------------------------scrollMagic
		scrollMagic() {
			// init controller
			var controller = new ScrollMagic.Controller();

			// banner --------------------------------------------------
			// var bannerTimeLine = new TimelineMax();

			// new ScrollMagic.Scene({triggerElement: ".banner", offset: 0})
			// 	.setTween(bannerTimeLine)
			// 	.addTo(controller);

			// bannerTimeLine.add(
			// 	TweenMax.from('.banner-content', 0.5, {
			// 		y: 100,
			// 		opacity: 0,
			// 	}),
			// ).add(
			// 	TweenMax.from('.banner-kv', 0.5, {
			// 		x: -100,
			// 		opacity: 0,
			// 	}),
			// ).add(
			// 	TweenMax.from('.banner-content-bottom .btn', 0.5, {
			// 		y: 100,
			// 		opacity: 0,
			// 	}),
			// );

			TweenMax.from(".adBanner-point-1", 0.4, {
				y: -400,
				opacity: 0,
			});
			TweenMax.from(".adBanner-point-2", 0.4, {
				y: -400,
				opacity: 0,
				delay: 0.2,
			});
			TweenMax.from(".adBanner .btn", 0.4, {
				y: -100,
				opacity: 0,
				delay: 0.4,
			});
			TweenMax.to(".adBanner", 0.4, {
				x: 200,
				y: -400,
				opacity: 0,
				scale: 0,
				delay: 2,
			});
			// TweenMax.from(".fixedRightBtn-area", 0.4, {
			// 	opacity: 0,
			// 	scale: 0,
			// 	delay: 2,
			// });

			// 特色 --------------------------------------------------
			// var featuresTimeLine = new TimelineMax();

			// new ScrollMagic.Scene({triggerElement: ".features", offset: -300})
			// 	.setTween(featuresTimeLine)
			// 	// .addIndicators({name: "1 (duration: 0)"})
			// 	.addTo(controller);

			// featuresTimeLine.add(
			// 	TweenMax.from('.features-content-robot', 0.3, {
			// 		x: -50,
			// 		opacity: 0,
			// 	}),
			// ).add(
			// 	TweenMax.from('.features .tit-type1', 0.4, {
			// 		y: 100,
			// 		opacity: 0,
			// 	}),
			// ).add(
			// 	TweenMax.from('.features-item:eq(0)', 0.2, {
			// 		y: 100,
			// 		opacity: 0,
			// 	}),
			// ).add(
			// 	TweenMax.from('.features-item:eq(1)', 0.2, {
			// 		y: 100,
			// 		opacity: 0,
			// 	}),
			// ).add(
			// 	TweenMax.from('.features-item:eq(2)', 0.2, {
			// 		y: 100,
			// 		opacity: 0,
			// 	}),
			// ).add(
			// 	TweenMax.from('.features-item:eq(3)', 0.2, {
			// 		y: 100,
			// 		opacity: 0,
			// 	}),
			// );
		},

		//-------------------------------------使用jq區塊
		useJq() {
			new WOW().init();
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
			this.screenWidth = val;
		},
		screenHeight(val) {
			this.screenHeight = val;
		},
		windowWidth(val) {
			this.windowWidth = val;
		},
		windowHeight(val) {
			this.windowHeight = val;
		},
	},
});