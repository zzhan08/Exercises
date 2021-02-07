import java.util.Arrays;

public class shapeMakerProxy extends shapename{
   
	public shapeMakerProxy(String name) {
		super(name);
		// TODO Auto-generated constructor stub
	}
	static String[]forbidList= new String[] {"Trangle"};
	public shapename draw(String name) {
		// TODO Auto-generated method stub
		if(java.util.Arrays.asList(forbidList).indexOf(name) >= 0) {
			System.out.println("cannot draw shape");
			return null;
		}else {
			return new shapename(name);
		}
	}

}
