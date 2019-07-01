<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.Penistrong.GameResourceMS.po.CurrentUser" %>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>游戏资源集散论坛</title>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/bootstrap/bootstrap-responsive.min.css"/>
<link href="http://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/js/common/google-code-prettify/prettify.css"/>

<link rel="shortcut icon" href="<%=image_path%>/resource/image/common/web_info/forum.ico"/>>
<link rel="stylesheet" href="<%=css_path%>/resource/css/index/style.css"><link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/index/indexPage.css"/>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/dataTable/jquery.dataTables.css">
<link rel="stylesheet" href="<%=css_path%>/resource/css/505/index.css">

<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/template.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/dataTable/jquery.dataTables.min.js"></script>
<link rel="stylesheet" href="<%=css_path%>/resource/css/index/background.css">
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
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/load/scrollToTop.js"></script>
<!-- 快捷键 -->
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/jquery.hotkeys.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/bootstrap-wysiwyg/bootstrap-wysiwyg.js"></script>
<!-- 富文本转码器 注意此处的富文本应是已替换了html标签的版本-->
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/html_coder.js"></script>
</head>
<body>
<!-------------------------------------------------- 导航栏组件 ---------------------------------------------------->
	<nav class="navbar navbar-default navbar-fixed-top navbar-inverse"
		role="navigation">
		<div id="user_info">
			<!-- 当前用户信息浮动框 -->
			<ul id="user_infolist">
				<li><img id="portrait" title="修改个人资料" />
				<li>
					<%
						CurrentUser currentUser = (CurrentUser) session.getAttribute("currentUser");
					%>
				</li>
				<li><p id="user_name"><%=currentUser.getUser_name()%></p></li>
				<li class="identity"><p id="identity"></p></li>
				<li><p id="level">
						LV.<%=currentUser.getLevel()%></p></li>
			</ul>
			<p id="introduction"></p>
			<p id="toggle_info_button">点我看简介QAQ</p>
		</div>
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target="#example-navbar-collapse">
					<span class="sr-only">切换导航</span> <span class="icon-bar"></span> <span
						class="icon-bar"></span> <span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="<%=context_path%>/index"><span
					class="glyphicon glyphicon-home"></span> 游戏资源集散论坛</a>
			</div>
			<div class="collapse navbar-collapse" id="example-navbar-collapse">
				<form class="navbar-form navbar-left" role="search">
					<div class="form-group">
						<input type="text" class="form-control search_post" placeholder="Search..." v-cloak @input="search_post" list="posts" >
						<datalist id="posts">
							<option v-cloak v-for="post in searchlist" :value="post"></option>
						</datalist>
					</div>
					<button type="submit" class="btn btn-default clean" v-cloak @click="clean">清空</button>
				</form>
				<ul class="nav navbar-nav navbar-left">
					<li class="active"><a href="#" id="btn-show-latest-posts"><span
							class="glyphicon glyphicon-bookmark"></span> What's new</a></li>
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown"> <span class="glyphicon glyphicon-list"></span>
							板块<b class="caret"></b>
					</a>
						<ul class="dropdown-menu">
							<li><a href="#" id="query-game-info"><span></span>游戏快讯</a></li>
							<li><a href="#"><span></span>资源专区</a></li>
							<li class="divider"></li>
							<li><a href="#"><span></span>秋名山</a></li>
						</ul></li>
					<li><a href="#"><span class="glyphicon glyphicon-book"></span>
							版规</a></li>
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown"> <span
							class="glyphicon glyphicon-menu-down"></span> 其他信息
					</a>
						<ul class="dropdown-menu">
							<li><a href="#" id="query-author-info"><span
									class="glyphicon glyphicon-question-sign"></span> 关于作者</a></li>
							<li class="divider"></li>
							<li><a href="#" id="query-web-info"><span
									class="glyphicon glyphicon-info-sign"></span> 网站信息</a></li>
						</ul></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li><img id="nav-portrait" class="img-circle"></li>
					<li><p id="nav-username" class="navbar-text"><%=currentUser.getUser_name()%></p></li>
					<li><a href="<%=context_path%>/user/personalConfig"><span
							class="glyphicon glyphicon-user"></span>个人资料</a></li>
					<li><a href="<%=context_path%>/gate/login/logout"><span
							class="glyphicon glyphicon-log-out"></span>注销</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<a class="v-fork-me"
		href="https://github.com/Penistrong/GameResourceMS" target="_blank"
		rel="noopener"> <img
		src="<%=image_path%>/resource/image/common/web_info/forkme_right_darkblue.png"
		alt="Fork me on GitHub">
	</a>

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
	<!-- 角标 -->
	<div id="particles">
		<div class="intro"></div>
	</div>
	<!-- -----------------------------------------------发帖--------------------------------------------------------- -->



	<!-- signin end -->
	<section class="signin">
		<div class="container">
			<div class="sign-content">
				<div class="row">
					<div class="col-sm-12">
						<div class="signin-footer">
							<div id=scrowToTop>
								<button type="button" v-on:click="backTop" id="toTop"></button>
							</div>
							<button type="button" data-toggle="modal"
								data-target=".signin_modal" id="message"></button>
						</div>
						<!--/.signin-footer -->
					</div>
					<!--/.col-->
				</div>
				<!--/.row -->
			</div>
			<!--/.sign-content -->

			<!-- modal part start -->
			<div class="modal fade signin_modal" tabindex="-1" role="dialog"
				aria-labelledby="myLargeModalLabel">
				<div class="modal-dialog modal-lg" role="document">
					<div class="modal-content">
						<div class="sign-content">

							<div class="modal-header">
								<h2>Post</h2>
							</div>
							<!--/.modal-header -->

							<div class="modal-body">
								<div class="signin-form">
									<div class=" ">
										<div class=" ">
											<form action="signin.html">
												<div class="form-group">
													<label for="signin_form">Title</label> <input type="text"
														class="form-control" placeholder="enter your title here"
														id="title" required />
												</div>
												<!--/.form-group -->
												<div class="form-group">
													<label for="signin_form">Subtitle</label> <input
														type="text" class="form-control"
														placeholder="enter your subtitle here" id="subtitle"
														required />
												</div>
												<!--/.form-group -->
											</form>
											<!--/form -->
										</div>
										<!--/.col -->
									</div>
									<!--/.row -->

								</div>
								<!--/.signin-form -->
								<div style="height: 50px;"></div>
								<!--这里加上是为了让提示信息显示 不然会被遮挡-->
								<div id="div-wysiwyg">
									<div class="btn-toolbar" data-role="editor-toolbar"
										data-target="#editor">
										<div class="btn-group">
											<a class="btn dropdown-toggle" data-toggle="dropdown"
												title="字体"><i class="icon-font"></i><b class="caret"></b></a>
											<ul class="dropdown-menu">
											</ul>
										</div>
										<div class="btn-group">
											<a class="btn dropdown-toggle" data-toggle="dropdown"
												title="字体大小"><i class="icon-text-height"></i> <b
												class="caret"></b></a>
											<ul class="dropdown-menu">
												<li><a data-edit="fontSize 5"><font size="5">大号Huge</font></a></li>
												<li><a data-edit="fontSize 3"><font size="3">中号Medium</font></a></li>
												<li><a data-edit="fontSize 1"><font size="1">小号small</font></a></li>
											</ul>
										</div>
										<div class="btn-group">
											<a class="btn" data-edit="bold" title="B加粗 (Ctrl/Cmd+B)"><i
												class="icon-bold"></i></a>
											<!--加粗-->
											<a class="btn" data-edit="italic" title="斜体 (Ctrl/Cmd+I)"><i
												class="icon-italic"></i></a>
											<!-- 斜体-->
											<a class="btn" data-edit="strikethrough" title="删除线"><i
												class="icon-strikethrough"></i></a>
											<!-- 删除线-->
											<a class="btn" data-edit="underline" title="下划线 (Ctrl/Cmd+U)"><i
												class="icon-underline"></i></a>
											<!-- 下划线-->
										</div>
										<div class="btn-group">
											<a class="btn" data-edit="insertunorderedlist" title="普通列表"><i
												class="icon-list-ul"></i></a>
											<!-- 加点-->
											<a class="btn" data-edit="insertorderedlist" title="排序列表"><i
												class="icon-list-ol"></i></a>
											<!-- 数字排序-->
											<a class="btn" data-edit="outdent" title="取消缩进 (Shift+Tab)"><i
												class="icon-indent-left"></i></a>
											<!-- 减少缩进-->
											<a class="btn" data-edit="indent" title="缩进 (Tab)"><i
												class="icon-indent-right"></i></a>
											<!--增加缩进-->
										</div>
										<div class="btn-group">
											<a class="btn" data-edit="justifyleft"
												title="左对齐 (Ctrl/Cmd+L)"><i class="icon-align-left"></i></a>
											<!--左对齐-->
											<a class="btn" data-edit="justifycenter"
												title="居中 (Ctrl/Cmd+E)"><i class="icon-align-center"></i></a>
											<!--居中-->
											<a class="btn" data-edit="justifyright"
												title="右对齐 (Ctrl/Cmd+R)"><i class="icon-align-right"></i></a>
											<!--右对齐-->
											<a class="btn" data-edit="justifyfull"
												title="填充 (Ctrl/Cmd+J)"><i class="icon-align-justify"></i></a>
											<!--垂直对齐-->
										</div>
										<div class="btn-group">
											<a class="btn dropdown-toggle" data-toggle="dropdown"
												title="超链接"><i class="icon-link"></i></a>
											<!-- 链接-->
											<div class="dropdown-menu input-append">
												<input class="span2" placeholder="URL" type="text"
													data-edit="createLink" />
												<button class="btn" type="button">添加</button>
											</div>
											<a class="btn" data-edit="unlink" title="移除超链接"><i
												class="icon-cut"></i></a>
										</div>
										<div class="btn-group">
											<a class="btn" title="插入图片 (或拖拽图片)" id="pictureBtn"><i
												class="icon-picture"></i></a> <input type="file"
												data-role="magic-overlay" data-target="#pictureBtn"
												data-edit="insertImage" />
										</div>
										<div class="btn-group">
											<a class="btn" data-edit="undo" title="撤销 (Ctrl/Cmd+Z)"><i
												class="icon-undo"></i></a>
											<!--撤销-->
											<a class="btn" data-edit="redo" title="恢复 (Ctrl/Cmd+Y)"><i
												class="icon-repeat"></i></a>
											<!--恢复-->
										</div>
										<input type="text" data-edit="inserttext" id="voiceBtn"
											x-webkit-speech="">
									</div>

									<div id="editor">在这里编辑新帖子内容...</div>


								</div>

								<div class="signin-modal-password">
									<div class="awesome-checkbox-list">
										<ul class="unstyled centered">
											<li><input class="styled-checkbox" id="post_checkbox"
												type="checkbox" value="value3"> <label
												for="styled-checkbox-3">accept our terms & condition</label>
											</li>
										</ul>
									</div>
									<!--/.awesome-checkbox-list -->
								</div>
								<!--/.signin-modal-password -->


								<div class="signin-footer">
									<button type="button" class="btn signin_btn"
										data-toggle="modal" data-target=".signin_modal" id="post_send">
										send</button>
								</div>
								<!--/.signin-footer -->
							</div>
							<!--/.modal-body -->

						</div>
						<!--/.sign-content -->
					</div>
					<!--/.modal-content -->
				</div>
				<!--/.modal-dialog -->
			</div>
			<!--/.modal -->

			<!-- modal part end -->
		</div>
		<!--/.container -->

	</section>
	<!--/.signin -->

	<!-- signin end -->


	<!-- -----------------------------------------------帖子--------------------------------------------------------- -->
	<script id="latestPosts" type="text/html">
		<div id="postManagement">
		<div class="col-md-8 col-md-offset-2" v-for="(post, index) of slist" @click=jump(post.poster_id,post.post_id) style="cursor:pointer">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h2 class="panel-title">
						<a :href="getPostURL(post.poster_id, post.post_id)">{{post.post_title}}</a>
					</h2>
				</div>
				<div class="panel-body" style='width: 930px;display:block;word-break: break-all;word-wrap: break-word;'>
					<h3 class="panel-title">
					{{post.post_subhead}}
					</h3>
					<div style="text-align:right;">
					   {{post.post_author}}
						<br>
						<small><span class="post-visits">浏览量： {{post.visits}}</span></small>
						<small>
							{{post.upload_time}}
						</small>
					</div>		
				</div>
			</div>
		</div>
		<div class="col-md-4 col-md-offset-4">
			<div class="text-center">
			<pagination :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange"></pagination>
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
	<!-- 资源专区 -->
	
	<script id="aboutGame" type="text/html">

	<div id="game">
        <canvas id="canvas" width="800" height="250"></canvas>
    </div>
	
	</script>
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
	 <script type='text/javascript' src="<%=javascript_path%>/resource/js/gate/jquery.particleground.js"></script>
	<script type='text/javascript' src="<%=javascript_path%>/resource/js/gate/demo.js"></script>
	<script type="text/javascript" src="<%=javascript_path%>/resource/js/index/index.js?v=<%=version%>"></script>
	<footer id="footer">
		<p>Author: 陈立伟 吕昶臻  Alias: Penistrong 15257917788 <a href="https://github.com/Penistrong/GameResourceMS" target="_blank">Fork us on GitHub</a></p>
		<address>Copyright © 2019-9102 游戏资源集散论坛 GameResourceMS All Rights Reserved</address>
	</footer>
	
    <script src="<%=javascript_path%>/resource/js/505/index.js"></script>
  
</body>
</html>