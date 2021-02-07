interface Shape{
  void draw();	
}
public abstract class AbstractShapeFactory {
	  abstract Shape getShape(String type);	
}
