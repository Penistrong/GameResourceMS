package com.Penistrong.GameResourceMS.base.action;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Penistrong.GameResourceMS.Util.UtilTools;
import com.Penistrong.GameResourceMS.base.constant.SystemConstant;
import com.Penistrong.GameResourceMS.base.service.BaseService;
import com.Penistrong.GameResourceMS.po.CurrentUser;
import com.github.pagehelper.PageInfo;


/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年4月21日上午11:02:43
 * @param <T> 注入的servicee
 */
public abstract class BaseAction<T extends BaseService<R>,R extends Object> {
	
	protected final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	protected T service;
	
	@Autowired//spring 将与T同名的bean(此时为service的T)自动注入进来
	public void setService(T t) {
		this.service = t;
	}
	
	/**
	 * 获取当前用户
	 * @param request
	 * @return
	 */
	protected CurrentUser getCurrentUser(HttpServletRequest request) {
		return (CurrentUser)request.getSession(false).getAttribute("currentUser");
	}
	
	/**
	 * 分页获取数据
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="page",method=RequestMethod.POST)
	public PageInfo<R> page(@RequestBody Map<String,Object> map,HttpServletRequest request){
		map.put("currentUser", request.getRemoteUser());
		return service.page(map);
	}
	
	/**
	 * 获取符合条件的所有数据
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="list",method=RequestMethod.POST)
	public List<R> list(@RequestBody Map<String,Object> map,HttpServletRequest request){
		map.put("currentUser", request.getRemoteUser());
		return service.list(map);
	}
	
	/**
	 * 根据id获取数据
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="get",method=RequestMethod.POST)
	public R get(@RequestBody Map<String,Object> map,HttpServletRequest request) {
		map.put("currentUser", request.getRemoteUser());
		return service.get(map);
	}
	
	/**
	 * 添加新记录
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="add",method=RequestMethod.POST)
	public boolean add(@RequestBody Map<String,Object> map,HttpServletRequest request) {
		String key = "resource_id";
		if(map.get(key)!= null && !"".equals(map.get(key))) {
			//自定义主键
			key = map.get(key).toString();
		}
		map.put(key, UtilTools.getUUID());
		map.put("create_user", request.getRemoteUser());
		map.put("create_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
		return service.add(map);
	}
	
	/**
	 * 批量添加记录
	 * @param list
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="addBatch",method=RequestMethod.POST)
	public boolean addBatch(@RequestBody List<Map<String,Object>> list, HttpServletRequest request) {
		for(Map <String,Object> map:list) {
			String key = "resource_id";
			if(map.get(key)!= null && !"".equals(map.get(key))) {
				//自定义主键
				key = map.get(key).toString();
			}
			map.put(key, UtilTools.getUUID());
			map.put("create_user", request.getRemoteUser());
			map.put("create_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
		}
		return service.addBatch(list);
	}
	
	/**
	 * 修改记录
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="update",method=RequestMethod.POST)
	public boolean update(@RequestBody Map<String,Object> map,HttpServletRequest request) {
		map.put("modify_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
		map.put("modify_user", request.getRemoteUser());
		return service.update(map);
	}
	
	/**
	 * 批量修改记录
	 * @param list
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="updateBatch",method=RequestMethod.POST)
	public boolean updateBatch(@RequestBody List<Map<String,Object>> list,HttpServletRequest request) {
		for(Map<String,Object> map:list) {
			map.put("modify_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
			map.put("modify_user", request.getRemoteUser());
		}
		return service.updateBatch(list);
	}
	
	/**
	 * 删除记录
	 * @param ids
	 * @param request
	 * @param mapping
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="delete",method=RequestMethod.POST)
	public boolean delete(@RequestParam(value="ids",required=true) String ids,HttpServletRequest request,@RequestParam(value="mapping",defaultValue="delete")String mapping) {
		return service.delete(ids, mapping);
	}
}
