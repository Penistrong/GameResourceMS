package com.Penistrong.GameResourceMS.gate.register.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import com.Penistrong.GameResourceMS.Util.UtilTools;
import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;
import com.Penistrong.GameResourceMS.gate.register.mapper.RegisterMapper;
import com.Penistrong.GameResourceMS.po.User;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年5月2日下午7:34:45
 */
@Service
public class RegisterServiceImpl extends BaseServiceImpl<RegisterMapper, Map<String,Object>> implements RegisterService<Map<String,Object>>{

	@Override
	public boolean Register(Map<String, Object> map) {
		//for table user_accounts
		map.put("mapping", "register");
		map.put("resource_id",UtilTools.getUUID());
		map.put("user_type", "normal");
		map.put("level", "1");
		map.put("exp", "0");
		map.put("coins", "5");
		map.put("posts", "0");
		map.put("authentication", "user_base");
		map.put("identity", "普通用户");
		map.put("create_user", "auto_Controller");
		map.put("create_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
		map.put("modify_user", map.get("user_id"));
		map.put("modify_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
		
		String sql = String.format("%s%s", new Object[] {this.sqlMapping,map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		
		//for table user_moreinfos
		map.put("portrait_name", "common_portrait.png");
		try {
			map.put("upload_time", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2000-01-01 00:00:00"));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String extend_sql = String.format("%s%s", new Object[] {this.sqlMapping,"setmoreinfos"});
		this.logger.debug("Execute {} params : {}",extend_sql, map);
		
		//for table user_megadata
		map.put("pv", 0);
		map.put("uv", 0);
		map.put("exdau",0);
		map.put("KPI", 0);
		String statistics_sql = String.format("%s%s", new Object[] {this.sqlMapping, "setmegadata"});
		this.logger.debug("Execute {} params: {}", statistics_sql, map);
		
		return this.sqlSessionTemplate.insert(sql, map)>0&&this.sqlSessionTemplate.insert(extend_sql, map)>0&&this.sqlSessionTemplate.insert(statistics_sql, map)>0?true:false;
	}

	@Override
	public String Is_User_Existed(Map<String, Object> map) {
		map.put("mapping", "is_user_existed");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping,map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		User user = this.sqlSessionTemplate.<User>selectOne(sql, map);
		if(user == null) {
			return "Ready_To_Register";
		}
		if(user.getUser_id()!=null) {
			return "the ID has been registered!";
		}else if(user.getUser_name().equals(map.get("user_name"))) {
			return "the Name has been registered!";
		}else if(user.getUser_id()!=null && user.getUser_name().equals(map.get("user_name"))){
			return "both have been occupied";
		}else {
			return "Unknown error appeared";
		}
	}

}
