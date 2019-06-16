package com.Penistrong.GameResourceMS.rest.oauth.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;
import com.Penistrong.GameResourceMS.rest.oauth.mapper.OAuthValidateMapper;

@Service
public class OAuthValidateServiceImpl extends BaseServiceImpl<OAuthValidateMapper,Map<String,Object>> implements OAuthValidateService<Map<String,Object>>{

	@Override
	@Transactional
	public void addAccessToken(Map<String, Object> map) {
		//修改code的状态
		map.put("mapping", "updateCodeStatus");
		update(map);
		//将access_token入库
		map.put("mapping", "addAccessToken");
		add(map);
	}

}
