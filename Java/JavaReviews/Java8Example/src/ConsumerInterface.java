import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

class consum implements Consumer<Object>{

	@Override
	public void accept(Object t) {
		// TODO Auto-generated method stub
		System.out.println(t);
	}
	
}
/*JAVA 8 Consumer Interface */
public class ConsumerInterface {
  public static void main(String[]args) {
	  List<Integer> iList = Arrays.asList(1,2,3,4);
	  iList.forEach(i->System.out.println(i.intValue()));
	  iList.forEach(new consum());
	  iList.forEach(new Consumer() {
		  public void accept(Object t) {
			  System.out.println(t);
		  }
	  });
	  Consumer c=i->System.out.println(i);
	  iList.forEach(c);
  }
}
