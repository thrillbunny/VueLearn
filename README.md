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
        + 改造新闻资讯路有链接,制作新闻界面（mui绘制页面，vue-resource获取数据并渲染）
        + 实现新闻资讯列表跳转,跳转到新闻详情页面,跳转时提供唯一id标识符
        + 实现新闻详情页面的页面布局和数据渲染
        + 封装评论子组件并插入需要使用的页面