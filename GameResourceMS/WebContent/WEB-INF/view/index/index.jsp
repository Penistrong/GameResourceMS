<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.Penistrong.GameResourceMS.po.CurrentUser" %>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>游戏资源集散论坛</title>
<link rel="shortcut icon" href="<%=image_path%>/resource/image/common/web_info/forum.ico"/>
<link rel="stylesheet" href="<%=css_path%>/resource/css/assets/style.css"><link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/index/indexPage.css"/>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/dataTable/jquery.dataTables.css">
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/template.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/dataTable/jquery.dataTables.min.js"></script>
<!-- 图表脚本引入 highcharts -->
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/highcharts.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/highcharts-3d.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/exporting.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/data.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/series-label.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/modules/drilldown.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/highcharts/themes/dark-unica.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/vue.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/template.js"></script>
</head>
<body>
	<!-------------------------------------------------- 导航栏组件 ---------------------------------------------------->
	<nav class="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
		<div id="user_info"><!-- 当前用户信息浮动框 -->
			<ul id="user_infolist">
			<li><img id="portrait" title="修改个人资料"/>
			<li><% CurrentUser currentUser = (CurrentUser)session.getAttribute("currentUser"); %></li>
			<li><p id="user_name"><%=currentUser.getUser_name() %></p></li>
			<li class="identity"><p id="identity"></p></li>
			<li><p id="level">LV.<%=currentUser.getLevel() %></p></li>
			</ul>
			<p id="introduction"></p>
			<p id="toggle_info_button">点我看简介QAQ</p>
		</div>
		<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
				<span class="sr-only">切换导航</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="<%=context_path%>/index"><span class="glyphicon glyphicon-home"></span> 游戏资源集散论坛</a>
		</div>
		<div class="collapse navbar-collapse" id="example-navbar-collapse">
			<form class="navbar-form navbar-left" role="search">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Search">
				</div>
				<button type="submit" class="btn btn-default">搜索</button>
			</form>
			<ul class="nav navbar-nav navbar-left">
				<li class="active"><a href="#" id="btn-show-latest-posts"><span class="glyphicon glyphicon-bookmark"></span> What's new</a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<span class="glyphicon glyphicon-list"></span> 板块<b class="caret"></b>
					</a>
					<ul class="dropdown-menu">
						<li><a href="#"><span></span>游戏快讯</a></li>
						<li><a href="#"><span></span>资源专区</a></li>
						<li class="divider"></li>
						<li><a href="#"><span></span>秋名山</a></li>
					</ul>
				</li>
				<li><a href="#"><span class="glyphicon glyphicon-book"></span> 版规</a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<span class="glyphicon glyphicon-menu-down"></span> 其他信息
					</a>
					<ul class="dropdown-menu">
						<li><a href="#" id="query-author-info"><span class="glyphicon glyphicon-question-sign"></span> 关于作者</a></li>
						<li class="divider"></li>
						<li><a href="#" id="query-web-info"><span class="glyphicon glyphicon-info-sign"></span> 网站信息</a></li>
					</ul>
				</li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li><img id="nav-portrait" class="img-circle"></li>
				<li><p id="nav-username" class="navbar-text"><%=currentUser.getUser_name() %></p></li>
				<li><a href="<%=context_path%>/user/personalConfig"><span class="glyphicon glyphicon-user"></span>个人资料</a></li>
				<li><a href="<%=context_path%>/gate/login/logout"><span class="glyphicon glyphicon-log-out"></span>注销</a></li>
			</ul>
		</div>
		</div>
	</nav>

	<!---------------------------------------------------- 导航栏组件 ----------------------------------------------------->
	<!-- 加载不同模版 -->
	<div class="container-fluid main-container">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="col-xs-12 col-md-12 col-sm-12" id="templates_Panel">
					
				</div>
			</div>
		</div>
	</div>
	<!-- 模版池 -->
	<!-- 轮播广告池 -->
	<div id="adCarousel" class="carousel slide col-md-8 col-md-offset-2">
		<ol class="carousel-indicators">
			<li data-target="#adCarousel" data-slide-to="0" class="active"></li>
			<li data-target="#adCarousel" data-slide-to="1"></li>
			<li data-target="#adCarousel" data-slide-to="2"></li>
		</ol>
		<div class="carousel-inner">
			<div class="item active">
				<img alt="广告" class="ads-image" src="http://upload.ouliu.net/i/201710200835097sxf8.jpeg">
				<div class="carousel-caption"></div>
			</div>
			<div class="item">
				<img alt="广告" class="ads-image" src="http://upload.ouliu.net/i/201710200848121eydw.jpeg">
				<div class="carousel-caption"></div>
			</div>
			<div class="item">
				<!-- <img alt="广告" src="<%=image_path%>/resource/image/ads"> -->
				<img alt="广告" class="ads-image" src="http://upload.ouliu.net/i/20171020082737gu189.jpeg">
				<div class="carousel-caption"></div>
			</div>
		</div>
		<!-- 轮播导航 -->
		<a class="left carousel-control" href="#adCarousel" role="button" data-slide="prev">
			<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="right carousel-control" href="#adCarousel" role="button" data-slide="next">
			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
		</a>
	</div>
	<!-- -----------------------------------------------发帖--------------------------------------------------------- -->


	
	<!-- signin end -->
		<section class="signin">
			<div class="container">
				<div class="sign-content">
					<div class="row">
						<div class="col-sm-12">
							<div class="signin-footer">
								<button type="button"  data-toggle="modal" data-target=".signin_modal" id="message"></button>	
							</div><!--/.signin-footer -->
						</div><!--/.col-->
					</div><!--/.row -->

				</div><!--/.sign-content -->

				<!-- modal part start -->
				<div class="modal fade signin_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
					<div class="modal-dialog modal-lg" role="document">
					    <div class="modal-content">
					      	<div class="sign-content">

					      		<div class="modal-header">
									<h2>Post</h2>
								</div><!--/.modal-header -->
								
								<div class="modal-body">
									<div class="signin-form">
										<div class=" ">
											<div class=" ">
												<form action="signin.html">
													<div class="form-group">
													    <label for="signin_form">Post</label>
													    <input type="text" class="form-control"  placeholder="enter your post here" id="post" required/>
													</div><!--/.form-group -->
													<div class="form-group">
														<label for="signin_form">Photo</label>
													    <input type="text" class="form-control"  placeholder="photo" id="photo" required/>
													</div><!--/.form-group -->
												</form><!--/form -->
											</div><!--/.col -->
										</div><!--/.row -->

									</div><!--/.signin-form -->

									<div class="signin-modal-password">
										<div class="awesome-checkbox-list">
											<ul class="unstyled centered">
												<li>
												    <input class="styled-checkbox" id="post_checkbox" type="checkbox" value="value3">
												    <label for="styled-checkbox-3">accept our terms & condition</label>
												</li>
												<li>
												<button type="button" data-toggle="modal" data-target="#PhotoModal" id="photo"></button>
												</li>	
											</ul>
										</div><!--/.awesome-checkbox-list -->
									</div><!--/.signin-modal-password -->

									<div class="signin-footer">
										<button type="button" class="btn signin_btn" data-toggle="modal" data-target=".signin_modal" id="post_send">
										send
										</button>
									</div><!--/.signin-footer -->
								</div><!--/.modal-body -->

							</div><!--/.sign-content -->
					    </div><!--/.modal-content -->
					</div><!--/.modal-dialog -->
				</div><!--/.modal -->
				
				<!-- modal part end -->
			</div><!--/.container -->

		</section><!--/.signin -->
		
		<!-- signin end -->
		
		<!-- 上传图片模态框待修改 -->
			<div class="modal fade col-md-10 col-md-offset-2" id="PhotoModal"
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
										<p class="help-block">大小不超过512K</p>
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
	<!-- 上传图片模态框 end-->
		
	
	<!-- -----------------------------------------------帖子--------------------------------------------------------- -->
	<script id="latestPosts" type="text/html">
		<div id="postManagement">
		<div class="col-md-8 col-md-offset-2" v-for="(post, index) of slist">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h2 class="panel-title">
						<a :href="getPostURL(post.poster_id, post.post_id)">{{post.post_title}}</a>
					</h2>
				</div>
			<div class="panel-body">
				<h3 class="panel-title">
					{{post.post_subhead}}
				</h3>
				<div style="text-align:right;">
					昵称:   {{post.post_author}}
					<br>
					<small>
						时间:   {{post.upload_time}}
					</small>
				</div>		
			</div>
		</div>
		</div>
	</script>
	<!-- -----------------------------------------------发帖--------------------------------------------------------- -->
	<!-- 新建帖子(发布资源) -->
	<script id="newPost" type="text/html">
		<form action="<%=context_path%>/posts/newPosts" id="newPost_form" onsubmit="return false;">
		
		</form>
		<div class="table-responsive">
			<table id="newPostsDataTable" class="display" style="width:100%">
				<thead>
					<caption>What's New</caption>
					<tr>
						<th class="post_Tag"><img alt="" src=""></th>
		                <th>贴名</th>
		                <th>副标题</th>
		                <th>发帖人</th>
						<th>最后更新于</th>
						<th style="min-width:50px;max-width:50px;">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><#=tags#><td>
						<td><#=post_title#></td>
						<td><#=post_subhead#></td>
						<td><#=last_reply_time#></td>
					</tr>
				</tbody>
			</table>
    	</div>
	</script>
	<!-- ----------------------------------------------浏览主页------------------------------------------------------- -->
	<!-- 最新更新帖子(浏览资源) -->
	<script id="latestPosts" type="text/html">
	<div class="col-md-10 col-md-offset-1">
		<div class="table-responsive">
			<table id="latestPostsDataTable" class="table" style="width:100%">
				<thead>
					<caption>What's New</caption>
					<tr>
						<th class="post_Tag"><img alt="" src=""></th>
		                <th>贴名</th>
		                <th>副标题</th>
		                <th>发帖人</th>
						<th>最后更新于</th>
						<!--<th style="min-width:50px;max-width:50px;">操作</th>-->
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
    	</div>
	</div>
	</script>
	<!-- ---------------------------------------------网站流量查询----------------------------------------------------- -->
	<!-- 查询网站基本信息和流量(底层) -->
	<script id="webInfo" type="text/html">
	</script>
	<!-- 关于作者 -->
	<script id="aboutAuthor" type="text/html">
	<div class="col-xs-6 col-sm-6 col-md-6 col-md-offset-3">
		<div>
		</div>
	</div>
	</script>
	
	<script type="text/javascript" src="<%=javascript_path%>/resource/js/index/index.js?v=<%=version%>"></script>
</body>
</html>