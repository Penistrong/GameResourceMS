package com.Penistrong.GameResourceMS.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import com.Penistrong.GameResourceMS.Util.UtilTools;
import com.Penistrong.GameResourceMS.admin.mapper.AdminMapper;
import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年7月19日下午2:49:43
 */
@Service
public class AdminServiceImpl extends BaseServiceImpl<AdminMapper,Map<String,Object>> implements AdminService<Map<String,Object>>{

	@Override
	public Map<String, Object> getAdminInfo(Map<String, Object> params) {
		// TODO Auto-generated method stub
		params.put("mapping", "getAdminInfo");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
		this.logger.debug("Execute {} params: {}", sql, params);
		Map<String,Object> adminInfo = this.sqlSessionTemplate.selectOne(sql, params);
		if(adminInfo.get("admin_id")!=null) {
			params.put("last_querytime", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
			params.put("mapping", "updateAdminInfo");
			this.update(params);//更新管理员登录时间
			return adminInfo;
		}else {
			return null;
		}
	}

	@Override
	public List<Map<String, Object>> getUserInfo() {
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("mapping", "getUserInfo");
		List<Map<String,Object>> userInfos = this.list(params);
		return userInfos;
	}
	
}
