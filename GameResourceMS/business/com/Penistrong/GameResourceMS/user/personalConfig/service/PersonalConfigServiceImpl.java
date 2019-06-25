package com.Penistrong.GameResourceMS.user.personalConfig.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;
import com.Penistrong.GameResourceMS.user.personalConfig.mapper.PersonalConfigMapper;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年5月13日下午8:49:55
 */
@Service
public class PersonalConfigServiceImpl extends BaseServiceImpl<PersonalConfigMapper,Map<String,Object>> implements PersonalConfigService<Map<String,Object>>{

	@Override
	public boolean updateUserInfo(Map<String, Object> params) {
		params.put("mapping", "updateUserInfo");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping")});
		this.logger.debug("Execute {} params : {}", sql, params);
		return this.sqlSessionTemplate.update(sql, params)>0?true:false;
	}

}
