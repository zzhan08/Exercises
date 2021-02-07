package ThreadControls;

import java.util.concurrent.*;

public class ThreadCyclicBarrerierExample {
  public static void main(String[]args) {
	  ExecutorService es = Executors.newFixedThreadPool(4);
	  CyclicBarrier barrier = new CyclicBarrier(3);
	  for(int i=0;i<3;i++) {
		  final int j=i;
		  es.submit(new Runnable() {

				@Override
				public void run() {
					// TODO Auto-generated method stub
						try {
							Thread.sleep(j*1000);
							System.out.println("THread "+j+" wainting");
							barrier.await();
							System.out.println("THread "+j+" Execute");

						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (BrokenBarrierException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					
				}
				  
			  });
	  }
	  try {
		Thread.sleep(2000);
	} catch (InterruptedException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	  
  }
}
