package javareview;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Properties;

public class javaObjSerilization {
	public static void main(String[] args) {
		  try {
			  car c= new car();
			  c.password="1000";
			  FileOutputStream fileOut = new FileOutputStream("user.ser");
			  ObjectOutputStream out = new ObjectOutputStream(fileOut);
			  out.writeObject(c);
			  out.close();
			  fileOut.close();
			  System.out.println("out c" + c.password+"|"+c.speed);

		  }catch(Exception e) {
			  System.out.println("output err" + e);
		  }
		  try {
			  FileInputStream filein = new FileInputStream("user.ser");
			  ObjectInputStream in = new ObjectInputStream(filein);
			  car c = (car)in.readObject();
			  in.close();
			  filein.close();
			  System.out.println("input c" + c.password+"|"+c.speed);

		  }catch(Exception e) {
			  System.out.println("input err" + e);
		  }
	}
}
