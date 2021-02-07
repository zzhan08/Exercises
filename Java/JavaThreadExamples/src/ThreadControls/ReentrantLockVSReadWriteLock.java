package ThreadControls;

import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

class ReentrantLockExample {
	// one thread at a time
	ReentrantLock lock = new ReentrantLock();

	void read(){
		lock.lock();
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("read");

		lock.unlock();
	}
	void write() {
		lock.lock();
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("write");

		lock.unlock();
	}
}
class ReadWriteLockExample{
	//one writer thread at a time
	// mutiple reader thread at a time
	ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
	ReentrantReadWriteLock.WriteLock writelock = lock.writeLock();
	ReentrantReadWriteLock.ReadLock readlock = lock.readLock();

	void read(){
		readlock.lock();
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("read");

		readlock.unlock();
	}
	void write() {
		writelock.lock();
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("write");

		writelock.unlock();
	}
    
}
public class ReentrantLockVSReadWriteLock {
	public static void readwriteLockexample() {
		 ReadWriteLockExample rwe = new ReadWriteLockExample();
		  Thread t1 = new Thread(()->rwe.read());
		  Thread t2 = new Thread(()->rwe.write());
		  Thread t3 = new Thread(()->rwe.read());
		  Thread t4 = new Thread(()->rwe.write());
		  t1.start();
		  t2.start();
		  t3.start();
		  t4.start();
	}
	public static void reentrantLockExample() {
		ReentrantLockExample rwe = new ReentrantLockExample();
		  Thread t1 = new Thread(()->rwe.read());
		  Thread t2 = new Thread(()->rwe.write());
		  Thread t3 = new Thread(()->rwe.read());
		  Thread t4 = new Thread(()->rwe.write());
		  t1.start();
		  t2.start();
		  t3.start();
		  t4.start();
	} 
  public static void main(String[]args) {
	  reentrantLockExample();

  }
}
