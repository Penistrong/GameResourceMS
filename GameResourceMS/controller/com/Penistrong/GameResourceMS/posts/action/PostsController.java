package com.Penistrong.GameResourceMS.posts.action;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Penistrong.GameResourceMS.base.action.BaseAction;
import com.Penistrong.GameResourceMS.po.CurrentUser;
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
	@RequestMapping
	public String index(ModelMap map, HttpServletRequest request) {
		return "posts/post";
	}
	
	/**
	 * @Title:redirectToPost
	 * @Description:重定向至对应的帖子，并且使用的是Restful风格传参,(url prefix)/{user_id}/{post_id}
	 * @param map
	 * @param request
	 * @return 
	 * @return String
	 * @throws
	 */
	@RequestMapping(value="/{poster_id}/{post_id}", method=RequestMethod.GET)
	public String redirectToPost(ModelMap map, HttpServletRequest request,@PathVariable("poster_id") String poster_id,@PathVariable("post_id") String post_id) {
		map.addAttribute("poster_id", poster_id);
		map.addAttribute("post_id", post_id);
		return "posts/post";
	}
	
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
	
	@ResponseBody
	@RequestMapping(value="/insertNewReply",method = RequestMethod.POST)
	public boolean insertNewReply(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpSession session){
		params.put("replier_id", ((CurrentUser)session.getAttribute("currentUser")).getUser_id());
		return this.service.insertNewReply(params);
	}
	
	@ResponseBody
	@RequestMapping(value="/getRepliesOfPost", method=RequestMethod.POST)
	public List<Map<String, Object>> getRepliesOfPost(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpSession session){
		List<Map<String, Object>> replies_list = this.service.getRepliesOfPost(params);
		for(Map<String, Object> reply:replies_list)
			reply.put("reply_time", reply.get("reply_time").toString());
		return replies_list;
	}
}
