# VUE 复习 - Level2 提升

---

## VUE 生命周期

对 Vue 实例生命周期的理解（包括对 React 实例生命周期的理解）都是非常重要的，这种理解会随着对这一框架的深入而更加透彻，但由于我学习程度还比较浅，这里只是做一个基本的复习理解。

### Vue 实例的生命周期图示

![Vue实例生命周期](https://cn.vuejs.org/images/lifecycle.png)

---

### 实例生命周期钩子

> 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。

> 在这个过程中会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

通过一串代码来看具体的生命周期钩子：

    var vm = new Vue(
        {
            el: '#app',
            data:{ 
				msg: 'ok'
			},
            methods: {
			    show(){
                    console.log('执行了')
                } 
			},

            beforeCreate() {
				//这是遇到的第一个生命周期函数
				console.log(this.msg)  //这时候 console 会显示 undefined
				this.show()   //this.show is not a method

				//注意在 beforeCreate 生命周期函数执行的时候，实例和生命周期被初始化了，但 data 和 methods 中的数据都还没有被初始化
            },
            created() {
                //这是遇到的第二个生命周期函数，在实例创建完成后被立即调用
                console.log(this.msg)
                this.show()
                //在created中，实例创建完毕，data ， methods ，watch/event 事件回调都已经初始化好了

                //如果要调用 methods 中的方法，最早只能在 created 中操作
                //这一阶段 el 还没有挂载，$el 不可用   
            },

            beforeMount() {
                //这是遇到的第3个生命周期函数，表示模板已经编译完成，但是尚未把模板渲染（挂载）到页面中去
                console.log(document.getElementById('h3').innerText)

                //在 beforeMount 执行的时候，页面中的元素没有被真正替换过来，只是之前的一些模板字符串
                
            },
            mounted() {
                //这是遇到的第四个生命周期函数，表示 内存 中的模板，已经真实的挂载到了浏览器的页面中，用户已经看到了渲染好的页面
				//此时 el 被新创建的 vm.$el 替换
                console.log(document.getElementById('h3').innerText)

                //注意：mounted 是实例创建中的最后一个生命周期函数，当执行完 mounted，实例就完全被创建好了
            },

            beforeUpdate() {
                console.log('界面上元素的内容'+document.getElementById('h3').innerText)
                console.log('data中的msg数据是'+this.msg)
            },
            updated() {
                console.log('界面上元素的内容' + document.getElementById('h3').innerText)
                console.log('data中的msg数据是' + this.msg)
                //该函数调用时组件 DOM 已经更新，页面和data数据已经保持一致了
            }，

			beforeDestroy() {
				//实例销毁之前调用,在这一步，实例仍然完全可用
			},
			destroyed() {
				//Vue 实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
			}
        }
    )

另外还有一些钩子函数：

activated & deactivated（与 keep-alive 组件相关）

errorCaptured（2.5.0+ 新增）：当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

**注意！！**

不要使用箭头函数来定义一个生命周期方法 ！！！（如 created: () => this.fetchTodos() 就是不可取的)

> 所有的生命周期钩子自动绑定 this 上下文到 vue 实例中，因此你可以访问数据，对属性和方法进行运算。但如果使用箭头函数来定义生命周期方法，箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到位置，经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。

---

## VUE 过滤器

过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示。

	<!-- 在双花括号中 -->
	{{ message | capitalize }}
	
	<!-- 在 `v-bind` 中 -->
	<div v-bind:id="rawId | formatId"></div>

创建过滤器有两种方式：全局过滤器和本地过滤器

1. 在创建 Vue 实例之前全局定义过滤器

		Vue.filter('capitalize', function (value) {
		  if (!value) return ''
		  value = value.toString()
		  return value.charAt(0).toUpperCase() + value.slice(1)
		})
		
		new Vue({
		  // ...
		})

2. 一个组件的选项中定义本地的过滤器

		var vm = new Vue({
			el: '#app',
			data: {},
			methods: {},
			filters: {
				'capitalize': function (value) {
					if (!value) return ''
					value = value.toString()
					return value.charAt(0).toUpperCase() + value.slice(1)
				}
			}
		})

