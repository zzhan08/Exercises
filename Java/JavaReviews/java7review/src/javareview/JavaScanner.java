package javareview;

import java.util.Scanner; 
import java.io.*; 
import java.lang.*; 
  
class JavaScanner { 
	static void  nextLine() {
		 // Declare the object and initialize with 
        // predefined standard input object 
        Scanner sc = new Scanner(System.in); 
  
        // Taking input 
        String name = sc.nextLine(); 
        char gender = sc.next().charAt(0); 
  
        // Consuming the leftover new line 
        // using the nextLine() method 
        sc.nextLine(); 
  
        // reading the complete line for the integer 
        // and converting it to an integer 
        int age = Integer.parseInt(sc.nextLine()); 
  
        String fatherName = sc.nextLine(); 
        String motherName = sc.nextLine(); 
  
        // Print the values to check 
        // if the input was correctly obtained. 
        System.out.println("Name: " + name); 
        System.out.println("Gender: " + gender); 
        System.out.println("Age: " + age); 
        System.out.println("Father's Name: "
                           + fatherName); 
        System.out.println("Mother's Name: "
                           + motherName); 
	}
	static void nextInt() {
		 // Declare the object and initialize with 
       // predefined standard input object 
       Scanner sc = new Scanner(System.in); 
 
       // Taking input 
       String name = sc.nextLine(); 
       char gender = sc.next().charAt(0); 
 
       // Consuming the leftover new line 
       // using the nextLine() method 
       sc.nextLine(); 
 
       // reading the complete line for the integer 
       // and converting it to an integer 
       int age = sc.nextInt(); 
       sc.nextLine(); 
       String fatherName = sc.nextLine(); 
       String motherName = sc.nextLine(); 
 
       // Print the values to check 
       // if the input was correctly obtained. 
       System.out.println("Name: " + name); 
       System.out.println("Gender: " + gender); 
       System.out.println("Age: " + age); 
       System.out.println("Father's Name: "
                          + fatherName); 
       System.out.println("Mother's Name: "
                          + motherName); 
	}
    public static void main(String[] args) 
    { 
    	nextInt();
    } 
} 