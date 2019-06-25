var contextpath = "http://localhost:8080/GameResourceMS";
var chart = null;

function requestData(){
	$.ajax({
		type:"post",
		url:contextpath+"/user/dataAnalysis/getUserStatsOfYear",
		dataType:'json',
		success:function(data){
			console.log(data);

			for(var mon=1;mon<=12;mon++){
				chart.series[0].addPoint(data[mon].pv, false, false, true);
				chart.series[1].addPoint(data[mon].uv, false, false, true);
				chart.series[2].addPoint(data[mon].exdau, false, false, true);
				chart.series[3].addPoint(data[mon].KPI, false, false, true);
			}
			chart.redraw();
		}
	})
}

$(document).ready(function(){
	//加载用户信息
	$.ajax({
		type:"post",
		url:contextpath+"/index/getUserInfo",
		success:function(data){
			var img = new Image({
				onload: $("img#portrait,img#nav-portrait").prop("src",contextpath+"/uploadfiles"+data.portrait),
				onerror: $("img#nav-portrait,img#portrait").prop("src",contextpath+"/user/personalConfig/getPortrait")
			});
			img.src = contextpath+"/uploadfiles"+data.portrait;//加载头像，失败则去取数据库中存储的BASE64编码过的头像
		},
		error:function(){
			alert('拉取用户信息失败');
		}
	})
	//图表渲染
	chart = Highcharts.chart('templates_Panel',{
		chart:{
			events:{
				load: requestData //图表加载完毕后执行回调函数
			}
		},
		title:{
			text: 'User Stats|数据分析'
		},
		subtitle:{
			text: '数据源: MySQL Server 5.17@game_resource_db'
		},
		xAxis:[{
			categories:['一月','二月', '三月', '四月', '五月', '六月','七月', '八月', '九月', '十月', '十一月', '十二月'],
			crosshair: true
		}],
		yAxis:[{
			//Primary yAxis
			labels:{
				format: '{value}',
				style: {
					color:Highcharts.getOptions().colors[0]
				}
			},
			min:0,
			allowDecimals: false,
			title: {
				text: '访问量',
				style: {
					color:Highcharts.getOptions().colors[0]
				}
			}
		},{
			//Secondary yAxis
			gridLineWidth: 0,
			title: {
				text:'日活跃峰值',
				style: {
					color:Highcharts.getOptions().colors[1]
				}
			},
			labels: {
				format: '{value}',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
			opposite: true
		},{
			//Tertiary yAxis
			gridLineWidth: 0,
			title: {
				text: 'KPI',
				style: {
					color:Highcharts.getOptions().colors[2]
				}
			},
			labels: {
				format: '{value} pt',
				style: {
					color: Highcharts.getOptions().colors[2]
				}
			},
			opposite:true
		}],
		tooltip: {
			shared: true,
		},
		plotOptions: {
			column: {
				grouping: false,
				shadow: true,
				borderWidth: 0
			}
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			x: 70,
			verticalAlign: 'top',
			y: 0,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		series: [{
			name: 'PV',
			color: 'rgba(248,161,63,1)',
			type: 'column',
			yAxis: 0,
			data: [],
			pointPadding:0.1,
		}, {
			name:'UV',
			color: Highcharts.getOptions().colors[0],
			type: 'column',
			yAxis: 0,
			data: [],
			pointPadding:0.3,
		},	{
			name: 'DAU',
			type: 'spline',
			color: Highcharts.getOptions().colors[1],
			yAxis: 1,
			data: [],
			marker: {
				enabled: false
			},
			dashStyle: 'shortdot',

		}, {
			name: 'KPI',
			type: 'spline',
			color: Highcharts.getOptions().colors[2],
			yAxis: 2,
			data: [],
			tooltip: {
				valueSuffix: ' pt'
			}
		}]
	})
});


