package com.Penistrong.GameResourceMS.index.action;

import java.util.HashMap;
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
import com.Penistrong.GameResourceMS.index.service.IndexService;
import com.Penistrong.GameResourceMS.po.CurrentUser;
import com.Penistrong.GameResourceMS.po.User;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年5月1日下午10:26:58
 */
@Controller
@RequestMapping("/index")
public class IndexController extends BaseAction<IndexService<Map<String,Object>>,Map<String,Object>>{
	@RequestMapping
	public String index(ModelMap map,HttpServletRequest request) {
		return "index/index";
	}
	
	@ResponseBody
	@RequestMapping(value="/getUserInfo",method=RequestMethod.POST)
	public Map<String,Object> getUserInfo(HttpServletRequest request,HttpSession session){
		CurrentUser currentUser = (CurrentUser)session.getAttribute("currentUser");
		User user = this.service.getUserInfo(currentUser.getUser_id());
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("user_name", user.getUser_name());
		map.put("identity", user.getIdentity());
		map.put("introduction", user.getIntroduction());
		map.put("portrait",this.service.getPortrait(currentUser.getResource_id(),currentUser.getUser_id()));
		return map;
	}
	
	@ResponseBody
	@RequestMapping(value="/getWebInfo",method=RequestMethod.POST)
	public Map<String,Object> getWebInfo(HttpServletRequest request,@RequestBody Map<String, Object> params){
		return null;
	}
}
