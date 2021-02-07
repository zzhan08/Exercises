package javareview;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class javaWildCards {
	public static double  printlnArray(List<? extends Number> list) {// only those inherited from Number
		double i = 0.0;
		for(Number element: list) {
			i+=element.doubleValue();
		}
		return i;
	}
	public static void  printlist(List<?> list) {// only those inherited from Number
		double i = 0.0;
		for(Object element: list) {
			System.out.println("element; "+element);
		}
	}
	public static void  printlonly(List<? super Integer> list) {// only integer and super class
		
	}
	public static void main(String[] args) {
	  Integer[]ints = {1,2};
	  int []its = {1,2,3,4};
	  Character[]chars = {'a','b'};
	  char c[]={'a','b'};
	  printlnArray(Arrays.asList(ints));
		System.out.println("=========================================");

	  printlist(Arrays.asList(ints));
		System.out.println("=========================================");

	  printlist(Arrays.asList(c));
	  System.out.println("=========================================");

	  printlist(Arrays.asList(its));// treat as object
	  List<Number> nums = new ArrayList<Number>();

	  List<Integer> integers = new ArrayList<Integer>();// 
	 // nums=integers;// list<integer> is subtype of Collection<Integer> not subtype of List<Number>

	}
}
