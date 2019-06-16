package com.Penistrong.GameResourceMS.demo.vueTest.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;
import com.Penistrong.GameResourceMS.demo.vueTest.mapper.VueTestMapper;

@Service
public class VueTestServiceImpl extends BaseServiceImpl<VueTestMapper,Map<String,Object>> implements VueTestService<Map<String,Object>>{

}
