package com.Penistrong.GameResourceMS.user.personalConfig.service;

import java.util.Map;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import com.Penistrong.GameResourceMS.Util.UtilTools;
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
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, params);
		return this.sqlSessionTemplate.update(sql, params)>0?true:false;
	}

	@Override
	public boolean uploadPortrait(Map<String, Object> params) {
		params.put("mapping", "uploadPortrait");
		params.put("portrait_id", UtilTools.getUUID());
		params.put("upload_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, params);
		return this.sqlSessionTemplate.update(sql, params)>0?true:false;
	}

	@Override
	public String getPortrait(Map<String, Object> params) {
		params.put("mapping", "getPortrait");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, params);
		return this.sqlSessionTemplate.selectOne(sql, params);
	}

}
