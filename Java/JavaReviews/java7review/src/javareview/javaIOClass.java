package javareview;

import java.io.FileOutputStream;
import java.util.prefs.Preferences;
import java.util.zip.Adler32;
import java.util.zip.CheckedOutputStream;

public class javaIOClass {
	public static void main(String[] args) {
      Adler32 outChecker = new Adler32();
      CheckedOutputStream out = null;
      String content = "Hello VTC";
      try{
    	  out = new CheckedOutputStream(new FileOutputStream("c:\\temp\\aCheckSumFile.dat"),outChecker);
    	  
    	  byte[] contentInBytes = content.getBytes();
    	  out.write(contentInBytes);
    	  System.out.println(outChecker.getValue());
    	  out.flush();
    	  out.close();
      }catch(Exception e) {
    	  System.out.println(e);

      }
    }
}
