var app = new Vue({
	el:"#app",
	data:{
		list:[
			{text: "Vue学习"},
			{text: "尝试简单效率"},
			{text: "语法确实还行"},
			{text: "方便啊"}
		]
	}
})

var app1 = new Vue({
	el:"#app-1",
	data:{
		message: "Penistrong is testing Vue.js!"
	},
	//定义函数
	methods:{
		reverseMessage: function(){
			this.message = this.message.split('').reverse().join('')
		}
	}
})

var app2 = new Vue({
	el:"#app-2",
	data:{
		message: '更改此框内容，同步显示'//使用了v-model，双向绑定表单输入和应用状态
	}
})

var app3 = new Vue({
	el:"#app-3",
	data:{
		msg : '使用了v-once后,此框内容(对象属性)即使更改也无法作用于视图'
	}
})

var vm = new Vue({
	el:"#example",
	data:{
		message: 'Hello!!!'
	},
	computed:{
		reversedMessage: function(){
			return this.message.split('').reverse().join('')
		}
	}
})

var app4 = new Vue({
	el:"#app-4",
	data:{
		message: 'autoChangeHead-首尾自动大写过滤器-autoChangeTail',
		url:'localhost:8080/GameResourceMS/index',
		target:'_blank'
	},
	filters:{
		UpperHeadFilter: function(value){
			if(!value) return ''
			value = value.toString()
			//js的slice方法:string.slice(start,end)截取字符串start与end即为索引 ps.负数在此表示从尾部开始计数
			return value.charAt(0).toUpperCase()+value.slice(1)
		},
		UpperTailFilter: function(value){
			if(!value) return ''
			value = value.toString()
			return value.slice(0,-1)+value.charAt(value.length - 1).toUpperCase()
		}
	}
})

var loopVm = new Vue({
	el:"#VueLoop",
	data:{
		sites:[
			{name: 'Valve' },
			{name: 'Google'},
			{name: 'Tencent'}
		]
	}
	
})
