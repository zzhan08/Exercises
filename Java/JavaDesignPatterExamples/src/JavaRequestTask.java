import java.util.Collections;
import java.util.*;
import java.util.concurrent.*;
class RequestTask implements Runnable {
    private String url;    private int productid;
    private Set<Integer> prices;
	public RequestTask(String url, int productid,Set<Integer> pricess) {
		super();
		this.url = url;
		this.productid = productid;
		this.prices=pricess;
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
      
       try {
   		System.out.println("product id sleep"+productid*1000+"begin: "+ productid);

		Thread.sleep(productid*1000);
		System.out.println("product id sleep finish: "+ productid);
		 int price=productid;
	       prices.add(price);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
public class JavaRequestTask implements Runnable {
    private String url;    private int productid;
    private Set<Integer> prices;
    CountDownLatch c;
	public JavaRequestTask(String url, int productid,Set<Integer> pricess,CountDownLatch cdl) {
		super();
		this.url = url;
		this.productid = productid;
		this.prices=pricess;
		this.c = cdl;
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
      
       try {
   		System.out.println("product id sleep"+productid*1000+"begin: "+ productid);

		Thread.sleep(productid*1000);
		System.out.println("product id sleep finish: "+ productid);
		 int price=productid;
	       prices.add(price);
	} catch (InterruptedException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
       c.countDown();
	}
    public static Set<Integer> getPrices(CountDownLatch cdl) throws InterruptedException {
    	Set<Integer> prices = Collections.synchronizedSet(new HashSet<>());
        ExecutorService threadPool = Executors.newFixedThreadPool(4);
        threadPool.submit(new JavaRequestTask("Amazon", 1,prices,cdl));
        threadPool.submit(new JavaRequestTask("Warmart", 20,prices,cdl));
        threadPool.submit(new JavaRequestTask("Ebay", 30,prices,cdl));
        //cdl.await();
        System.out.println("wait 1000");

        cdl.await(1000, TimeUnit.MILLISECONDS);//wait only 1s for countdown
        System.out.println("wait 1000 finish");
        return prices;
    }
    public static void ScatterGatherPatternWithCountDownLatch() {
    	// TODO Auto-generated method stub
    	CountDownLatch cdl = new CountDownLatch(3);

		Set<Integer> s;
		try {
			System.out.println("getprince");
			s = getPrices(cdl);
			System.out.println("===================");
			s.forEach(System.out::println);

		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    public static Set<Integer> ComplitableFutreGetPrices() {
    	Set<Integer> prices = Collections.synchronizedSet(new HashSet<>());
        CompletableFuture <Void> F1 = CompletableFuture.runAsync(new RequestTask("ulr1", 1, prices));
        CompletableFuture <Void> F2 = CompletableFuture.runAsync(new RequestTask("ulr2", 2, prices));
        CompletableFuture <Void> F3 = CompletableFuture.runAsync(new RequestTask("ulr3", 3, prices));
        CompletableFuture <Void> fAll = CompletableFuture.allOf(F1,F2,F3);
        try {
			//fAll.get();
			fAll.get(1000, TimeUnit.MILLISECONDS);//ifnot finish within time will throw exception
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (TimeoutException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return prices;
    }
    public static void ScatterGatherPatternWithCompletableFuture() {
    	Set<Integer> s;
		
			System.out.println("getprince");
			s = ComplitableFutreGetPrices();
			System.out.println("===================");
			s.forEach(System.out::println);

    }
	public static void main(String[] args) {
		
		ScatterGatherPatternWithCompletableFuture();
	}

}
