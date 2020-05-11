var win_W = $(window).width();                                      // 螢幕寬度
var win_H = $(window).innerHeight();                                // 螢幕高度
var win_Scroll = $(window).scrollTop();                             // 捲軸位置
var thisPath = location.protocol + '//' +location.host;             // 網域

$(window).resize(function (e) {
    win_W = $(window).width();
    win_Scroll = $(window).scrollTop();
});

$(window).scroll(function(){
    win_Scroll = $(window).scrollTop();
});

//-------------------------------------target="_blank" 加 rel="nofollow me noopener noreferrer"
// function addNoOpener() {
//     var _linkHasTargetBlank = $('a[target="_blank"]');
//     for (n = 0; n < _linkHasTargetBlank.length; n++) {
//         // 如果要連的網址跟這網站網域不同  加[rel="nofollow me noopener noreferrer"]
//         _linkHasTargetBlank.eq(n).attr('href').indexOf(thisPath) ? _linkHasTargetBlank.eq(n).attr('rel', 'nofollow me noopener noreferrer') : '';
//     };
//     // console.log(_linkHasTargetBlank.length);
// }
// addNoOpener();

// // 監聽dom更動後執行
// $("body").bind('DOMNodeInserted', function (e) {
//     addNoOpener();
// });

//-------------------------------------浮動式top鍵
// $(window).load(function(){
    // $(window).bind('scroll resize', function () {
    //     var $this = $(this);
    //     var $this_Top = $this.scrollTop();

    //     //當高度小於100時，關閉區塊 
    //     if ($this_Top < 100) {
    //         $('.topBtn').stop().animate({
    //             bottom: "-70px"
    //         });
    //     }
    //     if ($this_Top > 100) {
    //         $('.topBtn').stop().animate({
    //             bottom: "70px"
    //         });
    //     }
    // }).scroll();
// });

//-------------------------------------錨點平滑滾動效果
// $('a[href*=#]').click(function () {
//     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//         var $target = $(this.hash);
//         $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
//         if ($target.length) {
//             var targetOffset = $target.offset().top;
//             $('html,body').animate({
//                     scrollTop: targetOffset
//                 },
//                 1000);
//             return false;
//         }
//     }
// });