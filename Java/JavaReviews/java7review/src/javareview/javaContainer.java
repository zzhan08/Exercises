package javareview;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Vector;

public class javaContainer {
	public static void main(String[] args) {
		//SET no duplicate
		//LIST canbe duplicate, list start from 0, fast insert and manipulate
		//Vector -> synchronized and thread safe
		//ArrayList -> 
		String str[]={"","",""};
		List v = Arrays.asList(str); 
		List v1 = new ArrayList();
		v1.add(1);
		v1.add(2.2);
		v1.add("str");
		v1.add("str");

		//
		Set mySet = new HashSet(v1);
		for(Object o: mySet) {
			System.out.println("o"+o);// duplicates will be removed
		}
	}
		
}
