package com.Penistrong.GameResourceMS.user.dataAnalysis.service;

import com.Penistrong.GameResourceMS.base.service.BaseService;
import com.Penistrong.GameResourceMS.po.DetailedUser;
import com.Penistrong.GameResourceMS.po.User;
/**
 * 
 * @author Penistrong[chenliwei]
 * @project GameResourceMS	
 * @built_date 2019年6月17日上午8:12:03
 */
public interface DataAnalysisService <R extends Object> extends BaseService<R>{
	
	//获取当前用户信息及对应统计数据
	DetailedUser getUserStat(String resource_id,String user_id);
}
