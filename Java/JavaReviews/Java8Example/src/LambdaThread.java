class thrsead{
	public static void print() {
		System.out.println("println this message");
	}
}
class thrsead1{
	public void print() {
		System.out.println("println this t5 message");
	}
}
class thrsead6 {
	public thrsead6() {
		System.out.println("println this t6 message");
	}
}
public class LambdaThread {
   public static void main(String [] args) throws InterruptedException {
	   Thread t1 = new Thread(()->{
	      for(int i = 0; i< 100;i++) {
	    	  System.out.println("Thread t1: "+i);
	      }
	   });
	   Thread t2 = new Thread(()->{
		   for(int i = 0; i< 100;i++) {
	    	  System.out.println("Thread t2: "+i);
	       }  
	   });
	   Thread t3=new Thread(new Runnable() {

		@Override
		public void run() {
			// TODO Auto-generated method stub
			for(int i = 0; i< 100;i++) {
		    	  System.out.println("Thread t3: "+i);
		       }
		}
		   
	   });
	   Thread t4=new Thread(thrsead::print);
	   Thread t5=new Thread(new thrsead1()::print);
	   Thread t6=new Thread(thrsead6::new);

	   //t1.start();
	   //t2.start();
	  // t3.start();
	   t4.start();
	   t5.start();
	   t6.start();

	   //t1.join();
	   //t2.join();
	   System.out.println("bye");
   }
}
