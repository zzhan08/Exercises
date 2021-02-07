package ThreadControls;

import java.util.Random;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class InterruptingThreadExample {
	public static void InterruptATHread() {
		Thread t = new Thread(()-> {
			   Random ran  = new Random();
			   for(int i=0;i<1E8;i++) {
				   if(Thread.currentThread().isInterrupted()) {
					   System.out.println("Interrupted");			
				   };
					 Math.sin(ran.nextDouble());  

				}
				 		   
		   } );
				   t.start();
		   try {
			Thread.sleep(500);
			t.interrupt();
			t.join();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void InterruptAThreadPool() {
		ExecutorService es = Executors.newCachedThreadPool();
		Future<Void> f = es.submit(new Callable<Void>() {

			@Override
			public Void call() throws Exception {
				Random ran  = new Random();
			    for(int i=0;i<1E8;i++) {
				   if(Thread.currentThread().isInterrupted()) {
					   System.out.println("Interrupted");			
				   };
				   Math.sin(ran.nextDouble());  

				}
			    return null;
			}
			
		});
		//es.shutdown();
		//f.cancel(false);//cancel all not running thread
		//f.cancel(true); //cancel all thread
		es.shutdownNow();
		try {
			es.awaitTermination(1, TimeUnit.DAYS);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("finished");
	}
   public static void main(String[]args) {
	   InterruptAThreadPool();
	   //InterruptATHread();
   }
}
