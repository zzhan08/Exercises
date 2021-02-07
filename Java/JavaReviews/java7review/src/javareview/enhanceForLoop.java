package javareview;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class enhanceForLoop {
	public static void main(String[] args) {
	   int [] arr = {1,2,3,4};// avoid out range
	   for(int v: arr) {
		   // v is value of copy
		    v=0;
		   System.out.println("v: "+v);
	   }
	   System.out.println("arr: "+arr);
	   for(int v: arr) {
		   // v is value of copy
		   // v="s"
		   System.out.println("v: "+v);
	   }
	   Collection<String> namelist = new ArrayList<String>();
	   namelist.add("a");
	   namelist.add("b");
	   namelist.add("c");
	   for(String v: namelist) {
		   // v is value of copy
		   v="s";
		   System.out.println("v: "+v);
	   }
	   System.out.println("namelist: "+namelist);
	   Collection<StringBuffer> namelistb = new ArrayList<StringBuffer>();
	   namelistb.add(new StringBuffer("a"));
	   namelistb.add(new StringBuffer("b"));
	   namelistb.add(new StringBuffer("c"));
	   for(StringBuffer v: namelistb) {
		   // v is value of copy
		   v.append("e");
		   System.out.println("v: "+v);
	   }
	   System.out.println("namelist: "+namelistb);

	}
}
