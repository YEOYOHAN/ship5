package com.ship.web.config;

import javax.sql.DataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@MapperScan(basePackages = {"com.ship.web"})
@ComponentScan(basePackages = {"com.ship.web"})
public class RootConfig {
	
	@Bean
	public DataSource dataSource() {
		/*HikariConfig hikariConfig = new HikariConfig();
		hikariConfig.setDriverClassName("com.mysql.jdbc.Driver");
		hikariConfig.setJdbcUrl("jdbc:mysql://localhost:3306/ship?serverTimezone=UTC");
		hikariConfig.setUsername("ship");
		hikariConfig.setPassword("ship ");
		
		HikariDataSource dataSource = new HikariDataSource(hikariConfig);*/
		
		  DriverManagerDataSource dataSource = new DriverManagerDataSource();

		    dataSource.setDriverClassName("com.mysql.jdbc.Driver");
		    dataSource.setUrl("jdbc:mysql://localhost:3306/ship?serverTimezone=UTC");
		    dataSource.setUsername("ship");
		    dataSource.setPassword("ship ");

		    return dataSource;
	}
	@Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception {
      SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
      factoryBean.setDataSource(dataSource());
      return factoryBean.getObject();
    }
    
    @Bean
    public SqlSessionTemplate sqlSession() throws Exception {
      return new SqlSessionTemplate(sqlSessionFactory());
    }
}
