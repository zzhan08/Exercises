package javareview;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class JavaGenerics {
	public static <E> void printlnArray(E[]arraya) {// any type OBJECT
		for(E element: arraya) {
			System.out.println("E: "+element);
		}
	}
	public static void main(String[] args) {
	  Integer[]ints = {1,2};
	  Character[]chars = {'a','b'};
	  char c[]={'a','b'};
	  printlnArray(ints);
	  printlnArray(chars);
	 // printlnArray(c);// c has to be object array

	}
}
