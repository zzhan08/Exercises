
public class threandTest {
	public static void main(String args[]) {
		WithSynchronization o = new WithSynchronization();
		WithNoSynchronization o1 = new WithNoSynchronization();

		ExmThread1 thread1 = new ExmThread1(o,o1);
		ExmThread2 thread2 = new ExmThread2(o,o1);
		thread1.start();
		thread2.start();
	}
}
class WithSynchronization {
	synchronized void table(int s) { // synchronized  method
		for (int i = 1; i <= 5; i++) {
			System.out.println(s * i);
			try {
				Thread.sleep(400);
			} catch (Exception e) {
				System.out.println(e);
			}
		}

	}
}
class WithNoSynchronization {
	
	 void table(int s) { // synchronized  method
		 synchronized(this) {
			 for (int i = 1; i <= 5; i++) {
					System.out.println("no sync: "+s * i);
					try {
						Thread.sleep(400);
					} catch (Exception e) {
						System.out.println(e);
					}
				}
		 }
		

	}
}
class ExmThread1 extends Thread {
	WithSynchronization t;
	WithNoSynchronization t1;
	ExmThread1(WithSynchronization t, WithNoSynchronization t1) {
		this.t = t;
		this.t1 = t1;
	}
	public void run() {
		t.table(5);
		t1.table(5);
	}

}
class ExmThread2 extends Thread {
	WithSynchronization t;	
	WithNoSynchronization t1;
	ExmThread2(WithSynchronization t, WithNoSynchronization t1) {
		this.t = t;		
		this.t1 = t1;
	}
	public void run() {
		t.table(100);
		t1.table(100);
	}
}

