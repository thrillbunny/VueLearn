# VUE 复习 - Level1 基础


# VUE.js 主要功能

1. 模块化/组件化
2. 模板渲染
3. 拓展功能，如路由、AJAX、数据流管理

---

# VUE 属性

1. 用户自定义属性，挂载到 data 对象中
2. VUE 实例属性，有前缀 $ ,举例说明

	var data = {
		test: '测试 Vue 实例属性'
	}

	var vm = new Vue({
		el: '#app', 
		data: data
	});

	document.write(vm.test === data.test); // true

	document.write(vm.$data === data); // true
	document.write(vm.$el === document.getElementById('app')); // true

---

# VUE 基础指令

## v-cloak

> 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

示例：

	/* CSS */
	[v-cloak] {
		display: none;
	}
	
	// JS
	<div v-cloak>
		{{ message }}
	</div>

不会显示，直到编译结束。

注意：

1. Vue1 中，允许将 Vue 实例挂载在 body 上，而 Vue2 是不允许的，想对整个页面实例化，需要另外用一个 div 来容纳整个页面内容，对其进行实例化；

2. 通过 @import 来加载的 css 文件，@import 是在页面 DOM 完全载入后才会进行加载，如果我们将 [v-cloak] 写在 @import 加载的 css 文件中，就会导致页面仍旧闪烁；为了避免这种情况，可以将 [v-cloak] 写在 **link 引入**的 css 中，或者写一个**内联 css** 样式，这样就得到了解决。

## 插值表达式{{}}，v-text，v-html

v-text 和 v-html 会覆盖元素中原本的内容，但是插值表达式{{}}只会替换自己的占位符不会把整个内容清空

> 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。只在可信内容上使用 v-html，永不用在用户提交的内容上。

## v-bind 属性绑定, v-on 事件处理器（非常重要）

v-bind，属性绑定机制,缩写为：，v-bind 会把引号中的内容当成表达式

> 动态地绑定一个或多个特性，或一个组件 prop 到表达式；在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象；在绑定 prop 时，prop 必须在子组件中声明；没有参数时，可以绑定到一个包含键值对的对象，注意此时 class 和 style 绑定不支持数组和对象。

示例（摘自官网 API，部分我自己还未涉及到）：

	<!-- 绑定一个属性 -->
	<img v-bind:src="imageSrc">
	
	<!-- 动态特性名 (2.6.0+) -->
	<button v-bind:[key]="value"></button>
	
	<!-- 缩写 -->
	<img :src="imageSrc">
	
	<!-- 动态特性名缩写 (2.6.0+) -->
	<button :[key]="value"></button>
	
	<!-- 内联字符串拼接 -->
	<img :src="'/path/to/images/' + fileName">
	
	<!-- class 绑定 -->
	<div :class="{ red: isRed }"></div>
	<div :class="[classA, classB]"></div>
	<div :class="[classA, { classB: isB, classC: isC }]">
	
	<!-- style 绑定 -->
	<div :style="{ fontSize: size + 'px' }"></div>
	<div :style="[styleObjectA, styleObjectB]"></div>
	
	<!-- 绑定一个有属性的对象 -->
	<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
	
	<!-- 通过 prop 修饰符绑定 DOM 属性 -->
	<div v-bind:text-content.prop="text"></div>
	
	<!-- prop 绑定。“prop”必须在 my-component 中声明。-->
	<my-component :prop="someThing"></my-component>
	
	<!-- 通过 $props 将父组件的 props 一起传给子组件 -->
	<child-component v-bind="$props"></child-component>

两个比较高级的用法：

1. v-bind 绑定一个**返回对象的计算属性 computed **

注： computed 对象内的方法如果在初始化时绑定到元素上的事件会先执行一次这个方法 ，而 methods 内的方法则不会

	<div v-bind:class="classObject"></div>

	// JS
	data: {
	  isActive: true,
	  error: null
	},
	computed: {
	  classObject: function () {
	    return {
	      active: this.isActive && !this.error,
	      'text-danger': this.error && this.error.type === 'fatal'
	    }
	  }
	}

2. 把一个数组传给 v-bind:class ，利用三元表达式切换

	<div v-bind:class="[ errorClass , isActive ? activeClass : '']"></div>

或者在数组中使用对象来代替三元表达式， 提高代码的可读性

	<div v-bind:class="[ errorClass , { activeClass : isActive }"></div>

---

v-on，事件绑定机制，缩写为@

> 用在普通元素上时，只能监听原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。

