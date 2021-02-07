package javareview;

public class javaThread { 
	  
    public static void main(String[] args) 
    { 
        System.out.println("Main thread is- "
                        + Thread.currentThread().getName()); 
        javaThread.RunnableImpl a =new  javaThread().new RunnableImpl();
        Thread t1 = new Thread(new javaThread().new RunnableImpl()); 
        t1.start(); 
    } 
  
    private class RunnableImpl implements Runnable { 
  
        public void run() 
        { 
            System.out.println(Thread.currentThread().getName() 
                             + ", executing run() method!"); 
            
        } 
    } 
} 