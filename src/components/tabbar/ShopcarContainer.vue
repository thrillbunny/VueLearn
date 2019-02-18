<template>
    <div class="shopcar-container">
        <div class="shopcar-list">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner" v-for="(item, index) in shopCarList" :key="item.id">
                        <mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])">
                        </mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="shopcar-info">
                            <h3>{{ item.title }}</h3>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- item.id删除vuex.car中数据，index删除shopCarList中数据（shopCarList根据car渲染而成，需要对应删除） -->
                                <a href="#" @click.prevent="removeGoods(item.id, index)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner jiesuan">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，
                                总计 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                        </div>
                        <mt-button type="danger">结算</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <p>{{ $store.getters.getGoodsSelected }}</p>
    </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
    data() {
        return {
            shopCarList: [] //购物车中所有商品数据
        }
    },
    created() {
        this.getShopCarList();
    },
    methods: {
        getShopCarList() {
            //获取store.state中car数组所有对象的id并拼接为一个，分隔的字符串
            var allId = [];
            this.$store.state.car.forEach(element => {
                allId.push(element.id);
            });
            if(allId.length <= 0) return;
            this.$http.get("api/goods/getshopcarlist/" + allId.join(",")).then((result) => {
                if(result.body.status === 0) {
                    this.shopCarList = result.body.message;
                }
                else {
                    console.log("接口无法获取");
                }
            });
        },
        removeGoods(id, index) {
            //根据id删除car中数据
            this.$store.commit("removeFromCar", id);

            //根据index删除shopCarList中数据
            this.shopCarList.splice(index, 1);
        },
        selectedChanged(id, value) {
            this.$store.commit("updateShopCarList", { id, selected: value });
        }
    },
    components: {
        numbox
    }
}
</script>


<style lang="scss">
    .shopcar-container {
        background: #eee;
        overflow: hidden;

        .mui-card-content-inner {
            display: flex;
            align-items: center;
        }

        .shopcar-list {
            img {
                widows: 60px;
                height: 60px;
            }
            h3 {
                font-size: 13px;
            }
            .shopcar-info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                font-size: 12px;

                .price {
                    color: red;
                    font-weight: bold;
                }
            }

            .jiesuan {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .red {
                    color: red;
                    font-size: 16px;
                    font-weight: bold;
                }
            }
        }
    }
</style>
