package javareview;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class characterClass {
	public static void main(String[] args) {
	  Pattern pattern=Pattern.compile("[a-p]ap");
	  Matcher match =pattern.matcher("qap");
	  match.find();
	  String output=String.format(""+"found the text \"%s\" begining at "+"index %d and ending at index %d. %n", 
		match.group(), match.start(), match.end());
      System.out.println(output);
	}
}
