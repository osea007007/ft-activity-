window.onload = function () {
    let regxList = [
        {
            regx: '^https://www.franklin.com.tw$',
            path: ''
        },
        {
            regx: '^https://etrade.franklin.com.tw/Open/Entrance$',
            path: 'twsice://login'

        },
        {
            regx: '^https://etrade.franklin.com.tw/Open/NewMember\\?so=Online&$',
            path: 'twsice://login'
        },
        {
            regx: '^https://etrade.franklin.com.tw/Open/OpenOnlineAuthenticated\\?$',
            path: 'twsice://login'
        },
        {
            regx: '^https://etrade.franklin.com.tw/Home/Login$',
            path: 'twsice://fundList'
        },
        {
            regx: createRegExp('^https://etrade.franklin.com.tw/Home/Login\\?ReturnUrl=/Trade/LumpSum/ShowForm/(\\d{4})$'),
            path: function (arguments) {
                let fundId = arguments[1];
                return 'twsice://fundDetail?fundId=' + fundId;
            }
        },
        {
            regx: '^https://etrade.franklin.com.tw/Trade/LumpSum$',
            path: 'twsice://fundList'
        },
        {
            regx: '^https://www.facebook.com/franklin.taiwan/$',
            path: 'twsice://facebookHome'
        },
        {
            regx: '^http://line.naver.jp/ti/p/@franklin$',
            path: 'twsice://lineHome'
        },
        {
            regx: '^https://www.youtube.com/user/franklin0800885888$',
            path: 'twsice://youtubeHome'
        },
        {
            regx: '^https://m.me/franklin.taiwan/$',
            path: 'twsice://onlineService'
        },
        {
            regx: '^https://www.franklin.com.tw/ContactUs/Index/DivLeaveMessage$',
            path: ''
        },
        {
            regx: '^https://www.franklin.com.tw/Member/Index$',
            path: 'twsice://memberCenter'
        },
        {
            regx: '^https://www.franklin.com.tw/Fund/BasicInformation/(\\d{4})$',
            path: function (arguments) {
                let fundId = arguments[1];
                return 'twsice://fundDetail?fundId=' + fundId;
            }
        },
        {
            regx: '^https://www.franklin.com.tw/ReservationAccount/ECFAQ$',
            path: ''
        },
        {
            regx: '^https://www.franklin.com.tw/ReservationAccount/ECFAQ/DivPoint$',
            path: ''
        },
        {
            regx: '^https://www.franklin.com.tw/Privacy$',
            path: 'twsice://mineCenter'
        },
    ];
    function createRegExp(str, a) {
        return new RegExp(str)
    }
    function getHref(href) {
        for (let i = 0; i < regxList.length; i += 1) {
            const { regx, path } = regxList[i];
            const arguments = href.match(regx);
            if (arguments) {
                if (arguments.length > 1) {
                    return path(arguments)
                }
                return path;
            }
        }
        return href;
    }
    $("body").on('click', 'a', function (e) {
        const { isApp } = window.appInfo || {}
        if (isApp) {
            const dom = $(e.currentTarget);
            const href = dom.attr('href');
            const test = dom.attr('test');
            if (href.indexOf('https://') !== -1) {
                const url = unescape(href);
                const link = getHref(url);
                if (link !== url) {
                    dom.attr('href', 'javascript: void(0)');
                    dom.attr('test', href);
                }
                window.location.href = link;
            } else if (href === 'javascript: void(0)' && test) {
                const url = unescape(test);
                const link = getHref(url);
                window.location.href = link;
            }
        }
    })
}