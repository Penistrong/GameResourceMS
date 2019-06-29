package com.Penistrong.GameResourceMS.admin.action;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Penistrong.GameResourceMS.Util.UtilTools;
import com.Penistrong.GameResourceMS.admin.service.AdminService;
import com.Penistrong.GameResourceMS.base.action.BaseAction;
import com.Penistrong.GameResourceMS.po.CurrentUser;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年7月19日下午3:56:38
 */
@Controller
@RequestMapping("/admin")
public class AdminController extends BaseAction<AdminService<Map<String,Object>>,Map<String,Object>>{
	@RequestMapping
	public String index(ModelMap map,HttpServletRequest request, HttpSession session) {
		if(((CurrentUser)session.getAttribute("currentUser")).getUser_type().equals("administrator"))
			return "admin/adminPage";
		else
			return "redirect:/503";
	}
	
	@ResponseBody
	@RequestMapping(value="/getAdminInfo",method = RequestMethod.POST)
	public Map<String,Object> getAdminInfo(@RequestBody Map<String,Object> params,HttpServletRequest request){
		Map<String,Object> adminInfo = service.getAdminInfo(params);
		return adminInfo;
	}
	
	@ResponseBody
	@RequestMapping(value="/getUserInfo",method = RequestMethod.POST)
	public List<Map<String,Object>> getUserInfo(HttpServletRequest request){
		this.logger.info(UtilTools.getDate().toString()+"|"+this.getClass().toString()+" is querying user_accounts!");
		List<Map<String,Object>> userInfos = service.getUserInfo();
		for(Map<String, Object> userInfo:userInfos) {
			userInfo.put("create_time", userInfo.get("create_time").toString());
			userInfo.put("modify_time", userInfo.get("modify_time").toString());
		}
		return userInfos;
	}
	
	@ResponseBody
	@RequestMapping(value="/updateUserInfo",method=RequestMethod.POST)
	public boolean updateUserInfo(@RequestBody Map<String,Object> params, HttpServletRequest request,HttpSession session) {
		CurrentUser currentAdmin = (CurrentUser)session.getAttribute("currentUser");
		params.put("modify_user", currentAdmin.getUser_id());
		params.put("modify_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
		params.put("mapping", "updateUserInfo");
		return service.update(params);
	}
}
