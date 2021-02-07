
public class singleton {
	public static singleton a;
 public static singleton getTheInstance() {
	 if(a!=null)
	 return a;
	 else {
		 a = new singleton();
		 return a;
	 }
 }
}
