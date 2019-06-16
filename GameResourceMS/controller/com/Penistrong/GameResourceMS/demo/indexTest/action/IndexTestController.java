package com.Penistrong.GameResourceMS.demo.indexTest.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Penistrong.GameResourceMS.po.CurrentUser;
import com.Penistrong.GameResourceMS.Util.UtilTools;
import com.Penistrong.GameResourceMS.base.action.BaseAction;
import com.Penistrong.GameResourceMS.demo.indexTest.service.IndexTestService;

/**
 * 测试用Controller
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年4月21日下午3:57:18
 */
@Controller
@RequestMapping("/demo/indexTest")
public class IndexTestController extends BaseAction<IndexTestService<Map<String,Object>>,Map<String,Object>>{
	@RequestMapping
	public String index(ModelMap map,HttpServletRequest request) {
		return "demo/indexTest";
	}
	
	/**
	 * 测试:添加
	 * @param map
	 * @param request
	 * @return
	 */
	@Transactional
	@ResponseBody
	@RequestMapping(value="addTest")
	public boolean addTest(@RequestBody Map<String,Object> map,HttpServletRequest request) {
		CurrentUser currentUser = getCurrentUser(request);
		String time = DateFormatUtils.format(UtilTools.getDate(),"yyyy-MM-dd HH:mm:ss");
		map.put("RESOURCE_ID", UtilTools.getUUID());
		map.put("CREATE_USER", currentUser.getUser_id());
		map.put("CREATE_TIME", time);
		map.put("MODIFY_USER", currentUser.getUser_id());
		map.put("MODIFY_TIME", time);
		map.put("mapping", "addTest");
		service.add(map);
		return true;
	}
	
	/**
	 * 测试:修改
	 * @param map
	 * @param request
	 * @return
	 */
	@Transactional
	@ResponseBody
	@RequestMapping(value="updateTest")
	public boolean updateTest(@RequestBody Map<String,Object> map,HttpServletRequest request) {
		CurrentUser currentUser = getCurrentUser(request);
		String time = DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss");
		map.put("MODIFY_USER",currentUser.getUser_id());
		map.put("MODIFY_TIME", time);
		map.put("mapping", "updateTest");
		service.update(map);
		return true;
	}
	
	/**
	 * 测试:删除(可选的多选删除)
	 * @param map
	 * @param request
	 * @return
	 */
	@Transactional
	@ResponseBody
	@RequestMapping(value="deleteTest")
	public boolean deleteTest(@RequestBody Map<String,Object> map,HttpServletRequest request) {
		String ids[] = map.get("ids").toString().split(",");
		for(String id:ids) {
			service.delete(id, "deleteTest");
		}
		return true;
	}
}
