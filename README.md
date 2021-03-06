# 前端学习

## Vue + Webpack 项目

## Lesson1
### 制作首页APP组件
1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
2. 完成底部的 Tabbar 区域，使用的是 MUI 中的 Tabbar.html 
    + 改造 tabbar 为 router-link ，并设置路由高亮
    + 点击 tabbar 中的路由连接，展示对应的路由组件
3. 中间区域放置 router-view 区域来展示 router 匹配到的组件
    + 制作首页轮播图布局
    + 加载首页轮播图数据（vue-resource）
    + 通过MUI和自定义图标改造六宫格及其样式
        + 改造新闻资讯路由链接,制作新闻界面（mui绘制页面，vue-resource获取数据并渲染）
        + 实现新闻资讯列表跳转,跳转到新闻详情页面,跳转时提供唯一id标识符
        + 实现新闻详情页面的页面布局和数据渲染
        + 封装评论子组件并插入需要使用的页面

        + 改造图片分享路由链接，制作图片列表界面（mui中tab-top-webview-main.html制作顶部滑动条[复杂]，图片列表）
        + 获取所有分类，渲染分类列表
        + 制作图片列表区域（利用mint-ui中的lazy load组件实现图片的懒加载，渲染图片列表数据）
        + 实现点击图片跳转到图片详情页面，实现详情页面的渲染和美化，实现缩略图（vue-preview）

        + 绘制商品列表经典结构（两列式布局），完成商品列表数据的渲染
        + 实现商品详情页面的跳转（采用js方法）
        + 实现商品详情页面的页面布局和数据渲染（mui中的card卡片页面布局）

        + 实现商品加入购物车功能（小球动画）
        + vuex实现状态管理模式，存储购物车相关数据
        + 实现项目结算页面的布局和功能实现
        
### 实例界面

![论坛实例界面](https://github.com/thrillbunny/VueLearn/blob/master/vue.gif)
