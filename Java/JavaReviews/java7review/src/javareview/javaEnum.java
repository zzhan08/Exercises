package javareview;

import java.util.EnumSet;

public class javaEnum {// Enum Serializable
	public static enum colors {
       sss,ddd,eee;
	}
	colors fd;
	public void loopEnum() {
		for(colors c: colors.values()) {
			System.out.println("c: "+c);
		}
		
		for(colors c: EnumSet.range(colors.ddd, colors.eee)) {
			System.out.println("c: "+c);
		}
	}
	public static void main(String[] args) {
		javaEnum je = new javaEnum();
		je.loopEnum();
    }
}
