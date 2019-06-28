var contextpath = "http://localhost:8080/GameResourceMS";

$(document).ready(function(){
	$.ajax({
		type:"post",
		url:contextpath+"/index/getUserInfo",
		success:function(data){
			user = data;
			var img = new Image({
				onload: $("img#portrait,img#nav-portrait,img#modal-portrait").prop("src",contextpath+"/uploadfiles"+data.portrait),
				onerror: $("img#nav-portrait,img#portrait,img#modal-portrait").prop("src",contextpath+"/user/personalConfig/getPortrait")
			});
			img.src = contextpath+"/uploadfiles"+data.portrait;//加载头像，失败则去取数据库中存储的BASE64编码过的头像
		},
		error:function(){
			alert('拉取用户信息失败');
		}
	});
	$.repliesFloors();
})

$.repliesFloors = function(){
	var rendered_html = template($("#repliesFloors").html());
	$("#templates_Panel").html(rendered_html);
	$.beginService();
}

$.beginService = function(){
	
	//底部分页组件
	Vue.component('pagination',{
		//父组件传递的值(有的有默认值)
		props: {
			//每页可见页码
			perPages : {
				type: Number,
				default: 5
			},
			//当前页码
			pageIndex : {
				type: Number,
				default: 1
			},
			//每页显示条数
			pageSize : {
				type: Number,
				default: 10
			},
			//总条数
			total : {
				type: Number,
				default: 1
			},
		},
		template:`<ul class="ul-paging center-block" v-if="pages != 1">
				 	<!--prev-->
				 	<li :class="['paging-item', 'paging-item--prev',{'paging-item--disabled':index===1}]"
				 		@click="prev"><<</li>
				 	
				 	<!--first-->
				 	<li :class="['paging-item', 'paging-item--first']"
						@click="first">首页</li>
					<li :class="['paging-item', 'paging-item--more']"
						v-if="showPrevMore">...</li>
					<li :class="['paging-item', {'paging-item--current':index===pager}]"
						v-for="pager in pagers" @click="go(pager)">{{ pager }}</li>
					<li :class="['paging-item', 'paging-item--more']"
						v-if="showNextMore">...</li>
					
					<!--last-->
					<li :class="['paging-item', 'paging-item--last']"
						@click="last">尾页</li>
						
					<!--next-->	
					<li :class="['paging-item', 'paging-item--next', {'paging-item--disabled':index===pages}]"
						@click="next">>></li>
				  </ul>
				 `,
		methods:{
			prev(){
				console.log(this.limit);
				if(this.index > 1)
					this.go(this.index - 1)
			},
			next(){
				if(this.index<this.pages)
					this.go(this.index +  1)
			},
			first(){
				if(this.index !== 1)
					this.go(1)
			},
			last(){
				if(this.index !== this.pages)
					this.go(this.pages)
			},
			go(page){
				if(this.index !== page){
					this.index = page
					//发送给父组件，让父组件调用change对应的pageChange方法
					this.$emit('change', this.index)
				}
			}
		},
		computed:{
			//计算总页码
			pages(){
				return Math.ceil(this.size / this.limit)
			},
			//计算页码,当count变化时自动计算
			pagers(){
				const array = []
				const perPages = this.perPages
				const pageCount = this.pages
				let current = this.index
				//偏移量
				const _offset = (perPages - 1)/2

				const offset = {
					start 	: current - _offset,
					end		: current + _offset 
				}
				
				if(offset.start < 1){
					offset.end += 1 - offset.start
					offset.start = 1
				}
				if(offset.end > pageCount){
					offset.start -= offset.end - pageCount
					offset.end = pageCount
				}
				if(offset.start < 1) offset.start = 1
				
				this.showPrevMore = (offset.start > 1)
				this.showNextMore = (offset.end < pageCount)
				
				for(let i = offset.start;i<=offset.end;i++){
					array.push(i)
				}
				return array
			}
		},
		data(){
			return {
				index: this.pageIndex,//当前页码
				limit: this.pageSize, //每页显示条数
				size: this.total || 1,//总记录数
				showPrevMore: false,
				showNextMore: false
			}
		},
		watch :{
			pageIndex(val) {
				this.index = val || 1
			},
			pageSize(val) {
				this.limit = val || 10
			},
			total(val) {
				this.size = val || 1
			}
		}
	});
	
var manage_replies = new Vue({
	el:'#replyManagement',
	data(){
		return{
			isActive: false,
			selected: -1,
			selectedlist: {},
			slist:[],
			searchlist:[],
			list:[],
			pageSize : 5,
			currentPage: 1,
			count : 0,
			items : [],
			postInfo: []
		}
	},
	created(){
		console.log(Date.now().toString()+'|'+'Vue instance has been created');
	},
	mounted:function(){
		this.getPostMainInfo();
		this.getRepliesOfPost();
	},
	methods:{
		//获取帖子主要信息,包括发帖人信息与帖子内容等,前端Vue进行渲染操作
		getPostMainInfo:function(){
			$.ajax({
				type:"POST",
				url:contextpath+"/posts/getPostMainInfo",
				dataType:"json",
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify({'poster_id':$("#poster_id_box").html(), 'post_id':$("#post_id_box").html()}),
				success:function(postInfo){
					manage_replies.postInfo = postInfo;
				},
				error:function(){
					alert("拉取帖子信息失败!");
				}
			})
		},
		//获取用户信息
		getRepliesOfPost:function(){
			$.ajax({
				type:"POST",
				url:contextpath+"/posts/getRepliesOfPost",
				dataType:"json",
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify({'post_id':$("#post_id_box").html()}),
				success:function(replies){
					for(var i=0;i<replies.length;i++){
						manage_replies.list.push(replies[i]);
					}
					//console.log(manage_users.list);
					//显示展现出的slist(showed list)
					//manage_replies.setSlist(manage_replies.list);
					//默认显示前pageSize条数据
					if(manage_replies.pageSize<=replies.length){
						for(var i=0;i<manage_replies.pageSize;i++)
							manage_replies.slist.push(replies[i]);
					}else{
						for(var i=0;i<replies.length;i++)
							manage_replies.slist.push(replies[i]);
					}
					
					manage_replies.count = manage_replies.list.length;//总记录
					console.log(manage_replies.count);
				}
			})
		},
		//拼接img src属性
		getPortraitURL(resource_id){
			return contextpath+"/user/personalConfig/getPor?resource_id="+resource_id;
		},
		pageChange(page){
			this.currentPage = page
			//TODO 改变页码时改变slist
			var curPageStartIndex = (page - 1) * this.pageSize;
			var curPageEndIndex = page*this.pageSize - 1;
			if(curPageEndIndex >= this.count){
				curPageEndIndex = this.count - 1;
			}
			this.slist.splice(0, this.slist.length);//清空原来要显示的slist
			
			for(var i = curPageStartIndex;i<=curPageEndIndex;i++){
				this.slist.push(this.list[i]);
			}
		},
		//修改数据
		showOverlay(index){
			this.selected = index;
			this.selectedlist = this.list[index];
			this.changeOverlay();
		},
		//点击保存按钮
		modify(arr){
			if(this.selected > -1){
				Vue.set(this.list,this.selected,arr);
			}else{
				this.list.push(arr);
			}
			this.setSlist(this.list);
			this.updateUserInfo(arr);
			this.changeOverlay();
		},
		clean(){
			$(".search_user").val('');
			this.$emit('input');
		},
		del(index){
			this.list.splice(index,1);
			this.setSlist(this.list);
		},
		changeOverlay(){
			this.isActive = !this.isActive;
		},
		//获取需要渲染进页面的数据
		setSlist(arr){
			this.slist = JSON.parse(JSON.stringify(arr));
		},
		/**updateUserInfo(arr){
			$.ajax({
				type:"POST",
				url:contextpath+"/admin/updateUserInfo",
				data:arr,
				success:function(result){
					
				}
			})
		},*/
		search_reply(e){
			var v = e.target.value,
				self = this;
			self.searchlist = [];
			if(v){
				var ss=[];
				//过滤需要的数据
				this.list.forEach(function(reply){
					if(reply.user_name.indexOf(v) > -1){
						if(self.searchlist.indexOf(user.user_name) == -1){
							self.searchlist.push(user.user_name);
						}
						ss.push(user);
					}else if(reply.floor.indexOf(v) > -1){
						if(self.searchlist.indexOf(reply.floor) == -1){
							self.searchlist.push(reply.floor);
						}
						ss.push(reply);
					}
				});
				this.setSlist(ss);//过滤后数据传给slist
			}else{
				//搜索框为空,则展示所有数据
				this.setSlist(this.list);
			}
		}
	}
});



/**
Vue.component('model',{
	props:['list','isactive'],
	template:`<div class="overlay" v-show="isactive">
					<div class="con">
						<h2 class="title">修改用户权限与类型</h2>
						<div class="content">
							<table>
								<tr>
									<td class="modify_option">用户类型</td>
									<td>
									<select name="" id="" v-model="modifylist.user_type">
									<option value="administrator">管你猿</option>
									<option value="normal">普通注册</option>
									<option value="limited">限制功能</option>
									</select>
									</td>
									<td class="modify_option">用户身份</td>
									<td>
									<select name="" id="" v-model="modifylist.identity">
									<option value="超级版主">Super Moderator</option>
									<option value="斑竹">Moderator</option>
									<option value="会员">VIP</option>
									<option value="普通用户">Normal</option>
									</select>
									</td>
								</tr>
							</table>
							<center>
							<p>
								<input type="button" @click="modify" value="保存">
								<input type="button" @click="changeActive" value="取消"/>
							</p>
							</center>
						</div>
					</div>
				</div>`,
	computed:{
		modifylist(){
			return this.list;
		}
	},
	methods:{
		changeActive(){
			this.$emit('change');
		},
		modify(){
			this.$emit('modify',this.modifylist);
		}
	}
});*/
}