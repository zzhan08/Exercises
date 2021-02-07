package javareview;

import static java.lang.Integer.MAX_VALUE;
import static java.lang.Integer.MIN_VALUE;

import java.util.*;

public class AutoBoxing {
	public static void main(String[] args) {
		 
        List<Integer> listIntergers = new ArrayList<>();
        listIntergers.add(1);// autoboxing ==> listIntergers.add(Integer.valueOf(1));// during compile time
        int first= listIntergers.get(0);// autoUnboxing ==> listIntergers.get(0).intValue()// long.intValue()
	}

}
