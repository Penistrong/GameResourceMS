package com.Penistrong.GameResourceMS.Util;

import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

public class UtilTools {
	public static String getUUID(){
		return UUID.randomUUID().toString().replace("-", "");
	}
	
	public static Date getDate() {
		return new Date();
	}
	
	public static String getIp(HttpServletRequest request) {
	    String ip = request.getHeader("X-Forwarded-For");
	    if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
	      ip = request.getHeader("Proxy-Client-IP");
	    }
	    if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
	      ip = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
	      ip = request.getHeader("HTTP_CLIENT_IP");
	    }
	    if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
	      ip = request.getHeader("HTTP_X_FORWARDED_FOR");
	    }
	    if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
	      ip = request.getRemoteAddr();
	    }
	    if ("0:0:0:0:0:0:0:1".equals(ip)) {
	      return "127.0.0.1";
	    }
	    return ip.trim();		
	}
}
