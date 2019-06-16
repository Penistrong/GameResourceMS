package com.Penistrong.GameResourceMS.posts.action;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Penistrong.GameResourceMS.base.action.BaseAction;
import com.Penistrong.GameResourceMS.posts.service.PostsService;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年5月15日下午4:46:57
 */
@Controller
@RequestMapping("/posts")
public class PostsController extends BaseAction<PostsService<Map<String,Object>>,Map<String,Object>>{
	/**
	 * 按最后回复时间查询帖子
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getLatestPosts",method=RequestMethod.POST)
	public List<Map<String,Object>> getLatestPosts(HttpServletRequest request){
		List<Map<String,Object>> posts_list =  this.service.getLatestPosts();
		for(Map<String,Object> post:posts_list) {
			post.put("last_reply_time", post.get("last_reply_time").toString());
			post.put("upload_time", post.get("upload_time").toString());
		}
		return posts_list;
	}
	
	@ResponseBody
	@RequestMapping(value="/createNewPost",method = RequestMethod.POST)
	public Map<String,Object> createNewPost(@RequestBody Map<String,Object> map,HttpServletRequest request){
		return null;
	}
}