上面的实例功能都是让单词首字母大写。

在上述实例中，capitalize 过滤器函数将会收到 message 的值作为第一个参数。过滤器函数总接收表达式的值 (如果是串联过滤器，则接收之前的操作链的结果) 作为第一个参数。

过滤器也可以串联：

	{{ message | filterA | filterB }}

其中 filterA 的结果会被传递到 filterB 中。

由于过滤器本身也是 javaScript 函数，因此也可以接收参数：

	{{ message | filterA('arg1', arg2) }}

但由于传入的 message 始终是第一个参数，所以普通字符串 'arg1' 是作为第二个参数，表达式 arg2 的值作为第三个参数。

---

## VUE 计算属性 computed

在模板中放入太多的逻辑会让模板过重且难以维护，所以对于任何复杂逻辑，都应当使用计算属性进行渲染。

类型：

	{ [key: string]: Function | { get: Function, set: Function } }

举一个简单地例子：

	<div id="app">
	  <p>原始字符串: {{ message }}</p>
	  <p>计算后反转字符串: {{ reversedMessage }}</p>
	</div>
	 
	<script>
	var vm = new Vue({
	  el: '#app',
	  data: {
	    message: '123456'
	  },
	  computed: {
	    // 计算属性的 getter
	    reversedMessage: function () {
	      // `this` 指向 vm 实例
	      return this.message.split('').reverse().join('')
	    }
	  }
	})
	</script>

实例中声明了一个计算属性 reversedMessage，提供的函数将用作属性 vm.reversedMessage 的 **getter**。

在本例中，vm.reversedMessage 依赖于 vm.message，在 vm.message 发生改变时，vm.reversedMessage 也会更新。

### computed vs methods

**在这里需要声明的是，针对依赖的同一个响应式属性，计算结果会进行缓存，直至依赖的响应式属性发生改变才会重新求值。**这也是 computed 和 methods 最大的不同，methods ，在重新渲染的时候，函数总会重新调用执行。

用一个实例解释就是：

	<div id="app">
		<p>原始字符串: {{ message }}</p>
		<p>computed反转字符串: {{ reversedMessage }}</p>
		<p>computed反转字符串: {{ reversedMessage }}</p>
		<p>methods反转字符串: {{ reversedMessage2() }}</p>
		<p>methods反转字符串: {{ reversedMessage2() }}</p>
	</div>
	<script>
	var cnt=1;
	var vm = new Vue({
		el: '#app',
		data: {
			message: '123456'
		},
		computed: {
		// 计算属性的 getter
			reversedMessage: function () {
				// `this` 指向 vm 实例
				cnt+=1;
				return cnt+' '+this.message.split('').reverse().join('')
			}
		},
		methods: {
			reversedMessage2: function () {
				cnt+=1;
				return cnt+' '+this.message.split('').reverse().join('')
			}
		}
	})
	</script>

得到的结果是：

	原始字符串: 123456
	
	computed反转字符串: 2 654321
	
	computed反转字符串: 2 654321
	
	methods反转字符串: 3 654321
	
	methods反转字符串: 4 654321

也就是说，在使用 reversedMessage 这个计算属性的时候，第一次会执行代码，得到一个值并缓存，以后再使用 reversedMessage 这个计算属性，因为依赖属性没有发生改变，于是界面渲染就直接用这个值，不再重复执行代码；而 reversedMessage2 没有缓存，只要调用一次，函数代码就执行一次，于是每次返回值都不一样。

### computed setter

computed 属性默认只有 **getter**（对依赖的响应式属性不会造成影响） ，不过在需要时也可以提供一个 setter。

	computed: {
	  fullName: {
	    // getter
	    get: function () {
	      return this.firstName + ' ' + this.lastName
	    },
	    // setter
	    set: function (newValue) {
	      var names = newValue.split(' ')
	      this.firstName = names[0]
	      this.lastName = names[names.length - 1]
	    }
	  }
	}

