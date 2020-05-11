Vue.use(window.vuelidate.default);
Vue.use(VueScrollTo);
var front = {
  mixins: [valid, window.lineEvent],
  data() {
    return {
      config: {
        end_date: "2020-03-01",
        now: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        step1: "2020-01-02 00:00:00",
        // step2: "2019-12-25 09:37:00",
        step2: "2020-02-03 00:00:00",
        event_id: "D2444",
        uid: "",
        t: "",
        hash: "",
        isBinded: 999
      },
      isSubmit: false,
      isDone: false,
      loginType: 2,
      temp: {
        ID_NO: "",
        BF_NAME: "",
        CELL_PHONE: "",
        EMAIL: ""
      },
      form: {
        ID_NO: "",
        PASS_WORD: "",
        BF_NAME: "",
        CELL_PHONE: "",
        EMAIL: "",
        AGREE: false
      },
      countdown: "00天00小時00分00秒"
    };
  },
  computed: {
    login_id_no: {
      get() {
        return this.form.ID_NO;
      },
      set(value) {
        this.form.ID_NO = value ? value.toUpperCase() : "";
      }
    },
    // 身份證遮罩
    covered_id_no() {
      var cover = "";
      if (this.form.ID_NO) cover = this.form.ID_NO.substr(0, 3) + "XXXXX" + this.form.ID_NO.substr(8, 10);
      return cover;
    },
    step() {
      return moment(this.config.now).isSameOrAfter(this.config.step2) ? 2 : 1;
    },
    event_url() {
      return this.testMode
        ? "https://line.franklin.com.tw:8688/bcsweb/l/13"
        : `https://line.franklin.com.tw/bcsweb/l/${location.href.indexOf("step2") > -1 ? "84" : "82"}`;
    },
    isLine() {
      return this.getQueryParams().utm_source == "linem";
    },
    loginData() {
      return {
        ID_NO: this.form.ID_NO,
        PASSWD: md5(this.form.PASS_WORD)
      };
    },
    wf09Data() {
      var data = {
        Event_Id: this.config.event_id,
        IsRepeatable: "N"
      };

      // 媒體來源
      if (this.getQueryParams().utm_source) data.utm_source = this.getQueryParams().utm_source;

      // LINE進需UID
      if (this.isLine) {
        data.uid = this.config.uid;
      } else {
        // data.IsAgree = this.form.AGREE ? "Y" : "";
      }

      // 依綁定狀態決定傳遞資料
      if (this.config.isBinded == 1) {
        data.Identification = "";
      } else {
        // 身份證必傳
        data.Identification = this.form.ID_NO == this.temp.ID_NO ? "" : this.form.ID_NO;

        if (this.loginType == 1) {
          // 區分身份別參數
          data.Event_Other = "-1";
        } else if (this.loginType == 2) {
          data.Friend_Name = this.form.BF_NAME == this.temp.BF_NAME ? "" : this.form.BF_NAME;
          data.Email = this.form.EMAIL == this.temp.EMAIL ? "" : this.form.EMAIL;
          data.M_Tel = this.form.CELL_PHONE == this.temp.CELL_PHONE ? "" : this.form.CELL_PHONE;
        }
      }
      return data;
    },
    disData() {
      var data = {
        ID_NO: this.form.ID_NO,
        CELL_PHONE: this.form.CELL_PHONE,
        BF_NAME: this.form.BF_NAME,
        EMAIL: this.form.EMAIL,
        AGREE: this.form.AGREE ? "Y" : ""
      };

      return data;
    },
    isEnd() {
      if (this.testMode) return false;
      return moment(new Date()).isSameOrAfter(this.config.end_date);
    }
  },
  created() {
    if (this.testMode || location.href.indexOf("step2") > -1) this.config.step2 = "2019-12-25 09:37:00";
    this.$nextTick(() => {
      if (this.step == 1) this.clock();
      if (this.isLine && this.step == 2) this.checkLineParams();
    });
  },
  mounted() {
    this.clock();
    this.$nextTick(() => {
      document.querySelector(".banner").classList.add("active");
    });
  },
  methods: {
    resetData() {
      this.form.ID_NO = "";
      this.form.PASS_WORD = "";
      this.form.BF_NAME = "";
      this.form.CELL_PHONE = "";
      this.form.EMAIL = "";
      this.form.AGREE = false;
      this.$v.form.$reset();
    },
    test(time) {
      this.config.step2 = time;
      this.config.isBinded = 999;
    },
    changeType(type) {
      this.config.isBinded = type;
    },
    changeLoginType(type) {
      if (this.config.isBinded == 1) return;
      this.loginType = type;
      this.resetData();
    },
    formatTens(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    clock() {
      $(".reciprocal")
        .countdown(this.config.step2, { defer: null })
        .on("update.countdown", event => {
          this.countdown = event.strftime("%D天%H小時%M分%S秒");
        })
        .on("finish.countdown", () => {
          this.config.now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
          this.countdown = "00天00小時00分00秒";
          this.$nextTick(() => {
            if (this.isLine && this.step == 2) this.checkLineParams();
          });
        })
        .countdown("start");
    },
    checkLineParams() {
      this.checkParams("new-year", () => {
        this.getInfo();
        this.testLog(
          "url",
          `https://wt.franklin.com.tw/areas/new-year/index.html?utm_source=${this.getQueryParams().utm_source}&uid=${this.config.uid}&t=${this.config.t}&hash=${
            this.config.hash
          }`
        );
      });
    },
    async getInfo() {
      if (this.isEnd || this.isSubmit) return;
      this.isSubmit = true;
      try {
        try {
          // 1. 驗證參數
          var verify = await this.getLineVerify({
            uid: this.config.uid,
            timestamp: this.config.t,
            hash: this.config.hash
          });
          this.testLog("verify", verify);

          if (verify) {
            // 2. 取得綁定狀態
            var bind = await this.getBinded_2({
              CodeSecret: md5(this.config.uid + this.config.event_id),
              UID: this.config.uid
            });
            this.testLog("bind", bind);

            var allStatus = [1, 2, 4];
            this.config.isBinded = allStatus.indexOf(bind.status) > -1 ? bind.status : 4;
            this.$nextTick(() => {
              if (this.config.isBinded == 1) {
                this.form.ID_NO = bind.memo;
              } else if (this.config.isBinded == 2) {
                // 暫存
                this.temp.ID_NO = bind.memo || "";
                this.temp.BF_NAME = bind.Friend_Name || "";
                this.temp.CELL_PHONE = bind.M_Tel || "";
                this.temp.EMAIL = bind.Email || "";
                // 表單
                this.form.ID_NO = bind.memo || "";
                this.form.BF_NAME = bind.Friend_Name || "";
                this.form.CELL_PHONE = bind.M_Tel || "";
                this.form.EMAIL = bind.Email || "";
              }
            });
          } else {
            location.href = this.event_url;
          }
        } catch (err) {
          var err_word = err ? err : "系統繁忙，請稍候再試，謝謝！";
          this.throwError(`${err_word} info`, `${err}`);
        }
      } catch (error) {
        this.throwError("系統繁忙，請稍候再試，謝謝！ other", error);
      } finally {
        this.isSubmit = false;
      }
    },
    async sendForm() {
      if (this.isEnd) return;
      if (this.$v.form.$invalid) {
        this.$v.form.$touch();
        this.$nextTick(() => {
          var error = document.querySelectorAll(".formArea-item.error")[0];
          this.$scrollTo(error);
        });
      } else {
        if (this.isSubmit) return;
        this.isSubmit = true;

        // 讓按鈕transition做完
        await new Promise(resolve => {
          this.$nextTick(() => {
            setTimeout(() => {
              resolve();
            }, 333);
          });
        });

        try {
          this.testLog("mode", this.isLine ? "line" : "basic");

          var login;
          // 1. 檢查登入狀態
          if (this.loginType == 1) {
            login = await this.getBCstatus(this.loginData);
            this.testLog("login", login);
          } else {
            login = {
              rtcode: "0"
            };
          }

          switch (login.rtcode) {
            case "0":
              // 2. 寫入服務紀錄+判斷
              var wf09 = this.isLine ? await this.setQuestionWF09(this.wf09Data) : await this.setNewWF09(this.wf09Data);
              this.testLog(`${this.isLine ? "line-" : ""}wf09`, wf09);
              if (wf09.status.toString() == "1") {
                // 3. 寫待領優惠表
                var dis = await this.setDiscount("2020new-year", this.disData);
                this.testLog("dis", dis);
                if (dis.rtcode.toString() == "0") {
                  // 4. 完成
                  this.isDone = true;
                  this.$nextTick(() => {
                    this.$scrollTo("#item2-tab");
                  });
                } else {
                  // 2020-02-06 Jeffery 玩過valentines-day不得重複領取訊息更新
                  // this.throwError(dis.message, dis);
                  this.throwError("此活動與本公司LINE官方帳號「情人節限定-心誠折靈」屬相同活動，優惠每人僅限取得一次，不得重複領取喔！", dis);
                  return;
                }
              } else {
                this.throwError(wf09.memo, wf09);
              }
              break;
            default:
              this.throwError(login.message, login);
              break;
          }
        } catch (err) {
          this.throwError("系統繁忙，請稍候再試，謝謝！", err);
        } finally {
          this.isSubmit = false;
        }
      }
    },
    lineAlert() {
      alert(
        "申請LINE官方帳號綁定服務時，富蘭克林將根據你提供的姓名、行動電話與LINE帳號進行身分驗證，本查詢及驗證服務於富蘭克林系統執行，不會經由LINE記錄資料。\n\n成功綁定個人化服務後， 若更換手機或重新安裝LINE APP， 需以原本LINE ID登入， 以利後續LINE個人化服務使用。 "
      );
    }
  }
};

// status 1: http://10.127.105.69:7880/?utm_source=linem&uid=Ua02bd18baa354af84b5cafd8ddf825ef&t=1556004103000&hash=c02b1164d0782529d6c62f2d0ba70013
// status 2: http://10.127.105.69:7880/?utm_source=linem&uid=jeffery0114&t=1556004103000&hash=31eb29d8276523cd489e3adb87b1a0bc
// no email: http://10.127.105.69:7880/?utm_source=linem&uid=jeffery0114-2&t=1556004103000&hash=6b82271f13f9ce6b47993461896e4bd8
// no phone: http://10.127.105.69:7880/?utm_source=linem&uid=jeffery0114-3&t=1556004103000&hash=188eadfc92a36426f9f630d174637aaa
// no id   : http://10.127.105.69:7880/?utm_source=linem&uid=jeffery0114-4&t=1556004103000&hash=88d86ca28c8cb287b8589b3851dcedfc
// no name : http://10.127.105.69:7880/?utm_source=linem&uid=jeffery0114-5&t=1556004103000&hash=239643f6c5035ac0bfa2adfbc2817dfb
