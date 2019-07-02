# GameResourceMS
HUST2019 NeuSoft Software Engineering Practice
Developers: Penistrong(Alias chenliwei 陈立伟), HUST Linus(Alias lvchangzhen 吕昶臻)

WebApplication @Java Web
Developed By Eclipse JavaEE
Environment: SSM framework(Spring 3.2.0 + Spring MVC 3.2.0 + Mybatis 3.2.7) + JDK1.7(Must < JDK8) + Apache Tomcat v7.0~8.5 + MySQL Server 5.1
Dependency: Apache Commons, Jackson, log4j&slf4j, jstl
Front-end Development & Components: Vue.js, Highcharts.js, jQuery 1.8.0, Bootstrap 3.3.7

P.S. If you wanna deploy this project on the server, please contact us with E-mail: 18296276027@sina.cn or 770560618@qq.com

将源码解压，使用Eclipse或者IDEA导入项目(注意要求JDK1.7和Tomcat v7.0~8.5)
在 根目录/resources/下 打开applicationContext.xml 找到id为"dataSource"的bean配置有关数据库的连接 默认为 localhost:3306/game_resource_db
数据文件已转储为gameresource_db.sql 在本文档同一根目录下
将项目部署到本地服务器后（默认context_path为"http://localhost:8080/GameResourceMS"）访问该地址即可被登录权限拦截器自动转发到登录页面
最好使用Chrome
