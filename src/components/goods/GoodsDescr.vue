<template>
    <div class="goodsdescr-container">
        <h3 class="goodsdescr-title">{{ goodsDescr.title }}</h3>

        <hr>

        <div class="content" v-html="goodsDescr.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsDescr: {}, //图文数据
            id: this.$route.params.id,
        };
    },
    created() {
        this.getGoodsDescr();
    },
    methods: {
        getGoodsDescr() {
            this.$http.get("api/goods/getdesc/" + this.id).then((result) => {
                if(result.body.status === 0) {
                    this.goodsDescr = result.body.message[0];
                }
            });
        }
    }
}
</script>

<style lang="scss">
    .goodsdescr-container {
        padding: 5px;

        .goodsdescr-title {
            font-size: 20px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        .content {
            img {
                width:100%;

            }
        }
    }
</style>
