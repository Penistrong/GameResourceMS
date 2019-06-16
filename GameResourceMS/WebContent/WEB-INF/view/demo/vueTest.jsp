<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Vue Test Page</title>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/jquery.min.js"></script>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/vue.js"></script>
</head>
<body>
	<div id="app">
		<ol>
			<li v-for = "data in list">
				{{ data.text }}
			</li>
		</ol>
	</div>
	<div id="app-1">
		<p>{{message}}</p>
		<button v-on:click = "reverseMessage">反转消息</button>
	</div>
	<div id="app-2">
		<p>{{ message }}</p>
		<input v-model="message">
	</div>
	<div id="app-3">
		<input v-model="msg"> 
		<span v-once>这个值不会随着对象属性的变动而改变:{{msg}}</span>
	</div>
	<div id="example">
		<p>Original message :"{{ message }}"</p>
		<p>Computed reversed message:"{{ reversedMessage }}"</p>
	</div>
	<div id="watch-example">
		<p>
			Ask a question!
			<input v-model="question">
		</p>
		<p>{{ answer }}</p>
	</div>
	<div id="app-4">
		{{ message|UpperHeadFilter|UpperTailFilter}}
		<a v-bind:href="url" v-bind:target="target">{{url}}</a>
	</div>
	<div id="VueLoop">
		<ul>
			<template v-for="site in sites">
				<li>{{ site.name }}</li>
				<li><input v-model="site.name"></li>
			</template>
		</ul>
	</div>
<script type="text/javascript" src="<%=javascript_path%>/resource/js/demo/vueTest.js"></script>	
</body>
</html>