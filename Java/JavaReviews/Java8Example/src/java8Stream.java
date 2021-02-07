import java.util.*;

public class java8Stream {
  public static void main(String[]args) {
	  List<Integer> iList = new ArrayList<>();
	  for(int i=0;i<100;i++) {
		  iList.add(i);
	  }
	  //iList.stream().forEach(System.out::println);//method reference
	  //iList.parallelStream().forEach(System.out::println);//method reference
	  iList.stream().filter(i->{

		  if(i%2==0) {

		  return true;
	  }return false;}).forEach(i->System.out.println(i));//method reference

  }
}
