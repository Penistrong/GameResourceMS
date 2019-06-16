package com.Penistrong.GameResourceMS.base.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.Penistrong.GameResourceMS.base.mapper.BaseMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BaseServiceImpl<T extends BaseMapper,R> implements BaseService<R>{
	
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	protected SqlSessionTemplate sqlSessionTemplate;
	
	protected T mapper;
	protected String sqlMapping;
	
	@Autowired
	public void setMapper(T t) {
		this.sqlMapping = (t.getClass().getInterfaces()[0].getName()+".");
		this.mapper = t;
	}

	public PageInfo<R> page(Map<String,? extends Object> map){
		Page<Object> page = PageHelper.startPage(Integer.parseInt(map.get("pageNum").toString()), Integer.parseInt(map.get("pageSize").toString()));
		if ((map.get("order") != null) && (((List)map.get("order")).size() > 0))
	    {
	      Map m = (Map)((List)map.get("order")).get(0);
	      if ((m.get("name") != null) && (m.get("dir") != null)) {
	        page.setOrderBy(m.get("name") + " " + m.get("dir"));
	      }
	    }
	    String sql = String.format("%s%s", new Object[] { this.sqlMapping, map.get("mapping") == null ? "getPageObjList" : map.get("mapping") });
	    this.logger.debug("Execute {} param : {}", sql, map);
	    List<R> l = this.sqlSessionTemplate.selectList(sql, map);
	    return new PageInfo(l);
	  }
	  
	public List<R> list(Map<String, ? extends Object> map){
	    String sql = String.format("%s%s", new Object[] { this.sqlMapping, map.get("mapping") == null ? "getObjList" : map.get("mapping") });
	    this.logger.debug("Execute {} param : {}", sql, map);
	    List<R> list = this.sqlSessionTemplate.selectList(sql, map);
	    return list;
	  }
	  
	public R get(Map<String, ? extends Object> map){
	    String sql = String.format("%s%s", new Object[] { this.sqlMapping, map.get("mapping") == null ? "getObjById" : map.get("mapping") });
	    this.logger.debug("Execute {} param : {}", sql, map);
	    R r = this.sqlSessionTemplate.selectOne(sql, map);
	    return r;
	  }
		
	public boolean add(Map<String,? extends Object> map) {
		  String sql = String.format("%s%s", new Object[] {this.sqlMapping,map.get("mapping")==null?"add":map.get("mapping")});
		  this.logger.debug("Execute {} param : {}", sql,map);
		  boolean result = this.sqlSessionTemplate.insert(sql, map)>0;
		  return result;
	  }
	  
	@Transactional
	public boolean addBatch(List<Map<String,Object>> list) {
		  boolean result = false;
		  for(Map<String,? extends Object> map:list) {
			  String sql = String.format("%s%s", new Object[] {this.sqlMapping,map.get("mapping")==null?"add":map.get("mapping")});
			  this.logger.debug("Execute {} param : {}", sql,map);
			  result = (this.sqlSessionTemplate.insert(sql, map) > 0) || (result);
		  }
		  return result;
	  }
	  
	@Transactional
	public boolean addBatch(String mapping,Map<String,List> map) {
		  String sql = String.format("%s%s",new Object[] {this.sqlMapping,mapping});
		  this.logger.debug("Execute {} param: {}",sql,map);
		  boolean result = this.sqlSessionTemplate.insert(sql, map)>0;
		  return result;
	  }
	  
	public boolean update(Map<String,? extends Object> map) {
		  String sql = String.format("%s%s", new Object[] { this.sqlMapping, map.get("mapping") == null ? "update" : map.get("mapping") });
		  this.logger.debug("Execute {} param : {}", sql, map);
		  boolean result = this.sqlSessionTemplate.update(sql, map) > 0;
		  return result;
	  }
	  
	@Transactional
	public boolean updateBatch(List<Map<String, Object>> list){
	    boolean result = false;
	    for (Map<String, ? extends Object> map : list)
	    {
	      String sql = String.format("%s%s", new Object[] { this.sqlMapping, map.get("mapping") == null ? "update" : map.get("mapping") });
	      this.logger.debug("Execute {} param : {}", sql, map);
	      result = (this.sqlSessionTemplate.update(sql, map) > 0) || (result);
	    }
	    return result;
	  }
	  
	  @Transactional
	  public boolean delete(String ids, String mapping, String dialect)
	  {
	    boolean result = false;
	    String[] arrayOfString;
	    int j = (arrayOfString = ids.split(",")).length;
	    for (int i = 0; i < j; i++)
	    {
	      String id = arrayOfString[i];
	      String sql = String.format("%s%s", new Object[] { this.sqlMapping, mapping });
	      this.logger.debug("Execute {} param : {}", sql, id);
	      result = (this.sqlSessionTemplate.delete(sql, id) > 0) || (result);
	    }
	    return result;
	  }	
	
	  @Transactional
	  public boolean delete(String ids, String mapping)
	  {
	    boolean result = false;
	    String[] arrayOfString;
	    int j = (arrayOfString = ids.split(",")).length;
	    for (int i = 0; i < j; i++)
	    {
	      String id = arrayOfString[i];
	      String sql = String.format("%s%s", new Object[] { this.sqlMapping, mapping });
	      this.logger.debug("Execute {} param : {}", sql, id);
	      result = (this.sqlSessionTemplate.delete(sql, id) > 0) || (result);
	    }
	    return result;
	  }	  
}
