package com.Penistrong.GameResourceMS.posts.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
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
		Map<String, Object> preCheckParams = new HashMap<>();
		preCheckParams.put("poster_id", poster_id);
		preCheckParams.put("post_id", post_id);
		if(this.service.validatePost(preCheckParams)) {
			map.addAttribute("poster_id", poster_id);
			map.addAttribute("post_id", post_id);
			//更新帖子浏览量信息
			this.service.updatePostVisits(post_id);
			
			return "posts/post";
		}else
			return "redirect:/404";
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
	
	/**
	 * @Description 由于建立新帖子需要同时在三个表中插入新的记录且要发放发帖奖励(意味着还要要更新user_accounts这张表)，于是采用事务注解驱动进行数据库回滚防止对多个表的操作过程中出错
	 * @param params
	 * @param request
	 * @param session
	 * @return
	 */
	@Transactional(rollbackFor = Exception.class)
	@ResponseBody
	@RequestMapping(value="/createNewPost",method = RequestMethod.POST)
	public Map<String, Object> createNewPost(@RequestBody Map<String,Object> params,HttpServletRequest request,HttpSession session){
		params.put("resource_id", ((CurrentUser)session.getAttribute("currentUser")).getResource_id());
		params.put("poster_id", ((CurrentUser)session.getAttribute("currentUser")).getUser_id());
		params.put("post_author", ((CurrentUser)session.getAttribute("currentUser")).getUser_name());
		Integer id=Integer.valueOf(this.service.getLatestPID());
		String post_id=String.format("%06d", id+1);
		params.put("post_id", post_id);
		Map<String, Object> result = new HashMap<>();
		if(this.service.createNewPost(params)) {
			if(this.service.createPostExtend(params) && this.service.createPostReply(params) && this.service.rewardsForNewPost(params)) {
				result.put("poster_id", params.get("poster_id"));
				result.put("post_id", params.get("post_id"));
				result.put("msg", "success");
				return result;
			}
		}
		result.put("msg", "false");
		return result;
	}
	
	/**
	 * @Description 由于回复帖子后要在两张与帖子内回复有关的表中插入记录且要发放用户回复奖励，此处采用事务进行回滚
	 * @param params
	 * @param request
	 * @param session
	 * @return
	 */
	@Transactional(rollbackFor = Exception.class)
	@ResponseBody
	@RequestMapping(value="/createNewReply",method = RequestMethod.POST)
	public boolean insertNewReply(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpSession session){
		CurrentUser curUser = (CurrentUser)session.getAttribute("currentUser");
		params.put("replier_id", curUser.getResource_id());
		params.put("replier_name", curUser.getUser_name());
		if(this.service.insertNewReply(params))
			if(this.service.updateFloorsOfPost(params)) {
					//回复成功,发放奖励(可能不到账哦)
					if(this.service.rewardsForReply(params)) {
						curUser.setExp(String.valueOf((Integer.valueOf(curUser.getExp())+3)));
						curUser.setCoins(String.valueOf((Integer.valueOf(curUser.getCoins())+1)));
						session.setAttribute("currentUser", curUser);
					}
					return true;
			}
		return false;
	}
	
	//params初始包含post_id的k-v
	@ResponseBody
	@RequestMapping(value="/getRepliesOfPost", method=RequestMethod.POST)
	public List<Map<String, Object>> getRepliesOfPost(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpSession session){
		List<Map<String, Object>> replies_list = this.service.getRepliesOfPost(params);
		for(Map<String, Object> reply:replies_list)
			reply.put("reply_time", reply.get("reply_time").toString());
		return replies_list;
	}
	
	@ResponseBody
	@RequestMapping(value="/getPostMainInfo", method=RequestMethod.POST)
	public Map<String, Object> getPostMainInfo(@RequestBody Map<String, Object>params, HttpServletRequest request){
		Map<String, Object> resultMap = this.service.getPostMainInfo(params);
		resultMap.put("upload_time", resultMap.get("upload_time").toString());
		resultMap.put("last_reply_time", resultMap.get("last_reply_time").toString());
		return resultMap;
	}
}
