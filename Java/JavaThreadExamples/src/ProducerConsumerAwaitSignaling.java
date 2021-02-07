import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ProducerConsumerAwaitSignaling {
   static List<Integer> thelist=new ArrayList<>();
   static int size = 10;
   boolean ifProduced=false;
   Lock lock = new ReentrantLock();
   Condition con = lock.newCondition();
   public  void pruducer() {
		   lock.lock();
		    try {
		    	con.await();
		    	 System.out.println("Add 1"); 

			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}finally {
				   lock.unlock();

			}

   }
   public  void consummer() {
	   try {
		Thread.sleep(100);
	} catch (InterruptedException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	   lock.lock();
	   System.out.println("Remove 1");
	   con.signal();
		lock.unlock();
   }
   public static void main(String []args) {
	   ProducerConsumerAwaitSignaling pcp = new ProducerConsumerAwaitSignaling();
	   new Thread(()-> {
		   while(true) {
			   pcp.pruducer();
		   }
	   })  .start();
	   new Thread(()-> {
		   while(true) {
			   pcp.consummer();
		   }
	   } ).start();

   }
}
