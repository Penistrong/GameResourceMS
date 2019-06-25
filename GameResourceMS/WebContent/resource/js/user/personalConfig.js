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
			var img = new Image({
				onload: $("img#portrait,img#nav-portrait,img#modal-portrait").prop("src",contextpath+"/uploadfiles"+data.portrait),
				onerror: $("img#nav-portrait,img#portrait,img#modal-portrait").prop("src",contextpath+"/user/personalConfig/getPortrait")
			});
			img.src = contextpath+"/uploadfiles"+data.portrait;//加载头像，失败则去取数据库中存储的BASE64编码过的头像
			$("#curIdentity").html(data.identity);
			$("#edit_introduction").val(data.introduction);
		},
		error:function(){
			alert('拉取用户信息失败');
		}
	});
	
	$("#upload_portrait").change(function(){
		$("#preview").prop("src",URL.createObjectURL($(this)[0].files[0]));
		$("#div-preview").show();
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
			useHTML:true,
			text: 'User Stats|<a href='+contextpath+'/user/dataAnalysis'+" style='color:#D9D919'>本年数据记录</a>"
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
			//min: -5000,
			//max: 5000
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
			data: [],
			xAxis:0,
		}, {
			name: '指标/pt',
			color: Highcharts.getOptions().colors[2],
			data: [],
			xAxis:1,
		}]
	});
})

function uploadPortrait(){
	//注意:这里借助ajax异步上传表单[method=post,enctype=multipart/form-data]要设置ajax不要处理数据且不要设置contentType请求头
	var formData = new FormData($("#change_Portrait")[0]);
	$.ajax({
		type: "post",
		url: contextpath+"/user/personalConfig/uploadPortrait",
		data: formData,
		processData:false,
		contentType:false,
		success:function(msg){
			if(msg=="success"){
				$("#cancel_upload").click();
				window.location.reload();
			}
		}
	})
}

function getUserStats(){
	$.ajax({
		type:"post",
		url:contextpath+"/user/dataAnalysis/getUserStats",
		dataType:"json",
		success:function(data){
			chart.series[0].addPoint(-data.pv);
			chart.series[0].addPoint(-data.uv);
			chart.series[1].addPoint(+data.exdau);
			chart.series[1].addPoint(+data.kpi);
			//calculate the maximum/minimum of the reversed yAxis
			if((+data.pv) / 100 > 0){
				chart.yAxis.min = - ((+data.pv)/100 + 1) * 100;
			}else{
				chart.yAxis.min = - ((+data.pv)/10 + 1) * 10;
			}
			if((+data.exdau >= +data.kpi)){
				chart.yAxis.max = ((+data.exdau)/10 + 1) * 10;
			}else{
				chart.yAxis.max = ((+data.kpi)/10 + 1) * 10;
			}
		}
	})
}

function changeUserName(){
	var rendered_html = template($("#username_InnerHtml").html());
	$("#username-control").html(rendered_html);
	$("input#edit_user_name").prop("value", user.user_name);
}

var user_name_Reg = /^[^]{2,7}$/;

function user_name_validation(user_name){
	if(user_name_Reg.test(user_name)==true){
		$("input#edit_user_name").prop({value:"",placeholder:"仅支持2~7位!"});
		return true;
	}
	return false;
}

function updateUserInfo(){
	var data=null;
	var introduction = $("#edit_introduction").val();
	var user_name = $("input#edit_user_name").val();
	if(user_name_validation(user_name))
		data=JSON.stringify({'user_name':user_name, 'introduction':introduction});
	else
		data = JSON.stringify({'introduction':introduction});
	console.log(data);
	$.ajax({
		type:'post',
		url:contextpath+"/user/personalConfig/updateUserInfo",
		data:data,
		dataType:'json',
		contentType:"application/json;charset=utf-8",
		success:function(flag){
			console.log(flag);
		}
	})
}