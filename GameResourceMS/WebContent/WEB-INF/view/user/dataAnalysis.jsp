<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.Penistrong.GameResourceMS.po.CurrentUser" %>
<% CurrentUser currentUser = (CurrentUser)session.getAttribute("currentUser"); %>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>个人数据分析-游戏资源集散论坛</title>
<link rel="shortcut icon" href="<%=image_path%>/resource/image/common/web_info/forum.ico"/>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/user/dataAnalysisPage.css"/>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/dataTable/jquery.dataTables.css">
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/template.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/dataTable/jquery.dataTables.min.js"></script>
<!-- 图表脚本引入 highcharts -->
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/highcharts.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/exporting.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/data.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/series-label.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/oldie.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/themes/sand-signika.js"></script>
</head>
<body>
	<!-- 导航栏 -->
	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
				<span class="sr-only">切换导航</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="<%=context_path%>/index"><span class="glyphicon glyphicon-home"></span> 游戏资源集散论坛-个人数据分析</a>
			</div>
			<div class="collapse navbar-collapse" id="example-navbar-collapse">
				<ul class="nav navbar-nav navbar-right"><!-- navbar-mycenter适配作者自己更改的css -->
				<li><img id="nav-portrait" class="img-circle"></li>
				<li><p id="nav-username" class="navbar-text"><%=currentUser.getUser_name() %></p></li>
				<li><a href="<%=context_path%>/gate/login/logout"><span class="glyphicon glyphicon-log-out"></span>注销</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<!---------------------------------------------------- 导航栏组件 ----------------------------------------------------->
	<!-- 加载不同模版 -->
	<div class="container-fluid" id="analytic-container"><!-- container-fluid 占满窗口 + id selector 设置上边距 -->
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="col-xs-12 col-md-12 col-sm-12" id="templates_Panel">
					
				</div>
				<div class="point_message"></div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript" src="<%=javascript_path%>/resource/js/user/dataAnalysis.js"></script>
</body>
</html>