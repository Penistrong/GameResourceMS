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
<!-- BootStrap-wysiwyg前置 -->
<!-- 样式 -->
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/js/common/google-code-prettify/prettify.css"/>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/bootstrap/bootstrap-responsive.min.css"/>
<link href="http://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/spin/spin.css"/>
<!-- 快捷键 -->
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/jquery.hotkeys.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/bootstrap-wysiwyg/bootstrap-wysiwyg.js"></script>
<!-- 富文本转码器 注意此处的富文本应是已替换了html标签的版本-->
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/html_coder.js"></script>
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
				<li><a href="<%=context_path%>/user/dataAnalysis" class="navbar-hyperlink" id="navbar-dataAnalysis"><span class="glyphicon glyphicon-stats"></span> 数据分析</a></li>
				<li><img id="nav-portrait" class="img-circle"></li>
				<li><a href="<%=context_path%>/user/personalConfig" id="nav-username"><%=currentUser.getUser_name()%></a></li>
				<li><a href="<%=context_path%>/gate/login/logout" class="navbar-hyperlink" id="navbar-logout"><span class="glyphicon glyphicon-log-out"></span>注销</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<span style="display:none;" id="post_id_box"><%=request.getAttribute("post_id") %></span>
	<span style="display:none;" id="poster_id_box"><%=request.getAttribute("poster_id") %></span>
	<!-- 加载不同模版 -->
	<div class="container-fluid main-container">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="col-xs-12 col-md-12 col-sm-12" id="templates_Panel">
					
				</div>
			</div>
		</div>
	</div>
	<div id="div-loading-spin">
	</div>
	<div id="div-reply-reward">
		<p>经验+3，G币+1，告辞！</p>
	</div>
	<div id="button-backToTop">
		<img src="<%=image_path%>/resource/image/common/scrollToTop/rocket.png" class="img-circle" id="button-backToTop-img">
	</div>
	<!-- 楼层 -->
	<script id="repliesFloors" type="text/html">
	<div id="replyManagement">
	<div class="col-md-10 col-md-offset-1" id="div-post-info">
		<div class="col-md-3 col-md-offset-1">
			<form role="form" class="form-vertical">
				<div class="form-group">
					<img alt="楼主头像" class="img-circle replier-portrait center-block poster" :src='getPortraitURL(postInfo.resource_id)'>
				</div>
				<div class="form-group text-center">
					<label class="control-label center-block text-center poster-name"><span class="poster"><span class="poster-tag text-center">楼主</span> {{postInfo.post_author}}</span></label>
					<label class="control-label center-block text-center">Lv. <span class="replier-lvl">{{postInfo.level}}<span></label>
					<label class="control-label center-block text-center poster-identity">{{postInfo.identity}}</label>
				</div>
				<div class="form-group text-center">
					<label class="control-label center-block text-center poster-intro poster">{{postInfo.introduction}}</label>
				</div>
			</form>
		</div>
		<div class="col-md-7">
			<div class="panel panel-success">
				<div class="panel-heading">
					<h2>
						{{postInfo.post_title}}
					</h2>
					<h4 class="panel-title">
						{{postInfo.post_subhead}}
					</h4>
					<span :class="postInfo.tags"></span>
				</div>
				<div class="panel-body" id="div-post-content" v-html="postInfo.post_content">
					{{postInfo.post_content}}		
				</div>
				<div class="panel-footer">
					<div style="text-align:right">最近由 {{postInfo.last_reply_user}} 回复于 {{postInfo.last_reply_time}}</div>
					<div style="text-align:right">楼层: {{postInfo.floors}}  浏览量: {{postInfo.visits}}</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-md-10 col-md-offset-1" v-cloak v-for="(reply, index) of slist">
		<div class="col-md-2 col-md-offset-2">
			<form role="form" class="form-vertical reply-floor">
				<div class="form-group">
					<img alt="层主头像" class="img-circle replier-portrait center-block" :src='getPortraitURL(reply.resource_id)'>
				</div>
				<div class="form-group text-center">
					<label class="control-label center-block text-center">{{reply.user_name}}</label>
					<label class="control-label center-block text-center">Lv. <span class="replier-lvl">{{reply.level}}<span></label>
					<label class="control-label center-block text-center user-identity">{{reply.identity}}</label>
				</div>
			</form>
		</div>
		<div class="col-md-6">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title">
					{{reply.floor}} F
				</h4>
			</div>
			<div class="panel-body div-reply" v-html="reply.reply">
			{{reply.reply}}		
			</div>
			<div class="panel-footer">
				<div style="text-align:right">{{reply.reply_time}}</div>
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
	<!-- 富文本组件 -->
	<div class="col-md-8 col-md-offset-2">
		<div style="height: 50px;"></div>
		<!--这里加上是为了让提示信息显示 不然会被遮挡-->
		<div id="div-wysiwyg">
			<div class="btn-toolbar" data-role="editor-toolbar"
				data-target="#editor">
				<div class="btn-group">
					<a class="btn dropdown-toggle" data-toggle="dropdown" title="字体">
					<i class="icon-font"></i><b class="caret"></b></a>
					<ul class="dropdown-menu">
					</ul>
				</div>
				<div class="btn-group">
					<a class="btn dropdown-toggle" data-toggle="dropdown" title="字体大小"><i
						class="icon-text-height"></i> <b class="caret"></b></a>
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
					<a class="btn" data-edit="justifyleft" title="左对齐 (Ctrl/Cmd+L)"><i
						class="icon-align-left"></i></a>
					<!--左对齐-->
					<a class="btn" data-edit="justifycenter" title="居中 (Ctrl/Cmd+E)"><i
						class="icon-align-center"></i></a>
					<!--居中-->
					<a class="btn" data-edit="justifyright"
						title="右对齐 (Ctrl/Cmd+R)"><i class="icon-align-right"></i></a>
					<!--右对齐-->
					<a class="btn" data-edit="justifyfull" title="填充 (Ctrl/Cmd+J)"><i
						class="icon-align-justify"></i></a>
					<!--垂直对齐-->
				</div>
				<div class="btn-group">
					<a class="btn dropdown-toggle" data-toggle="dropdown" title="超链接"><i
						class="icon-link"></i></a>
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

			<div id="editor">回复一下帖子吧...</div>
			<div class="col-md-2 col-md-offset-10">
				<div class="btn-group" style="margin-top:10px">
					<a class="btn btn-emit" title="" id="btn-emit-reply"><i class="icon-external-link"></i> 发送回复</a>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="<%=javascript_path%>/resource/js/posts/post.js?v=<%=version%>"></script>
</body>
</html>