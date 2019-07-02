package com.Penistrong.GameResourceMS.posts.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Penistrong.GameResourceMS.Util.UtilTools;
import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;
import com.Penistrong.GameResourceMS.posts.mapper.PostsMapper;

@Service
public class PostsServiceImpl extends BaseServiceImpl<PostsMapper, Map<String,Object>> implements PostsService<Map<String,Object>>{

	@Override
	public List<Map<String, Object>> getLatestPosts() {
		String sql = String.format("%s%s", new Object[] {this.sqlMapping,"getLatestPosts"});
		this.logger.debug("Execute {}", sql);
		return this.sqlSessionTemplate.selectList(sql);
	}

	@Override
	public boolean createNewPost(Map<String, Object> map) {
		map.put("mapping", "createNewPost");
		//map.put("post_id", this.getFloorsOfPost(map.get("post_id").toString()) + 1);
		map.put("upload_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
		String sql = String.format("%s%s", new Object[] {this.sqlMapping,map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.insert(sql, map)>0?true:false;
	}
	
	@Override
	public boolean createPostExtend(Map<String, Object> map) {
		map.put("mapping", "createPostExtend");
		map.put("floors", 1);
		map.put("tags","new");
		map.put("visits", 1);
		String sql = String.format("%s%s", new Object[] {this.sqlMapping,map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.insert(sql, map)>0?true:false;
	}
	
	
	@Override
	public boolean createPostReply(Map<String, Object> map) {
		map.put("mapping", "createPostReply");
		map.put("reply", "一楼自占");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping,map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.insert(sql, map)>0?true:false;
	}

	@Transactional(rollbackFor = RuntimeException.class)
	@Override
	public boolean insertNewReply(Map<String, Object> map) {
		map.put("mapping", "insertNewReply");
		map.put("floor", this.getFloorsOfPost(map.get("post_id").toString()) + 1);
		map.put("reply_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.insert(sql, map)>0?true:false;
	}

	@Override
	public Integer getFloorsOfPost(String post_id) {
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, "getFloorsOfPost"});
		this.logger.debug("Execute {} params : {}", sql, post_id);
		return this.sqlSessionTemplate.<Integer>selectOne(sql, post_id);
	}
	
	@Override
	public boolean updateFloorsOfPost(Map<String, Object> map) {
		map.put("mapping", "updateFloorsOfPost");
		if(map.containsKey("floor"))
			map.put("floors", map.get("floor"));
		
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.update(sql, map)>0?true:false;
	}
	
	@Override
	public List<Map<String, Object>> getRepliesOfPost(Map<String, Object> map) {
		map.put("mapping", "getRepliesOfPost");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.selectList(sql, map);
	}

	@Override
	public Map<String, Object> getPostMainInfo(Map<String, Object> map) {
		map.put("mapping", "getPostMainInfo");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.selectOne(sql, map);
	}

	@Override
	public boolean validatePost(Map<String, Object> map) {
		map.put("mapping", "validatePost");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.selectOne(sql, map);
	}

	@Override
	public String getLatestPID() {
		String sql  = String.format("%s%s", new Object[] {this.sqlMapping, "getLatestPID"});
		return this.sqlSessionTemplate.selectOne(sql);
	}

	public boolean updatePostVisits(String post_id) {
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, "updatePostVisits"});
		return this.sqlSessionTemplate.update(sql, post_id)>0?true:false;
	}

	@Override
	public boolean rewardsForReply(Map<String, Object> map) {
		map.put("mapping", "rewardsForReply");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.update(sql, map)>0?true:false;
	}

	@Override
	public boolean rewardsForNewPost(Map<String, Object> map) {
		map.put("mapping", "rewardsForNewPost");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.update(sql, map)>0?true:false;
	}

	
	
}
