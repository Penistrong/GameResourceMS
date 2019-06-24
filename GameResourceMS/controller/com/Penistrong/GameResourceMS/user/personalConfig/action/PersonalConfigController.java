package com.Penistrong.GameResourceMS.user.personalConfig.action;

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
import com.Penistrong.GameResourceMS.po.CurrentUser;
import com.Penistrong.GameResourceMS.user.personalConfig.service.PersonalConfigService;

@Controller
@RequestMapping("/user/personalConfig")
public class PersonalConfigController extends BaseAction<PersonalConfigService<Map<String,Object>>, Map<String,Object>>{
	@RequestMapping
	public String index(ModelMap map,HttpServletRequest request) {
		return "user/personalConfig";
	}
	
	@ResponseBody
	@RequestMapping(value="/updateUserInfo", method=RequestMethod.POST)
	public String updateUserInfo(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpSession session){
		CurrentUser curUser = (CurrentUser)session.getAttribute("currentUser");
		params.put("resource_id", curUser.getResource_id());
		params.put("user_id",curUser.getUser_id());	
		return String.valueOf(this.service.updateUserInfo(params));//type boolean -> String
	}
}