> 事件修饰符（部分），修饰符可以串联，如 @click.stop.prevent
>> + .stop 调用 event.preventPropagation()
>> + .prevent 调用 event.preventDefault()
>> + .capture 添加事件侦听器时使用 capture 捕获模式（即元素自身触发的事件先在此处理，然后才交由内部元素进行处理）
>> + .self 只当事件是从侦听器绑定的元素本身触发时才触发回调（只当在 event.target 是当前元素自身时触发处理函数）[见下文实例斟酌]
>> + .once 只触发一次回调
>> + .native 监听组件根元素的原生事件
>> + .passive (2.3.0) 以 { passive: true } 模式添加侦听器(事件的默认行为将会立即触发，而不会等待事件完成后再触发，尤其能够提升移动端的性能）

    <!--点击 button 事件后事件冒泡至 inner 不会执行回调，但事件会继续冒泡到 outer ，outer 执行回调-->
    <!--点击 inner 事件后，事件依然后冒泡至 outer -->
    <div class="outer" @click="div2Handler">
        <div class="inner" @click.self="div1Handler">
            <input type="button" value="Button" @click="btnHandler">
        </div>
    </div>

示例（摘自官网 API，部分我自己还未涉及到）：

*监听原生 DOM*

	<!-- 方法处理器 -->
	<button v-on:click="doThis"></button>
	
	<!-- 动态事件 (2.6.0+) -->
	<button v-on:[event]="doThis"></button>
	
	<!-- 内联语句 -->
	<button v-on:click="doThat('hello', $event)"></button>
	
	<!-- 缩写 -->
	<button @click="doThis"></button>
	
	<!-- 动态事件缩写 (2.6.0+) -->
	<button @[event]="doThis"></button>
	
	<!-- 停止冒泡 -->
	<button @click.stop="doThis"></button>
	
	<!-- 阻止默认行为 -->
	<button @click.prevent="doThis"></button>
	
	<!-- 阻止默认行为，没有表达式 -->
	<form @submit.prevent></form>
	
	<!--  串联修饰符 -->
	<button @click.stop.prevent="doThis"></button>
	
	<!-- 键修饰符，键别名 -->
	<input @keyup.enter="onEnter">
	
	<!-- 点击回调只会触发一次 -->
	<button v-on:click.once="doThis"></button>
	
	<!-- 对象语法 (2.4.0+) -->
	<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

*在子组件上监听自定义事件 (当子组件触发“my-event”时将调用事件处理器)*

	<my-component @my-event="handleThis"></my-component>
	
	<!-- 内联语句 -->
	<my-component @my-event="handleThis(123, $event)"></my-component>
	
	<!-- 组件中的原生事件 -->
	<my-component @click.native="onClick"></my-component>

其中，如果要在内联语句处理器中访问原始的 DOM 事件，以用特殊变量 **$event** 把它传入方法。

	<button v-on:click="warn('Form cannot be submitted yet.', $event)">
	  Submit
	</button>

	// ...
	methods: {
	  warn: function (message, event) {
	    // 现在我们可以访问原生事件对象
	    if (event) event.preventDefault()
	    alert(message)
	  }
	}

## v-model 表单元素的双向事件绑定（非常重要）

> 在**表单控件**（input(radio, text, address, email...) ，select，checkbox，textarea）或者**组件**（components）上创建双向绑定。（v-bind 只能实现数据的单项绑定）

> 本质是一种语法糖（v-on 和 v-bind 的结合），负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

![MVVM](http://www.runoob.com/wp-content/uploads/2017/01/20151109171527_549.png)

> 注：v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源，应该通过 JavaScript 在组件的 data 选项中声明初始值，通过 v-model 实现数据的双向绑定（此时插值表达式无效）。

v-model 在内部会根据控件类型，使用不同的属性并抛出不同的事件：

1. text 和 textarea 元素使用 value 属性和 input 事件

		<div id="app">
			<p>input 元素：</p>
			<input type="text" v-model="message" placeholder="编辑我……">
			<p>消息是: {{ message1 }}</p>
			
			<p>textarea 元素：</p>
			<p style="white-space: pre">{{ message2 }}</p>
			<textarea v-model="message2" placeholder="多行文本输入……"></textarea>
		</div>
		 
		<script>
		new Vue({
		  el: '#app',
		  data: {
		    message1: '单行文本',
		    message2: '多行文本\r\nhttps://cn.vuejs.org/v2/guide/forms.html'
		  }
		})
		</script>

2. checkbox 和 radio 使用 checked 属性和 change 事件

单个复选框绑定到布尔值（即单选框是否被选中，选中为 true）,多个复选框绑定到同一个数组（本例中绑定数组 checkedNames，若选中则向数组中添加，未选中则除去数组中对应值）：

	<div id="app">
		<p>单个复选框：</p>
		<input type="checkbox" id="checkbox" v-model="checked">
		<label for="checkbox">{{ checked }}</label>
	    
	    <p>多个复选框：</p>
		<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
		<label for="jack">Jack</label>
		<input type="checkbox" id="john" value="John" v-model="checkedNames">
		<label for="john">John</label>
		<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
		<label for="mike">Mike</label>
	    <br>
	    <span>选择的值为: {{ checkedNames }}</span>
	</div>
	 
	<script>
	new Vue({
	  el: '#app',
	  data: {
	    checked : false,
	    checkedNames: []
	  }
	})
	</script>

单选按钮与值形成双向绑定：

	<div id="app">
		<input type="radio" id="one" value="One" v-model="picked">
		<label for="one">One</label>
		<br>
		<input type="radio" id="two" value="Two" v-model="picked">
		<label for="two">Two</label>
		<br>
		<span>Picked: {{ picked }}</span>
	</div>
	 
	<script>
	new Vue({
	  el: '#app',
	  data: {
	    picked : ''
	  }
	})
	</script>

3. select 字段将 value 作为 prop 并将 change 作为事件

单选下拉列表（建议设置一个值为空的禁用选项）：

	<div id="app">
		<select v-model="selected">
			<option disabled value="">请选择</option><!--值为空的禁用选项-->
			<option>A</option>
			<option>B</option>
			<option>C</option>
		</select>
		<span>Selected: {{ selected }}</span>
	</div>
	 
	<script>
	new Vue({
	  el: '#app',
	  data: {
	    selected: '' 
	  }
	})
	</script>

多选下拉列表绑定一个数组

	<div id="app">
		<select v-model="selected" multiple style="width: 50px;">
			<option>A</option>
			<option>B</option>
			<option>C</option>
		</select>
		<br>
		<span>Selected: {{ selected }}</span>
	</div>
	 
	<script>
	new Vue({
	  el: '#app',
	  data: {
	    selected: [] 
	  }
	})
	</script>

> 修饰符：

>> **.lazy**

>> 在默认情况下， v-model 在 input 事件中同步输入框的值与数据，但可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步,如： 

>> <input v-model.lazy="msg" >

>> **.number**

>> 自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值；这个修饰符很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串，为便于数据的一致性可以添加该修饰符

>> <input v-model.number="age" type="number">

>> **.trim**

>> 自动过滤用户输入的首尾空白字符

>> <input v-model.trim="msg">

## 条件渲染 v-if, v-else, v-else-if（2.1新增）& v-show

v-if, v-else, v-else-if：根据表达式的值的真假条件渲染元素（v-if 指令用于条件性地渲染一块内容，这块内容只会在指令的表达式返回 truthy 值的时候被渲染）

	<div v-if="type === 'A'">
	  A
	</div>
	<div v-else-if="type === 'B'">
	  B
	</div>
	<div v-else-if="type === 'C'">
	  C
	</div>
	<div v-else>
	  Not A/B/C
	</div>

v-show：根据表达式之真假值，切换元素的 display CSS 属性

	<h3 v-show="flag">This element is controlled by v-show</h3>

**Qusetion：v-if 和 v-show 的差异？**

v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建，简单说就是每次都会重新创建元素。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染并保留在 DOM 中，每次不会重新进行 DOM 的删除和创建操作，只是切换了元素的 display:none。

一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，或元素可能永远不用显示出来被用户看到，则使用 v-if 较好。

## v-for

v-for 可以循环:

	 Array | Object | number | string | Iterable (2.6 新增)

基础语法：

    <div id="app">
		<!--v-for循环数组-->
		<p v-for="(item, index) in list1">{{item}}------index:{{index}}</p>
		
		<!--v-for循环对象数组-->
		<p v-for="usr in list2">index:{{ usr.id }}------name:{{ usr.name }}</p>
		
		<!--v-for循环对象（参数为 value值，key键，index索引-->
		<p v-for="(value, key, index) in user">value:{{value}}-------key:{{key}}------index:{{index}}</p>
    </div>
    <script>
	var vm = new Vue({
	  el: '#app',
	  data: {
	      list1:[1,2,3,4,5,6],
	      list2:[
	      {id:1, name:'a'},
	      {id:2, name:'b'},
	      {id:3, name:'c'},
	      {id:4, name:'d'},
	      ],
	      user:{
	          id:1,
	          name:'Francis',
	          gender: 'male',
	      }
	  },
	})
	</script>

也可以用 of 代替 in 作为分隔符（JS迭代器）：

	<div v-for="item of items"></div>

v-for 也可以用来迭代数字（即从1开始，以数字为取值范围）

	<p v-for="n in 10">{{ n }}</p> // 1,2,3,4,5,6,7,8,9,10

### key

**2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的**

    <!--注意v-for循环的时候，key属性只能使用number获取string-->
    <!--注意key在使用的时候，必须使用v-bind属性绑定的形式，指定key的值-->
    <!--在组件中，使用v-for循环的时候，或者在一些特殊情况中，如果v-for有问题，必须在使用v-for的同时，指定唯一的字符串/数字类型-->
    <p v-for="item in list" :key="item.id">
        <input type="checkbox">
        {{item.id}}----------------{{item.name}}
    </p>

**Q：** **组件**中必须使用 v-bind 属性绑定 key 的原因？

官网解释：

> 当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用**就地复用**策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by="$index" 。

> 这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。

上面这段话不是很好理解，举个简单的例子：

    <p v-for="item in list">
        <input type="checkbox">
        {{item.id}}----------------{{item.name}}
    </p>

其中 list 为：

    list: [
	    {id:1, name:'a'},
	    {id:2, name:'b'},
	    {id:3, name:'c'},
	    {id:4, name:'d'}
    ]

如果在最后一条数据后再加一条数据 {id:5, name:'new'}，那么前面4条都会直接复用之前已被渲染过的元素,新渲染最后一条数据，对之前选中的 checkbox 也不会有任何影响。

但如果在中间加入一条数据：

    list: [
	    {id:1, name:'a'},
	    {id:2, name:'b'},
		{id:5, name:'new'}，
	    {id:3, name:'c'},
	    {id:4, name:'d'}
    ]

此时更新渲染数据，插队的数据及之后的都需要重新渲染，只有第一二条会被复用；checkbox 如果原本选中的是 {id:3, name:'c'}，那么此时会选中 {id:5, name:'new'}，即选中的是原索引位置的值。

[为什么使用v-for时必须添加唯一的key](https://www.jianshu.com/p/342e2d587e69)这篇中做了比较浅显的解释：

> 为只重新渲染最新增加的数据，使其他数据都能够复用，需要使用数组中不会变化的那一项作为 key 值,对应到项目中,即每条数据都有一个唯一的 id 来标识这条数据的唯一性；列表数据修改的时候,根据  key 值去判断某个值是否修改,如果修改,则重新渲染这一项,否则复用之前的元素。

> 同理在 react 中使用 map 渲染列表时,也是必须加 key,且推荐做法也是使用 id。

在绑定了唯一的 key 值后，Vue 节点，类似 checkbox 选择等就不会跟着索引走，而是跟着节点走。

## 其他 v-* 指令

### v-once 

只渲染元素和组件一次,随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过，便于优化更新性能。（可以通过 v-once 创建低开销的静态组件，但由于不利于后期的修改和维护，最好减少 v-once 的使用）

### v-pre

跳过这个元素和它的子元素的编译过程，可以用来显示原始插值标签。跳过大量没有指令的节点会加快编译。

	<span v-pre>{{ this will not be compiled }}</span>

### v-slot（2.6.0 新增）

缩写：#

（暂时还没研究到，先放一个官方文档）

[组件-插槽](https://cn.vuejs.org/v2/guide/components-slots.html)


## css 和 style 绑定

VUE 中提供了绑定样式的两种方法： v-bind:class & v-bind:style

### v-bind:class

    <!--第一种方式， 直接传递一个数组， 注意：这里的class需要使用 v-bind做数组绑定-->
	<!--渲染为 <h1 class="thin italic">it's a Huge H1</h1>-->
    <h1 :class="['thin', 'italic']">it's a Huge H1</h1> 
    <br><br>   

    <!--在数组中使用三元表达式<!--
    <h1 :class="['thin', 'italic', flag ? 'active' : '']">it's a Huge h1</h1>
    <br><br>

    <!--在数组中使用对象表达式来代替三元表达式， 提高代码的可读性--> 
    <h1 :class="['thin', 'italic', {'active':flag }]">it's a Huge h1</h1>
    <br><br>

    <!--在为class使用v-bind绑定对象的时候，对象的属性是类名，由于对象的属性可带引号，也可以不带引号，属性的值是一个标识符-->
    <h1 :class="{red:true, thin:true, italic:false, active:false}">it's a Huge h1</h1>

### v-bind:style 内联样式绑定

    <div id="app">
        <!--
            对象就是无序键值对的集合  
            如果属性名中包含短横线`-`就必须要加单引号,也可以使用驼峰式   
        -->
        <!--直接在 :style 中写内联样式-->
        <h1 :style="{color:'red', 'font-weight': 200 }">This is a h1</h1>

        <!--定义在 data 中-->
        <h1 :style="styleObj1">This is a h1</h1>

        <!--用数组的形式，将多个 styl e放入其中-->
        <h1 :style="[styleObj1, styleObj2]">This is a h1</h1>
    </div>

    <script>
    var vm = new Vue(
        {
          el:'#app',
          data:{
            styleObj1:{
                color: 'red',
                'font-weight': 200
            },
            styleObj2:{
                'font-style': 'italic',
            }
          },
          methods: {
              
          },
        }
    )
    </script>

兼容性考虑：

1. 当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

2. 从 2.3.0 起可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如

	<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>

这样写只会渲染数组中最后一个被浏览器支持的值。

