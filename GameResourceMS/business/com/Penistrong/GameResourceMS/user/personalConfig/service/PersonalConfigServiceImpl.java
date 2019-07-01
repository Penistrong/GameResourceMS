package com.Penistrong.GameResourceMS.user.personalConfig.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.Penistrong.GameResourceMS.Util.UtilTools;
import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;
import com.Penistrong.GameResourceMS.user.personalConfig.mapper.PersonalConfigMapper;

/**
 * 
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年5月13日下午8:49:55
 */
@Service
public class PersonalConfigServiceImpl extends BaseServiceImpl<PersonalConfigMapper,Map<String,Object>> implements PersonalConfigService<Map<String,Object>>{

	@Override
	public boolean updateUserInfo(Map<String, Object> params) {
		params.put("mapping", "updateUserInfo");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, params);
		return this.sqlSessionTemplate.update(sql, params)>0?true:false;
	}

	@Override
	public boolean uploadPortrait(Map<String, Object> params) {
		params.put("mapping", "uploadPortrait");
		params.put("portrait_id", UtilTools.getUUID());
		params.put("upload_time", DateFormatUtils.format(UtilTools.getDate(), "yyyy-MM-dd HH:mm:ss"));
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, params);
		return this.sqlSessionTemplate.update(sql, params)>0?true:false;
	}

	@Override
	public String getPortrait(Map<String, Object> params) {
		params.put("mapping", "getPortrait");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, params);
		return this.sqlSessionTemplate.selectOne(sql, params);
	}

	@Override
	public List<Map<String, Object>> getUserPostsHistory(Map<String, Object> params) {
		params.put("mapping", "getUserPostsHistory");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, params);
		return this.sqlSessionTemplate.selectList(sql, params);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public boolean deletePost(Map<String, Object> params) {
		params.put("mapping", "deletePostReply");
		String sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
		this.logger.debug("Execute {} params : {}", sql, params);
		if(this.sqlSessionTemplate.delete(sql, params)>0) {
			params.put("mapping", "deletePostExtend");
			sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
			this.logger.debug("Execute {} params : {}", sql, params);
			if(this.sqlSessionTemplate.delete(sql, params)>0) {
				params.put("mapping", "deletePostBase");
				sql = String.format("%s%s", new Object[] {this.sqlMapping, params.get("mapping").toString()});
				this.logger.debug("Execute {} params : {}", sql, params);
				if(this.sqlSessionTemplate.delete(sql, params)>0)
					return true;
			}
		}
		//有一步删除未成功，手动触发回滚
		TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		return false;
	}

}
