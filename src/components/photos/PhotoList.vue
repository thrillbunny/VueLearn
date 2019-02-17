<template>
    <div>
        <!-- 顶部滑动条 -->
        <!-- 若使用区域滚动组件，需调用mui.js文件，再手动初始化scroll控件 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--通过事件绑定默认高亮“全部”选项，
                    注意，在点击不同选项时高亮会切换，这是mui封装的功能，与自定义程序无关-->
                    <a :class='["mui-control-item", item.id == 0 ? "mui-active":""]' 
                    v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

        <!--图片列表区域-->
        <div class="pic">
            <ul class="photo-list">
                <router-link v-for="image in list" :key="image.id" tag="li" 
                :to="'/home/photoinfo/' + image.id">
                    <img v-lazy="image.img_url">
                    <div class="info">
                        <h3 class="info-title">{{ image.title }}</h3>
                        <div class="info-body">{{ image.zhaiyao }}</div>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    //实现滚动条效果需导入js文件
    import mui from "../../lib/mui/js/mui.js";

    export default {
        data() {
            return {
                cates: [], //全部分类
                list: [] //图片列表数组
            };
        },
        created() {
            this.getAllCategory();
            this.getPhotoListByCateId(0); //默认进入页面
        },
        mounted() { //DOM结构已经被渲染好并放入页面中后执行的生命周期函数
            //要初始化滑动条，必须等 dom 元素加载完毕
            //初始化scroll控件
            mui('.mui-scroll-wrapper').scroll({
	            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getAllCategory() {
                //获取所有图片分类
                this.$http.get("api/getimgcategory").then((result) => {
                    if(result.body.status === 0) {
                        //手动拼接出一个最完整的分类列表
                        result.body.message.unshift({ title: "全部", id: 0 });
                        this.cates = result.body.message;
                    }
                });
            },
            getPhotoListByCateId(cateId) {
                //根据分类id获取图片列表
                this.$http.get("api/getimages/" + cateId).then((result) => {
                    if(result.body.status === 0) {
                        this.list = result.body.message;
                    }
                });
            }
        }
    }
</script>

<style>
    * {
        /* touch-action 用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作 */
        touch-action: pan-x pan-y; /*启用单指水平和垂直平移手势，chrome浏览器特有*/
    }


    .photo-list {
        list-style: none;
        padding: 10px 10px 0px 10px;
        margin: 0;
    }
    .photo-list li {
        background: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 6px #999;

        position: relative; /*实现底部文字覆盖1,li设置为相对定位*/
    }
    .photo-list img {
        width: 100%;
        vertical-align: middle;
    }
    .photo-list img[lazy=loading] { /*懒加载固定配置*/
        width: 40px;
        height: 300px;
        margin: auto;
    }

    .info {
        color: white;
        text-align: left;

        background-color: rgb(0, 0, 0, 0.4); /*实现底部文字覆盖3,半透明背景色*/

        position: absolute; /*实现底部文字覆盖2,info设置为绝对定位*/
        bottom: 0px;

        max-height: 84px;
    }
    .info-title {
        font-size: 14px;
    }
    .info-body {
        font-size: 13px;
    }
</style>


