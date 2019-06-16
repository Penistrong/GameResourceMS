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

