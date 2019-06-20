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
	public DetailedUser getUserStats(String resource_id,String user_id) {
		Map<String, Object> map = new HashMap<>();
		map.put("resource_id", resource_id);
		map.put("user_id", user_id);
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, "getUserStats"});
		this.logger.debug("Execute {} params : {}", sql, map);
		DetailedUser user_stats = this.sqlSessionTemplate.<DetailedUser>selectOne(sql, map);
		return user_stats;
	}

	@Override
	public Map<String, Map<String, Object>> getUserStatsOfYear(String resource_id) {
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, "getUserStatsOfYear"});
		int mon = 1;//for 1:12
		Map<String,Object> params = new HashMap<>();
		params.put("resource_id",resource_id);
		params.put("mon",mon);
		this.logger.debug("Execute {} params : {}", sql, params);//Only debug primary sql
		Map<String,Map<String,Object>> result = new HashMap<>();
		for(;mon<=12;mon++) {
			params.put("mon", mon);//update param month
			Map<String,Object> monthStats = this.sqlSessionTemplate.<Map<String,Object>>selectOne(sql,params);
			result.put(String.valueOf(mon), monthStats);
		}
		return result;
	}

}
