var contextpath = "http://localhost:8080/GameResourceMS";

$(document).ready(function(){
	$("#loginButton").click(function(){
		var user_id = $("#user_id").val();
		var password = $("#password").val();
		if(data_validate(user_id,password)==false){
			return false;
		}
		$.ajax({
			type:"POST",	
			url:contextpath+"/gate/login/login",
			contentType:"application/json;charset=utf-8",
			dataType:"json",
			data:JSON.stringify({'user_id':user_id,'password':password}),
			success:function(data){
				if(data.msg == "success"){
					redirect(data);
				}else{
					alert('密码或账户错误,请重新输入!');
					$("#user_id").attr("value","");
					$("#password").attr("value","");
				}
			},
			error:function(){
				alert('未知错误');
			}
		})
	}
	)
})

var user_id_Reg = /(^0{0,1}(13[0-9]|15[0-9]|18[0-9])[0-9]{8}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i
var password_Reg = /^([a-zA-Z]+[0-9]+[.!@#$%^&*]+)|([a-zA-Z]+[.!@#$%^&*]+[0-9]+)|([0-9]+[.!@#$%^&*]+[a-zA-Z]+)|([0-9]+[a-zA-Z]+[.!@#$%^&*]+)|([.!@#$%^&*]+[a-zA-Z]+[0-9]+)|([.!@#$%^&*]+[0-9]+[a-zA-Z]+)$/;

function data_validate(user_id,password){
	if(!user_id_Reg.test(user_id)){
		$("#user_id").attr({value:'',placeholder:'请输入邮箱或手机号!'});
		return false;
	}
	if(!password_Reg.test(password)){
		$("#password").attr({value:'',placeholder:'仅支持字母数字与部分标点!'});
		return false;
	}
	return true;
}

function redirect(data){
	$("#login_div").hide();
	$("#message_div").show();
	$("td#user_id").text(data.user_id);
	
	function jump(time){
		window.setTimeout(function(){
			time--;
			if(time>0){
				$("#time").text(time);
				jump(time);
			}else{
				location.href = contextpath+"/index";
			}
		},1000);
	}
	
	jump(5);
}