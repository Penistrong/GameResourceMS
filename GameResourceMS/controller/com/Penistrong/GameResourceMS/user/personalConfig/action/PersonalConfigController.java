package com.Penistrong.GameResourceMS.user.personalConfig.action;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.imageio.ImageIO;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.Penistrong.GameResourceMS.base.action.BaseAction;
import com.Penistrong.GameResourceMS.po.CurrentUser;
import com.Penistrong.GameResourceMS.user.personalConfig.service.PersonalConfigService;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

@Controller
@RequestMapping("/user/personalConfig")
public class PersonalConfigController extends BaseAction<PersonalConfigService<Map<String,Object>>, Map<String,Object>>{
	@RequestMapping
	public String index(ModelMap map,HttpServletRequest request) {
		return "user/personalConfig";
	}
	
	@ResponseBody
	@RequestMapping(value="/updateUserInfo", method=RequestMethod.POST)
	public String updateUserInfo(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpSession session){
		CurrentUser curUser = (CurrentUser)session.getAttribute("currentUser");
		params.put("resource_id", curUser.getResource_id());
		params.put("user_id",curUser.getUser_id());	
		return String.valueOf(this.service.updateUserInfo(params));//type boolean -> String
	}
	
	@ResponseBody
	@RequestMapping(value="/uploadPortrait",method=RequestMethod.POST)
	public String uploadPortrait(HttpServletRequest request, @RequestParam("portrait") MultipartFile file, HttpSession session) throws IOException {
		CurrentUser curUser = (CurrentUser)session.getAttribute("currentUser");
		if(!file.isEmpty()) {
			BASE64Encoder encoder = new BASE64Encoder();
			//BASE64编码存储图片
			String img = encoder.encode(file.getBytes());
			Map<String, Object> params = new HashMap<>();
			params.put("resource_id", curUser.getResource_id());
			params.put("user_id", curUser.getUser_id());
			params.put("portrait", img);
			if(this.service.uploadPortrait(params))
				return "success";
			else
				return "failed";
		}else
			return "failed";
	}
	
	/**
	 * @throws IOException 
	 * @Title:getPortraitInDB
	 * @Description:从数据库取出以BASE64编码的头像图片并以流形式直接返回到前端以超链接形式获取图片的img DOM里
	 * @param request
	 * @param session 
	 * @return void
	 * @throws
	 */
	@RequestMapping(value="/getPortrait", method=RequestMethod.GET, produces=MediaType.IMAGE_JPEG_VALUE)
	@ResponseBody
	public byte[] getPortraitInDB(HttpServletRequest request, HttpSession session) throws IOException {
		CurrentUser curUser = (CurrentUser)session.getAttribute("currentUser");
		Map<String, Object> params = new HashMap<>();
		params.put("resource_id", curUser.getResource_id());
		params.put("user_id", curUser.getUser_id());
		String portait = this.service.getPortrait(params);
		
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] bytes = decoder.decodeBuffer(portait);
		//调整异常数据
		for(int i = 0;i<bytes.length;i++)
			if(bytes[i]<0)
				bytes[i] += 256;
		return bytes;
	}
	
	//只有唯一参数resource_id进行查询并返回头像 For: .../user/personalConfig/getPor?resource_id={RequestParam}
	@RequestMapping(value="/getPor", method=RequestMethod.GET, produces=MediaType.IMAGE_JPEG_VALUE)
	@ResponseBody
	public byte[] getPortrait(HttpServletRequest request, @RequestParam String resource_id) throws IOException {
		Map<String, Object> params = new HashMap<>();
		params.put("resource_id", resource_id);
		String portait = this.service.getPortrait(params);
		
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] bytes = decoder.decodeBuffer(portait);
		//调整异常数据
		for(int i = 0;i<bytes.length;i++)
			if(bytes[i]<0)
				bytes[i] += 256;
		return bytes;
	}
	
	@ResponseBody
	@RequestMapping(value="/getUserPostsHistory", method=RequestMethod.POST)
	public List<Map<String, Object>> getUserPostsHistory(HttpServletRequest request, HttpSession session){
		CurrentUser curUser = (CurrentUser)session.getAttribute("currentUser");
		Map<String, Object> params = new HashMap<>();
		params.put("resource_id", curUser.getResource_id());
		params.put("poster_id", curUser.getUser_id());
		List<Map<String, Object>> postsList =  this.service.getUserPostsHistory(params);
		for(Map<String, Object> post:postsList)
			post.put("upload_time", post.get("upload_time").toString());
		return postsList;
	}
	
	@ResponseBody
	@RequestMapping(value="/deletePost", method=RequestMethod.POST)
	public boolean deletePost(@RequestBody Map<String,Object> params, HttpServletRequest request) {
		return this.service.deletePost(params);
	}
}