此时再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。

---

## VUE 监听属性 watch

类型：

	{ [key: string]: string | Function | Object | Array }

VUE 可以通过 watch 实现数据侦听，响应数据的变化，当需要在数据变化时执行**异步操作**或开销较大的操作时，watch 非常有用。

watch 本质是一个对象，键是需要观察的表达式，值是对应回调函数（ function(newValue, oldValue){} )，或方法名，或包含选项的对象。Vue 实例将会在**实例化时**调用 $watch()，遍历 watch 对象的每一个属性。

事件侦听除了使用 watch 对象，还可以采用 vm.$watch( expOrFn, callback, [options] ) 方法，用下面一个千米和米单位换算的实例讲解两种事件侦听方法。

	<div id = "app">
	    千米 : <input type = "text" v-model = "kilometers">
	    米 : <input type = "text" v-model = "meters">
	</div>
	<p id="info"></p>

	<script type = "text/javascript">
	    var vm = new Vue({
	    el: '#app',
	    data: {
	        kilometers : 0,
	        meters:0
	    },
	    methods: {
	    },
	    computed :{
	    },
	    watch : {
	        kilometers: function(val) {
	            this.kilometers = val;
	            this.meters = this.kilometers * 1000
	        },
	        meters : function (val) {
	            this.kilometers = val/ 1000;
	            this.meters = val;
	        }
	    }
	    });

	    // $watch 是一个实例方法
	    vm.$watch('kilometers', function (newValue, oldValue) {
	    // 这个回调将在 vm.kilometers 改变后调用
	    document.getElementById ("info").innerHTML = "修改前值为: " + oldValue + "，修改后值为: " + newValue;
	})
	</script>

事件侦听一个非常重要的作用就是可以执行**异步操作**，这里摘录[官网](https://cn.vuejs.org/v2/guide/computed.html)的一个非常有意思的例子，注意这里用了 [axios](https://www.kancloud.cn/yunye/axios/234845) 实现异步接口。

案例中使用 watch 选项执行异步操作 (访问一个 API)，限制用户执行该操作的频率，并在得到最终结果前，设置中间状态，这些都是计算属性无法做到的。

	<div id="watch-example">
	  <p>
	    Ask a yes/no question:
	    <input v-model="question">
	  </p>
	  <p>{{ answer }}</p>
	</div>

	<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
	<script>
	var watchExampleVM = new Vue({
	  el: '#watch-example',
	  data: {
	    question: '',
	    answer: 'I cannot give you an answer until you ask a question!'
	  },
	  created: function () {
	    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
	    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
	    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
	    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
	    // 请参考：https://lodash.com/docs#debounce
	    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
	  },
	  watch: {
	    // 如果 `question` 发生改变，这个函数就会运行
	    question: function (newQuestion, oldQuestion) {
	      this.answer = 'Waiting for you to stop typing...'
	      this.debouncedGetAnswer()
	    }
	  },
	  methods: {
	    getAnswer: function () {
	      if (this.question.indexOf('?') === -1) {
	        this.answer = 'Questions usually contain a question mark. ;-)'
	        return
	      }
	      this.answer = 'Thinking...'
	      var vm = this
	      axios.get('https://yesno.wtf/api')
	        .then(function (response) {
	          vm.answer = _.capitalize(response.data.answer)
	        })
	        .catch(function (error) {
	          vm.answer = 'Error! Could not reach the API. ' + error
	        })
	    }
	  }
	})
	</script>

---

## VUE 组件

组件是 Vue.js 最重要的功能之一。

简单来说，组件就是拥有自己名字的可复用的 Vue 实例，组件可以扩展 HTML 元素，封装可重用的代码，再通过独立可复用的小组件来构建大型应用。

### 注册组件的方式

注意：无论用哪种方式创建出来的组件，组建的template属性指向的模板内容，必须**有且只有唯一**的一个根元素(div)！！！

### 1.全局组件注册

	Vue.component(tagName, options)

所有实例都可以通过 <tagName></tagName> 来调用全局组件。（注意驼峰格式要转为短横线格式）

全局组件注册实例：

	<div id="app">
        <!--如果要使用组件，直接把组件的名称，以HTML的形式引入到页面中即可}-->
        <!--注意如果用驼峰形式的命名， 要用横杠并取消大写-->
        <my-com1></my-com1>

		<mycom2></mycom2>

		<mycom3></mycom3>

		<button-counter></button-counter>
    </div>

	<template id="temp1">
        <div>
            <h1>这是在外部定义的组件结构</h1>
        </div>
    </template>

	<script>
		// 方法 1
		// 使用Vue.extend来创建全局的Vue组件
		var com1 = Vue.extend({
			template: '<h3>this is a h3</h3>' //通过template属性，指定组件要展示的HTML结构
		});
		// Vue.component('myCom1', com1);
	
		// 方法 2 
		// 合写
	    Vue.component('myCom1', Vue.extend({
	        template: '<h3>This is a h3</h3>'
	    }))；
		
		// 方式 3 
		// 不采用 Vue.extend 直接用对象字面量注册
		Vue.component('mycom2',{
            template: '<h3>这是直接用Vue,component创建出来的组件</h3><span></span>'
        })

		// 方式 4
		// 在外部定义组件结构
		Vue.component('mycom3', {
			template: '#temp1'
		})

		// 组件内部也可以有数据 data 属性
		Vue.component('button-counter', {
			data: function () {
				return {
					count: 0
				}
			},
			template: '<button @click="count++">You clicked me {{ count }} times.</button>'
		});
		

        var vm = new Vue({
            el:'#app',
            data:{},
            methods: {},
        })
	</script>

