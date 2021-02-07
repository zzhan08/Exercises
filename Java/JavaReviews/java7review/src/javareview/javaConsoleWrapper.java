package javareview;

import java.awt.TextComponent;
import java.io.Console;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class javaConsoleWrapper {
	private final TextComponent io;
	public javaConsoleWrapper(TextComponent io) {
		super();
		this.io = io;
	}
	public void run() {
		while(true) {
			String read = readLine();
			System.out.println("ECHO You Typed: " + read);
		}
	}
	private String readLine() {
		//io.printf("read");
		return "";
	}
	public static void main(String[] args) {

	}
}
