package ThreadDecorators;

import java.util.concurrent.*;
import java.util.concurrent.atomic.LongAccumulator;
import java.util.concurrent.atomic.LongAdder;

public class ThreadAdderAccumullatorExample {
	public static void adderExample() {
		LongAdder counter =new LongAdder();
    	ExecutorService es = Executors.newFixedThreadPool(16);
    	for(int i=0;i<100;i++) {
    		es.submit(new Runnable() {

				@Override
				public void run() {
					// TODO Auto-generated method stub
					counter.increment();
				}
    			
    		});
    	}
    	try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	System.out.println(counter.sum());
	} 
    public static void accumalatorExample() {
    	LongAccumulator counter =new LongAccumulator((x,y)->x+y,0);//initial x is 0, y is parameter passed
    	ExecutorService es = Executors.newFixedThreadPool(16);
    	for(int i=0;i<100;i++) {
    		es.submit(new Runnable() {

				@Override
				public void run() {
					// TODO Auto-generated method stub
					counter.accumulate(1);
				}
    			
    		});
    	}
    	try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	System.out.println(counter.get());
	} 
    public static void main(String[]args) {
    	accumalatorExample();
    }
}
