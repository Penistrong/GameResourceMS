package com.Penistrong.GameResourceMS.user.dataAnalysis.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;
import com.Penistrong.GameResourceMS.po.DetailedUser;
import com.Penistrong.GameResourceMS.po.User;
import com.Penistrong.GameResourceMS.user.dataAnalysis.mapper.DataAnalysisMapper;

/**
 * 
 * @author Penistrong[chenliwei]
 * @project GameResourceMS	
 * @date 2019年6月17日上午7:56:26
 */
@Service
public class DataAnalysisServiceImpl extends BaseServiceImpl<DataAnalysisMapper,Map<String,Object>> implements DataAnalysisService<Map<String,Object>>{
	
	@Override
	public DetailedUser getUserStat(String resource_id,String user_id) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resource_id", resource_id);
		map.put("user_id", user_id);
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, "getUserStats"});
		this.logger.debug("Execute {} params : {}", sql, map);
		DetailedUser user_stats = this.sqlSessionTemplate.<DetailedUser>selectOne(sql, map);
		return user_stats;
	}
	
}
