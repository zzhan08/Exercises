package ThreadControls;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadCountdownLatchExample implements Runnable {
	CountDownLatch latch;
	int thisi;
    public ThreadCountdownLatchExample(CountDownLatch latch, int i) {
		super();
		this.latch = latch;
		thisi=i;
	}

	public static void main(String[]args) {
	  CountDownLatch latch=new CountDownLatch(3);
	  ExecutorService exevutor =Executors.newFixedThreadPool(3);
	  for(int i=0;i<3;i++) {
		  exevutor.submit(new ThreadCountdownLatchExample(latch,i));
		  
	  }
	  try {
		latch.await();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	  System.out.println("complete");
	  
    }

	@Override
	public void run() {
      		try {
				Thread.sleep(thisi*1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
      		this.latch.countDown();
      		System.out.println("countdown");
	}
}
