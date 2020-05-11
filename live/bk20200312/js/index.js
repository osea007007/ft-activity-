Vue.use(window.vuelidate.default);
Vue.use(VueScrollTo);
var front = {
  mixins: [valid, window.lineEvent],
  data() {
    return {
      config: {
        event_id: "D2446",
        event_code: "live",
        discount_code: "Live202002",
        end_date: "2020-03-11",
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
      }
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
    event_url() {
      return this.testMode ? "https://line.franklin.com.tw:8688/bcsweb/l/15" : "https://line.franklin.com.tw/bcsweb/l/93";
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
      // 需修改再傳值 (身份證為KEY)
      if (this.config.isBinded == 1) {
        data.Identification = "";
      } else {
        data.Identification = this.form.ID_NO == this.temp.ID_NO ? "" : this.form.ID_NO;

        if (this.loginType == 1) {
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
      return moment(new Date()).isSameOrAfter(this.config.end_date);
    }
  },
  created() {
    if (this.isEnd) {
      location.href = "https://event.franklin.com.tw/activityEnds/event-end.html";
      return;
    }
    this.$nextTick(() => {
      if (this.isLine && !this.isEnd) this.checkLineParams();
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
    changeLoginType(type) {
      if (this.config.isBinded == 1) return;
      this.loginType = type;
      this.resetData();
    },
    checkLineParams() {
      this.checkParams(this.config.event_code, () => {
        this.getInfo();
        this.testLog(
          "url",
          `https://wt.franklin.com.tw/areas/${this.config.event_code}/index.html?utm_source=${this.getQueryParams().utm_source}&uid=${this.config.uid}&t=${
            this.config.t
          }&hash=${this.config.hash}`
        );
      });
    },
    async getInfo() {
      if (this.isSubmit) return;
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
            // 沿用new-year取狀態
            var bind = await this.getBinded_2({
              CodeSecret: md5(this.config.uid + "D2444"),
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
      if (this.isEnd) {
        alert("此活動已經結束，未來將不定期提供更多最即時的市場、好康訊息，請持續關注我們喔！");
        return;
      }
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
                var dis = await this.setDiscount(this.config.discount_code, this.disData);
                this.testLog("dis", dis);
                if (dis.rtcode.toString() == "0") {
                  // 4. 完成
                  this.isDone = true;
                  this.$nextTick(() => {
                    this.$scrollTo("#complete");
                  });
                } else {
                  this.throwError(dis.message, dis);
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

// status 1: http://10.127.105.69:7884/?utm_source=linem&uid=Ua02bd18baa354af84b5cafd8ddf825ef&t=1556004103000&hash=c02b1164d0782529d6c62f2d0ba70013
// status 2: http://10.127.105.69:7884/?utm_source=linem&uid=jeffery0114&t=1556004103000&hash=31eb29d8276523cd489e3adb87b1a0bc
// no email: http://10.127.105.69:7884/?utm_source=linem&uid=jeffery0114-2&t=1556004103000&hash=6b82271f13f9ce6b47993461896e4bd8
// no phone: http://10.127.105.69:7884/?utm_source=linem&uid=jeffery0114-3&t=1556004103000&hash=188eadfc92a36426f9f630d174637aaa
// no id   : http://10.127.105.69:7884/?utm_source=linem&uid=jeffery0114-4&t=1556004103000&hash=88d86ca28c8cb287b8589b3851dcedfc
// no name : http://10.127.105.69:7884/?utm_source=linem&uid=jeffery0114-5&t=1556004103000&hash=239643f6c5035ac0bfa2adfbc2817dfb
