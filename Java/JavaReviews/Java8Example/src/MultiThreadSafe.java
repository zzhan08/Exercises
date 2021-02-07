
public class MultiThreadSafe {
    
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Q q = new Q(0);
		producer p = new producer(q, "Producer");
		consumer c = new consumer(q, "Consumer");
	}

}
class Q{
	int i;
	boolean reading = false;
	Q(int out){
		i=out;
	}
	public synchronized void get(String name) {
		 while(!reading) {
			try {
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
class producer implements Runnable{
	Q q;
	String name;
	producer(Q theq, String threadName){
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
class consumer implements Runnable{
	Q q;
	String name;
	consumer(Q out, String threadName){
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
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}