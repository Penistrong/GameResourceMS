package com.Penistrong.GameResourceMS.index.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;
import com.Penistrong.GameResourceMS.index.mapper.IndexMapper;
import com.Penistrong.GameResourceMS.po.User;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年5月10日下午3:43:22
 */
@Service
public class IndexServiceImpl extends BaseServiceImpl<IndexMapper,Map<String,Object>> implements IndexService<Map<String,Object>>{
	
	@Override
	public User getUserInfo(String user_id) {
		String sql = String.format("%s%s", new Object[] {this.sqlMapping,"getUserInfo"});
		this.logger.debug("Execute {} params : {}", sql,user_id);
		User user = this.sqlSessionTemplate.<User>selectOne(sql, user_id);
		return user;
	}

	@Override
	public String getPortrait(String resource_id, String user_id) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("resource_id", resource_id);
		map.put("user_id", user_id);
		String sql = String.format("%s%s", new Object[] {this.sqlMapping,"getPortrait"});
		this.logger.debug("Execute {} params : {}", sql, map);
		Map<String,Object> portrait_info_map = this.sqlSessionTemplate.selectOne(sql, map);
		
		//将图片的上传信息与名称装配为图片的路径url
		SimpleDateFormat datetime_formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date datetime = null;
		try {
			datetime = datetime_formatter.parse(portrait_info_map.get("upload_time").toString());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String portrait_time = new SimpleDateFormat("yyyy-MM-dd").format(datetime);
		String[] time_array = portrait_time.split("-");
		String timeToUrl ="/"+time_array[0]+"/"+time_array[1]+"/"+time_array[2]+"/";
		
		return String.format("%s%s", new Object[] {timeToUrl,portrait_info_map.get("portrait_name")});
	}
	
}
