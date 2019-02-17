import Vue from "Vue";
import VueRouter from "vue-router";

import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue";

import NewsList from "./components/news/NewsList.vue";
import NewsInfo from "./components/news/NewsInfo.vue";

import PhotoList from "./components/photos/PhotoList.vue";
import PhotoInfo from "./components/photos/PhotoInfo.vue";

import GoodsList from "./components/goods/GoodsList.vue";
import GoodsInfo from "./components/goods/GoodsInfo.vue";
import GoodsDescr from "./components/goods/GoodsDescr.vue";
import GoodsComment from "./components/goods/GoodsComment.vue";

Vue.use(VueRouter);

var router = new VueRouter({
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: HomeContainer },
        { path: "/member", component: MemberContainer },
        { path: "/search", component: SearchContainer },
        { path: "/shopcar", component: ShopcarContainer },

        { path: "/home/newsList", component: NewsList },
        { path: "/home/newsinfo/:id", component: NewsInfo },

        { path: "/home/photoList", component: PhotoList },
        { path: "/home/photoinfo/:id", component: PhotoInfo },

        { path: "/home/goodsList", component: GoodsList },
        { path: "/home/goodsinfo/:id", component: GoodsInfo, name: "goodsinfo"},
        { path: "/home/goodsdescr/:id", component: GoodsDescr, name: "goodsdescr"},
        { path: "/home/goodscomment/:id", component: GoodsComment, name: "goodscomment"}
    ],
    linkActiveClass: "mui-active" //覆盖默认的路由高亮的类，默认类叫router-link-active
});

//es6把路由对象暴露出去
export default router;