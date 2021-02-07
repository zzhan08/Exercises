
public class abscractFactoryDesign {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		FactoryProducer fp = new FactoryProducer();
		AbstractShapeFactory asf = fp.getFactory(false);
        Shape s = asf.getShape("SQUARE");
        s.draw();
	}

}
