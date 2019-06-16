package com.Penistrong.GameResourceMS.gate.register.service;

import java.util.Map;

import com.Penistrong.GameResourceMS.base.service.BaseService;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年4月30日下午7:00:45
 * @param <R>
 */
public interface RegisterService<R extends Object> extends BaseService<R> {
	boolean Register(Map<String,Object> map);
	
	String Is_User_Existed(Map<String,Object> map);
}
