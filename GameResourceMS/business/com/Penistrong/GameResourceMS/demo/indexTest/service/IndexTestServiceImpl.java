package com.Penistrong.GameResourceMS.demo.indexTest.service;

import java.util.Map;
import org.springframework.stereotype.Service;

import com.Penistrong.GameResourceMS.demo.indexTest.mapper.IndexTestMapper;
import com.Penistrong.GameResourceMS.base.service.BaseServiceImpl;

@Service
public class IndexTestServiceImpl extends BaseServiceImpl<IndexTestMapper,Map<String,Object>> implements IndexTestService<Map<String,Object>> {

}
