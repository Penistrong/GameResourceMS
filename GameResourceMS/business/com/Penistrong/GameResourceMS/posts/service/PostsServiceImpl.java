package com.Penistrong.GameResourceMS.posts.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

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
		String sql = String.format("%s%s", new Object[] {this.sqlMapping,"createNewPost"});
		this.logger.debug("Execute {} params : {}", sql, map);
		return this.sqlSessionTemplate.insert(sql, map)>0?true:false;
	}

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

}
