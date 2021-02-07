package ThreadControls;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadLocalExample {
  public static void main(String[]args) {
	  ThreadLocal<SimpleDateFormat> tl =new  ThreadLocal<SimpleDateFormat>() {
		  protected SimpleDateFormat initialValue() {
			  return new SimpleDateFormat("yyyy-MM-dd hh:mm:s");
		  }
		  public SimpleDateFormat get() {
			  return super.get();
		  }
	  };
	  ThreadLocal<SimpleDateFormat> t2 =ThreadLocal.withInitial(()->new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"));

	  ExecutorService ES= Executors.newFixedThreadPool(10);
	  for(int i=0;i<1000;i++) {
		  int id = i;
		  ES.submit(()->{
			  //System.out.println(tl.get());
			  System.out.println(t2.get().format(new Date()));
              try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		  });
	  }
  }
}
