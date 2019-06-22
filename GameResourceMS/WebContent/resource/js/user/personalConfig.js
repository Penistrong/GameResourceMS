var contextpath = "http://localhost:8080/GameResourceMS";

var user = null;

$(document).ready(function(){
	//加载用户信息
	$.ajax({
		type:"post",
		url:contextpath+"/index/getUserInfo",
		success:function(data){
			user = data;
			$("img#nav-portrait,img#portrait").prop("src",contextpath+"/uploadfiles"+data.portrait);
			$("#curIdentity").html(data.identity);
		},
		error:function(){
			alert('拉取用户信息失败');
		}
	})
})

function changeUserName(){
	var rendered_html = template($("#username_InnerHtml").html());
	$("#username-control").html(rendered_html);
	console.log(user.user_name);
	$("#user_name").prop("value", user.user_name);
}