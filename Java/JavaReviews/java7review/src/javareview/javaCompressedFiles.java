package javareview;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class javaCompressedFiles {
	public static void zipIt(File[]files) {
		try {
			String zipFile = "c:\\temp\\zip-vtc.zip";
			byte[]buffer = new byte[1024];
			FileOutputStream fout= new FileOutputStream(zipFile);
			ZipOutputStream zout = new ZipOutputStream(fout);
			for(File file: files) {
			   System.out.println("Adding: "+file);
			   FileInputStream fin = new FileInputStream(file);
			   zout.putNextEntry(new ZipEntry(file.getName()));
			   int length;
			   while((length = fin.read(buffer)) > 0) {
				   zout.write(buffer, 0, length);
			   }
			   zout.closeEntry();
			   fin.close();
			}
			zout.close();
		}catch(Exception e) {
	    	  System.out.println(e);

		}
	}
	public static void unzipIt() {
		String zipFile = "c:\\temp\\zip-vtc.zip";
		byte[]buffer = new byte[1024];
        try {
        	File folder = new File("C:\\temp\\temp");
        	if(!folder.exists()) {
        		folder.mkdir();	
        	}
			ZipInputStream zint = new ZipInputStream(new FileInputStream(zipFile));
			ZipEntry  ze = zint.getNextEntry();
			while(ze != null) {
				String fileName = ze.getName();
				File newfile = new File("C:\\temp\\temp" + File.separator + fileName);
				System.out.println("file unzip : " + newfile.getAbsoluteFile());
				new File(newfile.getParent()).mkdirs();
				FileOutputStream fos = new FileOutputStream(newfile);
				int len;
				while((len = zint.read(buffer)) > 0) {
					fos.write(buffer, 0, len);
				}
				fos.close();
				ze = zint.getNextEntry();
			}
			zint.closeEntry();
			zint.close();
		}catch(Exception e) {
	    	  System.out.println(e);

		}
	}
	public static void main(String[] args) {
		 File[] files = {new File("C:\\temp\\1.dat"),new File("C:\\temp\\2.dat"),new File("C:\\temp\\3.dat")};
		 zipIt(files);
		 unzipIt();
	}
}
