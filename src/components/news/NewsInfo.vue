<template>
    <div class="newsinfo-container">
        <!--主标题-->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <!--子标题-->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo.add_time | dataFormat }}</span>
            <span>点击：{{ newsinfo.click }}次</span>
        </p>

        <hr>

        <!--内容区域-->
        <div class="content" v-html="newsinfo.content"></div>

        <!--评论区域-->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";

    import comment from "../subcomponents/comment.vue"; //1.导入子组件

    export default {
        data() {
            return {
                id: this.$route.params.id, //url地址中传递来的id值挂载到data上
                newsinfo: {}
            }
        },
        created() {
            this.getNewsInfo();
        },
        methods: {
            getNewsInfo() {
                this.$http.get("api/getnew/" + this.id).then((result) => {
                    if(result.body.status === 0){
                        this.newsinfo = result.body.message[0];
                    }
                    else {
                        Toast("获取新闻内容失败");
                    }
                });
            }
        },
        components: {
            "comment-box": comment //2.注册子组件
        }
    }
</script>

<style>
    .newsinfo-container {
        padding: 0 4px;
    }
    .newsinfo-container .title {
        font-size:  16px;
        text-align: center;
        color: red;
        margin: 15px 0;
    }
    .newsinfo-container .subtitle {
        font-size: 13px;
        color: #226aff;

        display: flex;
        justify-content: space-between;
    }
    .newsinfo-container .content img {
        width: 100%;
    }
</style>


