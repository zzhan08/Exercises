package ThreadControls;

import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;
import java.util.function.IntConsumer;
import java.util.stream.IntStream;
class ThreadSemaphore2 implements Runnable {
	Semaphore s;
	public ThreadSemaphore2(Semaphore s) {
		super();
		this.s = s;
	}
	@Override
	public void run() {
		// TODO Auto-generated method stub
		
		try {
			this.s.acquire();//default permit 1 
			System.out.println("acquaire first Slow Operation: ");
			Thread.sleep(1000);
			this.s.release(1);//release default permit 1
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
public class ThreadSemaphore implements Runnable {
	int i;
	Semaphore sem;
	ThreadSemaphore(int i, Semaphore semaphore){
	  this.i=i;
	  this.sem = semaphore;
	}
	public static void main(String [] args) {
	  ExecutorService service = Executors.newFixedThreadPool(10);
      Semaphore semaphore = new Semaphore(3, true);// ture is first call acquire will get resource
	  IntStream.range(0, 99).forEach(new IntConsumer(){
		@Override
		public void accept(int value) {
		  if(value==3) {
		      service.submit(new ThreadSemaphore2(semaphore));
		  }
          service.execute(new ThreadSemaphore(value, semaphore));
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
	public void run() {
		// number of Permit required has to be number of permit released
		this.sem.acquireUninterruptibly(1);//default permit 1 
		System.out.println("Slow Operation: "+this.i);
		try {
			Thread.sleep(1000);
			this.sem.release(1);//release default permit 1
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
