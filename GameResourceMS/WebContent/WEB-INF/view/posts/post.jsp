<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>
<head>
<title><%=request.getAttribute("poster_id") %></title>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/posts/postPage.css"/>
</head>
<body>
	
	<%=request.getAttribute("post_id") %>
	<script type="text/javascript" src="<%=javascript_path%>/resource/js/posts/post.js?v=<%=version%>"></script>
</body>
</html>