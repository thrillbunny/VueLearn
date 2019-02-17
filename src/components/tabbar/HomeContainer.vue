<template>
    <div>
        <!--轮播图区域-->
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeList" :key="item.img">
                <img v-bind:src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe> -->
        <swiper :swipeList="swipeList" :isFull="true"></swiper>


        <!--六宫格区域-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/newsList">
                    <img src="../../images/marker.png">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/photoList">
                    <img src="../../images/image_sequence.png">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/goodsList">
                    <img src="../../images/shopping_cart.png">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
                    <img src="../../images/brochure.png">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
                    <img src="../../images/play_video.png">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
                    <img src="../../images/ogg_vorbis.png">
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>
import { Toast } from "mint-ui";

import swiper from "../subcomponents/swiper.vue";

export default {
    data() {
        return {
            swipeList: [] //保存轮播图的数组
        }
    },
    created() {
        this.getSwipe();
    },
    methods: {
        getSwipe() { //获取轮播图数据
            this.$http.get("api/getlunbo").then((result) => { //vue-resource的get请求前面不带斜线
                console.log(result.body);
                if(result.body.status === 0) {
                    this.swipeList = result.body.message;
                }else {
                    Toast("加载轮播图失败")
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    components: {
        swiper
    }
}
</script>


<style scoped>
    /* .mint-swipe {
        height: 200px;
    }
    .mint-swipe-item:nth-child(1) {
        background-color: rgb(182, 238, 93);
    }
    .mint-swipe-item:nth-child(2) {
        background-color: rgb(241, 62, 62);
    }
    .mint-swipe-item:nth-child(3) {
        background-color: rgb(243, 122, 78);
    } 

    img {
        height: 100%;
        width: 100%;
    }*/

    .mui-grid-view.mui-grid-9 {
        background-color: white;
        border: 0;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    }

    .mui-media-body{
        font-size: 14px;
        color: rgb(94, 92, 92);
    }

    li img {
        height: 40px;
        width: 40px;
    }
</style>
