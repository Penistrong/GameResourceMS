<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "java.text.SimpleDateFormat" %>
<jsp:directive.include file="/WEB-INF/view/common/common.jsp" />
<html>

<head>
        <!-- meta data -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

        <!--font-family-->
		
        
        <!-- title of site -->
        <title>登录-游戏资源集散论坛</title>
        

        <!-- For favicon png -->
       	<link rel="shorcut icon" href="<%=image_path%>/resource/image/gate/gate.ico"/>
        <!--style.css-->
        <link rel="stylesheet" href="<%=css_path%>/resource/css/assets/style.css">
        <link rel="stylesheet" href="<%=css_path%>/resource/css/gate/background.css">
    
    </head>
	
	<body >
		<!--[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        <![endif]-->
		
		
		<!-- signin end -->
		<div id="particles">
			<div class="intro">
				<section class="signin">
					<div class="container">
						<div class="sign-content">
							<%SimpleDateFormat formatter = new SimpleDateFormat("HH:mm"); %>
							<h2><span style="font-size:70px;color:#fff"><%=formatter.format(new Date()) %></span> </h2>
							<h2 style="color:#fff">Welcome to the world of Penistrong</h2>			
							<div class="row">
								<div class="col-sm-12">
									<div class="signin-form">
									</div><!--/.signin-form -->
								</div><!--/.col -->
							</div><!--/.row -->
							
							<div class="row">
								<div class="col-sm-12">
									<div class="signin-password">
										<div class="awesome-checkbox-list">
											<ul class="unstyled centered">
		
											</ul>
										</div><!--/.awesome-checkbox-list -->
									</div><!--/.signin-password -->
								</div><!--/.col -->
							</div><!--/.row -->
		
							<div class="row">
								<div class="col-sm-12">
									<div class="signin-footer">
										<button type="button" class="btn signin_btn" data-toggle="modal" data-target=".signin_modal" id="usersss_id"  >
										sign in
										</button>
										<p style="color:#fff">
											Don’t have an Account ?
											<i style="font-size:20px">
												<a style="color:#fff" href="<%=context_path%>/gate/register" id="registerButton">Register</a>
											</i>
										</p>
									</div><!--/.signin-footer -->
								</div><!--/.col-->
							</div><!--/.row -->
							
		
		
		
						</div><!--/.sign-content -->
		
						<!-- modal part start -->
						<div class="modal fade signin_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
							<div class="modal-dialog modal-lg" role="document">
							    <div class="modal-content">
							      	<div class="sign-content">
		
							      		<div class="modal-header">
											<h2>sign in</h2>
										</div><!--/.modal-header -->
										
										<div class="modal-body">
											<div class="signin-form">
												<div class=" ">
													<div class=" ">
														<form action="signin.html">
															<div class="form-group">
															    <label for="signin_form">Used_ID</label>
															    <input type="text" class="form-control"  placeholder="Enter your user_id here" id="user_id" required/>
															</div><!--/.form-group -->
															<div class="form-group">
																<label for="signin_form">Password</label>
															    <input type="password" class="form-control"  placeholder="Password" id="password" required/>
															</div><!--/.form-group -->
														</form><!--/form -->
													</div><!--/.col -->
												</div><!--/.row -->
		
											</div><!--/.signin-form -->
		
											<div class="signin-modal-password">
												<div class="awesome-checkbox-list">
													<ul class="unstyled centered">
		
														<li>
														    <input class="styled-checkbox" id="styled-checkbox-3" type="checkbox" value="value3">
														    <label for="styled-checkbox-3">remember password</label>
														</li>
		
														<li>
														    <a href="signin.html">Forgot email or password ?</a>
														</li>
		
													</ul>
												</div><!--/.awesome-checkbox-list -->
											</div><!--/.signin-modal-password -->
		
											<div class="signin-footer">
												
												
												
												
												<button type="button" class="btn signin_btn" data-target=".signin_modal" id="loginButton">
												sign in
												</button>
												<p>
													<small>
													Don't have an Account ?
													</small>
													<strong>
														<a href="<%=context_path%>/gate/register" id="registerButton2">Register</a>
													</strong>
												</p>
												
												
												
												
											</div><!--/.signin-footer -->
										</div><!--/.modal-body -->
		
									</div><!--/.sign-content -->
							    </div><!--/.modal-content -->
							</div><!--/.modal-dialog -->
						</div><!--/.modal -->
						
						<!-- modal part end -->
					</div><!--/.container -->
		
				</section><!--/.signin -->
			</div>
		</div>
		<!-- signin end -->

		

		<!--footer copyright start -->
		<footer class="footer-copyright">
			<div id="scroll-Top">
				<i class="fa fa-angle-double-up return-to-top" id="scroll-top" data-toggle="tooltip" data-placement="top" title="2+62+2+2" data-original-title="Back to Top" aria-hidden="false">+2+921161</i>
			</div><!--/.scroll-Top-->

		</footer><!--/.hm-footer-copyright-->
		<!--footer copyright  end -->


		 <!-- Include all js compiled plugins (below), or include individual files as needed -->


        
        <!--modernizr.min.js-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
		
		<!-- jquery.sticky.js -->
		
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
		
        
        <!--Custom JS-->
       
        
        <script type="text/javascript" src="<%=javascript_path%>/resource/js/gate/login.js?v=<%=version%>"></script>
        
        <script type='text/javascript' src="<%=javascript_path%>/resource/js/gate/jquery.particleground.js"></script>
  		<script type='text/javascript' src="<%=javascript_path%>/resource/js/gate/demo.js"></script>
        

    </body>

</html>