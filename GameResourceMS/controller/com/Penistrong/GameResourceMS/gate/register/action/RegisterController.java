package com.Penistrong.GameResourceMS.gate.register.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Penistrong.GameResourceMS.base.action.BaseAction;
import com.Penistrong.GameResourceMS.gate.register.service.RegisterService;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年5月2日下午8:03:39
 */
@Controller
@RequestMapping("/gate/register")
public class RegisterController extends BaseAction<RegisterService<Map<String,Object>>, Map<String,Object>>{
	@RequestMapping
	public String index(ModelMap map,HttpServletRequest request) {
		return "gate/register";
	}
	
	@ResponseBody
	@RequestMapping(value="/register",method=RequestMethod.POST)
	public Map<String,Object> Register(@RequestBody Map<String,Object> map,HttpServletRequest request){	
			if(service.Register(map)) {
				map.put("msg", "success");
			}else {
				map.put("msg","failed");
				map.put("error_msg", "Unknown Error Appeared!");
			}

		return map;
	}
	
	@ResponseBody
	@RequestMapping(value="/validateInfo",method=RequestMethod.POST)
	public Map<String,Object> validateInfo(@RequestBody Map<String,Object> map,HttpServletRequest request){
		String msg = service.Is_User_Existed(map);
		if(!msg.equals("Ready_To_Register")) {
			map.put("msg", "failed");
			map.put("error_msg", msg);
		}else {
			map.put("msg", "success");
		}
		return map;
	}
}
