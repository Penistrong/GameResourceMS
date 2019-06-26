<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.Penistrong.GameResourceMS.po.CurrentUser" %>
<% CurrentUser currentUser = (CurrentUser)session.getAttribute("currentUser"); %>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>
<head>
<title><%=request.getAttribute("poster_id") %></title>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/posts/postPage.css"/>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/vue.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/template.js"></script>
</head>
<body>
	<!-- 导航栏 -->
	<nav class="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
				<span class="sr-only">切换导航</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="<%=context_path%>/index"><span class="glyphicon glyphicon-home"></span> 游戏资源集散论坛-帖子详情</a>
			</div>
			<div class="collapse navbar-collapse" id="example-navbar-collapse">
				<ul class="nav navbar-nav navbar-right">
				<li><a href="<%=context_path%>/user/dataAnalysis"><span class="glyphicon glyphicon-stats"></span> 数据分析</a></li>
				<li><img id="nav-portrait" class="img-circle"></li>
				<li><p id="nav-username" class="navbar-text"><%=currentUser.getUser_name() %></p></li>
				<li><a href="<%=context_path%>/gate/login/logout"><span class="glyphicon glyphicon-log-out"></span>注销</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<%=request.getAttribute("post_id") %>
	<script type="text/javascript" src="<%=javascript_path%>/resource/js/posts/post.js?v=<%=version%>"></script>
	<!-- 加载不同模版 -->
	<div class="container-fluid main-container">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="col-xs-12 col-md-12 col-sm-12" id="templates_Panel">
					
				</div>
			</div>
		</div>
	</div>
	<!-- 楼层 -->
	<script id="repliesFloors" type="text/html">
	<div id="replyManagement">
	<div class="col-md-8 col-md-offset-2" v-for="(reply, index) of slist">
		<div class="col-md-2">
			<form role="form">
				<div class="form-group">
					<img alt="层主头像" class="img-circle" v-bind:src=`<%=context_path%>/user/personalConfig/getPor?resource_id=${reply.resource_id}`>
					<label class="control-label">{{reply.user_name}}</label>
					<label class="control-label">{{reply.level}}</label>
					<label class="control-label">{{reply.identity}}</label>
				</div>
			</form>
		</div>
		<div class="panel panel-info col-md-6">
			<div class="panel-heading">
				<h4 class="panel-title">
					{{reply.floor}} F
				</h4>
			</div>
		<div class="panel-body">
			{{reply.reply}}		
		</div>
		<div class="panel-footer">
			<div style="text-align:right">{{reply.reply_time}}</div>
		</div>
	</div>
	</div>
	</script>
</body>
</html>