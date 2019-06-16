package com.Penistrong.GameResourceMS.posts.service;

import java.util.List;
import java.util.Map;

import com.Penistrong.GameResourceMS.base.service.BaseService;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年5月15日下午4:46:52
 * @param <R>
 */
public interface PostsService<R extends Object> extends BaseService<R> {

	//获取帖子(按最后回复的时间排序)
	List<Map<String,Object>> getLatestPosts();
	
	//发布新帖子
	boolean createNewPost(Map<String,Object> map);
	
}
