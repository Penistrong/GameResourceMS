package com.Penistrong.GameResourceMS.Util;

import java.io.IOException;
import java.io.InputStream;

import org.jaxen.JaxenException;
import org.jaxen.jdom.JDOMXPath;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

public class CasFilterConfigManager {
	static Document pathXmlDoc = null;
	
	public static Document getPathXmlDoc() {
		if(pathXmlDoc!=null) {
			return pathXmlDoc;
		}
		
		SAXBuilder builder = new SAXBuilder();
		
		InputStream inputstream = CasFilterConfigManager.class.getResourceAsStream("/casFilterConfig.xml");
		
		try {
			pathXmlDoc = builder.build(inputstream);
		} catch (JDOMException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return pathXmlDoc;
	}
	
	public static String getItemValue(String textlabel) {
		String pathtext = null;
		
		Document doc = getPathXmlDoc();
		JDOMXPath xpath = null;
		
		try {
			xpath = new JDOMXPath("config/"+textlabel);
		} catch (JaxenException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Object obj = null;
		
		try {
			obj = xpath.selectSingleNode(doc);
		} catch (JaxenException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if(obj != null) {
			Element element = (Element)obj;
			pathtext = element.getText();
		}
		return pathtext;
	}
}
