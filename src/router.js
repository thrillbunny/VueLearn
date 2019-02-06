import Vue from "Vue";
import VueRouter from "vue-router";

import HomeContainer from "./components/HomeContainer.vue";
import MemberContainer from "./components/MemberContainer.vue";
import SearchContainer from "./components/SearchContainer.vue";
import ShopcarContainer from "./components/ShopcarContainer.vue";

Vue.use(VueRouter);

var router = new VueRouter({
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: HomeContainer },
        { path: "/member", component: MemberContainer },
        { path: "/search", component: SearchContainer },
        { path: "/shopcar", component: ShopcarContainer }
    ],
    linkActiveClass: "mui-active" //覆盖默认的路由高亮的类，默认类叫router-link-active
});

//es6把路由对象暴露出去
export default router;