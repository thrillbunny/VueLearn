<template>
    <div class="cmt-container">
        <h3>发表评论</h3>

        <textarea maxlength="180" 
        placeholder="请输入要评论的内容(小于180字)"
        v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment()">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, index) in comments" :key="index">
                <div class="cmt-title">
                    第{{ index+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === "" ? "用户无评论" : item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMoreComments()">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";

    export default {
        data() {
            return {
                pageIndex: 1, //默认显示第一页
                comments: [],
                msg: "" //发表评论内容
            }
        },
        created() {
            this.getComments();
        },
        methods: {
            getComments() { //初始化时加载评论
                this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
                .then((result) => {
                    if(result.body.status === 0){
                        this.comments = this.comments.concat(result.body.message); //数组拼接
                    }
                    else {
                        Toast("加载评论内容失败");
                    }
                });
            },
            getMoreComments() { //加载更多评论
                this.pageIndex++;
                this.getComments();
            },
            postComment() { //发表评论
                if(this.msg.trim().length === 0){
                    return Toast("评论内容不能为空");
                }
                //参数1：请求的URL地址
                //参数2：提交给服务器的数据对象{ content：this.msg }
                //参数3：（已全局设置）提交时的表单数据格式{ emulateJSON：true }
                this.$http.post("api/postcomment/" + this.$route.params.id,
                { content: this.msg.trim() }) //清除空格
                .then((result) => {
                    if(result.body.status === 0) {
                        var cmt = {
                            user_name: "匿名用户",
                            add_time: Date.now(),
                            content: this.msg.trim()
                        };
                        this.comments.unshift(cmt);
                        this.msg = "";
                    }
                });
            }
        },
        props: [ //父组件向子组件传参
            "id"
        ]
    }
</script>

<style scoped>
    .cmt-container h3{
        font-size: 18px;
    }
    .cmt-container textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list {
        margin: 5px 0;
    }
    .cmt-item {
        font-size: 13px;
    }
    .cmt-item .cmt-title {
        background: #ccc;
        line-height: 35px;
    }
    .cmt-item .cmt-body {
        line-height: 35px;
        text-indent: 2em; /*缩进*/
    }
</style>


