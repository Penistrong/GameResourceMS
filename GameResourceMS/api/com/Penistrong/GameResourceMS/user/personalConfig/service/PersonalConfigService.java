package com.Penistrong.GameResourceMS.user.personalConfig.service;

import java.util.List;
import java.util.Map;

import com.Penistrong.GameResourceMS.base.service.BaseService;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年5月12日下午2:53:24
 * @param <R>
 */
public interface PersonalConfigService<R extends Object> extends BaseService<R> {
	//修改用户信息
	boolean updateUserInfo(Map<String, Object> params);
	//上传头像
	boolean uploadPortrait(Map<String, Object> params);
	//获取头像
	String getPortrait(Map<String, Object> params);
	//获取发帖历史
	List<Map<String, Object>> getUserPostsHistory(Map<String, Object> params);
	//删除帖子
	boolean deletePost(Map<String, Object> params);
}
