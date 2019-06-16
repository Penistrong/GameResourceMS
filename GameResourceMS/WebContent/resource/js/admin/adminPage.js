var contextpath = "http://localhost:8080/GameResourceMS";

$(document).ready(function(){
	$.showUserManagement();
})

$.showUserManagement = function(){
	var rendered_html = template($("#manage_users").html());
	$("#templates_Panel").html(rendered_html);
	$.beginService();
}




$.beginService = function(){
var manage_users = new Vue({
	el:'#userManagement',
	data:{
		isActive: false,
		selected: -1,
		selectedlist: {},
		slist:[],
		searchlist:[],
		list:[]
	},
	created(){
		console.log(Date.now()+'|'+'Vue instance has been created');
	},
	mounted:function(){
		this.getUserInfo();
	},
	methods:{
		//获取用户信息
		getUserInfo:function(){
			$.ajax({
				type:"POST",
				url:contextpath+"/admin/getUserInfo",
				dataType:"json",
				success:function(userInfos){
					for(var i=0;i<userInfos.length;i++){
						//console.log(userInfos[i]);
						manage_users.list.push(userInfos[i]);
					}
					//console.log(manage_users.list);
					manage_users.setSlist(manage_users.list);
				}
			})
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
		updateUserInfo(arr){
			$.ajax({
				type:"POST",
				url:contextpath+"/admin/updateUserInfo",
				data:arr,
				success:function(result){
					
				}
			})
		},
		search_user(e){
			var v = e.target.value,
				self = this;
			self.searchlist = [];
			if(v){
				var ss=[];
				//过滤需要的数据
				this.list.forEach(function(user){
					if(user.user_name.indexOf(v) > -1){
						if(self.searchlist.indexOf(user.user_name) == -1){
							self.searchlist.push(user.user_name);
						}
						ss.push(user);
					}else if(user.user_id.indexOf(v) > -1){
						if(self.searchlist.indexOf(user.user_id) == -1){
							self.searchlist.push(user.user_id);
						}
						ss.push(user);
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
});
}