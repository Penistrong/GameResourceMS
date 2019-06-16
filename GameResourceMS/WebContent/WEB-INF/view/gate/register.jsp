<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="<%=image_path%>/resource/image/gate/gate.ico"/>
<title>注册-游戏资源集散论坛</title>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/gate/registerPage.css"/>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/jquery.min.js"></script>
</head> 
<body>
	<h2>欢迎您注册-游戏资源集散论坛-会员</h2>
	<div id="register_div">
	<form action="<%=context_path%>/gate/register/register">
		<table align="center" id="register_table">
			<tr>
				<td colspan="2">账户</td>
				<td colspan="5"><input type="text" placeholder="请输入邮箱或者手机号" id="user_id" required/></td>
			</tr>
			<tr>
				<td colspan="2">昵称</td>
				<td colspan="5"><input type="text" id="user_name" required/></td>
			</tr>
			<tr>
				<td colspan="2"></td>
				<td colspan="3"><input type="button" value="注册" id="register_button_1"></td>
				<td colspan="2"><input type="reset" value="重置"></td>
			</tr>
		</table>
	</form>
	</div>
	<div id="message_div">
		<table align="center" id="message_table">
			<tr><td colspan="8">注册成功</td></tr>
			<tr><td colspan="8">欢迎新会员</td></tr>
			<tr><td colspan="8" class="user_id"></td></tr>
			<tr><td colspan="8" class="user_name"></td></tr>
			<tr><td rowspan="2"><span id="time">5</span>s后自动跳转至登录页面...</tr>
		</table>
	</div>
	<script type="text/javascript" src="<%=javascript_path%>/resource/js/gate/register.js?v=<%=version%>"></script>
</body>
</html>