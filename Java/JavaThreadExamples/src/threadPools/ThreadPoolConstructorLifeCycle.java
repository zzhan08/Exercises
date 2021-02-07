package threadPools;

import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.DelayQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.SynchronousQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
//import java.util.concurrent.ScheduledThreadPoolExecutor.DelayedWorkQueue;

public class ThreadPoolConstructorLifeCycle {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int corePoolsize = 0;
		int maxPoolsize = 0;
		int keepalivetime = 0;
		LinkedBlockingQueue fixedThreadPoolQueue = null;
		LinkedBlockingQueue singleThreadPoolQueue;
		SynchronousQueue cachedThreadPoolQueue;
		DelayQueue scheduledThreadPool = null;
		ArrayBlockingQueue customedQueue = null;
		ExecutorService executor = new ThreadPoolExecutor(0, 0, 0, TimeUnit.SECONDS, scheduledThreadPool);
		/*Rejection Handler*/
		/* AbortPolicy - submit new task throws rejectedExecutionException(runtime exception)
		 * DiscardPolicy -  submitting new tasks silently discards it
		 * DiscardOldestPolicy - submitting new tasks drop existing oldest task and new task is added to the queue
		 * CallerRunsPolicy -  submit new tasks will execute the task on the caller thread tiself, this can ceate 
		 *                     feedback loop where caller thread is busy executing the task and cannot submit new 
		 *                     tasks at fast pace
		 * */
		ExecutorService executor1 = new ThreadPoolExecutor(0, 0, 0, 
				TimeUnit.SECONDS, 
				customedQueue,
				new RejectedExecutionHandler() {

					@Override
					public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
						// TODO Auto-generated method stub
						
					}
			
		        });
		/*Life Cycle Methods*/
		executor1.shutdown();
		executor1.isShutdown();
		executor1.isTerminated();
		try {
			executor1.awaitTermination(0, TimeUnit.SECONDS);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<Runnable>runnables = executor1.shutdownNow();//will initiate shutdown and return all queued tasks
	}

}
