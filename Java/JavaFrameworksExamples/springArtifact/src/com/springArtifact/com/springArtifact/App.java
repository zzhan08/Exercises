package com.springArtifact;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {
  public static void main(String[] args) {
	  //Vehicle obj = new Car();
	  //org.springframework.beans.factory.BeanFactory BF;
	  //org.springframework.context.ApplicationContext AC = new org.springframework.context.support.ClassPathXmlApplicationContext("com/springArtifact/spring.xml");
//	  Vehicle obj = (Vehicle)AC.getBean("Vehicle");;
	 // Car obj = (Car)AC.getBean("car");;
	  //obj.drive();
//	  Tyre t = (Tyre)AC.getBean("tyre");//new Tyre();
//	  System.out.println(t.toString());
	  org.springframework.context.ApplicationContext AC = new AnnotationConfigApplicationContext(AppConfig.class);
	  samsung s7 =  AC.getBean(samsung.class);;
	  s7.config();
  }
}
