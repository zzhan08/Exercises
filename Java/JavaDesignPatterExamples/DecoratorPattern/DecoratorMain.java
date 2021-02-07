
public class DecoratorMain {
   public static void main(String[] args) {
	   Multiply x = new Multiply(new Delete(new Calculator(23)));
	   System.out.println("x: "+x.apply());
   }
}
