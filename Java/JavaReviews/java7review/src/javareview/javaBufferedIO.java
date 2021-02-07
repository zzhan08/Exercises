package javareview;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class javaBufferedIO {
	// buffer io (input, output)
	// stream types:(file, network, console)
	// binaryStreams -> interafaces: (input, output)
	// character streams -> interafaces: (read, write)
  public static void readWrite(String fileFrom, String fileTo) throws Exception {
	  // read write byte by byte
	  // poor io performance
	InputStream in = null;
	OutputStream out = null;
    try {
    	in = new FileInputStream(fileFrom);
    	out = new FileOutputStream(fileTo);
    	while(true) {
    		int bytedata = in.read();// read one byte each time
    		if(bytedata == -1) {
    			break;
    		}
    		out.write(bytedata);
    	}
    } finally {
    	if(in != null)
    		in.close();
    	if(out != null)
    		out.close();
    }
  }
  public static void readWriteBuffer(String fileFrom, String fileTo)  throws Exception {
	  InputStream in = null;
	  
		OutputStream out = null;
	    try {
	    	in = new FileInputStream(fileFrom);
	    	InputStream inbuffer = new BufferedInputStream(in);// default size 512
	    	out = new FileOutputStream(fileTo);
	    	OutputStream outBuffer = new BufferedOutputStream(out);;// default size 512
	    	while(true) {
	    		int bytedata = inbuffer.read();
	    		if(bytedata == -1) {
	    			break;
	    		}
	    		outBuffer.write(bytedata);
	    	}
	    } finally {
	    	if(in != null)
	    		in.close();
	    	if(out != null)
	    		out.close();
	    }
  }
  public static void readWriteArray(String fileFrom, String fileTo)  throws Exception {
	  //best performance
	  InputStream in = null;
		OutputStream out = null;
	    try {
	    	in = new FileInputStream(fileFrom);
	    	out = new FileOutputStream(fileTo);
	    	int availableLength = in.available();
	    	byte[] totalBytes=new byte[availableLength];
	    	int bytedata = in.read(totalBytes);
	    	out.write(totalBytes);
	    } finally {
	    	if(in != null)
	    		in.close();
	    	if(out != null)
	    		out.close();
	    }
  }
  public static void main(String[]args) {
	  javaBufferedIO io = new javaBufferedIO();
      try {
    	  long startTime = System.currentTimeMillis();
    	  io.readWrite("c:/temp/sample-data.txt", "c:/tmp/sample-readWrite.txt");
    	  long endTime = System.currentTimeMillis();
    	  System.out.println("default:" + (endTime - startTime) + " milliseconds");
    	  long startTime1 = System.currentTimeMillis();
    	  io.readWriteBuffer("c:/temp/sample-data.txt", "c:/tmp/sample-readWriteBuffer.txt");
    	  long endTime1 = System.currentTimeMillis();
    	  System.out.println("default buffer:" + (endTime1 - startTime1) + " milliseconds");
    	  long startTime2 = System.currentTimeMillis();
    	  io.readWriteArray("c:/temp/sample-data.txt", "c:/tmp/sample-readWriteBuffer.txt");
    	  long endTime2 = System.currentTimeMillis();
    	  System.out.println("default array:" + (endTime1 - startTime1) + " milliseconds");
      }catch(Exception e) {
    	  System.out.println(e);
      }
  }


}
