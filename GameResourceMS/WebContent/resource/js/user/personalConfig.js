var contextpath = "http://localhost:8080/GameResourceMS";

var user = null;
var chart = null;

$(document).ready(function(){
	//加载用户信息
	$.ajax({
		type:"post",
		url:contextpath+"/index/getUserInfo",
		success:function(data){
			user = data;
			$("img#nav-portrait,img#portrait").prop("src",contextpath+"/uploadfiles"+data.portrait);
			$("#curIdentity").html(data.identity);
			$("#edit_introduction").val(data.introduction);
		},
		error:function(){
			alert('拉取用户信息失败');
		}
	});
	
	//图表渲染
	chart = Highcharts.chart('userStats_Section',{
		chart:{
			type:"bar",
			events:{
				load: getUserStats //图表加载完毕后执行回调函数
			},
			/**options3d:{
				enabled: true,
				alpha: 45,
				beta: 0
			}*/
		},
		title:{
			text: 'User Stats|数据记录'
		},
		subtitle:{
			text: '数据源: game_resource_db@MySQL Server 5.17'
		},
		xAxis:[{
			categories:['页面访问量/pv','用户访问量/uv'],
			reversed:false,
			labels:{
				step:1
			}
		},{
			opposite:true,
			categories:['日活跃/DAU','绩效/KPI'],
			reversed:false,
			labels:{
				step:1
			}
		}],
		yAxis:{
			title: {
				text: null
			},
			labels: {
				formatter: function () {
					return (Math.abs(this.value) / 1000) + 'K';
				}
			},
			min: -5000,
			max: 5000
		},
		plotOptions: {
			series:{
				stacking:'normal'
			}
		},
		tooltip: {
			formatter: function(){
				return '<b>'+this.series.name+"</b><br/>"+this.point.category+": "+Highcharts.numberFormat(Math.abs(this.point.y),0);
			}
		},
		/**legend: {
			layout: 'vertical',
			align: 'left',
			x: 70,
			verticalAlign: 'top',
			y: 0,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},*/
		series: [{
			name: '访问量',
			color: Highcharts.getOptions().colors[0],
			data: []
		}, {
			name: '指标/pt',
			color: Highcharts.getOptions().colors[2],
			data: []
		}]
	});
})

function getUserStats(){
	$.ajax({
		type:"post",
		url:contextpath+"/user/dataAnalysis/getUserStats",
		dataType:"json",
		success:function(data){
			chart.series[0].addPoint(-data.pv);
			chart.series[0].addPoint(-data.uv);
			chart.series[1].addPoint(data.exdau);
			chart.series[1].addPoint(data.KPI);
			console.log(chart.series);
		}
	})
}

function changeUserName(){
	var rendered_html = template($("#username_InnerHtml").html());
	$("#username-control").html(rendered_html);
	$("input#edit_user_name").prop("value", user.user_name);
}

function updateUserInfo(){
	var user_name = $("input#edit_user_name").val();
	var introduction = $("#edit_introduction").val();
	$.ajax({
		type:'post',
		url:contextpath+"/user/personalConfig/updateUserInfo",
		dataType:'String',
		data:JSON.stringify({'user_name':user_name, 'introduction':introduction}),
		success:function(flag){
			
		}
	})
}