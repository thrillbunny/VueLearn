<template>
    <div>
        <!--使用组件时需为swipeList传值（父组件向子组件传值）-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeList" :key="item.img">
                <img v-bind:src="item.img" alt="" :class="{ full: isFull }">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props: ["swipeList", "isFull"] //父组件传递过来的轮播图数据
    }
</script>


<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;

        // 首页轮播图采用宽高均为100%的设置，商品详情页面的轮播图如果同样设置并不好看
        // 对于商品详情页面的轮播图，希望高度100%，宽度自适应
        // 由于存在分歧，就让轮播图插件的使用者手动决定宽度是否为100%
        img {
            //width: 100%;
            height: 100%;
        }
    }
    .mint-swipe-item {
        text-align: center;
    }

    .full {
        width: 100%;
    }
</style>



