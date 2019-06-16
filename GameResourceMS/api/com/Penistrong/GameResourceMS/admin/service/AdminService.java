package com.Penistrong.GameResourceMS.admin.service;

import java.util.List;
import java.util.Map;

import com.Penistrong.GameResourceMS.base.service.BaseService;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年7月19日上午11:51:21
 */
public interface AdminService <R extends Object> extends BaseService<R>{
	
	//获取当前管理员信息
	Map<String,Object> getAdminInfo(Map<String,Object> params);
	
	//获取用户信息
	List<Map<String,Object>> getUserInfo();
	
}
