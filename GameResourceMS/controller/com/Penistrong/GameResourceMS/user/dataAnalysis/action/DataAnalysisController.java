package com.Penistrong.GameResourceMS.user.dataAnalysis.action;

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
import com.Penistrong.GameResourceMS.user.dataAnalysis.service.DataAnalysisService;
import com.Penistrong.GameResourceMS.po.CurrentUser;
import com.Penistrong.GameResourceMS.po.DetailedUser;
import com.Penistrong.GameResourceMS.po.User;

/**
 * 
 * @author Penistrong[chenliwei]
 * @project GameResourceMS	
 * @built_date 2019年6月17日上午8:56:37
 */
@Controller
@RequestMapping("/user/dataAnalysis")
public class DataAnalysisController extends BaseAction<DataAnalysisService<Map<String,Object>>,Map<String,Object>>{
	@RequestMapping
	public String index(ModelMap map,HttpServletRequest request) {
		return "user/dataAnalysis";
	}
	
	//将用户信息打包成需要的JSON数据，发送给前端highcharts模块进行处理
	@ResponseBody
	@RequestMapping(value="/getUserStats",method=RequestMethod.POST)
	public DetailedUser getUserStats(HttpSession session, HttpServletRequest request){
		CurrentUser curUser = (CurrentUser)session.getAttribute("currentUser");
		DetailedUser user_stats = this.service.getUserStats(curUser.getResource_id(), curUser.getUser_id());
		return user_stats;
	}
	
	//Map:key->month, value->innerMap(key->pv/uv/exdau/KPI,value->*.value)
	@ResponseBody
	@RequestMapping(value="/getUserStatsOfYear",method=RequestMethod.POST)
	public Map<String,Map<String,Object>> getUserStatsOfYear(HttpSession session, HttpServletRequest request){
		CurrentUser curUser = (CurrentUser)session.getAttribute("currentUser");
		return this.service.getUserStatsOfYear(curUser.getResource_id());
	}
}
