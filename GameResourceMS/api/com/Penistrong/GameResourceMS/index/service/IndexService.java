package com.Penistrong.GameResourceMS.index.service;

import java.util.Map;

import com.Penistrong.GameResourceMS.base.service.BaseService;
import com.Penistrong.GameResourceMS.po.User;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年5月1日下午10:24:54
 * @param <R>
 */
public interface IndexService<R extends Object> extends BaseService<R> {
	
	//获取当前用户信息
	User getUserInfo(String user_id);
	
	//获取头像信息
	String getPortrait(String resource_id,String user_id);
	
	
}
