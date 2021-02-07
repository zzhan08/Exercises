package com.springArtifact;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages="com.springArtifact")
public class AppConfig {
	// way 1
//  @Bean
//  public samsung getPhone() {
//	  return new samsung();
//  }
//  @Bean
//  public MobileProcessor getProcessor() {
//	  return new SnapDragon();
//  }
	//way 2
}
