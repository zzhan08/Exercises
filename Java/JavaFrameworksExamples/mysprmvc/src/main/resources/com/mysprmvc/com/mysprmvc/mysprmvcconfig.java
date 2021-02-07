package mysprmvc.com.mysprmvc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
@Configuration
@EnableWebMvc
@ComponentScan({"mysprmvc.com.mysprmvc"})
public class mysprmvcconfig {
	@Bean
  public InternalResourceViewResolver viewResolver() {
	  InternalResourceViewResolver vr = new InternalResourceViewResolver();
	  vr.setPrefix("/WEB-INF/");
	  vr.setSuffix(".jsp");
	  return vr;
  }
}
