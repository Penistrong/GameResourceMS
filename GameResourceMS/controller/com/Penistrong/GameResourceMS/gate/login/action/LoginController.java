package com.Penistrong.GameResourceMS.gate.login.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Penistrong.GameResourceMS.base.action.BaseAction;
import com.Penistrong.GameResourceMS.gate.login.service.LoginService;
import com.Penistrong.GameResourceMS.po.CurrentUser;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年4月30日下午7:25:41
 */
@Controller
@RequestMapping("/gate/login")
public class LoginController extends BaseAction<LoginService<Map<String,Object>>,Map<String,Object>>{
	@RequestMapping
	public String index(ModelMap map,HttpServletRequest request) {
			return "gate/login";
	}
	
	@ResponseBody
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public Map<String,Object> login(HttpSession session,@RequestBody Map<String,Object> map,HttpServletRequest request) throws Exception{
		map.put("mapping", "login");
		CurrentUser currentUser = service.login(map);
		if(currentUser!=null) {
			session.setAttribute("currentUser", currentUser);
			map.put("msg", "success");
			return map;
		}else {
			map.put("msg", "failed");
			return map;
		}
	}
	
	@RequestMapping("/logout")//登出
	public String logout(HttpSession session) {
		session.invalidate();//清除session
		return "redirect:/gate/login";
	}
}
