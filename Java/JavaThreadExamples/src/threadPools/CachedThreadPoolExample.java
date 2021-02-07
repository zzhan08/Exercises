package threadPools;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class CachedThreadPoolExample implements Runnable {
	
	CachedThreadPoolExample(){
	 
	}
	public static void main(String [] args) {
		/*
		 * submited tasks will be in synchronized queue 
		 * who has only space for a single idle
		 * every time submit a task
		 * pool will hold task in that location 
		 * and it will search for any thread wihch is free to execute this task
		 * if not thread available it will create new thread 
		 * and add to the queue for the task
		 * 
		 * Cache thread pool has ability to kill those thread once they 
		 * been idle for more than 60 seconds.
		 * 
		 * if threads not required and no new task coming, size of thread pool will shrink
		 * */
	  ExecutorService Executor = Executors.newCachedThreadPool();
	  Future f =  Executor.submit(new Callable<Integer>() {
		@Override
		public Integer call() throws Exception {
			// TODO Auto-generated method stub
			if(true) {
				throw new Exception();
			}
			return 1;
		}});
	    try {
		   System.out.println(f.get());
		   f.cancel(true);
		   f.isDone();
		   f.isCancelled();
		   Executor.shutdown();
		   Executor.awaitTermination(0, TimeUnit.MINUTES);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Override
	public void run() {
		// TODO Auto-generated method stub
		
	}

	
}
