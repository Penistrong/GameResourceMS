package com.Penistrong.GameResourceMS.gate.login.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;
import com.Penistrong.GameResourceMS.gate.login.mapper.LoginMapper;
import com.Penistrong.GameResourceMS.po.CurrentUser;
import com.Penistrong.GameResourceMS.po.User;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年4月30日下午7:17:12
 */
@Service
public class LoginServiceImpl extends BaseServiceImpl<LoginMapper,Map<String,Object>> implements LoginService<Map<String,Object>>{
	@Override
	public CurrentUser login(Map<String,Object> map) {
		String sql = String.format("%s%s", new Object[] {this.sqlMapping,map.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, map);
		User user = this.sqlSessionTemplate.<User>selectOne(sql, map);
		if(user != null) {
			System.out.println("[LoggedUser]"+user);
			return new CurrentUser(user);
		}else {
			return null;
		}
	}
}
