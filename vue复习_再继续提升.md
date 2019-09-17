# VUE 复习 - Level4 再继续提升

---

### VUE 路由

Vue.js 路由允许通过不同的 URL 访问不同的内容，通过 Vue.js + vue-router 可以实现多视图的单页Web应用（single page web application，SPA）。

VUE 路由需要导入 [vue-router](https://github.com/vuejs/vue-router) 库,可以直接下载后导入库文件，也可以用 npm 安装，如：

	cnpm install vue-router

### 1. 基本使用方法

< router-link > + < router-view >

<router-link> 是一个组件，该组件用于设置一个导航链接，切换不同 HTML 内容。to 属性指明目标地址，即要显示的内容。

HTML 代码

	<script src="https://unpkg.com/vue/dist/vue.js"></script>
	<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
	 
	<div id="app">
		<h1>Hello App!</h1>
		<p>
			<!-- 使用 router-link 组件来导航. -->
			<!-- 通过传入 `to` 属性指定链接. -->
			<!-- <router-link> 默认会被渲染成一个 `<a>` 标签，可用 tag 修改 -->
			<router-link to="/foo" tag="span">Go to Foo</router-link>
			<router-link to="/bar">Go to Bar</router-link>
		</p>

		<!-- 路由出口，相当于一个占位符 -->
		<!-- 路由匹配到的组件将渲染在这里 -->
		<router-view></router-view>
	</div>

JS 代码：

	// 0. 如果使用模块化机制编程，导入 Vue 和 VueRouter，要调用 Vue.use(VueRouter)
	// 0. 导入 vue-router 之后，在 windows 全局对象中，就有了一个路由的构造函数叫做 VueRouter ,在 new 路由对象的时候，可以为构造函数传递一个配置对象
	 
	// 1. 定义（路由）组件-template 模板
	// 可以从其他文件 import 进来
	const Foo = { template: '<div>foo</div>' }
	const Bar = { template: '<div>bar</div>' }
	 
	// 2. 定义路由
	// 每个路由应该映射一个组件。 其中"component" 可以是
	// 通过 Vue.extend() 创建的组件构造器，
	// 或者，是一个组件配置对象。
	// 对象必须有两个属性
	// 属性1： path 表示监听哪个路由链接地址
	// 属性2： component 表示如果监听到的路由是前面匹配到的 path，则展示 component 属性对应的组件
	const routes = [
	  { path: '/foo', component: Foo },
	  { path: '/bar', component: Bar }
	]
	 
	// 3. 创建 router 实例，然后传 `routes` 配置
	// 你还可以传别的配置参数, 不过先这么简单着吧。
	const router = new VueRouter({
	  routes // （缩写）相当于 routes: routes
	})
	 
	// 4. 创建和挂载根实例 将路由规则对象， 注册到vm实例上
	// 记得要通过 router 配置参数注入路由，
	// 从而让整个应用都有路由功能
	const app = new Vue({
	  router: router
	}).$mount('#app')

在实例中注入路由，之后可以在任何组件中通过 **this.$router** 访问路由器，通过 **this.$route** 访问当前路由。

	// Home.vue
	export default {
	  computed: {
	    username () {
	      //  `params` 可见下方命名路由实例
	      return this.$route.params.username
	    }
	  },
	  methods: {
	    goBack () {
	      window.history.length > 1
	        ? this.$router.go(-1)
	        : this.$router.push('/')
	    }
	  }
	}

当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active

点击过的导航链接都会加上样式 class ="router-link-exact-active router-link-active"

**Q：this.$router 和 this.$route 区别？**

参考资料：[vue-router中$route 和 $router](https://www.jianshu.com/p/fa0b5d919615)

**1）** this.$router 即全局路由对象，在任何页面中都可以使用，并调用 push()、go()、replace() 等路由实例方法；

push 方法其实和 < router-link :to="..." >是等同的，该方法实现的跳转会向 history 栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面：

	// 字符串
	this.$router.push('home')
	// 对象
	this.$router.push({ path: 'home' })
	// 命名的路由
	this.$router.push({ name: 'user', params: { userId: 123 }})
	// 带查询参数，变成 /register?plan=123
	this.$router.push({ path: 'register', query: { plan: '123' }})

this.$router.push() 方法中 path 和 params 不能一起使用，否则 params 无效；可以通过在路由配置中设置 name 属性，再在命名路由中用 name 指定页面，路由配置如下：

	routes: [
		{ name:'user', path:'/user', components: User }
	 ]

go 方法实现页面的跳转，方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)：

	// 在浏览器记录中前进一步，等同于 history.forward()
	router.go(1)
	
	// 后退一步记录，等同于 history.back()
	router.go(-1)
	
	// 前进 3 步记录
	router.go(3)
	
	// 如果 history 记录不够用，会导致失败
	router.go(-100)
	router.go(100)

replace 方法和 push 方法类似，但不会向 history 栈添加新的记录，而是替换当前的页面：

	<router-link to="/05" replace>05</router-link>
	
	// 一般使用replace来做404页面
	this.$router.replace('/')

PS：

1. router.push、 router.replace 和 router.go 跟 window.history.pushState、 window.history.replaceState 和 window.history.go 类似；

2. Vue Router 的导航方法 (push、 replace、 go) 在各类路由模式 (history、 hash 和 abstract) 下表现一致。


**2）** this.$route 表示当前路由信息对象，表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的 route records（路由记录），可以调用其 name、path、query、params 等属性。

+ **$route.path:** 字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。

+ **$route.params(常用):** 一个 key/value 对象，包含了 动态片段 和 全匹配片段，如果没有路由参数，就是一个空对象。

+ **$route.query(常用):** 一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象。

+ **$route.hash：** 当前路由的 hash 值 (不带 #) ，如果没有 hash 值，则为空字符串。

+ **$route.fullPath：** 完成解析后的 URL，包含查询参数和 hash 的完整路径。

+ **$route.matched：** 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。

+ **7.$route.name：** 当前路径名字

+ **8.$route.meta：**  路由元信息

### < router-link > 相关属性

#### to

表示目标路由的链接。 当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。

	<!-- 字符串 -->
	<router-link to="home">Home</router-link>
	<!-- 渲染结果 -->
	<a href="home">Home</a>
	
	<!-- 使用 v-bind 后引号内解释为 JS 表达式 -->
	<router-link v-bind:to="'home'">Home</router-link>
	
	<!-- 同上 -->
	<router-link :to="{ path: 'home' }">Home</router-link>
	
	<!-- 命名的路由 -->
	<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
	
	<!-- 带查询参数，下面的结果为 /register?plan=private -->
	<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>

	<!-- 相当于 -->
	<router-link to="/register?plan=private">Register</router-link>

查询字符串可以用 $route.query.plan 获得。

#### replace

设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，导航后不会留下 history 记录。

	<router-link :to="{ path: '/abc'}" replace></router-link>

#### append

设置 append 属性后，则在当前 (相对) 路径前添加基路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b

	<router-link :to="{ path: 'relative/path'}" append></router-link>

#### tag

想要 < router-link > 渲染成某种标签，例如 < li >，可以使用 tag prop 类指定何种标签，同样它还是会监听点击，触发导航。

	<router-link to="/foo" tag="li">foo</router-link>

	<!-- 渲染结果 -->
	<li>foo</li>

#### event

声明可以用来触发导航的事件，可以是一个字符串或是一个包含字符串的数组。

	<router-link v-bind:to = "{ path: '/route1'}" event = "mouseover">Router Link 1</router-link>

代码中设置了 event 等于 mouseover，即当鼠标移动到Router Link 1 上时，页面内容会发生改变。

	<router-link v-bind:to = "{ path: '/route1'}" event = "['mouseover','click']">Router Link 1</router-link>

#### active-class

设置链接激活时使用的 CSS 类名，不设置则默认为 router-link-active。

	<style>
	   ._active{
	      background-color : red;
	   }
	</style>
	<p>
	   <router-link v-bind:to = "{ path: '/route1'}" active-class = "_active">Router Link 1</router-link>
	   <router-link v-bind:to = "{ path: '/route2'}" tag = "span">Router Link 2</router-link>
	</p>

#### exact-active-class

配置当链接被精确匹配的时候应该激活的 class，不设置则默认为 router-link-exact-active。

	<p>
	   <router-link v-bind:to = "{ path: '/route1'}" exact-active-class = "_active">Router Link 1</router-link>
	   <router-link v-bind:to = "{ path: '/route2'}" tag = "span">Router Link 2</router-link>
	</p>

**Q: exact-active-class 和 active-class 的区别？**

router-link 默认情况下的路由是**模糊匹配**，例如当前路径是 /article/1 时也会激活 < router-link to="/article" >；

当设置 exact-active-class 以后，这个 router-link 只有在当前路由被**全包含匹配**时才会被激活 exact-active-class 中的 class。

举例来说，设置路由的 active-class：

	<router-link to="/article" active-class="router-active"></router-link>

则当用户访问 /article/1 时会被激活为：

	<a href="#/article" class="router-active" rel="nofollow"></a>

而当设置 exact-active-class：

	<router-link to="/article" exact-active-class="router-active"></router-link>

当用户访问 /article/1 时，不会激活这个 link 的 class：

	<a href="#/article" rel="nofollow"></a>

### 2. 动态路由匹配

在实际页面制作中常需要将某种模式匹配到的所有路由，都映射到同个组件上，这就需要在 vue-router 的路由路径中使用**动态路径参数**(dynamic segment) 。

如设置一个 User 组件，对于持有不同 id 的用户都需要用这个组件渲染访问到的页面，代码如下：

	const User = {
	  template: '<div>Welcome, User{{ $route.params.id }}</div>'
	}
	
	const router = new VueRouter({
	  routes: [
	    // 动态路径参数 以冒号开头
	    { path: '/user/:id', component: User }
	  ]
	})

/user/1 和 /user/2 都将映射到相同的路由，当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在组件内部使用。

在一个路由中可以设置多段“路径参数”，对应的值都会设置到 $route.params 中，如：

	{ path: '/user/:username/post/:post_id', component: User }

匹配路径为：

	/user/evan/post/123

$route.params 即为：

	{ username: 'evan', post_id: '123' }

#### 响应路由参数的变化

当使用路由参数时，例如从 /user/1 导航到 /user/2，原来的组件实例会被 **复用** 而不是销毁再创建，因为复用效率更高。但这也意味着组件的生命周期钩子只会被调用一次，之后就不会再被调用了。

基于此原因，要响应路由参数的变化，可以用 **watch** (监测变化) $route 对象（在组件中设置）：

	const User = {
	  template: '...',
	  watch: {
	    '$route' (to, from) {
	      // 对路由变化作出响应...
	    }
	  }
	}

或者采用 Vue2.2 中引入的 beforeRouteUpdate 导航守卫：

	const User = {
	  template: '...',
	  beforeRouteUpdate (to, from, next) {
	    // react to route changes...
	    // don't forget to call next()
	  }
	}

#### 捕获所有路由或 404 Not found 路由

常规参数只会匹配被 / 分隔的 URL 片段中的字符，如果想匹配任意路径，可以使用通配符 (*)：

	{
	  // 会匹配所有路径
	  path: '*'
	}
	{
	  // 会匹配以 `/user-` 开头的任意路径
	  path: '/user-*'
	}

一般含有通配符的路由需要放在最后，{ path: '*' }通常是用于匹配客户端 404 错误。

当使用一个通配符时，$route.params 内会自动添加一个名为 pathMatch 的参数，它包含了 URL 通过通配符（*）被匹配的部分：

	// 给出路由 { path: '/user-*' }
	this.$router.push('/user-admin')
	this.$route.params.pathMatch // 'admin'

	// 给出路由 { path: '*' }
	this.$router.push('/non-existing')
	this.$route.params.pathMatch // '/non-existing'

#### 匹配优先级

之前讲的都是不同路径匹配相同路由，而对于同一路径匹配不同路由，路由间存在匹配的优先级顺序，即哪个路由先定义就优先级高。

### 3. 命名路由

可以通过设置一个名称来标识一个路由，特别是在链接一个路由、或者是执行一些跳转、或者是需要使用到 params 属性时，需要通过 name 属性设置命名路由。

在新建一个 Router 实例时，在 routes 配置中给某个路由设置 name 名称：

	const router = new VueRouter({
	  routes: [
	    {
	      path: '/user/:userId',
	      name: 'user',
	      component: User
	    }
	  ]
	})

要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：

	<router-link :to="{ name: 'user', params: { userId: 123 } }">User</router-link>

等同于：

	router.push({ name: 'user', params: { userId: 123 } })

两种方法都会把路由导航到 /user/123 路径。

### 4. 重定向和别名

#### 重定向

重定向可以通过设置 routes 的 redirect 属性配置：

	// 绝对重定向，从 /a 重定向到 /b：
	const router = new VueRouter({
	  routes: [
	    { path: '/a', redirect: '/b' }
	  ]
	})

	// 重定向至一个命名路由：
	const router = new VueRouter({
	  routes: [
	    { path: '/a', redirect: { name: 'foo' } }
	  ]
	})

	// 通过一个方法动态返回重定向目标：
	const router = new VueRouter({
	  routes: [
	    { path: '/a', redirect: to => {
	      // 方法接收 目标路由 作为参数
	      // return 重定向的字符串路径/路径对象
	    }}
	  ]
	})
	// 具体的动态重定向例子：
	{ path: '/dynamic-redirect/:id?',
      redirect: to => {
        const { hash, params, query } = to
        if (query.to === 'foo') {
          return { path: '/foo', query: null }
        }
        if (hash === '#baz') {
          return { name: 'baz', hash: '' }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
      }
    }

	// 带 params 参数的重定向
	{ path: '/redirect-with-params/:id', redirect: '/with-params/:id' }

### 别名

别名表示 /a 和 /b 都指向同一路由匹配规则 /a:

	const router = new VueRouter({
	  routes: [
	    { path: '/a', component: A, alias: '/b' }
	  ]
	})

举一些具体例子：

	{ path: '/root', component: Root, alias: '/root-alias' },

	{ path: '/home', component: Home,
      children: [

        //绝对别名
        { path: 'foo', component: Foo, alias: '/foo' },

        // 相对别名 (alias to /home/bar-alias)
        { path: 'bar', component: Bar, alias: 'bar-alias' },

        // 设置多个别名
        { path: 'baz', component: Baz, alias: ['/baz', 'baz-alias'] },
      ]
    }

### 5. 嵌套路由

	<body>
	    <div id="app">
	        <router-link to='/account'>Account</router-link>
	
	        <router-view></router-view>
	    </div>

	    <template id='tmp1'>
	        <div>
	            <h1>这是Account 组件</h1>
				
				<!--嵌套路由-->
	            <router-link to='/account/login'>登陆</router-link>
	            <router-link to="/account/register">注册</router-link> 

	            <router-view></router-view>
	        </div>
	    </template>

	    <script>
	        var account = {
	            template: '#tmp1'
	        }
	        var login = {
	            template:'<h3>登陆</h3>'
	        }
	        var register = {
	            template:'<h3>注册</h3>'
	        }
	        var router = new VueRouter({
	            routes: [
	                {
	                    path:'/account', 
	                    component: account,
	                    children: [
	                        //以 / 开头的嵌套路径会被当作根路径，所以 path 属性不要带 / ，否则永远以根目录进行请求，这样不方便用户理解 URL
	                        {path:'login', component:login},
	                        {path:'register', component:register}
	                    ]
	                },
	                /*
	                    {path:'/account/login', component:login},
	                    {path:'/account/register', component:register}
	                */
	            ]
	        })
	        var vm = new Vue({
	            el: '#app',
	            router
	        })
	    </script>
	</body>

children 配置就是像 routes 配置一样的路由配置数组，所以可以设置路由的多层嵌套。

### 5. 路由组件传参

#### 路由组件传参的方式：

**1）query 方式传递参数**

    <div id="app">
        <!--在路由中使用查询字符串，给路由传递参数，不需要修改路由规则的path属性（默认模糊匹配）-->
        <router-link to='/login?id=10&name=哈哈'>
            登陆
        </router-link>

        <router-link to="/register">
            注册
        </router-link>
        <router-view></router-view>
    </div>
    

    <script>
        var login= {
            template: '<h1>登陆---{{$route.query.id}}---  {{$route.query.name}}</h1>',
            data(){
                return {
                }
            },
            created() { //组件也有生命周期钩子函数
                console.log(this.$route.query.id) 
            },
        }
        var register = {
            template: '<h1>注册</h1>'
        }
        var router = new VueRouter({
            routes: [
                { path: '/login', component: login },
                { path: '/register', component: register }
            ]
        })
        var vm = new Vue({
            el : '#app',
            router, 
        })    
    </script>

注意：

    <router-link to='/login?id=10&name=哈哈'>登陆</router-link>

等同于：

    <router-link :to="{path:'/login', query:{id: 10, name: '哈哈'}}">登陆</router-link>

**2）params 方式传递参数**

A. url 中显示参数 --- 在定义 path 路由路径时定义参数名和格式

    <div id="app">
        <!--如果在路由中使用查询字符串，给路由传递参数，则不需要路由规则的path属性-->
        <router-link to='/login/12/小王'>
            登陆
        </router-link>

        <router-link to="/register">
            注册
        </router-link>
        <router-view>

        </router-view>
    </div>


    <script>
        var login = {
            template: '<h1>登陆---{{$route.params.id}}---{{$route.params.name}}</h1>',
            data() {
                return {
                }
            },
            created() { //组件生命周期钩子函数
                console.log(this.$route.query.id)
            },
        }
        var register = {
            template: '<h1>注册</h1>'
        }

        var router = new VueRouter({
            routes: [
                { path: '/login/:id/:name', component: login },
                { path: '/register', component: register }
            ]
        })

        var vm = new Vue({
            el: '#app',
            router,
        })
    </script>

B. url 中不显示参数 --- 定义路由时设置 name 属性为路径添加别名

    <div id="app">
        <!--如果在路由中使用查询字符串，给路由传递参数，则不需要路由规则的path属性-->
        <router-link :to="{name:'login', params:{id:12, name:'小王'}}">
            登陆
        </router-link>

        <router-link to="/register">
            注册
        </router-link>
        <router-view>

        </router-view>
    </div>


    <script>
        var login = {
            template: '<h1>登陆---{{$route.params.id}}---{{$route.params.name}}</h1>',
            data() {
                return {
                }
            },
            created() { //组件生命周期钩子函数
                console.log(this.$route.query.id)
            },
        }
        var register = {
            template: '<h1>注册</h1>'
        }

        var router = new VueRouter({
            routes: [
				// 为路由添加 name 属性设置别名
                { path: '/login', name:'login', component: login },
                { path: '/register', component: register }
            ]
        })

        var vm = new Vue({
            el: '#app',
            router,
        })
    </script>

**注：**参数在 url 中显示存在安全隐患，不在 url 中会导致在刷新页面时传递的值丢失。

**3）$route.push() 方式传递参数**

	<li v-for="student in students" @click="getInfo(student.id)">

	var router = new VueRouter({
		routes: [
			// 设置 path 属性
			{ path: '/getInfo/:id', component: Information }
		]
	});

	var vm = new Vue({
		el: '#app',
		methods: {
			getInfo(id) {
				this.$router.push({
					path: `/getInfo/${id}`
				});
			}
		}
		router
	});


#### 路由和组件的解耦 --- props

由于 query 和 params 传参方式在组件中使用了 $route，会使组件与其对应路由形成高度耦合，降低了灵活性，因此可以使用使用 **props** 将组件和路由解耦。

**1）布尔模式**

    var login = {
        template: '<h1>登陆 {{$route.params.id}}</h1>',
    }
    var router = new VueRouter({
        routes: [
            { path: '/login/:id', component: login },
        ]
    })

可以通过 props 改造为：

    var login = {
		// 组件模板中设置
		props: ['id'],
        template: '<h1>登陆 {{ id }}</h1>',
    }
    var router = new VueRouter({
        routes: [
			// 路由中开启
            { path: '/login/:id', component: login, props: true },
        ]
    })

通过将 props 设置为 true，route.params 将会被设置为组件属性。

对于包含命名视图的路由，必须分别为每个命名视图添加 props 选项：

    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }

**2）对象模式**

> 如果 props 是一个对象，它会被按原样设置为组件属性,当 props 是静态的时候设置有用。

官方的解释我暂时没有看懂。

	const router = new VueRouter({
	  routes: [
	    { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
	  ]
	})

**3）函数模式**

> 可以创建一个函数返回 props。这样便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

	const router = new VueRouter({
	  routes: [
	    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
	  ]
	})

URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给 SearchUser 组件。

#### 参考文档：

[Vue路由传参的几种方式](https://blog.csdn.net/zhouzuoluo/article/details/81259298)

这篇文章提醒了我一个很重要的点，我自己平时写程序用的 mode 模式都是默认设置，常用的 mode 模式有两种：

1. hash 模式（默认），URL 上有 # 号，如 `http://localhost:8080/#/hi`，路由会监听 # 后面的信息变化进行路由匹配，hash 及后面的信息不会被包括在 HTTP 请求中，对后端完全没有影响，改变 hash 不会重新加载页面；

2. history 模式，URL 中没有 # 号，如 `http://localhost:8080/hi`，视觉上比较美观； history 模式在打包后的路由跳转需要服务器后端配合，是真实的服务器请求，否则就会接收到 404 页面。具体后端配置可以参考 [HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)。

可以在新建 VueRouter 时设置 **mode: 'history'** 进行模式的改变。

	const router = new VueRouter({
	  mode: 'history',
	  routes: [...]
	})

[官方文档-路由组件传参](https://router.vuejs.org/zh/guide/essentials/passing-props.html)

### 6. 命名视图

如果想在单页面同时同级显示多个视图，而非嵌套显示，可以使用命名视图，即为 router-view 设置 name 属性。可以在界面中拥有多个单独命名的视图，如果 router-view 没有设置名字，那么默认为 default。

	<router-view class="view one"></router-view>
	<router-view class="view two" name="a"></router-view>
	<router-view class="view three" name="b"></router-view>

对于同个路由中包含多个视图就需要多个组件，因此要使用 components 进行相关配置。

	const router = new VueRouter({
	  routes: [
	    {
	      path: '/',
	      components: {
	        default: Foo,
	        a: Bar,
	        b: Baz
	      }
	    }
	  ]
	})

看一个通过命名视图实现经典布局的案例，这里使用了 flex 弹性盒子布局：

	<head>
	    <style>
	        .header{
	            background-color: orange;
	            height: 80px;
	        }
	        .container{
	            display: flex; /*设置容器布局模式*/
	            height: 600px;
	        }
	        .left{
	            background-color: lightcoral;
	            flex: 2;  
	        }
	        .main{  
	            background-color: lightblue;
	            flex: 8; 
	        }
	        h1{
	            margin: 0;
	            padding: 0;
	            font-size: 10px;
	        }
	        html, body{
	            margin: 0;
	            padding: 0;
	        }
	    </style>
	</head>
	<body>
	    <div id="app">
	
	        <router-view></router-view>
	
	        <div class="container">
	            <router-view name='left'></router-view>
	            
	            <router-view name='main'></router-view>
	        </div>
	    </div>
	
	    <script>
	        var header = {
	            template: '<h1 class="header">header头部区域</h1>'
	        }
	        var leftBox = {
	            template: '<h1 class="left">Left侧边栏</h1>'
	        }
	        var mainBox = {
	            template: '<h1 class="main">mainBox头部区域</h1>'
	        }
	        
	        var router = new VueRouter({
	            routes: [
	                /*
	                {path: '/', component: header},
	                {path: '/left', component: leftBox},
	                {path: '/main', component:mainBox},
	                */
	                {path:'/', components: {
	                    'default': header,
	                    'left': leftBox,
	                    'main': mainBox
	                }}
	            ]
	        })
	        var vm = new Vue({
	            el: '#app',
	            router
	        })
	    </script>
	</body>

### 7. 路由懒加载

打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件就能提高效率。

路由懒加载采用了 Vue 的**异步组件**和 Webpack 的**代码分割功能**。

第一步，将异步组件定义为返回一个 Promise 的工厂函数：

	const Foo = () => Promise.resolve({ /* 组件定义对象 */ })

第二步，在 Webpack 2 中，可以使用动态 import语法来定义代码分块点 (split point)：

	import('./Foo.vue') // 返回 Promise

如果使用的是 Babel，则需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。

载入组件后，路由配置中就可以像往常一样使用 Foo 组件模块：

	const router = new VueRouter({
	  routes: [
	    { path: '/foo', component: Foo }
	  ]
	})

若想把某个路由下的所有组件都打包在**同个异步块** (chunk) 中。只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。【这里不太理解】

	const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
	const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
	const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')

Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。