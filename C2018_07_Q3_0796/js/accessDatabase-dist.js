"use strict";Vue.component("prodList",{data:function(){return{prodListData:commonProdList}},template:' <div class="featured-item-area">\n                    <article class="featured-item" v-for="item in prodListData" v-bind:key="item.id">\n                        <a :href="item.url" target="_blank" :title="item.name + item.warning">\n                            <div class="featured-item-img">\n                                <img :src="item.img" :alt="item.name + item.warning">\n                            </div>\n                            <div class="featured-item-tit">\n                                <strong>{{ item.name }}\n                                    <span class="featured-item-tit-warning">{{ item.warning }}</span>\n                                </strong>\n                            </div>\n                        </a>\n                    </article>\n                </div>'}),Vue.component("slick",{props:{options:{type:Object,default:function(){return{}}}},mounted:function(){this.create()},destroyed:function(){$(this.$el).slick("unslick")},methods:{create:function(){var n=$(this.$el);n.on("afterChange",this.onAfterChange),n.on("beforeChange",this.onBeforeChange),n.on("breakpoint",this.onBreakpoint),n.on("destroy",this.onDestroy),n.on("edge",this.onEdge),n.on("init",this.onInit),n.on("reInit",this.onReInit),n.on("setPosition",this.onSetPosition),n.on("swipe",this.onSwipe),n.on("lazyLoaded",this.onLazyLoaded),n.on("lazyLoadError",this.onLazyLoadError),n.slick(this.options)},destroy:function(){var n=$(this.$el);n.off("afterChange",this.onAfterChange),n.off("beforeChange",this.onBeforeChange),n.off("breakpoint",this.onBreakpoint),n.off("destroy",this.onDestroy),n.off("edge",this.onEdge),n.off("init",this.onInit),n.off("reInit",this.onReInit),n.off("setPosition",this.onSetPosition),n.off("swipe",this.onSwipe),n.off("lazyLoaded",this.onLazyLoaded),n.off("lazyLoadError",this.onLazyLoadError),$(this.$el).slick("unslick")},reSlick:function(){this.destroy(),this.create()},next:function(){$(this.$el).slick("slickNext")},prev:function(){$(this.$el).slick("slickPrev")},pause:function(){$(this.$el).slick("slickPause")},play:function(){$(this.$el).slick("slickPlay")},goTo:function(n,i){$(this.$el).slick("slickGoTo",n,i)},currentSlide:function(){return $(this.$el).slick("slickCurrentSlide")},add:function(n,i,e){$(this.$el).slick("slickAdd",n,i,e)},remove:function(n,i){$(this.$el).slick("slickRemove",n,i)},filter:function(n){$(this.$el).slick("slickFilter",n)},unfilter:function(){$(this.$el).slick("slickUnfilter")},getOption:function(n){$(this.$el).slick("slickGetOption",n)},setOption:function(n,i,e){$(this.$el).slick("slickSetOption",n,i,e)},setPosition:function(){$(this.$el).slick("setPosition")},onAfterChange:function(n,i,e){this.$emit("afterChange",n,i,e)},onBeforeChange:function(n,i,e,t){this.$emit("beforeChange",n,i,e,t)},onBreakpoint:function(n,i,e){this.$emit("breakpoint",n,i,e)},onDestroy:function(n,i){this.$emit("destroy",n,i)},onEdge:function(n,i,e){this.$emit("edge",n,i,e)},onInit:function(n,i){this.$emit("init",n,i)},onReInit:function(n,i){this.$emit("reInit",n,i)},onSetPosition:function(n,i){this.$emit("setPosition",n,i)},onSwipe:function(n,i,e){this.$emit("swipe",n,i,e)},onLazyLoaded:function(n,i,e,t){this.$emit("lazyLoaded",n,i,e,t)},onLazyLoadError:function(n,i,e,t){this.$emit("lazyLoadError",n,i,e,t)}},template:" <div>\n                    <slot></slot>\n                </div>"});var slickFunction={data:function(){return{slickOptions:{autoplay:!0,pauseOnHover:!1,dots:!0,infinite:!0,autoplaySpeed:5e3,speed:500,fade:!0,cssEase:"linear"}}},methods:{next:function(){this.$refs.slick.next()},prev:function(){this.$refs.slick.prev()},reInit:function(){var n=this;this.$nextTick(function(){n.$refs.slick.reSlick()})},handleAfterChange:function(n,i,e){console.log("handleAfterChange",n,i,e)},handleBeforeChange:function(n,i,e,t){console.log("handleBeforeChange",n,i,e,t)},handleBreakpoint:function(n,i,e){console.log("handleBreakpoint",n,i,e)},handleDestroy:function(n,i){console.log("handleDestroy",n,i)},handleEdge:function(n,i,e){console.log("handleEdge",n,i,e)},handleInit:function(n,i){console.log("handleInit",n,i)},handleReInit:function(n,i){console.log("handleReInit",n,i)},handleSetPosition:function(n,i){console.log("handleSetPosition",n,i)},handleSwipe:function(n,i,e){console.log("handleSwipe",n,i,e)},handleLazyLoaded:function(n,i,e,t){console.log("handleLazyLoaded",n,i,e,t)},handleLazeLoadError:function(n,i,e,t){console.log("handleLazeLoadError",n,i,e,t)}}},content=new Vue({el:"#content",mixins:[slickFunction],data:{},mounted:function(){console.log("%cMade by Captain%c2018/07","color: #fff; border-radius: 5px; background: #1a4f9c; padding: 2px 10px; font-weight: bold;","color: #000; border-radius: 5px; background: #ffde00; padding: 2px 10px; margin: 0px 5px;"),this.useJq()},methods:{checkingIEVersion:function(){},useJq:function(){(new WOW).init()}}});