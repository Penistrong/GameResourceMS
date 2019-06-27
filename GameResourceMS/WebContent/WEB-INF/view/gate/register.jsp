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
        <title>Sign up</title>

        <!-- For favicon png -->
		<link rel="shorcut icon" href="<%=image_path%>/resource/image/gate/gate.ico"/>

        <!--style.css-->
        <link rel="stylesheet" href="<%=css_path%>/resource/css/assets/style.css">

    </head>	
	
	<body>
		<!--[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        <![endif]-->
         
        
		
		<!-- signin end -->
		<section class="signin signup popup-up">
			<div class="container">

				<div class="sign-content popup-in-content">
					<div class="popup-in-txt">
						<h2>sign up</h2>
						
						<div class="row">
							<div class="col-sm-12">
								<div class="signin-form">
									<form action="signin.html">
										<div class="form-col">
											<div class="form-group">
											    <label for="signin_form">User_ID</label>
											    <input type="text" class="form-control"  placeholder="enter your user_id here" id="user_id" required/>
											</div><!--/.form-group -->
										</div><!--/.form-col -->
										<div class="form-col1">
											<div class="form-group">
												<label for="signin_form">User_Name</label>
											    <input type="text" class="form-control"  placeholder="enter your user_name here" id="user_name"required/>
											</div><!--/.form-group -->
										</div><!--/.form-col1 -->
										<div class="form-group">
											<label for="signin_form">Email</label>
										    <input type="email" class="form-control" id="signin_form" placeholder="enter your email here" required/>
										</div><!--/.form-group -->
										<div class="form-group">
											<label for="signin_form">password</label>
										    <input type="password" class="form-control"  placeholder="Password" id="password" required/>
										</div><!--/.form-group -->
										<div class="form-group">
											<label for="signin_form">retype password</label>
										    <input type="password" class="form-control" id="re_password" placeholder="Retype Password" required/>
										</div><!--/.form-group -->
									</form><!--/form -->
								</div><!--/.signin-form -->
							</div><!--/.col -->
						</div><!--/.row -->
						
						<div class="row">
							<div class="col-sm-12">
								<div class="signin-password">
									<div class="awesome-checkbox-list">
										<ul class="unstyled centered">

											<li>
											    <input class="styled-checkbox" id="styled-checkbox-2" type="checkbox" value="value2">
											    <label for="styled-checkbox-2">accept our terms & condition</label>
											</li>

											<li></li>

										</ul>
									</div><!--/.awesome-checkbox-list -->
								</div><!--/.signin-password -->
							</div><!--/.col -->
						</div><!--/.row -->


						<div class="row">
							<div class="col-sm-12">
								<div class="signin-footer">
									<button type="button" class="btn signin_btn"  id="register_button_1">
									sign up
									</button>
									<p>
										already member ?
										<a href="<%=context_path%>/gate/login">sign in</a>
									</p>
								</div><!--/.signin-footer -->
							</div><!--/.col-->
						</div><!--/.row -->
					</div><!-- .popup-in-txt -->
				</div><!--/.sign-content -->
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

		
        <script type="text/javascript" src="<%=javascript_path%>/resource/js/gate/register.js?v=<%=version%>"></script>		
        <!--Custom JS-->
        
        <!--Load JS-->
		<script type="text/javascript" src="<%=javascript_path%>/resource/js/common/load/load.js?v=<%=version%>"></script>
    </body>
</html>