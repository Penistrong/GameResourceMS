package com.Penistrong.GameResourceMS.gate.login.service;

import java.util.Map;

import com.Penistrong.GameResourceMS.base.service.BaseService;
import com.Penistrong.GameResourceMS.po.CurrentUser;

/**
 * 
 * @author Dell[BloodStream]
 * @version GameResourceMS
 * @built_time 2019年6月19日下午7:28:27
 * @param <R>
 */
public interface LoginService<R extends Object> extends BaseService<R> {
	CurrentUser login(Map<String,Object> map);
}
