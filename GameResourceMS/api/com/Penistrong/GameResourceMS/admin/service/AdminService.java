package com.Penistrong.GameResourceMS.admin.service;

import java.util.List;
import java.util.Map;

import com.Penistrong.GameResourceMS.base.service.BaseService;

/**
 * 
 * @author Penistrong
 *
 * @param <R>
 */
public interface AdminService <R extends Object> extends BaseService<R>{
	
	//获取当前管理员信息
	Map<String,Object> getAdminInfo(Map<String,Object> params);
	
	//获取用户信息
	List<Map<String,Object>> getUserInfo();
	
}
