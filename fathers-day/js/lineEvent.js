(function () {
  window.lineEvent = {
    data() {
      return {
        localList: ["10.88.110.89", "10.88.110.62", "10.127.105.69", "10.127.105.74", "127.0.0.1", "localhost"],
        isInvalid: true,
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
      },
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
            success: (res) => {
              resolve(res);
            },
            error: (result) => {
              reject(result);
            },
          });
        });
      },
      // 檢查LINE導入的網址參數
      checkParams(name, cb) {
        let isInvalid = true;
        let callback = () => {
          return cb === void 0 ? null : cb();
        };
        let lineParams = ["uid", "hash", "t"];

        const $this = this;

        const urlParams =
          "?" +
          Object.entries($this.getQueryurlParams())
            .filter((obj) => {
              return lineParams.indexOf(obj[0]) < 0;
            })
            .map(([key, val]) => {
              return `${key}=${val}`;
            })
            .join("&");

        class myCheck {
          constructor(hasParams, hasSession) {
            this.hasParams = hasParams ? 1 : 0;
            this.hasSession = hasSession ? 1 : 0;

            let checkFun = new Array();
            checkFun[0] = new Array();
            checkFun[1] = new Array();

            this.fun = checkFun;

            checkFun[1][0] = () => {
              const tempObj = {
                t: $this.getQueryurlParams().t,
                uid: $this.getQueryurlParams().uid,
                hash: $this.getQueryurlParams().hash,
              };
              sessionStorage.setItem(name, JSON.stringify(tempObj));
              location.href = location.origin + location.pathname + urlParams;
            };
            checkFun[1][1] = () => {
              location.href = location.origin + location.pathname + urlParams;
            };
            checkFun[0][0] = () => {
              location.href = $this.event_url;
            };
            checkFun[0][1] = () => {
              isInvalid = false;
              var session = JSON.parse(sessionStorage.getItem(name));
              lineParams.forEach((obj) => {
                $this.config[obj] = session[obj];
              });
              if (callback) callback();
            };
          }

          go() {
            this.fun[this.hasParams][this.hasSession]();
          }
        }

        if ($this.localMode) {
          lineParams.forEach((obj) => {
            $this.config[obj] = $this.getQueryurlParams()[obj];
          });
          if (callback) callback();
        } else {
          // sessionStorage.removeItem(name);
          const hasAllparams = lineParams.every((obj) => {
            return $this.getQueryurlParams()[obj] !== undefined;
          });
          const hasSession = sessionStorage.getItem(name) ? true : false;

          $this.testLog("hasAllparams", hasAllparams);
          $this.testLog("hasSession", hasSession);

          var check = new myCheck(hasAllparams, hasSession);
          check.go();
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
      },
    },
  };
})();
