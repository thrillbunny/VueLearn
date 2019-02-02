import Vue from "vue";

import app from "./App.vue";

import router from "./router.js";

import VueResource from "vue-resource";
Vue.use(VueResource);

//按需导入mint-ui组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//mui
import "./lib/mui/css/mui.css";
import "./lib/mui/css/icons-extra.css";

var vm = new Vue({
    el: "#app",
    render: (create) => create(app),
    router: router
})