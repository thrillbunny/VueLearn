<template>
    <div class="goodsinfo-container">
        <!--小球动画，半场动画需用钩子函数-->
        <transition
            @before-enter="beforeEnter"
            @enter="Enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :swipeList="swipeList" :isFull="false"></swiper>
                </div>
            </div>
        </div>

        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;
                        销售价：<span class="now_price">￥{{ goodsinfo.sell_price}}</span>
                    </p>
                    <p> 购买数量：<numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p class="buy">
                        <mt-button type="primary" size="normal">立即购买</mt-button>
                        <mt-button type="danger" size="normal" @click="addToShopCar()">加入购物车</mt-button>
                        <!--点击 加入购物车 按键时需获取 numbox 的值，其中 numbox 是子组件，需向父组件传值-->
                        <!--子组件向父组件传值可采用事件调用机制v-on，其本质即父向子传递一个方法，子组件将数值作为参数传递给该方法-->
                    
                        <!--可加购物车数量有上限，这个上限由父组件的库存决定，需要通过事件绑定机制v-bind向子组件传值-->
                        <!--由于商品信息是异步获取，max获取时间未知，所以需要watch属性监听,watch可能会被触发多次，但最后一次一定会是合法数值-->
                    </p>
                </div>
            </div>
        </div>

        <!--商品介绍区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品详情</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品介绍：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDescr(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import swiper from "../subcomponents/swiper.vue";
    import numbox from "../subcomponents/goodsinfo_numbox.vue";

    export default {
        data() {
            return {
                id: this.$route.params.id, //路由参数中的id挂载到data上方便调用
                swipeList: [], //保存轮播图数据
                goodsinfo: {}, //获取商品的信息
                ballFlag: false, //控制小球的隐藏和显示
                selectedCount: 1, //父组件获取数字选择框子组件传递来的数值，默认为1
            };
        },
        created() {
            this.getSwipe();
            this.getGoodsInfo();
        },
        methods: {
            getSwipe() {
                //获取轮播图
                this.$http.get("api/getthumimages/" + this.id).then((result) => {
                    if(result.body.status === 0) {
                        //由于轮播图组件只认识img属性，所以需要添加该属性
                        result.body.message.forEach(element => {
                            element.img = element.src;
                        });
                        this.swipeList = result.body.message;
                    }
                });
            },
            getGoodsInfo() {
                //获取商品信息
                this.$http.get("api/goods/getinfo/" + this.id).then((result) => {
                    if(result.body.status === 0) {
                        this.goodsinfo = result.body.message[0];
                    }
                });
            },
            goDescr(id) {
                //点击按键跳转图文介绍
                this.$router.push( { name: "goodsdescr", params: {id} } );
            },
            goComment(id) {
                //点击跳转评论界面
                this.$router.push( { name: "goodscomment", params: {id} } );
            },
            addToShopCar() {
                //控制小球是否显示
                this.ballFlag = !this.ballFlag;
            },
            //小球动画钩子函数
            beforeEnter(el) {
                el.style.transform = "translate(0, 0)";
            },
            Enter(el, done) {
                el.offsetWidth; //实现动画效果

                //小球移动位置需要动态计算
                //获取购物车数量标志横纵坐标，与小球横纵坐标分别求差
                //通过domObject.getBoundingClientRect()获取坐标

                // 1.获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 2.获取右标在页面中的位置，vue中虽然尽量要减少对dom的操作，但此处操作不涉及业务逻辑
                const badgePosition = document.getElementById("badge").getBoundingClientRect();

                var distanceX = badgePosition.left - ballPosition.left;
                var distanceY = badgePosition.top - ballPosition.top;
                
                el.style.transform = `translate(${distanceX}px, ${distanceY}px)`; //通过模板字符串拼接
                el.style.transition = "all 0.6s cubic-bezier(.58,-0.14,.93,.48)";
                done(); //完成后立即调用afterEnter
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag;
            },
            //父组件向数字选择框子组件传递的方法
            getSelectedCount(count) {
                this.selectedCount = count; //子组件将选中的数量传递给父组件时，将该值保存在父组件的data上
                //console.log("父组件获取的数值为" + this.selectedCount);
            }
        },
        components: {
            swiper: swiper,
            numbox: numbox
        }
    }
</script>

<style lang="scss" scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden; /*取消卡片上方的白色横条*/

        .now_price {
            font-size: 16px;
            font-weight: bold;
            color: rgb(165, 27, 27);
        }

        .buy {
            display: flex;
            justify-content: space-around;
        }

        .mui-card-footer {
            display: block;

            button {
                margin: 10px 0;
            }
        }

        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;

            z-index: 10;
            position: absolute; /*脱离页面区域*/

            top: 392px;
            left: 147px;

            //transform: translate(80px, 190px);
        }
    }
</style>

