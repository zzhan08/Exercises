package ThreadControls;
class A extends Thread{

	@Override
	public void run() {
		// TODO Auto-generated method stub
		for(int i = 0; i<10;i++) {
			if(i==5) {
				yield();
				System.out.println("Thread A Called Yeield ");

			}
//			try {
//				Thread.sleep(100);
//			} catch (InterruptedException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
			System.out.println("Thread A: "+i);
		}
	}
	
}
class B  extends Thread{
	@Override
	public void run() {
		// TODO Auto-generated method stub
		for(int i = 0; i<10;i++) {
			System.out.println("Thread B: "+i);
//			try {
//				Thread.sleep(100);
//			} catch (InterruptedException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
			
		}
	}
}
public class ThreadYieldExample {
	// yield() give priority to other thread
  public static void main(String []args) {
	  new A().start();
	  new B().start();
  }
}
