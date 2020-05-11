var el = document.querySelector('.loadingArea');
var loadingLogoAnimationStatus = false;                                     // logo動畫狀態  (未跑完/跑完)
var loadingLogoAnimationTime = 3000;                                        // logo動畫時間

// fade out
function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .03) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function hideLoadingArea() {
    if ( document.readyState == 'complete' && loadingLogoAnimationStatus == true ) {    // 判斷網頁載入狀態 & logo動畫完成狀態
        document.querySelector('.loadingArea-loadingBar-progress').style.width = '100%';
        fadeOut(el);
    };
}

document.querySelector('.loadingArea-loadingBar-progress').style.width = '30%';

setTimeout(function () {
    loadingLogoAnimationStatus = true;
    hideLoadingArea();
    document.querySelector('.loadingArea-logo-loadingIcon').style.display = 'block';
}, loadingLogoAnimationTime);

document.onreadystatechange = function () {
    if ( document.readyState == 'interactive' ) {
        document.querySelector('.loadingArea-loadingBar-progress').style.width = '60%';
    }
    console.log(document.readyState, loadingLogoAnimationStatus);
    hideLoadingArea();
}