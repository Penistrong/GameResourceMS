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
	
	//检查帖子是否存在
	boolean validatePost(Map<String, Object> map);

	//获取帖子(按最后回复的时间排序)
	List<Map<String,Object>> getLatestPosts();
	
	//发布新帖子
	boolean createNewPost(Map<String,Object> map);
	
	//回复帖子
	boolean insertNewReply(Map<String, Object> map);
	
	//获取帖子楼层，以便增加新的回复(盖楼)
	Integer getFloorsOfPost(String post_id);
	
	//更新帖子楼层
	boolean updateFloorsOfPost(Map<String, Object> map);
	
	//获取帖子内部回复内容
	List<Map<String,Object>> getRepliesOfPost(Map<String,Object> map);
	
	//获取帖子主要内容
	Map<String, Object> getPostMainInfo(Map<String, Object> map);
	
	//更新帖子浏览量
	boolean updatePostVisits(String post_id);
}
