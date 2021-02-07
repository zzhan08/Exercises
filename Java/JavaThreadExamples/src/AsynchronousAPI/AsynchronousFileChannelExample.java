package AsynchronousAPI;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.channels.CompletionHandler;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class AsynchronousFileChannelExample {
	public static void simpleExample() {
		ByteBuffer buffer=ByteBuffer.allocate(1024);
		Path p=Paths.get("/home/file2");
		try {
			AsynchronousFileChannel fileChannel = AsynchronousFileChannel.open(p, StandardOpenOption.READ);
			fileChannel.read(buffer, 0 , buffer, new CompletionHandler<Integer,ByteBuffer>(){

				@Override
				public void completed(Integer result, ByteBuffer attachment) {
					// TODO Auto-generated method stub
					
				}

				@Override
				public void failed(Throwable exc, ByteBuffer attachment) {
					// TODO Auto-generated method stub
					
				}
				
			});
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
  public static void main(String[]args) {
	  simpleExample();
  }
}
