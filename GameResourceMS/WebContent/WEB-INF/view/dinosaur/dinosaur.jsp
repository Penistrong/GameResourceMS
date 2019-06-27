<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "java.text.SimpleDateFormat" %>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/template.js"></script>
<html>

<head>
        <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
	    <title >404</title>
	    <style type="text/css">
	    /*
	      不能去掉这个style, game会操作；
	    */
	    </style>
	    <link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/dinosaur/index.css">
	    <script type="text/javascript" src="<%=javascript_path%>/resource/js/common/bootstrap/bootstrap.min.js"></script>
	    <script type="text/javascript">
	      function fadeOutElement() {
	        document.getElementById('pleasantly').style.display = 'none';
	      }
	    </script>
	    <script src="<%=javascript_path%>/resource/js/dinosaur/index.js"></script>
    
    </head>
	
<body >
		<div class="NotFound_div">
	    	<div class="Not-Found-game">
	      	<h1 class="web" >404 NOT FOUND!</h1>
	      	<h1 class="mobile">404</h1>
	      	<span id="pleasantly">↑↑↑按下空格键有惊喜</span>
    	</div>
    	<p>三体人干扰我们的服务，没找到您要的内容！GDers正在努力对抗智子的科技封锁，<a href="/joinus/">加入吧......</a></p>
    	<p><a href="/">去首页看看...</a></p>
  		</div>

		<div id="main-frame-error" class="interstitial-wrapper">
		  <div id="main-content">
		    <div class="icon icon-offline" alt=""></div>
		  </div>
		  <div id="offline-resources">
		    <img id="offline-resources-1x" src="/resource/image/dinosar/default_100_percent/100-offline-sprite.png">
		    <img id="offline-resources-2x" src="/resource/image/dinosar/default_200_percent/200-offline-sprite.png">
		    <template id="audio-resources">
		    </template>
		  </div>
		</div>
    </body>

</html>