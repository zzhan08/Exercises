package javareview;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

public class javaFileIo {
	public static void main(String[]args) {
		// intro
		File[] roots = File.listRoots();
		for(File root:roots) {
			System.out.println(root);
		}
		File file1= new File("/y/z");//unix or linux
		File file= new File("D:\\TEMP\\a.dat");//windows
        // Write
		try {
			boolean exist = file.createNewFile();// not exist and created return false
			                                     // exist return false;
			System.out.println(exist);
			FileWriter fw = new FileWriter(file);
			BufferedWriter out =new BufferedWriter(fw);
			// text writen inside buffer only store in buffer
			// only saved in file when buffer is flushed or buffer fills up
			out.write("Hello VTC");
			out.close();// cloase flush
			System.out.println("File created succeefully");
		}catch(Exception e){System.out.println(e);}
		// File Info
		file.canExecute();
		file.canRead();
		file.canWrite();
		file.exists();
		file.isDirectory();
		file.isFile();
		file.isHidden();
		file.lastModified();
		file.length();
		// read
		FileReader fileReader = null;
		try {
			fileReader = new FileReader(file);
			BufferedReader reader = new BufferedReader(fileReader);
			String line = "";
			while((line = reader.readLine()) != null) {
				System.out.println(file);
			}
		}catch(Exception e){System.out.println(e);}finally {
			if(file != null) {
				try {
					fileReader.close();
					
				}catch(Exception exception) {
					System.out.println(exception);

				}
			}
		}
	}
}
