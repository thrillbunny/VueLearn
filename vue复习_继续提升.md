# VUE 复习 - Level3 继续提升

---

## VUE 过渡/动画

> Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。
包括以下工具：

> + 在 CSS 过渡和动画中自动应用 class
> + 可以配合使用第三方 CSS 动画库，如 Animate.css
> + 在过渡钩子函数中使用 JavaScript 直接操作 DOM
> + 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

### 单组件过渡

采用 transition 封装包裹单组件过渡，在下列情形中，可以给任何元素和组件添加进入/离开过渡:

+ **条件渲染** (使用 v-if)
+ **条件展示** (使用 v-show)
+ **动态组件**
+ **组件根节点**

看下面这个简单的例子：

	<head>
	    <style>
	        /*
	        v-enter 【时间点】是进入之前，元素的起始状态，此时还没有开始进入
	        v-leave-to  【时间点】是动画离开之后离开的终止状态，此时元素的动画已经结束了
	        */
	        .v-enter,
	        .v-leave-to{
	            opacity: 0;
	            transform: translateX(180px); /*位移*/
	        }

	        /*
	        v-enter-active 【入场动画的时间段】
	        v-leave-active 【离场动画的时间段】
	        */
	        .v-enter-active,  
	        .v-leave-active{
	            transition: all .4s ease;
	           
	        }
	    </style>
	</head>
	
	<body>
	   
	    <div id="app">
	        <!--需求:点击按钮，让h3显示，再点击让h3隐藏-->

	        <!--1 使用 transition元素把需要被动画控制的元素包裹起来-->

	        <!--2 自定义两种样式，来控制transition内部的元素实现动画-->

	        <input type="button" value="toggle" @click="flag=!flag">

	        <br><br>

	        <transition> 
	        	<h3 v-if="flag">This is a h3</h3>
	        </transition>
	    </div>
	    
	    <script>
	        var vm = new Vue(
	            {
	                el: '#app',
	                data: {
	                    flag: true
	                },
	                methods: {

	                },
	            }
	        )
	    </script>
	</body>

### 过渡类名

过渡其实就是个淡入淡出的效果，在进入/离开的过渡中，会有 6 个 class 切换：

1. v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。（时间点）

2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。（定义入场动画，时间段）

3. v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。（时间点）

4. v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。（时间点）

5. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。（定义离场动画，时间段）

6. v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。（时间点）

