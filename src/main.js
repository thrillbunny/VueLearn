import Vue from "vue";

import app from "./App.vue";

import router from "./router.js";

import VueResource from "vue-resource";
Vue.use(VueResource);
Vue.http.options.root = 'http://www.liulongbin.top:3005'; //设置请求根路径
Vue.http.options.emulateJSON = true; //全局设置post表单数据格式组织形式，默认为application/x-www-form-urlencoded

import VuePreview from "vue2-preview"; //图片预览插件
Vue.use(VuePreview);

import Vuex from "vuex"; //注册状态管理模式插件
Vue.use(Vuex);

//刚进入页面一定会进入 main.js，调用 main.js 时首先从本地存储中将数据读取出来放入 store.state 中
var car = JSON.parse( localStorage.getItem("car") || "[]" );
var store = new Vuex.Store({ //S一定要大写,就相当于我们在使用构造函数(类)的时候首字母要大写
    state: { //类data,通过this.$store.state调用
        car: car, 
        //将购物车中商品的数据用一个数组存储，数组中存储商品对象，包括id count购买数量 price购买单价 selected商品是否被选中
    },
    mutations: { //类methods
        infoAddToCar(state, goodsToCarinfo) {
            //GoodsInfo页面，点击加入购物车，将商品信息添加到store中car数组中
            //1. 如果商品已经存在只需要更新数量
            //2. 如果商品不存在则直接添加商品信息对象

            var flag = false; //默认在购物车中没有找到商品

            state.car.some(element => {
                if(element.id == goodsToCarinfo.id) {
                    element.count += parseInt(goodsToCarinfo.count);
                    flag = true ;
                    return true; //找到则立刻终止循环
                }
            });

            if(!flag) {
                state.car.push(goodsToCarinfo);
            }

            //更新car之后存储到本地的 localStorage 中
            localStorage.setItem("car", JSON.stringify(state.car));
        },
        updateCar(state, updateCarinfo) {
            //ShopcarContainer页面，点击numbox，更新car数组
            state.car.some(element => {
                if(element.id == updateCarinfo.id) {
                    element.count = parseInt(updateCarinfo.count); //
                    return true; //找到则立刻终止循环
                }
            });

            localStorage.setItem("car", JSON.stringify(state.car));
        },
        removeFromCar(state, id) {
            //根据id删除store中购物车内部数据
            state.car.some((el, i) => {
                if(el.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
            })
            //更新本地存储
            localStorage.setItem("car", JSON.stringify(state.car));
        },
        updateShopCarList(state, info) {
            //根据switch的开关更新car(shopCarList)信息
            state.car.some((el) => {
                if(el.id == info.id) {
                    el.selected = info.selected;
                }
            });

            localStorage.setItem("car", JSON.stringify(state.car));
        },
    },
    getters: { //作用类computed计算属性中函数的get方法，传参类filters
        getAllCount(state) { //state固定为第一个参数，类filters
            var cnum = 0;
            state.car.forEach(element => {
                cnum += element.count;
            });
            return cnum;
        },
        getGoodsCount(state) { //从购物车获取商品的数量，循环购物车中所有商品数据，获取一个形如 { id: count }的对象
            var co = {};
            state.car.forEach(element => {
                co[element.id] = element.count;
            });
            return co;
        },
        getGoodsSelected(state) {
            var so = {};
            state.car.forEach(element => {
                so[element.id] = element.selected;
            });
            return so;
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, //勾选的总数量
                amount: 0 //勾选的总价
            };
            state.car.forEach(el => {
                if(el.selected) {
                    o.count += el.count;
                    o.amount += el.price * el.count;
                }
            });
            return o;
        }
    }
});

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
    router: router, //挂载路由规则
    store: store, //挂载store状态管理模式
})