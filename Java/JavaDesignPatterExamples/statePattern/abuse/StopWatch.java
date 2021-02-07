package abuse;

public class StopWatch {
   private boolean isRunning;
   public void click() {
	   if(isRunning) {
		   isRunning = false;
		   System.out.println("stop");
	   }else {
		   isRunning = true;
	   }
   }
}
