import java.util.concurrent.atomic.AtomicInteger;

class counter{
	int count;
	public void increment() {
		count++;
	}
}
class  safecounter{
	int count;
	public synchronized void increment() {
		count++;
	}
}
class  atomocityCouner{
	AtomicInteger count = new AtomicInteger();
	public synchronized void increment() {
		count.incrementAndGet();
	}
}
public class ThreadSync {
  public static void main(String[] args) throws InterruptedException {
	  counter c = new counter();
	  safecounter sc= new safecounter();
	  atomocityCouner ac= new atomocityCouner();

	  Thread t1 = new Thread(()->{
	      for(int i = 0; i< 1000;i++) {
	    	  c.increment();
	      }
	   });
	   Thread t2 = new Thread(()->{
		   for(int i = 0; i< 1000;i++) {
			   c.increment();
	       }  
	   });
	   t1.start();
	   t2.start();
	   t1.join();t2.join();
	  System.out.println("ss: "+c.count);
	  Thread t3 = new Thread(()->{
	      for(int i = 0; i< 1000;i++) {
	    	  sc.increment();
	      }
	   });
	   Thread t4 = new Thread(()->{
		   for(int i = 0; i< 1000;i++) {
			   sc.increment();
	       }  
	   });
	   t3.start();
	   t4.start();
	   t3.join();t4.join();
	  System.out.println("ss: "+sc.count);
	  Thread t5 = new Thread(()->{
	      for(int i = 0; i< 1000;i++) {
	    	  ac.increment();
	      }
	   });
	   Thread t6 = new Thread(()->{
		   for(int i = 0; i< 1000;i++) {
			   ac.increment();
	       }  
	   });
	   t5.start();
	   t6.start();
	   t5.join();t6.join();
	  System.out.println("ss: "+ac.count);
  }
}
