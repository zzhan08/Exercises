import java.util.ArrayList;
import java.util.List;

public class ProducerConsumerProblem {
   static List<Integer> thelist=new ArrayList<>();
   static int size = 10;
   boolean ifProduced=false;
   public void pruducer() {
	   while(true) {

		       synchronized(this) {
	    		  if(!ifProduced) {
					   thelist.add(1);
					   System.out.println("Add 1"); 
					   ifProduced = true;
				   }
				   notify();
		    	}

			
          
	   }
   }
   public void consummer() {
	   while(true) {
		   try {
			   synchronized(this) {
			   wait();
				   if(ifProduced) {
					   thelist.remove(0);
					   System.out.println("Remove 1");
				   }
				   ifProduced=false;
			   }

			} catch (InterruptedException e) {
				e.printStackTrace();
			}
	   }
   }
   public static void main(String []args) {
	   ProducerConsumerProblem pcp = new ProducerConsumerProblem();
	   new Thread(()->pcp.pruducer()).start();
	   new Thread(()->pcp.consummer()).start();

   }
}
