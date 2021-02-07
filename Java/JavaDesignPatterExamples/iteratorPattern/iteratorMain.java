
public class iteratorMain {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
	
			      MyRepo namesRepository = new MyRepo();

			      for(iterator iter = namesRepository.getIterator(); iter.hasNext();){
			         String name = (String)iter.next();
			         System.out.println("Name : " + name);
			      } 	
	
	}

}
