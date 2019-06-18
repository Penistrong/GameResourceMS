package com.Penistrong.GameResourceMS.po;

import java.util.Map;

public class DetailedUser extends CurrentUser{
	protected String pv;//page view 页面访问量(点击量)
	protected String uv;//user view 访问过的用户量
	protected String exdau;//extreme DAU 最高日活
	protected String KPI;//key performance indicator 关键绩效指标
	
	public String getPv() {
		return pv;
	}
	public void setPv(String pv) {
		this.pv = pv;
	}
	public String getUv() {
		return uv;
	}
	public void setUv(String uv) {
		this.uv = uv;
	}
	public String getExdau() {
		return exdau;
	}
	public void setExdau(String exdau) {
		this.exdau = exdau;
	}
	public String getKPI() {
		return KPI;
	}
	public void setKPI(String kPI) {
		KPI = kPI;
	}
	public DetailedUser() {
		super();
	}
	public DetailedUser(Map<String, Object> user) {
		super(user);
		this.pv = defaultZeroStr(user.get("pv"));
		this.uv = defaultZeroStr(user.get("uv"));
		this.exdau = defaultZeroStr(user.get("exdau"));
		this.KPI = defaultZeroStr(user.get("KPI"));
	}
	public DetailedUser(String resource_id, String user_id, String user_name, String user_type, String level,
			String exp, String coins, String posts, String authentication,String pv,String uv,String exdau,String KPI) {
		super(resource_id, user_id, user_name, user_type, level, exp, coins, posts, authentication);
		this.pv = defaultZeroStr(pv);
		this.uv = defaultZeroStr(uv);
		this.exdau = defaultZeroStr(exdau);
		this.KPI = defaultZeroStr(KPI);
	}

	public String defaultZeroStr(Object o) {
		if(o != null) {
			return o.toString();
		}else {
			return "0";
		}
	}
}
