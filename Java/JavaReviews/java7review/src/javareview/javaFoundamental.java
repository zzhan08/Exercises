package javareview;

import java.util.concurrent.atomic.*;

public class javaFoundamental {
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
    // atomic classes, muteable, atomic operation, write lock free and wait free
    AtomicInteger ati = new AtomicInteger();
    AtomicLong atl = new AtomicLong();
    AtomicBoolean atb = new AtomicBoolean();
    AtomicReference<Integer> atf = new AtomicReference();
    public void javastring() {
    	// java string is a object class
    	String s1="hello";//string literal has better performance
    	String s2=new String("hello");// not suggested
    	switch(s1) {// switch statemnt only allow int before java7, switch with string in Java7 improve performance
    	case"hello":
    		break;
    	default:
    		break;
    	}
    }
}
