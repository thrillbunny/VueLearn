<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" 
        @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
    mounted() {
        //初始化数字选择框
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChanged() {
            //当数量值改变时立即同步数据到最新的购物车car数组中
            this.$store.commit("updateCar", {
                //numberbox只含有购物的两个信息，商品id和购物车数量
                id: this.goodsid,
                count: this.$refs.numbox.value
            });
        }
    },
    props: [
        "initcount", "goodsid"
    ]
}
</script>