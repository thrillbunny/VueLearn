import Vue from "vue";

import app from "./App.vue";

import router from "./router.js";

import VueResource from "vue-resource";
Vue.use(VueResource);
Vue.http.options.root = 'http://www.liulongbin.top:3005'; //设置请求根路径
Vue.http.options.emulateJSON = true; //全局设置post表单数据格式组织形式，默认为application/x-www-form-urlencoded

import VuePreview from "vue-preview"; //图片预览插件
Vue.use(VuePreview);

//导入时间插件(node中的moment插件)
import moment from "moment";
//定义一个全局过滤器
Vue.filter("dataFormat", function(dataStr, pattern="YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
})

//按需导入mint-ui组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
// 实现懒加载样式需全部导入
import MintUI from "mint-ui";
Vue.use(MintUI);
import "mint-ui/lib/style.css";

//mui
import "./lib/mui/css/mui.css";
import "./lib/mui/css/icons-extra.css";

var vm = new Vue({
    el: "#app",
    render: (create) => create(app),
    router: router
})