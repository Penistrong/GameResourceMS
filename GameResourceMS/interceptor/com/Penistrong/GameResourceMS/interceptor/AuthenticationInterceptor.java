package com.Penistrong.GameResourceMS.interceptor;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
import javax.servlet.http.HttpSession;

import org.jdom.xpath.XPath;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.springframework.web.servlet.HandlerInterceptor;  
import org.springframework.web.servlet.ModelAndView;

import com.Penistrong.GameResourceMS.Util.CasFilterConfigManager;
import com.Penistrong.GameResourceMS.Util.UtilTools;
import com.Penistrong.GameResourceMS.po.CurrentUser;

/**
 * 配置登陆权限拦截器
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年4月15日下午8:26:35
 */
public class AuthenticationInterceptor implements HandlerInterceptor{

	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	/**
	 * 登陆验证,拦截未登录人员
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		// TODO Auto-generated method stub
		String path = request.getRequestURI();
		String context_path = request.getContextPath();
		HttpSession session = request.getSession(false);
		Matcher m;
		
		//获得执行该方法时的时间日迹
		String time = "["+UtilTools.getDate().toString()+"]";
		//打印日志
		System.out.println(time+"AuthenticationInterceptor has been started to check the identity of the request");
		System.out.println(time+"Request URL :"+path);
		
		//从CasFilterConfig.xml中取出不受保护的url资源名,并与请求的url进行比对,若存在一致则放行
		try {
			Document doc = CasFilterConfigManager.getPathXmlDoc();
			Element rootElement = doc.getRootElement();
			Element itemLogout = (Element)XPath.selectSingleNode(rootElement, "/config/notForceAuthUrls");
			List itemsLogout = itemLogout.getChildren();
			for(int i = 0;i<itemsLogout.size();i++) {
				Element itemSub = (Element)itemsLogout.get(i);
				Pattern pattern = Pattern.compile(itemSub.getText());
				m = pattern.matcher(path);
				if(m.find()) {
					return true;
				}
			}
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//判断是否为ajax请求,是则不拦截
		if(request.getHeader("x-requested-with")!=null &&request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) {
			return true;
		}
		
		if(path.equals("/GameResourceMS/gate/login")) {
			if(session!=null) {
				CurrentUser currentUser = (CurrentUser)session.getAttribute("currentUser");
				if(currentUser!=null) {
					System.out.println(time+"LogOnUser:"+currentUser);
					response.sendRedirect(context_path+"/index");
					return false;
				}else {
					return true;
				}
			}
			return true;
		}
		
		if(session!=null) {
			CurrentUser currentUser = (CurrentUser)session.getAttribute("currentUser");
			if(currentUser != null) {
				System.out.println(time+"LogOnUser:"+currentUser);
				return true;
			}
		}
		//TODO:已登录用户无法访问register/login页面,需要加强逻辑判断
		
		System.out.println(time+"Redirect request to LoginPage to get authentication first");
		response.sendRedirect(context_path+"/gate/login");
		return false;
	}

}
