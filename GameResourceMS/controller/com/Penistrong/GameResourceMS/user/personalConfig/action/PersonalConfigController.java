package com.Penistrong.GameResourceMS.user.personalConfig.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.Penistrong.GameResourceMS.base.action.BaseAction;
import com.Penistrong.GameResourceMS.user.personalConfig.service.PersonalConfigService;

@Controller
@RequestMapping("/user/personalConfig")
public class PersonalConfigController extends BaseAction<PersonalConfigService<Map<String,Object>>, Map<String,Object>>{
	@RequestMapping
	public String index(ModelMap map,HttpServletRequest request) {
		return "user/personalConfig";
	}
}
