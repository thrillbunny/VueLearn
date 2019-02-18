<template>
    <div class="photoinfo-container">
        <!--主标题-->
        <h3 class="title">{{ photoInfo.title }}</h3> <!--photoInfo是一个对象-->
        <!--子标题-->
        <p class="subtitle">
            <span>发表时间：{{ photoInfo.add_time | dataFormat }}</span>
            <span>点击：{{ photoInfo.click }}次</span>
        </p>

        <hr>

        <!--缩略图区域-->
        <!--新版方法不同于老版本,采用vue2-preview-->
        <!-- <vue-preview :slides="list" class="thumbs"></vue-preview> -->
        <vue-preview
            :list="list"
            :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
            :previewBoxStyle="{border: '1px solid #eee'}"
            :tapToClose="true"
        />

        <!--内容区域-->
        <div class="content" v-html="photoInfo.content"></div>

        <!--评论区域-->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    import comment from "../subcomponents/comment.vue"; 

    export default {
        data() {
            return {
                id: this.$route.params.id, //路由中获取的图片id
                photoInfo: {}, //图片详情
                list: [] //缩略图数组
            };
        },
        created() {
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods: {
            getPhotoInfo() {
                this.$http.get("api/getimageInfo/" + this.id).then((result) => {
                    if(result.body.status === 0) {
                        this.photoInfo = result.body.message[0];
                    }
                })
            },
            getThumbs() {
                //获取缩略图
                this.$http.get("api/getthumimages/" + this.id).then((result) => {
                    if(result.body.status === 0) {
                        result.body.message.forEach(element => { //循环图片补全宽和高
                            element.w = 600;
                            element.h = 400;
                            //element.msrc = element.src;
                        });
                        this.list = result.body.message;
                    }
                })
            }
        },
        components: {
            "comment-box": comment //注册评论子组件
        }
    }
</script>

<style lang="scss">
    .photoinfo-container {
        padding: 3px;

        .title {
            color: #26a2ff;
            font-size: 16px;
            line-height: 14px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .content {
            line-height: 25px;
            font-size: 13px;
        }

        img {
            margin: 10px;
            box-shadow: 0 0 10px #999;
        }
    }
</style>

