var contextpath = "http://localhost:8080/GameResourceMS";
template.config({sTag:'<#',eTag:'#>'})

$(document).ready(function(){
	//加载当前用户信息
	$.ajax({
		type:"POST",
		url:contextpath+"/index/getUserInfo",
		success:function(data){
			$("img#portrait,img#nav-portrait").attr("src",contextpath+"/uploadfiles"+data.portrait);
			$("p#identity").text(data.identity);
			$("p#introduction").text(data.introduction);
		},
		error:function(){
			alert('拉取用户信息失败!');
		}
	})
	$.latestPosts_page();
})

$(document).ready(function(){
	$("#toggle_info_button").click(function(){
		$("#introduction").slideToggle('slow');
	});
	$("#portrait").click(function(){
		window.location.href=contextpath+"/user/personalConfig";
	});
	$("#nav-portrait,#nav-username").click(function(){
		$("#user_info").slideToggle('slow');
	})
})

//listPosts方法已update为latestPosts_page方法
$.listPosts = function(){
	var tpl = $("#latestPosts").html();
	$.ajax({
		type:"POST",
		url:contextpath+"/posts/getLatestPosts",
		dataType:"json",
		success:function(list){
			console.log(list);
			/*传回来的list是无名称的样式[{data1},{data2}],要对其进行对象的引用就将其包装成Map格式*/
			var datas = {"list":list};
			var rendered_html = template(tpl,datas);
			$("#templates_Panel").html(rendered_html);
			$("#latestPostsDataTable").DataTable();
		}
	})
}

$.latestPosts_page = function(){
	var rendered_html = template($("#latestPosts").html());
	$("#templates_Panel").html(rendered_html);
	$("#latestPostsDataTable").DataTable({
		paging:true,
		iDisplayLength:10,
		bPaginate:true,
		blengthChange:true,
		bFilter:true,
		bSort:true,
		bInfo:true,
		bProcessing:true,
		searching:true,
		ajax:{
			url:contextpath+"/posts/getLatestPosts",
			type:"post",
			dataSrc:function(result){
				return result;
			}
		},
		columns:[
				{data:"tags",defaultContent : ""},
				{data:"post_title",defaultContent : ""},
				{data:"post_subhead",defaultContent : ""},
				{data:"post_author",defaultContent : ""},
				{data:"last_reply_time",defaultContent : ""},
		],
		columnDefs:[
			{
				target:[3],
				data:"floors",
				"render":function(data,type,row){
					return "<a href=\"JavaScript:;\">测试哦</a>";
				}
			}
		]
		});
}

$.newPost = function(){
	var tpl = $("#newPost").html();
	
	$("#submit_newPost").click(function(){
		var newPost_data = {"post_title":$("#post_title").val(),"post_subhead":$("#post_subhead").val(),"post_content":$("#post_content").val(),};
		
		$.ajax({
			type:"POST",
			url:contextpath+"/posts/newPost",
			contentType:"application/json;charset=utf-8",
			dataType:"json",
			data:JSON.stringify(newPost_data),
			success:function(data){
				if(data.msg == "success"){
					window.location.href=contextpath+"/posts/"+data.post_id;
				}
			}
			
		})
	})
}

$.queryWebInfo = function(){
	var tpl = $("#webInfo").html();
	$.ajax({
		type:"POST",
		url:contextpath+"/webInfo",
		dataType:"json",
		success:function(data){
			console.log(data);
			var infos = {"infos":data};
			$("#templates_Panel").html(template(tpl,infos));
		},
		error:function(){
			alert("访问网站底层信息出错!请联系管理员!");
		}
	})
	
}