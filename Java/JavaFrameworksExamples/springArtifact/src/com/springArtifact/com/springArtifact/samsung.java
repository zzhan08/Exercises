package com.springArtifact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@Component
public class samsung {
	@Autowired
	@Qualifier("snapDragon")
	MobileProcessor cpu;
 public MobileProcessor getCpu() {
		return cpu;
	}
	public void setCpu(MobileProcessor cpu) {
		this.cpu = cpu;
	}
public void config() {
	 System.out.println("Ocata core 4gb ram, 12MP cacmera");
cpu.process();
 }
}
