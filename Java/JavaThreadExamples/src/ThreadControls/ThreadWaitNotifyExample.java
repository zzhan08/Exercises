package ThreadControls;
class processor{
	public  void producer() {
		synchronized(this) {
			try {
				wait();
				System.out.println("wainting");
				Thread.sleep(1000);

			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
    public  void consumer() {
    	synchronized(this) {
			

          try {
        	  Thread.sleep(3000);

      		notify();
  			System.out.println("notifyied");
			Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}
	}
} 
public class ThreadWaitNotifyExample {
   public static void main(String []args) {
	   processor p = new processor();
	   Thread t1 = new Thread(()->p.producer());
	   Thread t2 = new Thread(()->p.consumer());
	   t1.start();
	   t2.start();

   }
}
