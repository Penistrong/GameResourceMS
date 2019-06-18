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
				data:{
					json: json
				},
				title:{
					text: '用户网站登陆/登出记录'
				},
				subtitle:{
					text: '数据源: mysql_database@game_resource_db'
				},
				xAxis:{
					tickInterval: 7*24*3600*1000,
					tickWidth: 0,
					gridLineWidth: 0,
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
					{//第一坐标轴
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
					{//第二坐标轴
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
			})
		}
	});
});

$.analytis_charts = function(){
	var rendered_html = template($("#latestPosts").html());
	$("#templates_Panel").html(rendered_html);
}