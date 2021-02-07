class Square implements Shape{

	@Override
	public
	void draw() {
		// TODO Auto-generated method stub
		System.out.println("Square Shape");
	}
	
}
class Rectange implements Shape{

	@Override
	public
	void draw() {
		// TODO Auto-generated method stub
		System.out.println("Rectange Shape");
	}
	
}
public class NormalShapeFactory extends AbstractShapeFactory {

	@Override
	Shape getShape(String type) {
		// TODO Auto-generated method stub
		return type == "SQUARE" ? new Square() : new Rectange();
	}

}
