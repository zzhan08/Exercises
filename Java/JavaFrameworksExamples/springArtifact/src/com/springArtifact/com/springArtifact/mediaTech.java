package com.springArtifact;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
//@Primary
public class mediaTech implements MobileProcessor {

	public void process() {
		// TODO Auto-generated method stub
      System.out.println("Media tech");
	}

}
