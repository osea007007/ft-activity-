// ========= foxed火車 ==============================================================================================================================
Vue.component('fixed-train', {
    template: ` <div class="fixedTrain wow fadeIn" data-wow-delay="0.5s">
                    <div class="fixedTrain-track">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="fixedTrain-train"></div>
                </div>`,
});

// ========= 精選基金 ==============================================================================================================================
Vue.component('prodList', {
    data: function () {
        return {
            prodListData: commonProdList
        }
    },
    template: ` <div class="featured-info-item-area">
                    <div class="featured-info-item wow fadeInUp" v-for="item in prodListData" v-bind:key="item.id" :data-wow-delay="item.id * 0.1 + 's'">
                        <a :href="item.url" target="_blank" :title="item.name + item.warning">
                            <img :src="item.img" :alt="item.name + item.warning">
                            <div class="featured-info-item-tit">
                                {{ item.name }}
                                <span class="focus">{{ item.warning }}</span>
                            </div>
                        </a>
                    </div>
                </div>`,
});

// ========= footer ==============================================================================================================================
// footer
Vue.component('footer-logo', {
    data: function () {
        return {
            name: '富蘭克林證券投顧',
        }
    },
    template: `<div class="footer-logo">
                    <a href="http://www.franklin.com.tw/" target="_blank" :title="name">
                        <img src="images/footer-logo-1.png" :alt="name">
                        <strong>{{name}}</strong>
                    </a>
                </div>`,
});

Vue.component('footer-contact', {
    data: function () {
        return {
            phoneTit: '國民理財專線',
        }
    },
    template: `<div class="footer-contact">
                    <div class="footer-contact-tel">
                        <strong>{{ phoneTit }}：</strong>
                        <a href="tel:0800-885-888" :title="phoneTit">
                            <strong>0800-885-888</strong>
                        </a>
                    </div>
                    <ul class="footer-contact-link">
                        <li>
                            <a href="https://www.facebook.com/franklin.taiwan/" target="_blank" title="粉絲團">
                                <img src="images/icon-fb.png" alt="">
                            </a>
                        </li>
                        <li>
                            <a href="http://line.naver.jp/ti/p/%40franklin" target="_blank" title="Line">
                                <img src="images/icon-line.png" alt="">
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/user/franklin0800885888" target="_blank" title="youtube">
                                <img src="images/icon-youtube.png" alt="">
                            </a>
                        </li>
                    </ul>
                </div>`,
});

Vue.component('footer-warning', {
    template: `<div class="footer-warning">
                    <ul>
                        <li> 本公司所提供之資訊，僅供接收人之參考用途。本公司當盡力提供正確之資訊，所載資料均來自或本諸我們相信可靠之來源，但對其完整性、即時性和正確性不做任何擔保，如有錯漏或疏忽，本公司或關係企業與其任何董事或受僱人，並不負任何法律責任。任何人因信賴此等資料而做出或改變投資決策，須自行承擔結果。本網頁所載資料或任何部份均不可以進行抄錄、翻印或另作派發。</li>
                        <li> 本境外基金經金融監督管理委員會核准或申報生效在國內募集及銷售，惟不表示絕無風險。基金經理公司以往之經理績效不保證基金之最低投資收益；基金經理公司除盡善良管理人之注意義務外，不負責本基金之盈虧，亦不保證最低之收益，投資人申購前應詳閱基金公開說明書。</li>
                        <li> <span class="footer-warning-focus">由於高收益債券之信用評等未達投資等級或未經信用評等，且對利率變動的敏感度甚高，故本基金可能會因利率上升、市場流動性下降，或債券發行機構違約不支付本金、利息或破產而蒙受虧損。本基金不適合無法承擔相關風險之投資人。基金經理公司以往之經理績效不保證基金之最低投資收益；基金經理公司除盡善良管理人之注意義務外，不負責本基金之盈虧，亦不保證最低之收益，投資人申購前應詳閱基金公開說明書。本基金較適合投資屬性中風險承受度較高之投資人，投資人投資高收益債券為訴求基金不宜占其投資組合過高之比重，投資人應審慎評估。</span></li>
                        <li> 由於新興市場基金之主要投資風險除包含一般股票型基金之投資組合跌價與匯率風險外，與成熟市場相比須承受較高之政治與金融管理風險，而因市值及制度性因素，流動性風險也相對較高，新興市場投資組合波動性普遍高於成熟市場。基金投資均涉及風險且不負任何抵抗投資虧損之擔保。投資風險之詳細資料請參閱基金公開說明書。</li>
                        <li> <span class="footer-warning-focus">境外基金投資大陸地區證券市場之有價證券以掛牌上市有價證券為限，且投資前述有價證券總金額不得超過本基金淨資產價值之20%，另投資香港地區紅籌股及H股並無限制。本基金並非完全投資於大陸地區之有價證券，投資人仍須留意中國市場特定政治、經濟與市場之投資風險。</span></li>
                        <li> 基金的配息可能由基金的收益或本金中支付。部分基金進行配息前未先扣除應負擔之費用。任何涉及由本金支出的部份，可能導致原始投資金額減損。由本金支付配息之相關資料已揭露於本公司網站，投資人可至本公司網站(<jf-web-link href="https://www.Franklin.com.tw" target="_blank">https://www.Franklin.com.tw</jf-web-link>)查閱。</li>
                        <li> 投資基金所應承擔之相關風險及應負擔之費用(含分銷費用)已揭露於基金公開說明書及投資人須知中，投資人可至境外基金資訊觀測站(<jf-web-link href="https://www.fundclear.com.tw/" target="_blank">https://www.fundclear.com.tw/</jf-web-link>)下載，或逕向本公司網站(<jf-web-link href="https://www.franklin.com.tw/" target="_blank">https://www.franklin.com.tw/</jf-web-link>)查閱。
                        <div class="footer-warning-remark">【富蘭克林證券投顧獨立經營管理】</div></li>
                    </ul>
                </div>`,
});

