package threadPools;

import java.util.*;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveAction;
import java.util.concurrent.TimeUnit;

class Product{
	String name;
	double price;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
}
class ProductListGenerator{
	public List<Product>generate(int size){
		 List<Product> x = new ArrayList<>();
		for(int i = 0; i< size;i++) {
			Product p = new Product();
			p.setName("Product "+i);
			p.setPrice(10);
			x.add(p);
		}
		return x;
	}
}
public class ForkJoinPoolExample extends RecursiveAction {
	private List<Product> products;
	private int first;
	private int last;
	private double increment;
    public ForkJoinPoolExample(List<Product> products, int first, int last, double increment) {
		super();
		this.products = products;
		this.first = first;
		this.last = last;
		this.increment = increment;
	}

    public static void main(String[]args) {
    	ProductListGenerator generator = new ProductListGenerator();
    	List<Product> products = generator.generate(10000);
    	double d = 0.20;
    	ForkJoinPoolExample f  =  new ForkJoinPoolExample(products, 0, 10000, d);
    	ForkJoinPool pool  = new ForkJoinPool();
    	pool.execute(f);
    	do {
    		System.out.println("=======================================");
    		System.out.printf("Main Parallelism: %d\n", pool.getParallelism());
    		System.out.printf("Main Active Threads: %d\n", pool.getActiveThreadCount());
    		System.out.printf("Main Task Count: %d\n", pool.getQueuedTaskCount());
    		System.out.printf("Main steal Count: %d\n", pool.getStealCount());
    		System.out.println("=======================================");

    		try {
				TimeUnit.MICROSECONDS.sleep(5);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}while(!f.isDone());
    	pool.shutdown();
    	if(f.isCompletedNormally()) {
    	  System.out.printf("Main: thre proces has complete normally");	
    	}
    	for(int i = 0; i< products.size();i++) {
    		Product p = products.get(i);
    		if(p.getPrice()!=12) {
    			System.out.printf("product $s: $f\n",p.getName(), p.getPrice());
    		}
    	}
    }

	@Override
	protected void compute() {
		// TODO Auto-generated method stub
		if(last - first < 10) {
			updatePrices();
		}else {
			int middle = (last+first)/2;
			System.out.printf("Task pending task %s\n", getQueuedTaskCount());
			ForkJoinPoolExample f1 = new ForkJoinPoolExample(products, first, middle+1, increment);
			ForkJoinPoolExample f2 = new ForkJoinPoolExample(products, middle+1, last, increment);
			invokeAll(f1,f2);

		}
	}

	private void updatePrices() {
		// TODO Auto-generated method stub
		for(int i = first; i< last;i++) {
			Product p = products.get(i);
			p.setPrice(p.getPrice()*(1+increment));;
		}
	}
}
