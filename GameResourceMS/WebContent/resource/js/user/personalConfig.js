var contextpath = "http://localhost:8080/GameResourceMS";

$(document).ready(function(){
	//加载用户信息
	$.ajax({
		type:"post",
		url:contextpath+"/index/getUserInfo",
		success:function(data){
			$("img#nav-portrait,img#portrait").attr("src",contextpath+"/uploadfiles"+data.portrait);
		},
		error:function(){
			alert('拉取用户信息失败');
		}
	})
})