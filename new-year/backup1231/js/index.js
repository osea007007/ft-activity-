var front = {
  data() {
    return {
      config: {
        now: new Date(),
        step1: "2020-01-02 00:00:00",
        // step2: "2019-12-25 09:37:00",
        step2: "2020-02-03 00:00:00",
        event_id: "L0001",
        uid: "jeffery1220",
        hash: "018feeb468e1ecaf35e6b1f9385f77d6",
        t: "1556004103000",
        isBinded: 999
      },
      isSubmit: false,
      loginType: 2,
      form: {
        ID_NO: "",
        PASS_WORD: "",
        BF_NAME: "",
        CELL_PHONE: "",
        EMAIL: "",
        AGREE: false
      },
      countdown: null
    };
  },
  computed: {
    showClock() {
      var str = "00天00小時00分00秒";
      if (this.countdown) {
        var data = this.countdown;
        var formatTens = this.formatTens;
        str = `${formatTens(data.days)}天${formatTens(data.hours)}小時${formatTens(data.minutes)}分${formatTens(data.seconds)}秒`;
      }
      return str;
    },
    step() {
      return moment(this.config.now).isSameOrAfter(this.config.step2) ? 2 : 1;
    }
  },
  created() {
    this.clock();
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector(".banner").classList.add("active");
    });
  },
  methods: {
    test(time) {
      this.config.step2 = time;
      this.config.isBinded = 999;
    },
    changeType(type) {
      this.config.isBinded = type;
    },
    changeLoginType(type) {
      // if (this.config.isBinded != 4) return;
      this.loginType = type;
      // this.resetData();
    },
    formatTens(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    clock() {
      var update = () => {
        var start = new Date();
        var end = new Date(this.config.step2);
        var ts = countdown(start, end, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS, 4, 0);
        // var ts = countdown(start, end, countdown.HOURS | countdown.MINUTES | countdown.SECONDS, 4, 0);

        if (ts.value <= 0) {
          window.cancelAnimationFrame(update);
          update = null;
          this.config.now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
          return;
        }

        this.countdown = ts;
        window.requestAnimationFrame(update);
      };
      update();
    }
  }
};
