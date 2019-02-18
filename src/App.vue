<template>
    <div class="app-container">
        <!--header-->
        <mt-header fixed title="Vue学习-项目1">
			<span slot="left" @click="goBack()" v-show="flag">
    			<mt-button icon="back">返回</mt-button>
  			</span>	
		</mt-header>

        <!--router-view-->
		<transition>
			<router-view></router-view>
		</transition>

        <!--tabbar-->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
    export default {
        data() {
			return {
				flag: false
			}
		},
		created() {
			this.flag = this.$route.path === "/home" ? false : true;
		},
		methods: {
			goBack() {
				//点击后退
				this.$router.go(-1);
			}
		},
		watch: {
			"$route.path": function(newVal) { //$router和$route
				if(newVal === "/home") {
					this.flag = false;
				}
				else {
					this.flag = true;
				}
			}
		}
    }
</script>

<style scoped>
	.mint-header {
		z-index: 10; /*提高顶部层级，使其永远位于页面顶部*/
	}

    .app-container {
        padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden; /*隐藏滚动条*/
    }

	.vue-enter {
		opacity: 0;
		transform: translateX(100%); /*右进*/
		position: absolute;
	}
	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%); /*左出*/
		position: absolute; /*去除漂移效果*/
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.6s ease;
	}

	/* mui-tab-item和mui.js存在重名问题，需要修改类名，解决tabbar无法切换的问题 */
	.mui-bar-tab .mui-tab-item-llb.mui-active {
    	color: #007aff;
	}
	.mui-bar-tab .mui-tab-item-llb {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}	

	.mui-bar-tab .mui-tab-item-llb .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>


