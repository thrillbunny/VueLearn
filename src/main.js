import Vue from "vue";

import app from "./App.vue";

import router from "./router.js";

//按需导入mint-ui组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

//mui
import "./lib/mui/css/mui.css";

var vm = new Vue({
    el: "#app",
    render: (create) => create(app),
    router: router
})