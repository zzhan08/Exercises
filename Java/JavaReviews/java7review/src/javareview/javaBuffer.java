package javareview;

public class javaBuffer {
	void stringbuffer() {
		 String s = new String("d");
		  s+="a";
		  StringBuffer constS=new StringBuffer("d");// a lot faster concatenation then string
		  constS.append("d");
	}
 
    void javaarray() {
    	int[]c=new int[12];//primitive type array
    	String[]s=new String[12];// reference type array
    	int[] arr;
    	arr = new int[12];
    	int[] arrarr = {1,2,3,4};
    }
    void passingByValue(double d) {
    	d=3.45;//d is copy
    }
    public static void passingByValueOfObject(car c) {
    	c.speed=20;// c is copy of value, but speed is the same pointer of origin
    }
    public static void passingByValueChangeObjectObject(car c) {
    	c = new car();
    	c.speed = 1000;
    }
    public static void main(String[] args) {
    	car c=new car();
    	passingByValueOfObject(c);
    	System.out.println("passingByValueOfObject: "+c.speed);
    	passingByValueChangeObjectObject(c);
    	System.out.println("passingByValueOfObject: "+c.speed);

    }
}
