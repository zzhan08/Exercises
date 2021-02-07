package javareview;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Properties;
import java.util.prefs.Preferences;

public class javaPropertyFiles {
	/*
	 * Persistent hashtable stores key value pairs of stream
	 * setProperty and getProperty
	 * Written to OutputStream, read into InputStream
	 * used to store application information
	 * */
	
	public static void main(String[] args) {
	  Properties propOut= new Properties();
      try {
    	  propOut.setProperty("database", "localhost");
    	  propOut.setProperty("dbuser", "vtc");

    	  propOut.setProperty("dbpassword", "superSecretSauce");
    	  propOut.store(new FileOutputStream("c:\\temp\\config.properties"),null);
    	  propOut=null;
    	  Properties propIn = new Properties();
    	  propIn.load(new FileInputStream("c:\\temp\\config.properties"));
    	  System.out.println(propIn.getProperty("database"));
      }catch(Exception e) {
    	  System.out.println(e);

      }
    }
}
