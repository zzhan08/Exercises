/*JAVA 8 Lambda Function*/
public class LambdaFn {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
       //PrintCar c = new Car("thecar");
       //c.print();
       PrintCar D = new PrintCar() {
 
			 public void print(int i) {
				// TODO Auto-generated method stub
				System.out.println(i);
			};
       };
       D.print(6);
       PrintCar E = (int i)->{
    	   System.out.println(i);
       };
       E.print(7);
       PrintCar F = (int i)->System.out.println(i);
       F.print(8);
	}
}
