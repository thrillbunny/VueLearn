<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="goods in goodsList" :key="goods.id"
        :to="'/home/goodsinfo/' + goods.id" tag="div">
            <img :src="goods.img_url" :alt="goods.zhaiyao">
            <h3 class="title">{{ goods.title }}</h3>
            <div class="goods-info">
                <p class="price">
                    <span class="new">￥{{ goods.sell_price }}</span>
                    <span class="old">￥{{ goods.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ goods.stock_quantity }}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 网页中有两种跳转方式，
        方式1：使用 a 标签的形式
        方式2：使用 window.location.href 的形式，叫做编程式导航-->
        <div class="goods-item" v-for="goods in goodsList" :key="goods.id" @click="goDetail(goods.id)">
            <img :src="goods.img_url" :alt="goods.zhaiyao">
            <h3 class="title">{{ goods.title }}</h3>
            <div class="goods-info">
                <p class="price">
                    <span class="new">￥{{ goods.sell_price }}</span>
                    <span class="old">￥{{ goods.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ goods.stock_quantity }}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMoreGoodsList()">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data() {
            //挂载私有数据
            return {
                pageIndex: 1, //分页页数
                goodsList: [] //存放商品列表
            };
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                //获取商品列表信息
                this.$http.get("api/getgoods?pageindex=" + this.pageIndex).then((result) => {
                    if(result.body.status === 0) {
                        this.goodsList = this.goodsList.concat(result.body.message);
                    }
                });
            },
            getMoreGoodsList() {
                this.pageIndex ++;
                this.getGoodsList();
            },
            goDetail(id) {
                // 使用js形式进行路由导航

                //【注意】区分 this.$route 和 this.$router 两个对象
                // this.$route 是路由参数对象，所有路由中的参数， params、query等均属于它
                // this.$router 是路由导航对象，用它可以方便地用js代码，实现路由的前进、后退、跳转到新的URL地址

                // 1.最简单的方法
                // this.$router.push("/home/goodsinfo/" + id);
                // 2.传递对象
                // this.$router.push( { path: "/home/goodsinfo/" + id });
                // 3.传递命名的路由
                this.$router.push( { name: "goodsinfo" , params: { id: id} })
            }
        }
    }
</script>


<style lang="scss" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;

        .goods-item {
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;

            display: flex;
            flex-direction: column; /*改变主轴方向，避免两侧区域长度不一致导致的留白*/
            justify-content: space-between;

            min-height: 293px;/*设置最小高度避免初始加载时内容区拥挤*/

            img {
                width: 100%
            }
            .title {
                font-size: 14px;
            }

            .goods-info {
                background-color: #eee;
                p { 
                    margin: 0; 
                    padding: 5px;
                }
                .price {
                    .new {
                        font-weight: bold;
                        font-size: 16px;
                        color: rgb(165, 27, 27);
                    }
                    .old {
                        font-size: 12px;
                        text-decoration: line-through;
                        margin-left: 10px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>

