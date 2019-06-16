<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shorcut icon" href="<%=image_path%>/resource/image/gate/gate.ico"/>
<title>登录-游戏资源集散论坛</title>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/gate/loginPage.css"/>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/jquery.min.js"></script>
</head>
<body>
	<!-- 表单上的action地址只是为了标识数据传输地址 -->
	<form action="<%=context_path%>/gate/login/login">
	<div id="login_div">
		<table align="center" id="login_box">
			<tr>
				<td colspan="2">账户</td>
				<td colspan="5"><input type="text" id="user_id" required/></td>
			</tr>
			<tr>
				<td colspan="2">密码</td>
				<td colspan="5"><input type="password" id="password" required/></td>
			</tr>
			<tr>
				<td colspan="2"></td>
				<td colspan="2"><a href="<%=context_path%>/gate/register" id="registerButton">注册</a></td>
				<td colspan="1"></td><td colspan="2"><a href="#" id="loginButton">登录</a></td>
			</tr>
		</table>
	</div>	
	</form>
	<div id="message_div">
		<table align="center" id="message_table">
			<tr><td colspan="8">登陆成功</tr>
			<tr><td colspan="8">欢迎您</td></tr>
			<tr><td colspan="8" id="user_id"></td></tr>
			<tr><td rowspan="2"><span id="time">5</span>s后自动跳转...</td></tr>
		</table>
	</div>
	<script type="text/javascript" src="<%=javascript_path%>/resource/js/gate/login.js?v=<%=version%>"></script>
</body>
</html>