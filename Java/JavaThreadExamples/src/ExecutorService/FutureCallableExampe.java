package ExecutorService;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.function.IntConsumer;
import java.util.stream.IntStream;

import ThreadControls.ThreadSemaphore;

public class FutureCallableExampe implements Callable<String>{
    public static void main(String[]args) {
  	    ExecutorService service = Executors.newFixedThreadPool(10);
    	IntStream.range(0, 99).forEach(new IntConsumer(){
			@Override
			public void accept(int value) {
		  	    Future<String> futureStr = service.submit(new FutureCallableExampe());
		  	    try {
		  	    	System.out.println("Saved "+futureStr.get(1,TimeUnit.SECONDS));
					// System.out.println("Saved "+futureStr.get());
		  	    	/* future.cancel(false); // cancel task, if true may interruptIfRunning
		  	    	 * future.isCancelled(); // return if canceled
		  	    	 * future.isDone();      // return if task is done
		  	    	 * */
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (ExecutionException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (TimeoutException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
	
	    });
	    service.shutdown();
	    try {
	    	service.awaitTermination(1, TimeUnit.MINUTES);
	    } catch (InterruptedException e) {
		// TODO Auto-generated catch block
	    	e.printStackTrace();
	    }
    }
	@Override
	public String call() throws Exception {
		System.out.println("Thread Name: " + Thread.currentThread().getName());
		Thread.sleep(3000);
		return Thread.currentThread().getName();
	}

}
