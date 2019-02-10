<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="news in newsList" :key="news.id">
                <router-link :to="'/home/newsinfo/' + news.id">
                    <img class="mui-media-object mui-pull-left" 
                    :src="news.img_url">
                    <div class="mui-media-body">
                        <h3>{{ news.title }}</h3>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{ news.add_time | dataFormat }}</span>
                            <span>点击：{{ news.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";

    export default {
        data() {
            return {
                newsList: []
            };
        },
        created() {
            this.getNewsList();
        },
        methods: {
            getNewsList() {
                this.$http.get("api/getnewslist").then((result) => {
                    if (result.body.status === 0) {
                        this.newsList = result.body.message;
                    }
                    else {
                        Toast("获取新闻列表失败");
                    }
                });
            }
        }
    }
</script>


<style scoped>
    .mui-media-body h3 {
        font-size: 14px;
    }
    .mui-media-body .mui-ellipsis {
        font-size: 12px;
        color: #226aff;

        /* 两端对齐 */
        display: flex;
        justify-content: space-between;
    }
</style>
