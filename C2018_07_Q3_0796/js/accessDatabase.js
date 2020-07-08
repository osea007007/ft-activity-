// ========= 精選基金 ==============================================================================================================================
Vue.component('prodList', {
    data: function(){
        return {
            prodListData: commonProdList
        }
    },
    template: ` <div class="featured-item-area">
                    <article class="featured-item" v-for="item in prodListData" v-bind:key="item.id">
                        <a :href="item.url" target="_blank" :title="item.name + item.warning">
                            <div class="featured-item-img">
                                <img :src="item.img" :alt="item.name + item.warning">
                            </div>
                            <div class="featured-item-tit">
                                <strong>{{ item.name }}
                                    <span class="featured-item-tit-warning">{{ item.warning }}</span>
                                </strong>
                            </div>
                        </a>
                    </article>
                </div>`,
});

// ========= vue版 slick ==============================================================================================================================
Vue.component('slick',{
    props: {
        options: {
            type: Object,
            default: function() {
                return {};
            },
        },
    },
    mounted() {
        this.create();
    },
    destroyed: function() {
        $(this.$el).slick('unslick');
    },
    methods: {
        create: function() {
            const $slick = $(this.$el);
            $slick.on('afterChange', this.onAfterChange);
            $slick.on('beforeChange', this.onBeforeChange);
            $slick.on('breakpoint', this.onBreakpoint);
            $slick.on('destroy', this.onDestroy);
            $slick.on('edge', this.onEdge);
            $slick.on('init', this.onInit);
            $slick.on('reInit', this.onReInit);
            $slick.on('setPosition', this.onSetPosition);
            $slick.on('swipe', this.onSwipe);
            $slick.on('lazyLoaded', this.onLazyLoaded);
            $slick.on('lazyLoadError', this.onLazyLoadError);
            $slick.slick(this.options);
        },
        destroy: function() {
            const $slick = $(this.$el);
            $slick.off('afterChange', this.onAfterChange);
            $slick.off('beforeChange', this.onBeforeChange);
            $slick.off('breakpoint', this.onBreakpoint);
            $slick.off('destroy', this.onDestroy);
            $slick.off('edge', this.onEdge);
            $slick.off('init', this.onInit);
            $slick.off('reInit', this.onReInit);
            $slick.off('setPosition', this.onSetPosition);
            $slick.off('swipe', this.onSwipe);
            $slick.off('lazyLoaded', this.onLazyLoaded);
            $slick.off('lazyLoadError', this.onLazyLoadError);
            $(this.$el).slick('unslick');
        },
        reSlick: function() {
            this.destroy();
            this.create();
        },
        next: function() {
            $(this.$el).slick('slickNext');
        },
        prev: function() {
            $(this.$el).slick('slickPrev');
        },
        pause: function() {
            $(this.$el).slick('slickPause');
        },
        play: function() {
            $(this.$el).slick('slickPlay');
        },
        goTo: function(index, dontAnimate) {
            $(this.$el).slick('slickGoTo', index, dontAnimate);
        },
        currentSlide: function() {
            return $(this.$el).slick('slickCurrentSlide');
        },
        add: function(element, index, addBefore) {
            $(this.$el).slick('slickAdd', element, index, addBefore);
        },
        remove: function(index, removeBefore) {
            $(this.$el).slick('slickRemove', index, removeBefore);
        },
        filter: function(filterData) {
            $(this.$el).slick('slickFilter', filterData);
        },
        unfilter: function() {
            $(this.$el).slick('slickUnfilter');
        },
        getOption: function(option) {
            $(this.$el).slick('slickGetOption', option);
        },
        setOption: function(option, value, refresh) {
            $(this.$el).slick('slickSetOption', option, value, refresh);
        },
        setPosition: function() {
            $(this.$el).slick('setPosition');
        },
        // Events
        onAfterChange: function(event, slick, currentSlide) {
            this.$emit('afterChange', event, slick, currentSlide);
        },
        onBeforeChange: function(event, slick, currentSlide, nextSlide) {
            this.$emit('beforeChange', event, slick, currentSlide, nextSlide);
        },
        onBreakpoint: function(event, slick, breakpoint) {
            this.$emit('breakpoint', event, slick, breakpoint);
        },
        onDestroy: function(event, slick) {
            this.$emit('destroy', event, slick);
        },
        onEdge: function(event, slick, direction) {
            this.$emit('edge', event, slick, direction);
        },
        onInit: function(event, slick) {
            this.$emit('init', event, slick);
        },
        onReInit: function(event, slick) {
            this.$emit('reInit', event, slick);
        },
        onSetPosition: function(event, slick) {
            this.$emit('setPosition', event, slick);
        },
        onSwipe: function(event, slick, direction) {
            this.$emit('swipe', event, slick, direction);
        },
        onLazyLoaded: function(event, slick, image, imageSource) {
            this.$emit('lazyLoaded', event, slick, image, imageSource);
        },
        onLazyLoadError: function(event, slick, image, imageSource) {
            this.$emit('lazyLoadError', event, slick, image, imageSource);
        },
    },
    template: ` <div>
                    <slot></slot>
                </div>`,
});
var slickFunction = {
    data() {
        return {
            slickOptions: {
                autoplay: true,
                pauseOnHover: false,
                dots: true,
                infinite: true,
                autoplaySpeed: 5000,
                speed: 500,
                fade: true,
                cssEase: 'linear'
            },
        }
    },
    methods: {
        next() {
            this.$refs.slick.next();
        },
 
        prev() {
            this.$refs.slick.prev();
        },
 
        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },
 
        // Events listeners
        handleAfterChange(event, slick, currentSlide) {
            console.log('handleAfterChange', event, slick, currentSlide);
        },
        handleBeforeChange(event, slick, currentSlide, nextSlide) {
            console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
        },
        handleBreakpoint(event, slick, breakpoint) {
            console.log('handleBreakpoint', event, slick, breakpoint);
        },
        handleDestroy(event, slick) {
            console.log('handleDestroy', event, slick);
        },
        handleEdge(event, slick, direction) {
            console.log('handleEdge', event, slick, direction);
        },
        handleInit(event, slick) {
            console.log('handleInit', event, slick);
        },
        handleReInit(event, slick) {
            console.log('handleReInit', event, slick);
        },
        handleSetPosition(event, slick) {
            console.log('handleSetPosition', event, slick);
        },
        handleSwipe(event, slick, direction) {
            console.log('handleSwipe', event, slick, direction);
        },
        handleLazyLoaded(event, slick, image, imageSource) {
            console.log('handleLazyLoaded', event, slick, image, imageSource);
        },
        handleLazeLoadError(event, slick, image, imageSource) {
            console.log('handleLazeLoadError', event, slick, image, imageSource);
        },
    },
};


var content = new Vue({
    el: '#content',
    mixins: [slickFunction],
    data: {
        // accessDatabase: null,
        // userAgent: null, //取得浏览器的userAgent字符串
    },
    mounted() {
        console.log('%cMade by Captain%c2018/07',
                    'color: #fff; border-radius: 5px; background: #1a4f9c; padding: 2px 10px; font-weight: bold;',
                    'color: #000; border-radius: 5px; background: #ffde00; padding: 2px 10px; margin: 0px 5px;',);

        // this.userAgent = navigator.userAgent;
        // this.checkingIEVersion();
        // axios
        //     .get('https://spreadsheets.google.com/feeds/cells/1kKGcZV9W2L36WtogO2DG4GxBs1TjqeZDo14PUyd8nKM/7/public/values?alt=json')
        //     .then(response => (this.accessDatabase = response.data.feed));

        this.useJq();
    },
    methods: {
        checkingIEVersion() {
            // console.log(this.userAgent);
        },
        useJq() {
            //-------------------------------------wow
            var wow = new WOW();
            wow.init();
        },
    },
});