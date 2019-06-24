<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
        <title>首页-游戏资源集散论坛</title>

        <!-- For favicon png -->
       	<link rel="shorcut icon" href="<%=image_path%>/resource/image/gate/gate.ico"/>
       	<link rel="background" href="<%=image_path%>/resource/image/gate/background.jpg"/>
       	<!-- load -->
 		<link rel="stylesheet" type="text/css" href="<%=css_path%>/resource/css/common/load/load.css">
       	
        <!--font-awesome.min.css-->
        <link rel="stylesheet" href="<%=css_path%>/resource/css/assets/font-awesome.min.css">
		
		<!--animate.css-->
        <link rel="stylesheet" href="<%=css_path%>/resource/css/assets/animate.css">
		
        <!--bootstrap.min.css-->
        <link rel="stylesheet" href="<%=css_path%>/resource/css/assets/bootstrap.min.css">
		
		<!-- bootsnav -->
		<link rel="stylesheet" href="<%=css_path%>/resource/css/assets/bootsnav.css" >	
        
        <!--style.css-->
        <link rel="stylesheet" href="<%=css_path%>/resource/css/assets/style.css">
        
        <!--responsive.css-->
        <link rel="stylesheet" href="<%=css_path%>/resource/css/assets/responsive.css">
        
        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		
        <!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

    </head>
	
	<body >
		<!--[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        <![endif]-->
		
		<div id="loader-wrapper">
   		<div id="loader"></div>
    	<div class="loader-section section-left"></div>
    	<div class="loader-section section-right"></div>
		</div>
		
		
		<!-- signin end -->
		<section class="signin">
			<div class="container">
				<div class="sign-content">
					<h2><span style="font-size:70px"> <%= new java.util.Date().getHours()%>:<%= new java.util.Date().getMinutes()%></span> </h2>
					<h2>WelCome to the word of pennis strong</h2>			
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
								<p>
									Don’t have an Account ?<a href="<%=context_path%>/gate/register" id="registerButton">register</a>
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
													    <input type="text" class="form-control"  placeholder="enter your user_id here" id="user_id" required/>
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
										
										
										
										
										<button type="button" class="btn signin_btn" data-toggle="modal" data-target=".signin_modal" id="loginButton">
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
		
		<!-- signin end -->

		

		<!--footer copyright start -->
		<footer class="footer-copyright">
			<div id="scroll-Top">
				<i class="fa fa-angle-double-up return-to-top" id="scroll-top" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back to Top" aria-hidden="true"></i>
			</div><!--/.scroll-Top-->

		</footer><!--/.hm-footer-copyright-->
		<!--footer copyright  end -->


		 <!-- Include all js compiled plugins (below), or include individual files as needed -->



		<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/jquery.min.js"></script>
        
        <!--modernizr.min.js-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
		
		<!--bootstrap.min.js-->
        <script src="<%=javascript_path%>/resource/js/assets/bootstrap.min.js"></script>
		
		<!-- bootsnav js -->
		
		
		<!-- jquery.sticky.js -->
		
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
		
        
        <!--Custom JS-->
       
        
        <script type="text/javascript" src="<%=javascript_path%>/resource/js/gate/login.js?v=<%=version%>"></script>
        
        
        <!--Load JS-->
		<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/load/load.js?v=<%=version%>"></script>

    </body>

</html>