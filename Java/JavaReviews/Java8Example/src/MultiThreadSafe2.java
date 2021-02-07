
public class MultiThreadSafe2 {
    
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Q2 q = new Q2(0);
		producer2 p = new producer2(q, "Producer");
		consumer2 c = new consumer2(q, "Consumer");
	}

}
class Q2{
	int i;
	boolean reading = false;
	Q2(int out){
		i=out;
	}
	public synchronized void get(String name) {
		 while(!reading) {
			try {
				System.out.println("get wait: "+name);
				wait();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		System.out.println(name +" get "+(i));
		reading = false;
		notify();
	}
	public synchronized void add(String name) {
        while(reading) {
			try {
				System.out.println("add wait: "+name);

				wait();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
        i++;
		System.out.println(name+" add " + i);
		reading = true;
		notify();
	}
}
class producer2 implements Runnable{
	Q2 q;
	String name;
	producer2(Q2 theq, String threadName){
		q = theq;		
		name = threadName;
		Thread t = new Thread(this,name);
		t.start();
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		while(true) {
			q.add(name);
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
class consumer2 implements Runnable{
	Q2 q;
	String name;
	consumer2(Q2 out, String threadName){
		q = out;
		name = threadName;
		Thread t = new Thread(this,threadName);
		t.start();
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		while(true) {
			q.get(name);
			try {
				Thread.sleep(10000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}