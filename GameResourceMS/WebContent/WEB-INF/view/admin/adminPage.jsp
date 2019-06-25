<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>
<head>
<title>Administrator Page</title>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/admin/adminPage.css"/>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/bootstrap/bootstrap.min.css"/>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/jquery.min.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/template.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/vue.js"></script>
</head>
<body>
	<div class="container">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="col-xs-12 col-md-12 col-sm-12" id="templates_Panel">
				
				</div>
			</div>
		</div>
	</div>
<!----------管理用户---------->
<script id="manage_users" type="text/html">
			<div id="userManagement">
					<div>
						<input type="text" placeholder="search" @input="search_user" list="cars" class="search_user">
						<datalist id="cars">
							<option v-for="user in searchlist" :value="user"></option>
						</datalist>
						<input type="button" class="clean" @click="clean" value="清空">
					</div>
					<div>
					<table class="table table-striped">
						<caption>管理用户</caption>
						<thead>
						<tr>
							<th>序列</th>
							<th>ID</th>
							<th>用户昵称</th>
							<th>用户类型</th>
							<th>level</th>
							<th>硬币数</th>
							<th>发帖数</th>
							<th>身份</th>
							<th>创建时间</th>
							<th>最近修改时间</th>
							<th>操作</th>
						</tr>
						</thead>
						<tbody>
						<tr v-cloak v-for="(user, index) of slist">
							<td>{{index + 1}}</td>
							<td>{{user.user_id}}</td>
							<td>{{user.user_name}}</td>
							<td>{{user.user_type}}</td>
							<td>{{user.level}}</td>
							<td>{{user.coins}}</td>
							<td>{{user.posts}}</td>
							<td>{{user.identity}}</td>
							<td>{{user.create_time}}</td>
							<td>{{user.modify_time}}</td>
							<td><a href="javascript:;" @click = "showOverlay(index)">修改</a> | <a href="javascript:;" @click="del(index)">删除</a></td>
						</tr>
						</tbody>
					</table>
					</div>
				<model :list='selectedlist' :isactive="isActive" v-cloak @change="changeOverlay" @modify="modify"></model>
			</div>
</script>
	<script type="text/javascript" src="<%=javascript_path%>/resource/js/admin/adminPage.js"></script>
</body>
</html>