### 2.私有组件（局部组件）注册

私有组件在实例中注册，只能在该实例中使用。

    <div id="app">
        <mylogin></mylogin>
    </div>
  
    <template id="temp">
        <h1>这是个私有的组件 </h1>
    </template>

	<script>
		var vm = new Vue({
			el: '#app',
			data: {},
			methods: {},
			components: {
				// 定义私有组件
				mylogin： {
					template: '#temp'
				}
			}
		});
	</script>

### 组件内部的 data（必须为函数）

组件内部也可以有自己的 data 数据，如上文注册的计数器组件实例：

	Vue.component('button-counter', {
		data: function () {
			return {
				count: 0
			}
		},
		template: '<button @click="count++">You clicked me {{ count }} times.</button>'
	});

注意：组件的 data 必须是一个 **function 函数**，数据作为**对象**被**返回**，这样的话每个实例都可以维护自己的独立的数据。（函数作用域）

如果直接提供一个对象，如：

	data: { count: 0 }

这样的话不同实例数据就会互相影响，一个实例中的 count 改变，其他实例中也会跟着改变。

### 父组件->子组件（重点&难点）

### 1. 父组件向子组件传值

prop 是父组件用来传递数据的一个自定义属性，当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。

父组件的数据需要通过 props 把数据传给子组件，子组件需要显式地用 props 选项声明 "prop"。

一个简单的例子：

	<div id="app">
		<!--父组件把数据作为一个自定义特性传递给子组件-->
		<child message="hello!"></child>
	</div>
	
	<script>
	// 注册
	Vue.component('child', {
		// 声明 props
		props: ['message'],
		// 同样也可以在 vm 实例中像 “this.message” 这样使用
		template: '<span>{{ message }}</span>'
	})
	// 创建根实例
	new Vue({
	  	el: '#app'
	})
	</script>

