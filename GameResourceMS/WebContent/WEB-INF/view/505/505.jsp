<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "java.text.SimpleDateFormat" %>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/template.js"></script>
<html>

<head>
        <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
	    <title >505</title>
    	<link rel="stylesheet" href="<%=css_path%>/resource/css/505/index.css">
    
    </head>
	
<body>
	
    <div id="game">
        <canvas id="canvas" width="800" height="250"></canvas>
    </div>
    <script src="<%=javascript_path%>/resource/js/505/common.js"></script>
    <script src="<%=javascript_path%>/resource/js/505/index.js"></script>
    <script src="<%=javascript_path%>/resource/js/505/AABB.js"></script>
    <script src="<%=javascript_path%>/resource/js/505/floor.js"></script>
    <script src="<%=javascript_path%>/resource/js/505/cacti.js"></script>
    <script src="<%=javascript_path%>/resource/js/505/cloud.js"></script>
    <script src="<%=javascript_path%>/resource/js/505/bullet.js"></script>
    <script src="<%=javascript_path%>/resource/js/505/trex.js"></script>
    <script src="<%=javascript_path%>/resource/js/505/boss.js"></script>
    <script src="<%=javascript_path%>/resource/js/505/game.js"></script>  
    <script>
        window.onload = function () {
            ctx.drawImage(logo,
                0, 0, 442, 94,
                180, 40, 442 ,94
            );

            ctx.drawImage(kaishi,
                0, 0, 442, 94,
                220, 130, 442 ,94
            );
            ctx.save();
            ctx.font="20px Verdana";
            ctx.fillText("X: 攻击   C: 跳跃   左箭头: 后退   右箭头: 前进", 190, 210);
            ctx.restore();
        };
    </script>
</body>