// ========= 精選基金 ==============================================================================================================================
Vue.component('prodList', {
    data: function(){
        return {
            prodListData: commonProdList,
            rowStyle: {
                textAlign: 'left',
            },
            colStyle: {
                float: 'none',
                display: 'inline-block',
                verticalAlign: 'top',
                textAlign: 'center',
            },
            screenWidth: document.body.clientWidth
        }
    },
    template: ` <div class="row text-center" :style="rowStyle">
                    <div class="col-md-2 col-xs-6" v-for="item in prodListData" v-bind:key="item.id" :style="colStyle">
                        <div class="wow fadeInUp" :data-wow-delay="item.id * 0.1 + 's'">
                            <div class="icon-circle">
                                <span>{{ item.id + 1 }}</span>
                                <i class="fa">
                                    <img :src="item.img" class="img-responsive" />
                                </i>
                            </div>
                            <h3>
                                <a :href="item.url" target="_blank">
                                    {{ item.name }}<span class="ex">{{ item.warning }}</span>
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>`,
});

var content = new Vue({
    el: '#content',
    data: {
        // accessDatabase: null,
        // userAgent: null, //取得浏览器的userAgent字符串
    },
    mounted() {
        // this.userAgent = navigator.userAgent;
        // this.checkingIEVersion();
        // axios
        //     .get('https://spreadsheets.google.com/feeds/cells/1kKGcZV9W2L36WtogO2DG4GxBs1TjqeZDo14PUyd8nKM/6/public/values?alt=json')
        //     .then(response => (this.accessDatabase = response.data.feed));
        
        this.$nextTick(() => {

            //Slider
            setTimeout(function(){
                var time = 7; // time in seconds

                var $progressBar,
                    $bar,
                    $elem,
                    isPause,
                    tick,
                    percentTime;

                //Init the carousel
                $(".owl-carousel").owlCarousel({
                    slideSpeed: 500,
                    paginationSpeed: 500,
                    singleItem: true,
                    navigation: true,
                    navigationText: [
                        "<i class='fa fa-angle-left'></i>",
                        "<i class='fa fa-angle-right'></i>"
                    ],
                    afterInit: progressBar,
                    afterMove: moved,
                    startDragging: pauseOnDragging,
                    //autoHeight : true,
                    transitionStyle: "fadeUp"
                });

                //Init progressBar where elem is $("#owl-demo")
                function progressBar(elem) {
                    $elem = elem;
                    //build progress bar elements
                    buildProgressBar();
                    //start counting
                    start();
                };

                //create div#progressBar and div#bar then append to $(".owl-carousel")
                function buildProgressBar() {
                    $progressBar = $("<div>", {
                        id: "progressBar"
                    });
                    $bar = $("<div>", {
                        id: "bar"
                    });
                    $progressBar.append($bar).appendTo($elem);
                };

                function start() {
                    //reset timer
                    percentTime = 0;
                    isPause = false;
                    //run interval every 0.01 second
                    tick = setInterval(interval, 10);
                };

                function interval() {
                    if (isPause === false) {
                        percentTime += 1 / time;
                        $bar.css({
                            width: percentTime + "%"
                        });
                        //if percentTime is equal or greater than 100
                        if (percentTime >= 100) {
                            //slide to next item 
                            $elem.trigger('owl.next')
                        }
                    }
                };

                //pause while dragging 
                function pauseOnDragging() {
                    isPause = true;
                };

                //moved callback
                function moved() {
                    //clear interval
                    clearTimeout(tick);
                    //start again
                    start();
                };
            }, 1000);
            
        });
    },
    methods: {
        checkingIEVersion() {
            // console.log(this.userAgent);
        }
    }
});