一个稍微复杂点的例子(v-bind 动态绑定 props 的值到父组件的数据中)

	<div id="app">
		<!--父组件也可以在引用子组件的时候，通过属性绑定（v-bind）的形式，把需要传递给子组件的数据传递到子组件内部-->
		<child :parentmsg="msg"></child>
	</div>
	
	<script>
	// 注册
	Vue.component()
	// 创建根实例
	var vm = new Vue({
	  	el: '#app',
		data: {
			msg: '父组件中的数据'
		},
		components: {
			'child': {
				// 子组件中，默认无法访问到父组件中的data和methods
				template: '<h1 @click="change"> 这是子组件 {{ parentmsg }}</h1>',

				//组件中的所有props中的数据都是通过父组件传递给子组件的
                //propes中的数据只读
				props: ['parentmsg'],

				//注意子组件中的 data 数据，并不是通过父组件传递过来的，而是子组件自有的，比如：子组件通过Ajax请求回来的值，可以放到data中
                // data 中的数据可读可写
                data(){
                    return {
                        title: '123',
                        content: 'qqq'
                    }
                },
                methods: {
                    change(){
                        this.parentmsg='被修改'
                    }
                }
			}
		}
	})
	</script>

prop 是单向绑定的。

### 2. 父组件向子组件传方法

子组件使用 $emit(eventName) 触发父组件的事件方法。

父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。

	<div id="app">
		<div id="counter-event-example">
			<p>{{ total }}</p>
			
			// 父组件采用 v-on（@）监听子组件触发的事件
			// v-on:子组件触发的事件=事件触发后调用的回调函数
			<button-counter @increment="incrementTotal"></button-counter>
			<button-counter @increment="incrementTotal"></button-counter>
		</div>
	</div>
	
	<script>
	Vue.component('button-counter', {
		// 点击子组件会触发子组件自身的事件
		template: '<button v-on:click="incrementHandler">{{ counter }}</button>',
		data: function () {
			return {
				counter: 0
			}
		},
		methods: {
			incrementHandler: function () {
				this.counter += 1
			 
				// 子组件在自身事件中通过 $emit 触发了父组件方法
				this.$emit('increment')
			}
		},
	})
	new Vue({
		el: '#counter-event-example',
		data: {
			total: 0
		},
		methods: {
			incrementTotal: function () {
			  this.total += 1
			}
		}
	})

子组件通过 $emit 触发父组件的方法时，如果需要传递参数，可在方法名后面加参数数组。比如 $emit("FunctionName") 当要传递参数时 ：$emit("FunctionName",[arg1,arg2...])。


### 组件切换的方式

### 方式1 v-if/v-else & 标志位

	<div id="app">
		<a href="#" @click.prevent="flag=true">Login</a>
		<a href="#" @click.prevent="flag=false">Sign Up</a>
	
		<login v-if="flag"></login>
		<signup v-else="flag"></signup>
	</div>
	
	<script>
		Vue.component('login', {
			template: '<h3>登陆组件</h3>'
		});
		Vue.component('signup', {
			template: '<h3>注册组件</h3>'
		});
	
	    var vm = new Vue(
	        {
	            el:'#app',
	            data: {
	                flag:'ture'
	            },
	            methods: {
	                
	            },
	        }
	    )
	</script>

### 方式2 component 动态组件

	<div id="app">
		<a href="#" @click.prevent="comName='login'">Login</a>
		<a href="#" @click.prevent="comName='signup'">Sign Up</a>
	
		<!--采用Vue提供的元素来展示对应名称的组件 -->
        <!--component是一个占位符， :is属性可以用来指定要展示的组件的名称 -->
		<component :is="comName"></component>
	</div>
	
	<script>
		Vue.component('login', {
			template: '<h3>登陆组件</h3>'
		});
		Vue.component('signup', {
			template: '<h3>注册组件</h3>'
		});
	
	    var vm = new Vue(
	        {
	            el:'#app',
	            data: {
	                comName: 'login'
	            },
	            methods: {
	                
	            },
	        }
	    )
	</script>

官方解释：

> 用法：

> 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。

	<!-- 动态组件由 vm 实例的属性值 `componentId` 控制 -->
	<component :is="componentId"></component>
	
	<!-- 也能够渲染注册过的组件或 prop 传入的组件 -->
	<component :is="$options.components.child"></component>

component 动态组件还可以用于多标签的页面切换等。

**注：** component 动态组件是 VUE 的内置组件，其他内置组件还有 transition、transition-group（动画）、keep-alive 和 slot。





