package javareview;

public class car implements java.io.Serializable{
	// define object serializable
	// 1. implments java.io.serilizable
	// 2. all fields has to be serilizable or marked as transient
	int speed = 0;
	transient String password;// do not serilize password for security
	static {
		System.out.println("execute when class loaded");
	}
	
}
