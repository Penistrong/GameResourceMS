<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.Penistrong.GameResourceMS.po.CurrentUser" %>
<% CurrentUser currentUser = (CurrentUser)session.getAttribute("currentUser"); %>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>个人资料设置-游戏资源集散论坛</title>
<link rel="shortcut icon" href="<%=image_path%>/resource/image/user/personalConfigPage.icon"/>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/user/personalConfigPage.css"/>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/bootstrap/bootstrap.min.css"/>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/jquery.min.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/bootstrap/bootstrap.min.js"></script>
</head>
<body data-spy="scroll" data-target="#scrollspy" data-offset="100">
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
			<a class="navbar-brand" href="#"><span class="glyphicon glyphicon-home"></span> 游戏资源集散论坛-个人资料</a>
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
	<div class="container main-container">
		<div class="row">
			<nav class="col-xs-2 col-sm-2 col-md-2" id="scrollSpy">
				<div class="container-fluid">
				<div class="container-fluid">
					<ul class="nav nav-pills nav-stacked">
						<li class="active"><a href="#userName_Section">昵称</a></li>
						<li><a href="#portrait_Section">头像</a></li>
						<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">个人信息<span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="#personalInfo-user_type">用户类型</a></li>
								<li><a href="#personalInfo-level">等级</a></li>
								<li><a href="#personalInfo-coins_posts">论坛币与发帖历史</a></li>
							</ul>
						</li>
						<li><a href="#introduction_Section">简介</a></li>
					</ul>
				</div>
				</div>
			</nav>
			<!-- 上传图片模态框 -->
			<div class="modal fade col-md-10 col-md-offset-2" id="PortraitModal"
				tabindex="-1" role="dialog" aria-labelledby="PortaitModalLabel"
				aria-hidden="true" data-backdrop="static">
				<form method="post" id="Change_Portrait"
					enctype="multipart/form-data">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title" id="PortraitModalLabel">上传自定义头像</h4>
							</div>
							<div class="modal-body">
								<!-- 上传图片部件配置 -->
								<div class="control-group">
									<label class="control-label">上传头像</label>
									<div class="controls">
										<input type="file" id="upload_portrait" />
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">算了QAQ</button>
								<button type="button" class="btn btn-primary">确认上传</button>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="col-xs-10 col-sm-10 col-md-10" id="user_info">
					<div id="userName_Section" class="section">
						<p><%=currentUser.getUser_name() %></p>
					</div>
					<div id="portrait_Section" class="section">
						<img alt="用户头像" id="portrait" class="img-circle">
						<button class="btn btn-primary btn-md" data-toggle="modal" data-target="#PortraitModal">更改头像</button>
					<div id="personalInfo-user_type" class="section">
						<p>测试用户类型</p>
					</div>
					<div id="personalInfo-level" class="section">
						<p>测试等级</p>
					</div>
					<div id="personalInfo-coins_posts" class="section">
						<p>测试硬币</p>
					</div>
					<div id="introduction_Section" class="section">
						<p>测试</p>
					</div>
				</div>
		</div>
		</div>
	</div>
	<script type="text/javascript" src="<%=javascript_path%>/resource/js/user/personalConfig.js"></script>
</body>
</html>