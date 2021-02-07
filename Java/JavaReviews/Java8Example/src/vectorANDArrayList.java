import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.Set;
import java.util.TreeSet;
import java.util.Vector;

public class vectorANDArrayList {
	public static void introArr() {
		//+++++++++++++++++++++++++++++++++Vector+++++++++++++++++++++++++++++++
		  Vector<Integer>v=new Vector<>();
		  v.add(1);
		  v.add(2);
		  v.add(3);
		  v.remove(new Integer(2));
		  System.out.println(v.capacity());
		  //+++++++++++++++++++++++++++++++++ArrayList++++++++++++++++++++++++++++++
		  ArrayList<Integer>a=new ArrayList<>();
		  a.add(1);
		  a.add(2);
		  a.add(3);
		  a.remove(new Integer(2));
		  System.out.println();//
	}
	public static void introList() {
		 //+++++++++++++++++++++++++++++++++LinkedList+++++++++++++++++++++++++++++++++
		  LinkedList<Integer> ll = new LinkedList<>();
	}
	public static void whileloop(Collection theCollection) {
		 Iterator<String> it = theCollection.iterator();
	     while(it.hasNext()){
	        System.out.println(String.valueOf(it.next()));
	     }
	}
	public static <T> void forloop(Collection<T> theCollection) {
		 for(Object o: theCollection) {
		        System.out.println(((T)o));

		 }
	}
	public static  void introSet() {
		System.out.println("+++++++++++++++++++++++++++++++++HashSet+++++++++++++++++++++++++++++++++");
		HashSet<Integer> hs = new HashSet<>();// duplicated element will be return false // not maintain insert sequence // faster //retrieve complexity O(1).
		hs.add(46);
		hs.add(23);

		hs.add(164);
		hs.add(54);
		whileloop(hs);
		forloop(hs);
		System.out.println("+++++++++++++++++++++++++++++++++TreeSet+++++++++++++++++++++++++++++++++");
		Set<Integer> ts = new TreeSet<>();// duplicated element will be return false // not maintain insert sequence // slower //complexity O(log(1)).
		ts.add(46);
		ts.add(23);

		ts.add(164);
		ts.add(54);

		whileloop(ts);
		forloop(ts);
		System.out.println("+++++++++++++++++++++++++++++++++LinkedListSet+++++++++++++++++++++++++++++++++");
		Set<Integer> lls = new LinkedHashSet<>();// duplicated element will be return false // not maintain insert sequence // slower //complexity O(log(1)).
		lls.add(46);
		lls.add(23);

		lls.add(164);
		lls.add(54);

		whileloop(lls);
		forloop(lls);
	}
	public static  void introMap() {
		System.out.println("+++++++++++++++++++++++++++++++++HashSet+++++++++++++++++++++++++++++++++");
		HashSet<Integer> hs = new HashSet<>();// duplicated element will be return false // not maintain insert sequence // faster //retrieve complexity O(1).
		hs.add(46);
		hs.add(23);

		hs.add(164);
		hs.add(54);
		whileloop(hs);
		forloop(hs);
		System.out.println("+++++++++++++++++++++++++++++++++TreeSet+++++++++++++++++++++++++++++++++");
		Set<Integer> ts = new TreeSet<>();// duplicated element will be return false // not maintain insert sequence // slower //complexity O(log(1)).
		ts.add(46);
		ts.add(23);

		ts.add(164);
		ts.add(54);

		whileloop(ts);
		forloop(ts);
		System.out.println("+++++++++++++++++++++++++++++++++LinkedListSet+++++++++++++++++++++++++++++++++");
		Set<Integer> lls = new LinkedHashSet<>();// duplicated element will be return false // not maintain insert sequence // slower //complexity O(log(1)).
		lls.add(46);
		lls.add(23);

		lls.add(164);
		lls.add(54);

		whileloop(lls);
		forloop(lls);
	}
  public static void main(String[] args) {
	  //introSet();
	
  }
}
