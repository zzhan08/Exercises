class Resource {
	
}
public class DoubleCHeckLockExample {
	private  volatile Resource rs = null;
	public  void getExpensiveResource() {
		/*Synchronized keywork is expensive
		 * use double check to prevent expensive lock of resource
		 * */
		if(rs == null) {
			synchronized(this) {
				if(rs == null) {
					rs = new Resource();
					/*1. create empty resource()
					 * 2. assign to rs
					 * 3. call constructor
					 * but JVM will reorder these three instructions
					 * it possible constructor not been call yet and one thread
					 * will return an empty resource opject, 
					 * TO fix add volatile to locked resource
					 * */
				}
			}
		}
	}
  public static void main(String [] args) {
	  
  }
}
