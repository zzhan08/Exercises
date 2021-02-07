package ThreadControls;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Phaser;

public class ThreadPhaserExample {
	public static void pahseAwaitAdavnce() {
		ExecutorService es = Executors.newFixedThreadPool(4);
		  Phaser phaser = new Phaser(3);
		  for(int i=0;i<3;i++) {
			  final int j=i;
			  es.submit(new Runnable() {

					@Override
					public void run() {
						// TODO Auto-generated method stub
							try {
								Thread.sleep(j*1000);
								System.out.println("THread "+j+" wainting");
								phaser.arrive();
								System.out.println("THread "+j+" Execute");

							} catch (InterruptedException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} 
					
					}
					  
				  });
		  }
		  try {
				System.out.println("Main  wainting");

			  phaser.awaitAdvance(3); 
				System.out.println("Main after wainting");

			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    public static void arriveAndAwaitAdvance() {
    	ExecutorService es = Executors.newFixedThreadPool(4);
		  Phaser phaser = new Phaser(3);
		  for(int i=0;i<3;i++) {
			  final int j=i;
			  es.submit(new Runnable() {

					@Override
					public void run() {
						// TODO Auto-generated method stub
						System.out.println("THread "+j+" wainting");
						phaser.arriveAndAwaitAdvance();
						System.out.println("THread "+j+" Execute");						
					}
					  
				  });
		  }
		  try {
				
				System.out.println("Main  thred");

			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    public static void phaseRegister() {
    	ExecutorService es = Executors.newFixedThreadPool(4);
		  Phaser phaser = new Phaser(1);
		  for(int i=0;i<2;i++) {
			  final int j=i;
			  es.submit(new Runnable() {

					@Override
					public void run() {
						// TODO Auto-generated method stub
						try {
							phaser.register();
							System.out.println("THread "+j+" register");
							phaser.arriveAndDeregister();//dont want to play anymore

							Thread.sleep(1000);
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}


						System.out.println("THread "+j+" wainting");

						//phaser.arrive();
						System.out.println("THread "+j+" Execute");						
					}
					  
				  });
		  }
		  try {
				
				System.out.println("Main  thred");
				Thread.sleep(2000);
				phaser.arriveAndAwaitAdvance();
				phaser.bulkRegister(4);

				System.out.println("Main  thred done");

			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
   public static void main(String[]args) {
	   phaseRegister();
   }
}
