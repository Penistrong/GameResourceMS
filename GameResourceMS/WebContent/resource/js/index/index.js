var contextpath = "http://localhost:8080/GameResourceMS";
template.config({sTag:'<#',eTag:'#>'});
var chart = null;

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

//Triggers definition
$(document).ready(function(){
	$('#adCarousel').carousel({
	    interval: 2000
	});
	$("#toggle_info_button").click(function(){
		$("#introduction").slideToggle('slow');
	});
	$("#portrait").click(function(){
		window.location.href=contextpath+"/user/personalConfig";
	});
	$("#nav-portrait,#nav-username").click(function(){
		$("#user_info").slideToggle('slow');
	})
	$("#query-web-info").click(function(){
		queryWebInfo();
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

function queryWebInfo(){
	//创建渐变色
	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color){
		return {
			radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
	        stops: [
	            [0, color],
	            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken brightness
	        ]
		};
	});
	//处理数据
	chart = Highcharts.chart('templates_Panel',{
		chart: {
			type: 'pie',
			events: {
				load: requestWebInfo
			},
			options3d: {
				enabled: true,
				alpha: 45,
				beta: 0
			}
		},
		title: {
			text: '来自不同浏览器的访问量占比'
		},
		subtitle: {
			text: 'click the slice to see details\n数据源:netmarketshare.com'
		},
		tooltip: {
			headerFormat:'<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
		},
		plotOptions: {
			pie:{
				allowPointSelect: true,
				cursor: 'pointer',
				depth: 35,
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.y:.2f} %',
				}
			}
		}
		,
		series: [{
			name:'浏览器',
			colorByPoint: true,
			data: [
				{
					name: 'Chrome',
					y: 66.21,
					sliced: true,
					selected: true,
					drilldown: "Chrome"
				},
				{
					name: 'Firefox',
					y: 9.59,
					drilldown: "Firefox"
				},
				{
					name: 'Internet Explorer',
					y: 9.20,
					drilldown:  "IE"
				},
				{
					name: 'Edge',
					y: 4.57,
					drilldown: "Edge"
				},
				{
					name: 'Safari',
					y: 3.65,
					drilldown: "Safari"
				},
				['Opera', 1.60],
				['Others', 5.18]
				],
			tooltip: {
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
			}
		}],
		drilldown: {
			series: [
				{
					type: "pie",
					id: "Chrome",
					name: "Chrome",
					data: [
						['v19.0', 23.0],
						['v18.0', 12.3],
						['v17.0', 6.6],
						['v16.0', 3.1],
					]
				},
				{
					type: "pie",
					id: "Firefox",
					name: "Firefox",
					data: [
						['v19.0', 23.0],
						['v18.0', 12.3],
						['v17.0', 6.6],
						['v16.0', 3.1],
					]
				},
				{
					type: "pie",
					id: "IE",
					name: "Internet Explorer",
					data: [
						['IE11',7.52],
						['IE10',0.33],
						['IE9', 0.34],
						['IE8', 0.68],
						['IE7', 0.14],
						['IE6', 0.18]
					]
				}
				]
		}

	})
};


function requestWebInfo(){
	
}

/**
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
	
}*/