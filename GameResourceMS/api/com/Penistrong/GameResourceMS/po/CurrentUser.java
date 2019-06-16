package com.Penistrong.GameResourceMS.po;

import java.util.Map;

public class CurrentUser {
	protected String resource_id;//源ID,主键
	protected String user_id;//用户ID
	protected String user_name;//用户昵称
	protected String user_type;//用户类型
	protected String level;//等级
	protected String exp;//经验
	protected String coins;//硬币数(流通货)
	protected String posts;//发帖数
	protected String authentication;//权限
	
	public String defaultEmpty(Object o) {
		if(o != null) {
			return o.toString();
		}else {
			return "";
		}
	}
	
	public CurrentUser() {}
	
	public CurrentUser(Map<String,Object> user) {
		if(user!=null) {
			this.resource_id = defaultEmpty(user.get("resource_id"));
			this.user_id = defaultEmpty(user.get("user_id"));
			this.user_name = defaultEmpty(user.get("user_name"));
			this.user_type = defaultEmpty(user.get("user_type"));
			this.level = defaultEmpty(user.get("level"));
			this.exp = defaultEmpty(user.get("exp"));
			this.coins = defaultEmpty(user.get("coins"));
			this.posts = defaultEmpty(user.get("posts"));
			this.authentication = defaultEmpty(user.get("authentication"));
		}
	}

	public CurrentUser(String resource_id, String user_id, String user_name, String user_type, String level, String exp,
			String coins, String posts, String authentication) {
		this.resource_id = resource_id;
		this.user_id = user_id;
		this.user_name = user_name;
		this.user_type = user_type;
		this.level = level;
		this.exp = exp;
		this.coins = coins;
		this.posts = posts;
		this.authentication = authentication;
	}
	
	//从库中取出user并剪切部分需隐藏的属性组装成currentUser
	public CurrentUser(User user) {
		this.resource_id = defaultEmpty(user.resource_id);
		this.user_id = defaultEmpty(user.user_id);
		this.user_name = defaultEmpty(user.user_name);
		this.user_type = defaultEmpty(user.user_type);
		this.level = defaultEmpty(user.level);
		this.exp = defaultEmpty(user.exp);
		this.coins = defaultEmpty(user.coins);
		this.posts = defaultEmpty(user.posts);
		this.authentication = defaultEmpty(user.authentication);
	}

	public String getResource_id() {
		return resource_id;
	}

	public void setResource_id(String resource_id) {
		this.resource_id = resource_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_type() {
		return user_type;
	}

	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getExp() {
		return exp;
	}

	public void setExp(String exp) {
		this.exp = exp;
	}

	public String getCoins() {
		return coins;
	}

	public void setCoins(String coins) {
		this.coins = coins;
	}

	public String getPosts() {
		return posts;
	}

	public void setPosts(String posts) {
		this.posts = posts;
	}

	public String getAuthentication() {
		return authentication;
	}

	public void setAuthentication(String authentication) {
		this.authentication = authentication;
	}
	
	@Override
	public String toString() {
		return "[resource_id]:"+resource_id+"[user_id]:"+user_id+"[user_name]:"+user_name+"[user_type]:"+user_type;
	}
}
