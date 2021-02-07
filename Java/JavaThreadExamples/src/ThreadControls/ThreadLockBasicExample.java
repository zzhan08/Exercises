package ThreadControls;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class ThreadLockBasicExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
	   ReentrantLock rl = new ReentrantLock();

       Thread t1 = new Thread(new Runnable() {
		    @Override
			public void run() {
		    	dosomething();
			}	 
		    public void dosomething() {
		    	rl.lock();

		    	rl.lock();
		    	try {
		    		System.out.println(rl.getHoldCount());
		    		dosomething();
		    		// recursive call will not require the lock again
		    		// because already the owner of the lock
		    		// but getholdcount will increase
		    	}catch(Exception e) {
		    		
		    	}finally {
			    	rl.unlock();
			    	rl.unlock();

		    	}
		    }
       }); 
       t1.start();
       //========================synchronized============================

       Thread t7 = new Thread(new Runnable() {
	   		@Override
	   		public synchronized void run() {
	   			
		    		System.out.println("synchronized");	    	
	   		}  	   
      }); 
       Thread t8 = new Thread(new Runnable() {
	   		@Override
	   		public synchronized void run() {		
		    		System.out.println("synchronized");
	   		}  	   
     });
//============================TRYLOCK===================================
	   ReentrantLock unfairLock = new ReentrantLock(true);

       Thread t6 = new Thread(new Runnable() {
	   		@Override
	   		public void run() {
	   			
	   			try {
		   			boolean lockAquared = unfairLock.tryLock(5, TimeUnit.SECONDS);
                    // trylock throw interruptedException
		   			// trylock has priority to get locked even it is the fairlock
		   			// work around is settimeout to 0 tryLock(5, TimeUnit.SECONDS)
	   				if(lockAquared) {
			    		System.out.println(rl.getHoldCount());

	   				}else {
	   					System.out.println("canot lock do something else");

	   				}
		    		
		    	}catch(Exception e) {
		    		
		    	}finally {
		    		unfairLock.unlock();
		    	}
	   		}  	   
      });     
//===================================FAIRLOCK============================
	   ReentrantLock fairLock = new ReentrantLock(true);
       // thread 2,3,4 will have equal oppunity because fairlock
	   // unfairlock is default, new thread entered will get executed
       Thread t2 = new Thread(new Runnable() {
	   		@Override
	   		public void run() {
	   			fairLock.lock();
	   			try {
		    		System.out.println(rl.getHoldCount());
		    		
		    	}catch(Exception e) {
		    		
		    	}finally {
		    		fairLock.unlock();
		    	}
	   		}  	   
       }); 
       Thread t3 = new Thread(new Runnable() {
	   		@Override
	   		public void run() {
	   			fairLock.lock();
	   			try {
		    		System.out.println(rl.getHoldCount());
		    		
		    	}catch(Exception e) {
		    		
		    	}finally {
		    		fairLock.unlock();
		    	}
	   		}  	   
      });
       Thread t4 = new Thread(new Runnable() {
	   		@Override
	   		public void run() {
	   			fairLock.lock();
	   			try {
		    		System.out.println(rl.getHoldCount());
		    		
		    	}catch(Exception e) {
		    		
		    	}finally {
		    		fairLock.unlock();
		    	}
	   		}  	   
     });
       t2.start();
       t3.start();
       t4.start();
	}

}
