
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import = "java.util.*" %>
<%@ page import = "com.Penistrong.GameResourceMS.base.constant.SystemConstant"%>
<%@ page import = "com.Penistrong.GameResourceMS.Util.ConfigManager" %>
<% 
	String version = "v1.0";
	String context_path = request.getContextPath();
	String css_path = ConfigManager.getItemValue(SystemConstant.CSS_PATH);
	String image_path = ConfigManager.getItemValue(SystemConstant.IMAGE_PATH);
	String javascript_path = ConfigManager.getItemValue(SystemConstant.JAVASCRIPT_PATH);
	String system_name = ConfigManager.getItemValue(SystemConstant.SYSTEM_NAME);
	String administrator = ConfigManager.getItemValue(SystemConstant.ADMINISTRATOR);
%>
<!-- common css definition -->
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/common.css"/>
<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/bootstrap/bootstrap.min.css"/>
<!-- load -->
 <link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/load/load.css">
<!-- common scripts definition -->
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/jquery.min.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/bootstrap/bootstrap.min.js"></script>
<!--Loader JS-->
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/load/load.js?v=<%=version%>"></script>
<div id="loader-wrapper">
	<div id="loader"></div>
	<div class="loader-section section-left"></div>
	<div class="loader-section section-right"></div>
</div>