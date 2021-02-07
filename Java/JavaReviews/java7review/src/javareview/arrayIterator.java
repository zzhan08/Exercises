package javareview;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class arrayIterator {
	public static void main(String[] args) {
		List v1 = new ArrayList();
		v1.add(1);
		v1.add(2.2);
		v1.add("str");
		v1.add("str");
		Iterator v1iter = v1.iterator();
		//while(v1iter.hasNext()) {
			//System.out.println("while has next");

			//v1iter.next();
		//}
		for(;v1iter.hasNext();) {
			System.out.println("for has next");
			v1iter.next();
		}
	}
}
