package javareview;

public class javaWrapper {
	public static void main(String[] args) {
		// primitive type faster than object type
		byte b=10;
	    short s=10;
	    int i = 10;
	    long l = 10l;
	    float f=1.1f;
	    double d=1.1;
	    char c = 'a';
	    boolean bool =true;
	    // Object type
	    Byte objbyte = new Byte("10");
	    Short Short = new Short("10");
	    Integer Integer = new Integer("10");
	    Long aLong = Long.valueOf("10L");
	    Float af;
	    Double dB;
	    Character cf;
	    Boolean bo;

	    int parsedInt = Integer.parseInt("2");
	    Integer wrappedInteger = java.lang.Integer.valueOf(1);
	    int primitiveInt = Integer.valueOf(i);
	    int primInt = Integer.intValue();
    }
}
