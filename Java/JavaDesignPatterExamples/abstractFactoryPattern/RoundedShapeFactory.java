class RoundedSquare implements Shape{

	@Override
	public
	void draw() {
		// TODO Auto-generated method stub
		System.out.println("Rounded Square Shape");
	}
	
}
class RoundedRectange implements Shape{

	@Override
	public
	void draw() {
		// TODO Auto-generated method stub
		System.out.println("Rounded Rectange Shape");
	}
	
}
public class RoundedShapeFactory extends AbstractShapeFactory{

	@Override
	Shape getShape(String type) {
		// TODO Auto-generated method stub
		return type == "SQUARE" ? new RoundedSquare() : new RoundedRectange();
	}

}
