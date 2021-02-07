
public class MyRepo implements myCollection{
    
	public String []names = {"a","b","c"};
	@Override
	public iterator getIterator() {
		// TODO Auto-generated method stub
		return new NameIterator();
	}
	 private class NameIterator implements iterator {

	      int index;

	      @Override
	      public boolean hasNext() {
	      
	         if(index < names.length){
	            return true;
	         }
	         return false;
	      }

	      @Override
	      public Object next() {
	      
	         if(this.hasNext()){
	            return names[index++];
	         }
	         return null;
	      }		
	   }
}
