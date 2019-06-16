package com.Penistrong.GameResourceMS.gate.login.service;

import java.util.Map;

import com.Penistrong.GameResourceMS.base.service.BaseService;
import com.Penistrong.GameResourceMS.po.CurrentUser;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年4月30日下午7:00:10
 * @param <R>
 */
public interface LoginService<R extends Object> extends BaseService<R> {
	CurrentUser login(Map<String,Object> map);
}
