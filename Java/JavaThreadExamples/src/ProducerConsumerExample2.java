import java.util.ArrayList;
import java.util.List;

public class ProducerConsumerExample2 {
   static List<Integer> thelist=new ArrayList<>();
   static int size = 10;
   boolean ifProduced=false;
   public synchronized void pruducer() {

	  if(!ifProduced) {
		    try {
		    	wait();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    System.out.println("Add 1"); 
		    ifProduced = true;
	   }
	   notify();
  

   }
   public synchronized void consummer() {
	   try {
		   if(ifProduced) {
			   wait();
			   System.out.println("Remove 1");
		   }
		   ifProduced=false;
		   notify();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

   }
   public static void main(String []args) {
	   ProducerConsumerExample2 pcp = new ProducerConsumerExample2();
	   new Thread(()-> {
		   while(true) {
			   pcp.pruducer();
		   }
	   })  .start();
	   new Thread(()-> {
		   while(true) {
			   pcp.consummer();
		   }
	   } ).start();

   }
}
