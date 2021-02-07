package javareview;

import java.nio.ByteBuffer;
import java.nio.channels.SeekableByteChannel;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class javaChannels {
	public static void main(String[] args) {
		Path path =Paths.get("c:\\temp\\","nio-channel.txt");
		try (SeekableByteChannel sbc=Files.newByteChannel(path, EnumSet.of(StandardOpenOption.READ))){

			ByteBuffer bb = ByteBuffer.allocate(12);
			String encoding = System.getProperty("file.encoding");
			bb.clear();
			while(sbc.read(bb)>0) {
				bb.flip();
				System.out.print(Charset.forName(encoding).decode(bb));
				bb.clear();
			}
		}catch(Exception e) {
			System.err.print(e);

		}
		try(SeekableByteChannel sbc=Files.newByteChannel(path, EnumSet.of(StandardOpenOption.WRITE,
				StandardOpenOption.TRUNCATE_EXISTING))){
			ByteBuffer bb = ByteBuffer.wrap("sonnet xxxxv1".getBytes());
			int write = sbc.write(bb);
			
			System.out.print(write);
			bb.clear();
			
		}catch(Exception e) {
			System.err.print(e);

		}
	}
}
