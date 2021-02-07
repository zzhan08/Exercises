package threadPools;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
/* fixed number of threads
 * tasks are submited to thread safe queue
 * */
public class FixedThreadPoolExample {
  public static void main(String [] args) {
	  int corCount= Runtime.getRuntime().availableProcessors();
	  ExecutorService es = Executors.newFixedThreadPool(corCount);
	  es.execute(new Runnable() {

		@Override
		public void run() {
			// TODO Auto-generated method stub
			
		}
		  
	  });
	  es.execute(new Runnable() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				
			}
			  
		  });
  }
}
