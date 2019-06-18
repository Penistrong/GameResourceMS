var contextpath = "http://localhost:8080/GameResourceMS";

$(document).ready(function(){
	$("#register_button_1").click(function(){
		var user_id = $('#user_id').val();
		var user_name = $('#user_name').val();
		
		if(ID_Name_validation(user_id,user_name)==false){
			return false;
		}
		$.ajax({
			type:"POST",
			url:contextpath+"/gate/register/validateInfo",
			contentType:"application/json;charset=utf-8",
			dataType:"json",
			data:JSON.stringify({'user_id':user_id,'user_name':user_name}),
			success:function(data){
				if(data.msg=="success"){
					loadingConcreteTable(data.user_id,data.user_name);
				}else{
					if(data.error_msg=="the ID has been registered!"){
						$("#user_id").prop({value:"",placeholer:data.error_msg});
					}else if(data.error_msg=="the Name has been registered!"){
						$("#user_name").prop({value:"",placeholder:data.error_msg});
					}else if(data.error_msg=="both have been occupied"){
						alert(data.error_msg);
						$("#user_id").prop("value","");
						$("#user_name").prop("value","");
					}
				}
			},
			error:function(){
				alert('未知错误!');
			}
		})
	});
})

$(document).ready(function(){	
	$("#register_table").on('click','#register_button_2',function(){
		alert("注册被点击");
		var password = $("#password").val();
		var re_password = $("#re_password").val();
		var user_id_ready = $("#user_id_ready").text();
		var user_name_ready = $("#user_name_ready").text();
		if(password_validation(password,re_password)==false){
			return false;
		}
		$.ajax({
			type:"POST",
			url:contextpath+"/gate/register/register",
			contentType:"application/json;charset=utf-8",
			dataType:"json",
			data:JSON.stringify({'user_id':user_id_ready,'user_name':user_name_ready,'password':password}),
			success:function(data){
				if(data.msg=="success"){
					redirect(data.user_id,data.user_name);
				}else{
					alert("未知错误");
				}
			}
		})
	});
})

var user_id_Reg = /(^0{0,1}(13[0-9]|15[0-9]|18[0-9])[0-9]{8}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i
var user_name_Reg = /^[^]{2,7}$/
	
function ID_Name_validation(user_id,user_name){
	if(user_id_Reg.test(user_id)==false){
		alert("id验证失败");
		$("#user_id").prop({value:"",placeholder:"请输入邮箱或手机号!"});
		return false;
	}else if(user_name_Reg.test(user_name)==false){
		$("#user_name").prop({value:"",placeholder:"名字仅有2到7位!"});
		return false;
	}
	return true;
} 

function password_validation(password,re_password){
	var password_Reg = /^([a-zA-Z]+[0-9]+[.!@#$%^&*]+)|([a-zA-Z]+[.!@#$%^&*]+[0-9]+)|([0-9]+[.!@#$%^&*]+[a-zA-Z]+)|([0-9]+[a-zA-Z]+[.!@#$%^&*]+)|([.!@#$%^&*]+[a-zA-Z]+[0-9]+)|([.!@#$%^&*]+[0-9]+[a-zA-Z]+)$/;

	if(!password_Reg.test(password)){
		$("#password").prop({value:"",placeholder:"仅支持字母数字标点的组合"});
		$("#re_password").prop("value","");
		return false;
	}else if(password!=re_password){
		$("#re_password").prop({value:"",placeholder:"密码不一致,请重新输入!"});
		return false;
	}
	
	return true;
}


function loadingConcreteTable(user_id,user_name){
	$("#register_table").html('<tr><td colspan="2">账户</td><td colspan="8" id="user_id_ready">'+user_id+'</td></tr><tr><td colspan="2">昵称</td><td colspan="8" id="user_name_ready">'+user_name
			+'</td></tr><tr><td colspan="2">密码</td><td colspan="8"><input type="password" id="password" required/></td></tr><tr><td colspan="2">确认密码</td><td colspan="8"><input type="password" id="re_password" required/></td></tr>'+
			'<tr><td colspan="2"></td><td colspan="8"><a href="#" id="register_button_2">确认信息</a></td></tr>');
}

function redirect(user_id,user_name){
	$("#register_div").hide();
	$("#message_div").show();
	$("td.user_id").text(user_id);
	$("td.user_name").text(user_name);
	
	function jump(time){
		window.setTimeout(function(){
			time--;
			if(time>0){
				$("#time").text(time);
				jump(time);
			}else{
				location.href = contextpath+"/gate/login";
			}
		},1000);
	}
	
	jump(5);
}