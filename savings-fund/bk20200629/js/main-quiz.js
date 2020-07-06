// ========= header ==============================================================================================================================
Vue.component("navbar", {
  props: ["activeNumber", "navbarShow"],
  template: ` <nav class="navBar" :class="{show: navbarShow}">
					<ul>
						<li :class="{active : (activeNumber == 0)}">
							<a href="index.html" title="回問卷大調查">
                                回問卷大調查
							</a>
						</li>
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
						<navbar :active-number="activeNumber" :navbar-show="navbarShow"></navbar>

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
      list: [
        {
          id: 0,
          info: `本基金經金融監督管理委員會核准或申報生效在國內募集及銷售，惟不表示絕無風險。基金經理公司以往之經理績效不保證基金之最低投資收益；基金經理公司除盡善良管理人之注意義務外，不負責本基金之盈虧，亦不保證最低之收益，投資人申購前應詳閱基金公開說明書。`,
        },
        {
          id: 1,
          info: `本公司所提供之資訊，僅供接收人之參考用途。本公司當盡力提供正確之資訊，所載資料均來自或本諸我們相信可靠之來源，但對其完整性、即時性和正確性不做任何擔保，如有錯漏或疏忽，本公司或關係企業與其任何董事或受僱人，並不負任何法律責任。任何人因信賴此等資料而做出或改變投資決策，須自行承擔結果。本網頁所載資料或任何部份均不可以進行抄錄、翻印或另作派發。`,
        },
        {
          id: 2,
          info: `有關基金所應承擔之相關風險及應負擔之費用(含分銷費用)已揭露於基金公開說明書及投資人須知中，投資人可至基金資訊觀測站(<a href="http://www.fundclear.com.tw" target="_blank">http://www.fundclear.com.tw</a>)下載，或逕向本公司網站(<a href="https://www.franklin.com.tw" target="_blank">https://www.franklin.com.tw</a>)查閱。`,
        },
      ],
    };
  },
  template: `<div class="footer-warning">
                    <ul>
                        <li v-for="item in list" v-bind:key="item.id" v-html="item.info"></li>
                    </ul>
                </div>`,
});

// ========= CTA ==============================================================================================================================
// 2020-06-02 Jeffery 增加part2判斷
Vue.component("ctaAd", {
  props: ["isPart2"],
  template: ` <div>
					<div class="adBanner">
						<div class="adBanner-point-area" v-if="!isPart2">
							<img src="images/adBanner-point-2.png" alt="" class="adBanner-point adBanner-point-2">
							<img src="images/adBanner-point-1.png" alt="" class="adBanner-point adBanner-point-1">
						</div>
						<div class="btn type2" :class="!isPart2 ? 'rightArrowCta' : 'downArrowCta'">
							<a href="https://franklin.surveycake.biz/s/NwVWe" target="_blank" title="立即參加搶萬份好禮" v-if="!isPart2">
								<b>立即參加搶萬份好禮</b> <i class="fas fa-arrow-right"></i>
                            </a>
                            <a href="" @click.prevent="$scrollTo('.part2')" target="_blank" title="立即預約存基金" v-else>
                                <b>立即預約存基金</b> <i class="fas fa-arrow-down"></i>
                            </a>
						</div>
					</div>

					<div class="fixedRightBtn-area clearfix">
						<div class="fixedRightBtn" :class="!isPart2 ? 'rightArrowCta' : 'downArrowCta'">
							<a href="https://franklin.surveycake.biz/s/NwVWe" target="_blank" title="立即參加搶萬份好禮" v-if="!isPart2">
								立即參加搶萬份好禮 <i class="fas fa-arrow-right"></i>
							</a>
                            <a href="" @click.prevent="$scrollTo('.part2')" target="_blank" title="立即預約存基金" v-else>
                                <b>立即預約存基金</b> <i class="fas fa-arrow-down"></i>
                            </a>
						</div>
					</div>
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

var content = new Vue({
  el: "#content",
  mixins: [front],
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
  },
  mounted() {
    // this.signature();
    this.addNoOpener();
    this.useJq();
    this.hideIeMask();
    this.showTarget();
    this.topBtn();
    // this.sameHeight('concept-item-text');
    this.scrollMagic();

    $(window).resize(() => {
      this.windowWidth = $(window).innerWidth();
      this.windowHeight = $(window).innerHeight();
      // this.sameHeight('concept-item-text');
    });
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
      TweenMax.from(".fixedRightBtn-area", 0.4, {
        opacity: 0,
        scale: 0,
        delay: 2,
      });

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
      //-------------------------------------錨點平滑滾動效果
      // 2020-05-29 Jeffery 用vue scroll to做
      /*$('a[href*="#"]').click(function () {
              if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = ($target.length && $target) || $("[name=" + this.hash.slice(1) + "]");
                if ($target.length) {
                  var targetOffset = $target.offset().top;
                  $("html,body").animate(
                    {
                      scrollTop: targetOffset,
                    },
                    1000
                  );
                  return false;
                }
              }
            });*/

      new WOW().init();
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
