package threadPools;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ScheduleThreadPoolExample {
	public static void main(String [] args) {
		/*
		 * for tasks need some delay
		 * */
		   ScheduledExecutorService ss=Executors.newScheduledThreadPool(1);
		   
		   ss.scheduleAtFixedRate(()->{
			   System.out.println("taks to rubn repeatedly every 10 seconds");
		   },10,10,TimeUnit.SECONDS);
		   ss.scheduleWithFixedDelay(()->{
			   System.out.println("task to run repeatedly 10 seconds after previous task completes");
		   },10,10,TimeUnit.SECONDS);
		   ss.schedule(()->{
			   System.out.println("ask to run after 10 seconds delay");
		   },10,TimeUnit.SECONDS);
		   
	  }
}
