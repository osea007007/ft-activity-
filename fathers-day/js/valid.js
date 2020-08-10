var valid = {
  validations() {
    const { required } = window.validators;
    const validID = (value) => {
      value = value ? value.toUpperCase() : value;
      var tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
      var A1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
      var A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
      var Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

      if (value.length != 10) return false;
      var i = tab.indexOf(value.charAt(0));
      if (i == -1) return false;
      var sum = A1[i] + A2[i] * 9;

      for (i = 1; i < 10; i++) {
        var v = parseInt(value.charAt(i));
        if (isNaN(v)) return false;
        sum = sum + v * Mx[i];
      }
      if (sum % 10 != 0) return false;

      return true;
    };
    // 2019/12/09 更新email規則(排除中文)
    const validEmail = (value) => {
      var email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      return email.test(value);
    };
    const validPhone = (value) => {
      var tel = /^09\d{8}$/;

      // 2019/12/06 排除似假手機的號碼
      var arr = ["0900000000", "0911111111", "0922222222", "0933333333", "0944444444", "0955555555", "0966666666", "0977777777", "0988888888", "0999999999"];
      return tel.test(value) && arr.indexOf(value) < 0;
    };
    const validCH = (value) => {
      const CHREG = /[^\u4e00-\u9fa5]/;
      var arr = [
        "ㄅ",
        "ㄆ",
        "ㄇ",
        "ㄈ",
        "ㄉ",
        "ㄊ",
        "ㄋ",
        "ㄌ",
        "ㄍ",
        "ㄎ",
        "ㄏ",
        "ㄐ",
        "ㄑ",
        "ㄒ",
        "ㄓ",
        "ㄔ",
        "ㄕ",
        "ㄖ",
        "ㄗ",
        "ㄘ",
        "ㄙ",
        "ㄧ",
        "ㄨ",
        "ㄩ",
        "ㄚ",
        "ㄛ",
        "ㄜ",
        "ㄝ",
        "ㄞ",
        "ㄟ",
        "ㄠ",
        "ㄡ",
        "ㄢ",
        "ㄣ",
        "ㄤ",
        "ㄥ",
        "ㄦ",
        "ˇ",
        "ˋ",
        "ˊ",
        "˙",
        "先生",
        "小姐",
      ];

      // 2019/12/06 新增三個字以上字一樣字的排除
      var flag = true;
      if (value.length >= 3) {
        var nameArr = value.split("");
        Array.prototype.myDel = function () {
          var nameArr = {},
            temp = [],
            length = this.length;
          for (var i = 0; i < length; i++) {
            var before = this[i];
            var d = typeof before + before;
            if (nameArr[d] === undefined) {
              temp.push(before);
              nameArr[d] = 1;
            }
          }
          return temp;
        };
        flag = nameArr.myDel().length > 1;
      }

      return !CHREG.test(value) && value.length >= 2 && arr.indexOf(value) < 0 && flag;
    };
    // const validCaptcha = value => {
    //   return value === this.verify;
    // };

    var form = {
      ID_NO: {},
      PASS_WORD: {},
      BF_NAME: {},
      EMAIL: {},
      CELL_PHONE: {},
      AGREE: {},
    };

    if (this.config.isBinded == 1) {
    } else {
      if (this.loginType == 1) {
        form.ID_NO = { required, validID };
        form.PASS_WORD = { required };
      } else if (this.loginType == 2) {
        // 跟暫存比較
        // 2020-07-27 二階活動沒有身分證欄位
        if (!this.isPart2) form.ID_NO = this.form.ID_NO == this.temp.ID_NO && this.temp.ID_NO != "" ? {} : { required, validID };
        form.BF_NAME = this.form.BF_NAME == this.temp.BF_NAME && this.temp.BF_NAME != "" ? {} : { required, validCH };
        form.EMAIL = this.form.EMAIL == this.temp.EMAIL && this.temp.EMAIL != "" ? {} : { required, validEmail };
        form.CELL_PHONE = this.form.CELL_PHONE == this.temp.CELL_PHONE && this.temp.CELL_PHONE != "" ? {} : { required, validPhone };
      }
      form.AGREE = { required };
    }

    return {
      form,
    };
  },
};
