var contextpath = "http://localhost:8080/GameResourceMS";
var chart = null;

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
	/**
	$.getJSON("https://data.jianshukeji.com/jsonp?filename=csv/analytics.csv&callback=?",function(csv){
		//console.log(csv);
		chart = Highcharts.chart({
			chart:{
				renderTo: 'templates_Panel',
				plotBackgroundColor: null
			},
			data:{
				csv: csv
			},
			title:{
				text: '量化用户活跃度'
			},
			subtitle:{
				text: '数据源: mysql_database@game_resource_db'
			},
			xAxis:{
				tickInterval: 7*24*3600*1000,
				tickWidth: 0,
				gridLineWidth: 1,
				labels: {
					align: 'left',
					x: 3,
					y: -3,
				},
				// 时间格式化字符
	            // 默认会根据当前的刻度间隔取对应的值,即当刻度间隔为一周时,取 week 值
				dataTimeLabelFormats:{
					week: '%Y-%m-%d'
				}
			},
			yAxis:[
				{//第一y坐标轴
					title: {
		                text: null
		            },
		            labels: {
		                align: 'left',
		                x: 3,
		                y: 16,
		                format: '{value:.,0f}'
		            },
		            showFirstLabel: false
				},
				{//第二y坐标轴,置于右侧
					linkedTo: 0,
		            gridLineWidth: 0,
		            opposite: true,  // 通过此参数设置坐标轴显示在对立面
		            title: {
		                text: null
		            },
		            labels: {
		                align: 'right',
		                x: -3,
		                y: 16,
		                format: '{value:.,0f}'
		            },
		            showFirstLabel: false
				}
			],
			legend: {
	            align: 'left',
	            verticalAlign: 'top',
	            y: 20,
	            floating: true,
	            borderWidth: 0
	        },
			tooltip: {
	            shared: true,
	            crosshairs: true,
	            // 时间格式化字符
	            // 默认会根据当前的数据点间隔取对应的值
	            // 当前图表中数据点间隔为 1天,所以配置 day 值即可
	            dateTimeLabelFormats: {
	                day: '%Y-%m-%d'
	            }
	        },
	        plotOptions:{
	        	series: {
	        		cursor: 'pointer',
	        		point: {
	        			events: {
	        				//图表中的数据点点击事件e为事件对象,this为当前数据点对象
	        				click: function(e){
	        					$('.point_message').html(Highcharts.dateFormat('%Y-%m-%d',this.x)+':<br/> 访问量:'+this.y);
	        				}
	        			}
	        		},
	        		marker: {
	        			lineWidth: 1
	        		}
	        	}
	        }
		});
	})*/
	
	$.ajax({
		type:"post",
		url:contextpath+"/user/dataAnalysis/getUserStats",
		dataType:'json',
		success:function(json){
			console.log(json);
			chart = Highcharts.chart('templates_Panel',{
				chart:{
					
				},
				data:{
					json: json
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
					min: 0,
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
		        	y: 50,
		        	floating: true,
		        	backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		        },
		        series: [{
					name: 'PV',
					color: 'rgba(248,161,63,1)',
					type: 'column',
					yAxis: 0,
					data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
					pointPadding:0.1,
		        }, {
		        	name:'UV',
		        	color: Highcharts.getOptions().colors[0],
		        	type: 'column',
		        	yAxis: 0,
		        	data: [46,50,80,90,120,150,55,130,200,156,80,49],
		        	pointPadding:0.3,
		        },	{
					name: 'DAU',
					type: 'spline',
					color: Highcharts.getOptions().colors[1],
					yAxis: 1,
					data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
					marker: {
							enabled: false
					},
					dashStyle: 'shortdot',
					
		        }, {
					name: 'KPI',
					type: 'spline',
					color: Highcharts.getOptions().colors[2],
					yAxis: 2,
					data: [70, 69, 95, 74, 91, 102, 52, 53, 46, 92, 69, 96],
					tooltip: {
						valueSuffix: ' pt'
					}
		        }]
			})
		}
	});
});

$.analytis_charts = function(){
	var rendered_html = template($("#latestPosts").html());
	$("#templates_Panel").html(rendered_html);
}