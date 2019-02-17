<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" 
        @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

    <!--监听文本框的change事件，将子组件数值传递给父组件-->
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
    mounted() {
        //初始化数字选择框
        mui(".mui-numbox").numbox();
    },
    methods: {
        //每当文本框数据改变时，立即将最新数据通过事件调用返回给父组件
        //通过ref获取数值
        countChanged() {
            this.$emit("getCount", parseInt(this.$refs.numbox.value));
        }
    },
    props: [
        "max"
    ],
    watch: {
        //属性监听
        "max": function(newValue, oldValue) {
            //通过number box的JS API设置最大值
            mui(".mui-numbox").numbox().setOption("max", newValue);
        }
    }
}
</script>
