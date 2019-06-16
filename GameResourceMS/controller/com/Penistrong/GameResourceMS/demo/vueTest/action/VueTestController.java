package com.Penistrong.GameResourceMS.demo.vueTest.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Penistrong.GameResourceMS.base.action.BaseAction;
import com.Penistrong.GameResourceMS.demo.vueTest.service.VueTestService;

@Controller
@RequestMapping("/demo/vueTest")
public class VueTestController extends BaseAction<VueTestService<Map<String,Object>>,Map<String,Object>>{
	@RequestMapping
	public String index(Model map,HttpServletRequest request) {
		return "demo/vueTest";
	}

	@ResponseBody
	@RequestMapping(value="/testLogin",method=RequestMethod.POST)
	public Map<String,Object> testLogin(@RequestBody Map<String,Object> params,HttpServletRequest request){
		Map<String,Object> msg = new HashMap<String,Object>();
		
		
		return msg;
	}
}
