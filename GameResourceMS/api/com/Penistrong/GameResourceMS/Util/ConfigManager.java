package com.Penistrong.GameResourceMS.Util;

import java.io.InputStream;

import org.jaxen.JaxenException;
import org.jaxen.jdom.JDOMXPath;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;

/**
 * 解析xml,读取配置信息
 * @author Penistrong[chenliwei]
 * @version GameResourceMS	
 * @lastEditTime 2018年4月26日上午9:02:20
 */
public class ConfigManager {
	
	static Document pathXmlDoc = null;
	public static String system_name = "";
	
	public static Document getPathXmlDoc() {
		SAXBuilder builder = new SAXBuilder();
		//getResource()内部填充的若以"/"开头,则是在根目录classpath下寻找文件,否则是在当前目录下
		InputStream inputStream = ConfigManager.class.getResourceAsStream("/config.xml");
		try {
			pathXmlDoc = builder.build(inputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pathXmlDoc;
	}
	
	/**
	 * 根据传入的配置名查询配置信息
	 * @param textlabel
	 * @return
	 */
	public static String getItemValue(String textlabel) {
		if(pathXmlDoc == null) {
			pathXmlDoc = getPathXmlDoc();
		}
		if("".equals(system_name)) {
			try {
				system_name = ((Element)new JDOMXPath("configuration/item/system_name").selectSingleNode(pathXmlDoc)).getText();
			} catch (JaxenException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		String pathtext="";
		JDOMXPath xpath = null;
		try {
			xpath = new JDOMXPath("configuration/item/"+textlabel);
		} catch (JaxenException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Object obj = null;
		try {
			obj = xpath.selectSingleNode(pathXmlDoc);
		} catch (JaxenException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(obj!=null) {
			Element element = (Element)obj;
			pathtext = element.getText();
		}
		return pathtext;
	}
}
