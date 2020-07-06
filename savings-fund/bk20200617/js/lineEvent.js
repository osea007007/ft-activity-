(function() {
  window.lineEvent = {
    data() {
      return {
        localList: ["10.88.110.89", "10.88.110.62", "10.127.105.69", "10.127.105.74", "127.0.0.1", "localhost"],
        isInvalid: true
      };
    },
    computed: {
      testMode() {
        return location.hostname != "event.franklin.com.tw";
      },
      localMode() {
        return this.localList.indexOf(location.hostname) > -1;
      },
      apiURL() {
        return this.testMode ? "https://wt.franklin.com.tw" : "https://event.franklin.com.tw";
      },
      idURL() {
        return this.testMode ? "https://wt.franklin.com.tw:8081" : "https://etrade.franklin.com.tw";
      },
      wfURL() {
        return this.testMode ? "https://wt.franklin.com.tw" : "https://www.franklin.com.tw";
      }
    },
    methods: {
      testLog(name, data) {
        if (this.testMode) console.log(`${name}:`, data);
      },
      throwError(word, err) {
        if (this.localMode) {
          console.error(err);
        } else {
          alert(word);
        }
      },
      // api接口
      setPromise(methods, url, data) {
        return new Promise((resolve, reject) => {
          $.ajax({
            type: methods,
            dataType: "json",
            url: url,
            data: data,
            success: res => {
              resolve(res);
            },
            error: result => {
              reject(result);
            }
          });
        });
      },
      // 檢查LINE導入的網址參數
      checkParams(name, cb) {
        if (cb === void 0) cb = null;
        if (this.localMode) {
          if (this.getQueryParams().t) this.config.t = this.getQueryParams().t;
          if (this.getQueryParams().uid) this.config.uid = this.getQueryParams().uid;
          if (this.getQueryParams().hash) this.config.hash = this.getQueryParams().hash;
          if (cb) cb();
        } else {
          // sessionStorage.removeItem(name);
          var isSession = sessionStorage.getItem(name) ? true : false;
          var hasAllparams = this.getQueryParams().t != undefined && this.getQueryParams().uid != undefined && this.getQueryParams().hash != undefined;

          var urlParams = "";
          Object.keys(this.getQueryurlParams()).forEach((obj, key) => {
            var lineUse = ["t", "uid", "hash"];
            if (lineUse.indexOf(obj) < 0) urlParams += `&${obj}=${this.getQueryParams()[obj]}`;
          });
          urlParams = urlParams.replace("&", "?");

          if (this.testMode) console.log("isSession:", isSession, "hasAllparams:", hasAllparams);

          // 參數皆有, 沒session => new-1
          // 參數皆有, 有session => new-2
          // 參數皆無, 沒session => new-3
          // 參數皆無, 有session => new-4
          if (hasAllparams && !isSession) {
            // console.log('new-1');
            var tempObj = {
              t: this.getQueryParams().t,
              uid: this.getQueryParams().uid,
              hash: this.getQueryParams().hash
            };
            sessionStorage.setItem(name, JSON.stringify(tempObj));
            location.href = location.origin + location.pathname + urlParams;
            return;
          } else if (hasAllparams && isSession) {
            // console.log('new-2');
            location.href = location.origin + location.pathname + urlParams;
            return;
          } else if (!hasAllparams && !isSession) {
            // console.log('new-3');

            location.href = this.event_url;
            return;
          } else if (!hasAllparams && isSession) {
            // console.log('new-4');
            this.isInvalid = false;
            var session = JSON.parse(sessionStorage.getItem(name));
            this.config.t = session.t;
            this.config.uid = session.uid;
            this.config.hash = session.hash;

            if (cb) cb();
          }
        }
      },
      getQueryurlParams() {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
          } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
          } else {
            query_string[pair[0]].push(pair[1]);
          }
        }
        return query_string;
      },
      resetParams(params) {
        var str = Object.entries(params)
          .map(([key, val]) => `${key}=${val}`)
          .join("&");
        return str;
      },
      getQueryParams(qs) {
        var paramStr = qs || location.search;
        paramStr = paramStr.split("+").join(" ");
        var params = {},
          tokens,
          re = /[?&]?([^=]+)=([^&]*)/g;
        while ((tokens = re.exec(paramStr))) {
          params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
      },
      // 驗證LINE使用者
      getLineVerify(data) {
        return this.setPromise("GET", `${this.apiURL}/LineAPI/api/verify`, data);
      },
      // 取得UID進站資料
      getLineInfo(data) {
        return this.setPromise("GET", `${this.apiURL}/LineAPI/api/Analysis`, data);
      },
      getBinded(data) {
        // 2019-09-20 更新isBinded取得拉出做來做
        return this.setPromise("GET", `${this.wfURL}/FAPI/api/SocialInfo`, data);
      },
      getBinded_2(data) {
        // 2019-10-24 新增binding狀態查詢
        // 使用 POST, 並且串在網址上做呼叫
        var str = this.resetParams(data);
        if (str) str = `?${str}`;
        return this.setPromise("POST", `${this.wfURL}/FAPI/api/SocialInfo${str}`, null);
      },
      // 取得登入BC狀態
      getBCstatus(data) {
        /* 
          input:
          {
            "ID_NO": 身份證字號,
            "PASSWD": md5(密碼),
          }
        */
        return this.setPromise("POST", `${this.idURL}/Join/ECStatus`, data);
        /* 
          output:
          {
            "result": success/fail,
            "rtcode": 
              0 已開戶 (success)
              3 未開戶 (fail)
              4 開戶中 (fail)
              99 必填欄位(fail)
              99 登入失敗(fail),
            "reltype": "推薦代碼",
            "vipcode": "優惠身分代碼"
          }
        */
      },
      // 發送linePoint
      getLinePoint(data) {
        // return this.setPromise("GET", `${this.apiURL}/LineAPI/api/PointConnect`, data);
        return this.setPromise("GET", `https://event.franklin.com.tw/LineAPI/api/PointConnect`, data);
      },
      // 女人迷-取得日期預約狀態
      getWomanBooking(data) {
        /* 
          input:
            {
              EventId: "D2442" 活動代碼
              Workdays: "8" 工作天數
              Everydays: "15" 總天數
            }
        */
        return this.setPromise("GET", `${this.wfURL}/LineAPI/api/CalendarBooking`, data);
        /* 
          output:
          {
            "Status": "1" 1:成功 99:系統錯誤
            "Msg": "" 無效欄位(BC使用)
            "CreateDate": "2020-01-06" 系統日期
            "LWD": [
              "BookDate": "2020-01-06" 日期
              "IsMorningFull": false 上午
              "IsAfternnonFull": false 下午
              "IsFull": false 整天
            ] 
          }
        */
      },
      setWomanBooking(data) {
        /* 
          input:
            {
              EventId: "D2442" 活動代碼
              Tag: "" 字串 Json字串
              UID: "" 字串 無效欄位(BC使用)
            }
        */
        return this.setPromise("POST", `${this.wfURL}/LineAPI/api/CalendarBooking`, data);
        /* 
         output:
         {
           "Status": "1" 1:成功 99:系統錯誤
           "Msg": "" 無效欄位(BC使用)
           "CreateDate": "2020-01-06" 系統日期
         }
       */
      },
      setDiscount(event_code, data) {
        return this.setPromise("POST", `${this.idURL}/Join/Send/${event_code}`, data);
      },
      // 送出TAGGING
      setLineTagging(data) {
        return this.setPromise("POST", `${this.apiURL}/LineAPI/api/Analysis`, data);
      },
      // 送出問卷API
      setQuestionnaire(data) {
        // 進官網系統要打www的網址 -> wfURL
        return this.setPromise("POST", `${this.wfURL}/FAPI/WF13/AllOther`, data);
      },
      // 送出WF09
      setWF09(data) {
        // 進官網系統要打www的網址 -> wfURL
        return this.setPromise("POST", `${this.wfURL}/FAPI/WF09/LineEvent`, data);
      },
      // 送出問卷WF09
      setQuestionWF09(data) {
        // 進官網系統要打www的網址 -> wfURL
        return this.setPromise("POST", `${this.wfURL}/FAPI/wf09/LineEventForm`, data);
      },
      // 一般送資料用
      setBasicWF09(data) {
        // 進官網系統要打www的網址 -> wfURL
        return this.setPromise("POST", `${this.wfURL}/FAPI/WF09/UserFormAPI`, data);
      },
      // 未來送wf09使用
      setNewWF09(data) {
        return this.setPromise("POST", `${this.wfURL}/FAPI/EventForm/UserFormAPI`, data);
      }
    }
  };
})();
