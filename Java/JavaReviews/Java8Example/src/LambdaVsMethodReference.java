import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;


public class LambdaVsMethodReference {
	private void printPrivate(String arg) {
		System.out.println(arg);

	}
	private static void print(String arg) {
		System.out.println(arg);

	}
	private static void printCM(callMethods mc,String arg) {
		mc.call(arg);

	}
    public static void main(String [] args) {
    	methods m = new methods();
    	List<String> iList = new ArrayList<>();
	  	  for(int i=0;i<5;i++) {
	  		  iList.add(String.valueOf(i));
	  	  }
	  	System.out.println("=========================");
	  	iList.forEach(methods::callStaticPublic);
	  	System.out.println("=========================");
	  	iList.forEach(m::callPublic);
	  	System.out.println("=========================");
	  
	  	iList.forEach(LambdaVsMethodReference::print);
	  	System.out.println("=========================");
	  	iList.forEach(new LambdaVsMethodReference()::printPrivate);
	  	System.out.println("=========================");

		//iList.forEach(m::callPrivate);
	  	//iList.forEach(methods::callStaticPrivate);
	  	//callMethods c=m::callPublic;
	  	printCM(LambdaVsMethodReference::print, "printStaticPrivate");
	  	printCM(new LambdaVsMethodReference()::printPrivate, "printPrivate");
	  	printCM(new callMethods() {

			@Override
			public void call(String x) {
				// TODO Auto-generated method stub
				System.out.println(x);
			}
	  		
	  	}, "functional interface");
	  	printCM(System.out::println, "System.out::println");
	  	printCM((x)->System.out.println(x), "lambda print");

    }
}
