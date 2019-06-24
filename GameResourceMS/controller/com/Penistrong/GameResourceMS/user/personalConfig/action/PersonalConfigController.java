package com.Penistrong.GameResourceMS.user.personalConfig.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Penistrong.GameResourceMS.base.action.BaseAction;
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
	public Map<String,Object> updateUserInfo(@RequestBody Map<String, Object> params, HttpServletRequest request){
		Map<String, Object> result = new HashMap<>();
		return result;
	}
}
