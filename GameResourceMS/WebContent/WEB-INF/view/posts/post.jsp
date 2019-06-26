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
</body>
</html>