var win_W, win_H, win_Scroll;

$(window).load(function () {
    setTimeout(function(){

        win_W = $(window).width();                                      // 螢幕寬度
        win_H = $(window).innerHeight();                                // 螢幕高度
        win_Scroll = $(window).scrollTop();                             // 捲軸位置

        $(window).scrollTop(win_Scroll - 1);

        $(window).resize(function (e) {
            win_W = $(window).width();
            win_Scroll = $(window).scrollTop();
        });

        $(window).scroll(function(){
            win_Scroll = $(window).scrollTop();
        });

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

        //-------------------------------------浮動式top鍵
        // $(window).load(function(){
            $(window).bind('scroll resize', function(){
                var $this = $(this);
                var $this_Top=$this.scrollTop();

                //當高度小於100時，關閉區塊 
                if($this_Top < 100){
                    $('.topBtn').stop().animate({bottom:"-70px"});
                }
                if($this_Top > 100){
                    $('.topBtn').stop().animate({bottom:"60px"});
                }
            }).scroll();
        // });

        //-------------------------------------手機版主按鍵收合
        $(".menuBtn").click(function (e) {
            $(this).toggleClass("active");
            $(".navbar").slideToggle(200);
            // $("body").toggleClass("noScrollBar");
            navIcon();
            // e.stopPropagation();
        });

        $(window).resize(function (e) {
            if ( win_W > 991 ) {
                $(".navbar").removeAttr("style");
                $(".menuBtn").removeClass("active");
                // $("body").removeClass("noScrollBar");
            }
        });

        //-------------------------------------主按鍵
        var _navLength = $('.nav').length;
        var _itemPos = [];
        for (n = 0; n < _navLength; n++) {
            _itemPos[n] = $('.item').eq(n).offset().top;
        };

        var _navActiveWidth;
        var _navActiveHeight;
        var _navActivePosLeft;
        var _navActivePosBottom;
        var _navActivePosTop;

        function navIcon() {
            for (n = 0; n < _navLength; n++) {
                if (win_Scroll >= (_itemPos[n]-70)) {
                    $('.nav').eq(n).addClass('active').siblings().removeClass('active');
                }if (win_Scroll < (_itemPos[0]-70)) {
                    $('.nav').removeClass('active');
                }
            };

            if ( $('.nav.active').length > 0 ) {
                _navActiveWidth = $('.nav.active').innerWidth();
                _navActiveHeight = $('.nav.active').innerHeight();
                _navActivePosLeft = $('.nav.active').position().left;
                _navActivePosBottom = ($('.nav.active').position().top)+(_navActiveHeight);
                // _navActivePosTop = $('.nav.active').position().top;
                $('.navIcon').css({
                    'left' : (_navActivePosLeft)+10,
                    'top' : (_navActivePosBottom - 5),
                    // 'top' : _navActivePosTop,
                    'width' : (_navActiveWidth)-20
                })
                // console.log(_navActivePosLeft, _navActiveWidth);
            }else {
                $('.navIcon').removeAttr('style');
            };
        }
        $(window).scroll(function(){
            navIcon();
        });
        // console.log(_itemPos);

        //-------------------------------------滾動視差
        var _parallaxScrolling_item;                                // 大區塊名稱
        var _parallaxScrolling_itemIn;                              // 裡面小區塊名稱

        var _parallaxScrolling_path_fadeIn_top;                     // 往上淡出
        var _parallaxScrolling_path_fadeIn_left;                    // 往左淡出
        var _parallaxScrolling_path_fadeIn_right;                   // 往右淡出
        var _parallaxScrolling_path_fadeIn_bottom;                  // 往下淡出

        var _parallaxQty;                                           // 數量
        var _parallaxPos = [];                                      // 大區塊位置
        var _parallaxTriggerDistance;                               // 觸發距離

        _parallaxScrolling_item                 = $('[data-parallax="parallaxItem"]');
        _parallaxScrolling_itemIn               = $('[data-parallax="parallaxItemIn"]');
        _parallaxScrolling_path_fadeIn_top      = $('[data-parallaxPath="parallaxPath-fadeIn-top"]');
        _parallaxScrolling_path_fadeIn_left     = $('[data-parallaxPath="parallaxPath-fadeIn-left"]');
        _parallaxScrolling_path_fadeIn_right    = $('[data-parallaxPath="parallaxPath-fadeIn-right"]');
        _parallaxScrolling_path_fadeIn_bottom   = $('[data-parallaxPath="parallaxPath-fadeIn-bottom"]');

        _parallaxQty                            = _parallaxScrolling_item.length;
        _parallaxTriggerDistance                = (win_H - 100);

        // function test(n) {
        //     setTimeout(function () {
        //         console.log(n);
        //     }, 500*n)
        // }

        function parallaxScrolling() {
            
            for ( n = 0; n < _parallaxQty; n++ ) {
                _parallaxPos[n] = _parallaxScrolling_item.eq(n).offset().top;

                if ( (win_Scroll + _parallaxTriggerDistance) >= _parallaxPos[n] ) {
                    _parallaxScrolling_item.eq(n).addClass('parallaxShow');
                    // setTimeout(function () {
                    //     console.log(n);
                    // }, 1 * n);
                };
                // test(n);
            };
        }

        $(window).scroll(function(){
            // parallaxScrolling();
            // console.log(_parallaxPos);
        });

        // setTimeout(function(){
        //     //-------------------------------------slick
        //     $('.slickBanner').slick({
        //         autoplay: true,
        //         pauseOnHover: false,
        //         dots: true,
        //         infinite: true,
        //         autoplaySpeed: 5000,
        //         speed: 500,
        //         fade: true,
        //         cssEase: 'linear'
        //     });
        // }, 500);

    }, 500);
});