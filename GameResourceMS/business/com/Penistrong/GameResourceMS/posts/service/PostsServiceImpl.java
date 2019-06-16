package com.Penistrong.GameResourceMS.posts.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

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

}
