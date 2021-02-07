import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;
import java.util.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
class DeadLockConsumer implements Runnable {
	 private Thread t;	
	  private Lock l;
	  
	  private Lock l2;

	  private DetectDeadLock list;
	  public DeadLockConsumer(DetectDeadLock thelist, Lock lock, Lock lock2) {
		  l = lock;
		  l2 = lock2;
		  list = thelist;
		  Thread t = new Thread(this);
		  t.start();
	  }	

		@Override
		public void run() {
	        System.out.println("Consumer id: "+Thread.currentThread().getId());
			int last = 0;
			while(true) {
				l2.lock();

				l.lock();
				if(last!=list.getCounter()) {
					System.out.println("Consumer remove: " + list.getCounter());
					last = list.getCounter();
				}
				l2.unlock();
				l.unlock();

				try {
					Thread.sleep(100);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
class DeadLockProducer implements Runnable {
  private Thread t;	
  private Lock l;
  private Lock l2;

  private DetectDeadLock list;
  public DeadLockProducer(DetectDeadLock thelist, Lock lock, Lock lock2) {
	  l = lock;
	  l2 = lock2;
	  list = thelist;
	  Thread t = new Thread(this);
	  t.start();
  }
@Override
public void run() {
    System.out.println("Producer id: "+Thread.currentThread().getId());
	for(int i = 0; i< 100; i++) {
		l.lock();
		l2.lock();
		list.setCounter(i);;		
		System.out.println("Producer add: " + list.getCounter());

		l.unlock();
		l2.unlock();
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}	
 
}
public class DetectDeadLock{
	static int counter = 0;
	static int getCounter() {
		return counter;
	} 
	static void setCounter(int i) {
		counter = i;
	} 
	 public static void main(String[]args) {
	    Lock lock = new ReentrantLock();
	    Lock lock2 = new ReentrantLock();
        System.out.println("Main: "+Thread.currentThread().getId());
	    DetectDeadLock ddl = new DetectDeadLock();
	    DeadLockConsumer dc =new DeadLockConsumer(ddl, lock,lock2);

	    DeadLockProducer dp =new DeadLockProducer(ddl, lock,lock2);
	    boolean deadLock = false;
	    while(!deadLock) {
	    	ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();
	        long[] threadIds =  threadBean.findDeadlockedThreads();
	         deadLock = threadIds!=null && threadIds.length>0;
	         try {
	 			Thread.sleep(100);
	 		} catch (InterruptedException e) {
	 			// TODO Auto-generated catch block
	 			e.printStackTrace();
	 		}
	    }
        
        System.out.println("Deadlocks found "+deadLock);

	 }
}