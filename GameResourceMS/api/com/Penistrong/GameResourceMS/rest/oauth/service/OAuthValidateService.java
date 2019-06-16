package com.Penistrong.GameResourceMS.rest.oauth.service;

import java.util.Map;

import com.Penistrong.GameResourceMS.base.service.BaseService;

public interface OAuthValidateService <R extends Object> extends BaseService<R>{
	
	void addAccessToken(Map<String,Object> map);

}