![过渡类名图示](http://www.runoob.com/wp-content/uploads/2018/06/transition.png)

（实际使用中两头的时间点和两个时间段比较重要）

对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 < transition >，则 v- 是这些类名的默认前缀。

如果你使用了 < transition name="my-transition" >，那么相应的默认前缀就会被替换，如 v-enter 会替换为 my-transition-enter。

通过设置 transition 的 name 属性，可以实现自定义过渡/动画前缀。

### CSS 过渡和 CSS 动画

### 1. CSS 过渡

通常使用 CSS 过渡来实现过渡效果，如上文中案例：

    <style>
        .v-enter,
        .v-leave-to{
            opacity: 0;
            transform: translateX(180px); /*位移*/
        }

        .v-enter-active,  
        .v-leave-active{
            transition: all .4s ease;
           
        }
    </style>

**CSS中的 transform 与 transition：**

**transfrom-** 转换，对元素进行:

+ 移动 translate(50px,20px)
+ 缩放 scale(1.5, 0.8)(宽度变为原来的1.5倍，高度变为原来的0.8倍)
+ 旋转 rotate(20deg)(顺时针旋转20度）
+ 翻转 根据水平线（X 轴）和垂直线（Y 轴）翻转给定的角度 skew(20deg, 20deg);（围绕 X 轴把元素翻转20度，围绕 Y 轴翻转20度）

**transition-** 过渡，元素从一种样式逐渐改变为另一种的效果（也就是 transform 中间的过程）

### 2. CSS 动画

CSS 动画用法类似 CSS 过渡，但是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 **animationend 事件触发时**删除。

	<style>
		.bounce-enter-active {
		  animation: bounce-in .5s;
		}
		.bounce-leave-active {
		  animation: bounce-in .5s reverse;
		}
		@keyframes bounce-in {
		  0% {
		    transform: scale(0);
		  }
		  50% {
		    transform: scale(1.5);
		  }
		  100% {
		    transform: scale(1);
		  }
		}
	</style>

	<body>
		<div id="app">
	  		<button @click="show = !show">Toggle show</button>
	  		<transition name="bounce">
	    		<p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
	  		</transition>
		</div>
	
		<script>
		var vm = new Vue({
			el: '#app'
			data: {
				show: true
			}
		});
		</script>
	</body>

通过 @keyframes 规则，可以创建动画。

@keyframes 以百分比来规定改变发生的时间，或者通过关键词 "from" 和 "to"，等价于 0% 和 100%。0% 是动画的开始时间，100% 动画的结束时间。

目前浏览器都不支持 @keyframes 规则。

Firefox 支持替代的 @-moz-keyframes 规则。
Opera 支持替代的 @-o-keyframes 规则。
Safari 和 Chrome 支持替代的 @-webkit-keyframes 规则。

### 3. css动画-使用第三方类

举例与第三方库 [animate.css](https://daneden.github.io/animate.css/) 结合。

	<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
	
	<div id="example-3">
		<button @click="show = !show">
			Toggle render
		</button>
		<transition
			name="custom-classes-transition"
			enter-active-class="animated tada"
			leave-active-class="animated bounceOutRight"
			:duration="{enter:400, leave:400}
		>
			<p v-if="show">hello</p>
		</transition>
	</div>

	<script>
	new Vue({
			el: '#example-3',
			data: {
			show: true
		}
	})
	</script>

这里采用了**自定义过渡类名**，它们的优先级高于普通的类名：

+ enter-class

+ enter-active-class

+ enter-to-class (2.1.8+)

+ leave-class

+ leave-active-class

+ leave-to-class (2.1.8+)

上文例子中还使用了 duration 属性定制了显示的过渡持续时间（毫秒）(需要用 v-bind 绑定）：

	<transition :duration="1000">...</transition>

同时也可以定制进入和移除的持续时间：

	<transition :duration="{ enter: 500, leave: 1000 }">...</transition>

### JS 钩子函数实现动画

钩子函数用 v-on 进行事件绑定。

HTML 代码：

	<transition
		v-on:before-enter="beforeEnter"
		v-on:enter="enter"
		v-on:after-enter="afterEnter"
		v-on:enter-cancelled="enterCancelled"
	
		v-on:before-leave="beforeLeave"
		v-on:leave="leave"
		v-on:after-leave="afterLeave"
		v-on:leave-cancelled="leaveCancelled"
	>
		<!-- ... -->
	</transition>

JavaScript 代码：

	// ...
	methods: {
	  // --------
	  // 进入中
	  // --------
	 
	  beforeEnter: function (el) {
	    // ...
	  },
	  // 此回调函数是可选项的设置
	  // 与 CSS 结合时使用
	  enter: function (el, done) { // 注意这里的参数
	    // ...
		
		// 这里的done，其实就是aftereEnter这个函数
	    done()
	  },
	  afterEnter: function (el) {
	    // ...
	  },
	  enterCancelled: function (el) {
	    // ...
	  },
	 
	  // --------
	  // 离开时
	  // --------
	 
	  beforeLeave: function (el) {
	    // ...
	  },
	  // 此回调函数是可选项的设置
	  // 与 CSS 结合时使用
	  leave: function (el, done) {
	    // ...


	    done()
	  },
	  afterLeave: function (el) {
	    // ...
	  },
	  // leaveCancelled 只用于 v-show 中
	  leaveCancelled: function (el) {
	    // ...
	  }
	}

这些钩子函数可以结合 CSS transitions/animations 使用，也可以单独使用。

当只用 JavaScript 过渡的时候，在 enter 和 leave 中**必须使用 done 进行回调**。否则，它们将被同步调用，过渡会立即完成。

看一个钩子函数实现小球半场动画的例子：

	<head>
	    <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
	    <title>钩子函数实现小球半场动画</title>
	    <style>
	        .ball {
	            width: 15px;
	            height: 15px;
	            border-radius: 50px;
	            background-color: red;
	        }
	    </style>
	</head>
	
	<body>
	    <div id="app">
	        <input type="button" value="快到碗里来" @click="flag=!flag">
	
	        <transition 
	        @before-enter="beforeEnter"
	        @enter="enter"
	        @after-enter="afterEnter">
	            <div class="ball" v-show="flag"></div>
	        </transition>
	    </div>
	
	    <script>
	        var vm = new Vue({
	            el: '#app',
	            data: {
	                flag: false
	            },
	            methods: {
	                // 动画钩子函数的第一个参数:el表示要执行动画的那个DOM元素
	                // 可以认为el是通过document.getElementById()得到的
	                beforeEnter(el) {
	                    // 设置小球的起始位置
	                    el.style.transform="translate(0, 0)";
	                },
	                enter(el, done) {
	                    el.offsetWidth; // 这句话没有实际的作用,是为了强制动画刷新实现移动效果
	
	                    // 设置小球的终点位置
	                    el.style.transform="translate(200px, 300px)";
	                    // 设置小球的过渡状态
	                    el.style.transition="all ease 1s";
	
	                    // 这里的done，其实就是aftereEnter这个函数
	                    done();
	                },
	                afterEnter() {
	                    this.flag = false;
	                }
	            }
	        });
	    </script>
	</body>

推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

### 初始渲染的过渡

可以通过 appear 特性设置节点在初始渲染的过渡：

	<transition appear>
		<!--...-->
	</transition>

同样也可以自定义 CSS 类名:

	<transition
	  appear
	  appear-class="custom-appear-class"
	  appear-to-class="custom-appear-to-class" (2.1.8+)
	  appear-active-class="custom-appear-active-class"
	>
	  <!-- ... -->
	</transition>

也可以自定义 JavaScript 钩子：

	<transition
	  appear
	  v-on:before-appear="customBeforeAppearHook"
	  v-on:appear="customAppearHook"
	  v-on:after-appear="customAfterAppearHook"
	  v-on:appear-cancelled="customAppearCancelledHook"
	>
	  <!-- ... -->
	</transition>

### 多元素过渡（区别于多组件过渡）

对于原生标签可以使用 **v-if/v-else** 实现多元素过渡。

最常见的多标签过渡是一个列表和描述这个列表为空消息的元素：

	<transition>
		<table v-if="items.length > 0">
			<!--...-->
		</table>
		<p v-else>Sorry, no items found!</p>
	</transition>

对于采用同种标签的元素切换时，需要通过 **key** 特性设置唯一的值来标记，以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容，如：

	<transition>
		<button v-if="isEditing" key="save">
			Save
		</button>
		<button v-else key="edit">
			Edit
		</button>
	</transition>

上例也可以重写为：

	<transition>
		<button v-bind:key="isEditing">
			{{ isEditing ? 'Save' : 'Edit' }}
		</button>
	</transiton>

使用**多个 v-if** 的多个元素的过渡可以重写为绑定了动态属性（v-bind & computed）的单个元素过渡，如：

	<transition>
	  <button v-if="docState === 'saved'" key="saved">
	    Edit
	  </button>
	  <button v-if="docState === 'edited'" key="edited">
	    Save
	  </button>
	  <button v-if="docState === 'editing'" key="editing">
	    Cancel
	  </button>
	</transition>

可以重写为：

	<transition>
		<button v-bind:key="docState">
			{{ buttonMessage }}
		</button>
	</transiton>

	// ...
	computed: {
		buttonMessage: function() {
			switch(this.docState) {
				case 'saved': return 'Edit'
				case 'edited': return 'Save'
				case 'editing': return 'Cancel'
			}
		}
	}

### 多组件过渡

多个组件的过渡简单很多，不需要使用 key 特性，只需要使用**component 动态组件**（具体见前一章），然后用 transition 包裹并设置相应的 css 动画：

HTML 动画组件（部分）：

	<transition name="component-fade" mode="out-in">
	  <component v-bind:is="view"></component>
	</transition>

JS：

	new Vue({
	  el: '#transition-components-demo',
	  data: {
	    view: 'v-a'
	  },
	  components: {
	    'v-a': {
	      template: '<div>Component A</div>'
	    },
	    'v-b': {
	      template: '<div>Component B</div>'
	    }
	  }
	})

CSS动画：

	.component-fade-enter-active, .component-fade-leave-active {
	  transition: opacity .3s ease;
	}
	.component-fade-enter, .component-fade-leave-to
	/* .component-fade-leave-active for below version 2.1.8 */ {
	  opacity: 0;
	}

### 过渡模式

<transition> 的默认行为：进入和离开**同时**发生。

当使用多元素或多组件过渡时很容易导致过渡动画僵硬，往往一个元素还没有离开，另一个元素就进来了，这不能满足实际的需求。为了使同时生效的进入和离开的过渡显得更加平滑，VUE 提供了过渡模式，包括：

+ in-out：新元素先进行过渡，完成之后当前元素过渡离开

+ out-in: 当前元素先进行过渡，完成之后新元素过渡进入（先出后进）

	<transition name="fade" mode="out-in">
	  <!-- ... the buttons ... -->
	</transition>

### 列表过渡 transition-group

先前讲的都是对**单个节点**或者**同一时间渲染多个节点中的一个**，如果需要同时渲染整个列表，需要使用 < transition-group > 组件。

< transition-group >组件有如下特点：

1. 不同于 < transition >，它会以一个真实元素呈现,默认为< span >，也可以通过 tag 特性更换为其他元素，如设置 tag="ul"，transition-group就会被渲染成ul元素；

2. 过渡模式（mode="out-in"/"in-out"）不可用；

3. 内部元素 **总是需要** 提供唯一的 **key** 属性值。

### 1. 列表的进入/离开过渡

举一个简单的例子说明：

	<head>
	    <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
	    <style>
	        .list-item {
	            display: inline-block;
	            margin: 10px;
	        }
	
	        /*过渡动画*/
	        .v-enter, .v-leave-to {
	            opacity: 0;
	            transform: translateY(30px);
	        }
	        .v-enter-active, .v-leave-active {
	            transition: all 0.5s ease;
	        }
	    </style>
	</head>
	<body>
	    <div id="app">
	        <button @click="add">Add</button>
	        <button @click="remove">Remove</button>
	        <!--通过给transition-group标签tag属性指定将来transition-group渲染成什么元素-->
	        <!--给transition-group添加apper属性，实现入场时侯的效果-->
	        <transition-group tag="p" appear>
	            <!--如果要为v-for创建的元素设置动画，必须为每一个元素设置 :key属性-->
	            <span v-for="item in items" :key="item" class="list-item">
	                {{ item }}
	            </span>
	        </transition-group>
	    </div>
	
	    <script>
	        var vm = new Vue({
	            el: '#app',
	            data: {
	                items: [1,2,3,4,5,6,7,8,9],
	                nextNum: 10
	            },
	            methods: {
	                randomIndex() {
	                    return Math.floor( Math.random() * this.items.length );
	                },
	                add() {
	                    this.items.splice(this.randomIndex(), 0, this.nextNum++);
	                },
	                remove() {
	                    this.items.splice(this.randomIndex(), 1);
	                }
	            }
	        });
    	</script>
	</body>

这个例子有个问题，当添加和移除元素的时候，周围的元素会瞬间移动到他们的新布局的位置，而不是平滑的过渡。

### 2. 列表的排序过渡

transition-group 不仅可以实现进入和离开动画，还可以改变定位。实现这一功能需要采用新增的 **v-mode** 特性。

**v-mode** 特性会在元素的改变定位的过程中应用。

	v-move {/*transition*/}

像之前的类名一样，可以通过 name 属性来自定义前缀，也可以通过 move-class 属性手动设置。 

	<span move-class='***'>

v-move 对于设置过渡的切换时机和过渡曲线非常有用。

实现列表的平滑过渡有两种方法：

1. 设置 v-move 类和 CSS transition 属性；

2. 给列表的所有元素都添加一个类，直接给这个类设置 CSS transition属性，元素移动的时候**自动获得** v-move。

对于上文的例子，用 splice 删除数组的元素，由于被删除的元素在过渡时始终占据文档流的这个位置，因此下一个元素要等待其过渡消失后再移动过来，造成一个生硬的效果。

要达到平滑过渡，就要在删除元素 **leave-active 阶段**用**position:absolute 将其移出文档流**，后面的元素才能同时平滑过渡过来。

上文实例可以改进为：

	<head>
	    <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
	    <style>
	        .list-item {
	            display: inline-block;
	            margin: 10px;

				/*可以在 v-enter-active 和 v-move 中分别用transition 过渡，也可以在包裹所有元素的大类中用transition*/
	            transition: all 1s;
	        }
	
	        /*过渡动画*/
	        .v-enter, .v-leave-to {
	            opacity: 0;
	            transform: translateY(30px);
	        }
			/*被删除元素在离开过程中脱离正常文本流*/
	        .v-leave-active {
	            position: absolute;
	        }
	    </style>
	</head>
	<body>
	    <div id="app">
	        <button @click="shuffle">Shuffle</button>
	        <button @click="add">Add</button>
	        <button @click="remove">Remove</button>
	        <!--通过给transition-group标签tag属性指定将来transition-group渲染成什么元素-->
	        <!--给transition-group添加apper属性，实现入场时侯的效果-->
	        <transition-group tag="p" appear>
	            <!--如果要为v-for创建的元素设置动画，必须为每一个元素设置 :key属性-->
	            <span v-for="item in items" :key="item" class="list-item">
	                {{ item }}
	            </span>
	        </transition-group>
	    </div>
	
	    <script>
	        var vm = new Vue({
	            el: '#app',
	            data: {
	                items: [1,2,3,4,5,6,7,8,9],
	                nextNum: 10
	            },
	            methods: {
	                randomIndex() {
	                    return Math.floor( Math.random() * this.items.length );
	                },
	                add() {
	                    this.items.splice(this.randomIndex(), 0, this.nextNum++);
	                },
	                remove() {
	                    this.items.splice(this.randomIndex(), 1);
	                },
	                shuffle() {
	                    this.items = _.shuffle(this.items);
	                }
	            }
	        });
	    </script>
	</body>
	</html>

### 过渡的复用

过渡可以通过 Vue 的组件系统实现复用。要创建一个可复用过渡组件，就是将 < transition > 或者 < transition-group > 作为根组件，然后将任何子组件放置在其中。


---




