package com.Penistrong.GameResourceMS.rest.oauth.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Penistrong.GameResourceMS.Util.UtilTools;
import com.Penistrong.GameResourceMS.base.action.BaseAction;
import com.Penistrong.GameResourceMS.rest.oauth.service.OAuthValidateService;

@Controller
@RequestMapping("/oauth2")//OAuth2.0
public class OAuthValidateAciton extends BaseAction<OAuthValidateService<Map<String,Object>>,Map<String,Object>>{
	/**
	 * 第一步，获取code
	 * @param app_id
	 * @param redirect_uri
	 * @param response_type 固定为code
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/authorize", method=RequestMethod.POST)
	public void authorize(HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value="client_id",required=true)String client_id,
			@RequestParam(value="redirect_uri",required=true)String redirect_uri,
			@RequestParam(value="response_type",required=true)String response_type
			)throws IOException {
		if(!"code".equals(response_type)) {
			response.getOutputStream().print("{\"error\":\"response_type error\"}");
			return ;
		}
		//根据app_id获取回调地址
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("client_id", client_id);
		params.put("mapping", "getURIByAppId");
		Map<String,Object> result = service.get(params);
		if(result!=null) {
			if(redirect_uri.equals(result.get("REDIRECT_URI"))) {
				//生成code入库
				String code = UUID.randomUUID().toString();
				params.clear();
				params.put("resource_id", UtilTools.getUUID());
				params.put("code", code);
				params.put("client_id", client_id);
				params.put("mapping", "addAppCode");
				params.put("create_timestamp", System.currentTimeMillis());
				service.add(params);
				response.sendRedirect(redirect_uri+"?code="+code);
			}else {
				response.getOutputStream().print("{\"error\":\"redirect_uri error\"}");
			}
		}else{
			response.getOutputStream().print("{\"error\":\"appid error\"}");
		}
	}
	
	@ResponseBody
	@RequestMapping(value="/token",method=RequestMethod.POST)
	public Map<String,Object> getAccessToken(HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value="client_id",required=true)String client_id,
			@RequestParam(value="client_secret",required=true)String client_secret,
			@RequestParam(value="redirect_uri",required=true)String redirect_uri,
			@RequestParam(value="grant_type",required=true)String grant_type,
			@RequestParam(value="code",required=true)String code){
		Map<String,Object> result = new HashMap<String,Object>();
		Map<String,Object> params = new HashMap<String,Object>();
		if(!"authorization_code".equals(grant_type)) {
			result.put("error", "grant_type error");
			return result;
		}
		params.put("client_id", client_id);
		params.put("mapping", "getAppDetail");
		List<Map<String,Object>> appInfos = service.list(params);
		Map<String,Object> appInfo = appInfos.get(0);
		if(appInfo!=null){
			//校验 code 内容
			Object db_code = appInfo.get("CODE");
			if(db_code==null || !code.equals(db_code)){
				result.put("error", "code error");
				return result;
			}
			//校验 code 时间(不能大于10min)
			Object db_timestamp = appInfo.get("CREATE_TIMESTAMP");
			if(db_timestamp==null || (System.currentTimeMillis()-Long.parseLong(db_timestamp.toString())>1000*60*10)){
				result.put("error", "code timeout");
				return result;
			}
			//校验 secret
			Object db_client_secret = appInfo.get("CLIENT_SECRET");
			if(db_client_secret==null || !client_secret.equals(db_client_secret)){
				result.put("error", "client_secret error");
				return result;
			}
			//校验 uri
			Object db_redirect_uri = appInfo.get("REDIRECT_URI");
			if(db_redirect_uri==null || !redirect_uri.equals(db_redirect_uri)){
				result.put("error", "redirect_uri error");
				return result;
			}
			//如果都校验通过，则修改 code 状态，并生成 access_token 和 refresh_token 入库
			String access_token = UUID.randomUUID().toString();
			int expires_in = 60*60*24*7 ;//单位（秒）
			String refresh_token = UUID.randomUUID().toString();
			result.put("resource_id", UtilTools.getUUID());
			result.put("code", code);
			result.put("client_id", client_id);
			result.put("expires_in", expires_in);
			result.put("access_token", access_token);
			result.put("refresh_token", refresh_token);
			result.put("create_timestamp", System.currentTimeMillis());
			service.addAccessToken(result);
			result.remove("code");
			result.remove("mapping");
			result.remove("client_id");
			result.remove("resource_id");
			result.remove("create_timestamp");
			return result;
		}else{
			result.put("error", "client_id error");
			return result;
		}
	}
}
