package threadPools;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SingleThreadedExecutorExample implements Runnable {
	/*
	 * only one task run in thread pool (pool size = 1)
	 * */
	public static void main(String [] args) {
		ExecutorService executor = Executors.newSingleThreadExecutor();
		for (int number = 0; number < 4; number++) {
			// Step No 2
			Runnable worker = new SingleThreadedExecutorExample();
			// Step No 3
			executor.execute(worker);
		}
		executor.shutdown();

		// Waiting for all thread to finish
		while (!executor.isTerminated())
			;
		System.out.println("All threads finished");
	  }

	@Override
	public void run() {
		// TODO Auto-generated method stub
		
	}
}
