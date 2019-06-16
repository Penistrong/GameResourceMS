package com.Penistrong.GameResourceMS.po;

import java.util.Map;

public class User extends CurrentUser{
	protected String identity;
	protected String introduction;
	
	public String getIdentity() {
		return identity;
	}
	public void setIdentity(String identity) {
		this.identity = identity;
	}
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	
	public User() {};
	
	public User(Map<String,Object> user) {
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
			this.identity = defaultEmpty(user.get("identity"));
			this.introduction = defaultEmpty(user.get("introduction"));
		}
	}
	
	public User(String resource_id, String user_id, String user_name, String user_type, String level, String exp,
			String coins, String posts, String authentication,String identity,String introduction) {
		this.resource_id = resource_id;
		this.user_id = user_id;
		this.user_name = user_name;
		this.user_type = user_type;
		this.level = level;
		this.exp = exp;
		this.coins = coins;
		this.posts = posts;
		this.authentication = authentication;
		this.identity = identity;
		this.introduction = introduction;
	}
	
	@Override
	public String toString() {
		return "[resource_id]:"+resource_id+"[user_id]:"+user_id+"[user_name]:"+user_name+"[user_type]:"+user_type+"[identity]:"+identity;
	}
}