Vue.component('footer-area', {
    template: `<footer>
                    <div class="colorLine" id="top">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="container">
                        <div class="clearfix">
                            
                            <footer-logo></footer-logo>
                            <footer-contact></footer-contact>
                            
                        </div>

                        <div class="copyright">
                            富蘭克林證券投資顧問(股)公司 ｜ 台北市忠孝東路四段87號8樓 ｜ 101年金管投顧新字第025號 ｜ 版權所有富蘭克林證券投顧 FRANKLIN TEMPLETON INVESTMENTS
                        </div>
                        <div class="footer-line"></div>
                        <footer-warning></footer-warning>
                    </div>
                </footer>`,
});

Vue.component('more-btns', {
    template: `
                <div class="cta-area twoCta wow fadeInUp">
                    <jf-go-to-fund class="cta" fundId="0799">
                        <a href="javascript:void(0);" target="_blank" title="立即擁有">
                            <strong>立即擁有</strong>
                            <i class="fas fa-angle-right"></i>
                        </a>
                    </jf-go-to-fund>
                    <jf-go-to-fund class="cta redCta" fundId="0799">
                        <a href="javascript:void(0);" target="_blank" title="了解更多">
                            <strong>了解更多</strong>
                            <i class="fas fa-angle-right"></i>
                        </a>
                    </jf-go-to-fund>
                </div>
                `
})

var content = new Vue({
    el: '#content',
    data: {
        name: '富蘭克林證券投顧',
        screenWidth: document.body.clientWidth,
        windowWidth: 0,
        windowHeight: 0,
        menuBtnActive: false,
        navbarShow: false,
    },
    mounted() {
        this.$nextTick(() => {
            //-------------------------------------signature
            console.log('%cMade by Captain%c2018/12',
                'color: #fff; border-radius: 5px; background: #1a4f9c; padding: 2px 10px; font-weight: bold;',
                'color: #000; border-radius: 5px; background: #ffde00; padding: 2px 10px; margin: 0px 5px;');

            var win_W = $(window).width();                                      // 螢幕寬度
            var win_H = $(window).innerHeight();                                // 螢幕高度
            var win_Scroll = $(window).scrollTop();                             // 捲軸位置
            var thisPath = location.protocol + '//' + location.host;             // 網域
            var n;

            $(window).resize(function (e) {
                win_W = $(window).width();
                win_Scroll = $(window).scrollTop();
            });

            $(window).scroll(function () {
                win_Scroll = $(window).scrollTop();
            });

            //-------------------------------------WOW
            new WOW().init();

            //-------------------------------------資安用  target="_blank" 加 rel="nofollow me noopener noreferrer"
            function addNoOpener() {
                var _linkHasTargetBlank = $('a[target="_blank"]');
                for (n = 0; n < _linkHasTargetBlank.length; n++) {
                    // 如果要連的網址跟這網站網域不同  加[rel="nofollow me noopener noreferrer"]
                    _linkHasTargetBlank.eq(n).attr('href').indexOf(thisPath) ? _linkHasTargetBlank.eq(n).attr('rel', 'nofollow me noopener noreferrer') : '';
                };
            }
            addNoOpener();

            //-------------------------------------浮動式top鍵
            $(window).bind('scroll resize', function () {
                var $this = $(this);
                var $this_Top = $this.scrollTop();

                //當高度小於100時，關閉區塊 
                if ($this_Top < 100) {
                    $('.topBtn').stop().animate({
                        bottom: "-70px"
                    });
                }
                if ($this_Top > 100) {
                    $('.topBtn').stop().animate({
                        bottom: "70px"
                    });
                }
            }).scroll();

            //-------------------------------------錨點平滑滾動效果
            $('a[href*=#]').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var $target = $(this.hash);
                    $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                    if ($target.length) {
                        var targetOffset = $target.offset().top;
                        $('html,body').animate({
                            scrollTop: targetOffset
                        },
                            1000);
                        return false;
                    }
                }
            });

            //-------------------------------------導航列
            var _itemName = $('.item'); // 區塊class name
            var _itemPos = [];
            var _itemLength = _itemName.length;
            var _itemPosCut = 10; // 要減掉的高度

            function navIcon() {
                for (n = 0; n < _itemLength; n++) {
                    _itemPos[n] = _itemName.eq(n).offset().top;
                };
                for (n = 0; n < _itemLength; n++) {
                    if (win_Scroll >= (_itemPos[n] - _itemPosCut)) {
                        $('.nav').eq(n).addClass('active').siblings().removeClass('active');
                    }
                    if (win_Scroll < (_itemPos[0] - _itemPosCut)) {
                        $('.nav').removeClass('active');
                    };
                };
            }
            $(window).scroll(function () {
                navIcon();
            });
        })
    },
    methods: {
        toggleMobileNavbar() {
            this.menuBtnActive === false ? this.menuBtnActive = true : this.menuBtnActive = false;
            this.navbarShow === false ? this.navbarShow = true : this.navbarShow = false;
        },
        hideMobileNavbar() {
            this.menuBtnActive = false
            this.navbarShow = false
        },
    },
    watch: {
        screenWidth(val) {
            this.screenWidth = val
        },
    },
});