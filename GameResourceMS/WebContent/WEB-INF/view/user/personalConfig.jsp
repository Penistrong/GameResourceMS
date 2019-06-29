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
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/user/row.css"/>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/template.js"></script>
<!-- 图表脚本引入 highcharts -->
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/highcharts.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/highcharts-3d.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/exporting.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/data.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/series-label.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/themes/dark-unica.js"></script>
</head>
<body data-spy="scroll" data-target="#scrollspy" data-offset="80">
	
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
			<a class="navbar-brand" href="<%=context_path%>/index"><span class="glyphicon glyphicon-home"></span> 游戏资源集散论坛-个人资料</a>
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
						<li class="active"><a href="#baseinfo_Section">基本信息</a></li>
						<li><a href="#portrait_Section">头像</a></li>
						<li><a href="#introduction_Section">简介</a></li>
						<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">个人信息<span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="#posts-history_Section">帖子历史</a></li>
								<li><a href="#personalInfo-coins_posts_Section">留白</a></li>
							</ul>
						</li>
						<li><a href="#userStats_Secction">数据记录</a></li>
					</ul>
				</div>
				</div>
			</nav>
			<!-- 上传图片模态框 -->
			<div class="modal fade col-md-10 col-md-offset-2" id="PortraitModal"
				tabindex="-1" role="dialog" aria-labelledby="PortaitModalLabel"
				aria-hidden="true" data-backdrop="static">
				<form method="post" id="change_Portrait"
					enctype="multipart/form-data" action="<%=context_path%>/user/personalConfig/uploadPortrait">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title" id="PortraitModalLabel">上传自定义头像</h4>
							</div>
							<div class="modal-body">
								<!-- 上传图片部件配置 -->
								<form class="form-horizontal" role="form">
								<div class="form-group">
									<div class="controls col-sm-2">
										<label class="control-label">当前头像</label>
										<img alt="当前头像" class="img-circle" id="modal-portrait">
									</div>
									<div class="controls col-sm-2" id="div-preview">
										<label class="control-label">头像预览</label>
										<img alt="上传头像预览" class="img-circle" id="preview">
									</div>
								</div>
								<div class="form-group">
									<div class="controls">
										<input type="file" id="upload_portrait" name="portrait"/>
										<p class="help-block">大小不超过512K</p>
									</div>
								</div>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal" id="cancel_upload">算了QAQ</button>
								<button type="button" class="btn btn-primary" onclick="uploadPortrait()">确认上传</button>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="col-xs-10 col-sm-10 col-md-10 " id="user_info">
				<div id="baseinfo_Section" class="section">
					<form class="form-horizontal" role="form">
						<div class="form-group">
							<label class="col-sm-2 control-label">UID</label>
							<div class="col-sm-4">
								<p class="form-control-static"><%=currentUser.getUser_id()%></p>
							</div>
						</div>
						<fieldset disabled>
							<div class="form-group">
								<label for="disabledSelect" class="col-sm-2 control-label">识别身份</label>
								<div class="col-sm-2">
									<select id="disabledSelect" class="form-control">
										<option id="curIdentity"></option>
									</select>
								</div>
							</div>
						</fieldset>
						<div class="form-group">
							<label class="col-sm-2 control-label">昵称</label>
							<div class="col-sm-2" id="username-control">
								<p class="form-control-static"><%=currentUser.getUser_name()%></p>
							</div>
							<script type="text/html" id="username_InnerHtml">
								<input type="text" class="form-control" placeholder="请输入新昵称" id="edit_user_name">
							</script>
							<div class="col-sm-1" id="btn-edit-name">
								<button type="button"
									class="btn btn-primary btn-xs glyphicon glyphicon-edit form-control"
									onclick="changeUserName()"></button>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">等级</label>
							<div class="col-sm-1">
								<p class="form-control-static">Lv.<%=currentUser.getLevel()%></p>
							</div>
							<div class="col-sm-4" id="level-progress">
								<div class="progress progress-striped active">
									<%Double exp_percentage = Integer.valueOf(currentUser.getExp())*100.0/9999; %>
									<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="<%=currentUser.getExp()%>" aria-valuemin="0" aria-valuemax="9999" style="width: <%=exp_percentage%>%"></div>
								</div>
							</div>
							<div class="col-sm-2" id="ExpStat">
								<span class="form-control-static"><span id="curExp"><%=currentUser.getExp()%></span>/9999</span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">G币</label>
							<div class="col-sm-2">
								<p class="form-control-static"><%=currentUser.getCoins()%></p>
							</div>
						</div>
					</form>
				</div>
				<div id="Section" class="section"><!-- 不知道为什么包了这个div滚动监听就正确显示了 -->
					<div id="portrait_Section" class="section">
						<div class="col-md-4">
							<img alt="用户头像" id="portrait" class="img-circle">
							<button class="btn btn-primary btn-md" data-toggle="modal"
								data-target="#PortraitModal">更改头像</button>
						</div>
					</div>
					<div id="introduction_Section" class="section">
						<form role="form">
							<div class="form-group">
								<label for="name">简介</label>
								<textarea class="form-control" rows="5" id="edit_introduction"></textarea>
							</div>
							<div class="col-md-2 col-md-offset-5"><button class="btn btn-primary btn-lg" type="button" onclick="updateUserInfo()">确认保存</button></div>
						</form>
					</div>
					<div id="posts-history_Section" class="section">
						<p>发帖历史-TODO:Vue.js渲染表单</p>
					</div>
					<div id="personalInfo-coins_posts_Section" class="section">
						<p>测试硬币</p>
					</div>
					<div id="userStats_Section" class="section">
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="<%=javascript_path%>/resource/js/user/personalConfig.js"></script>
</body>
</html>