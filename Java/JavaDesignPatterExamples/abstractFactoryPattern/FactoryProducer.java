
public class FactoryProducer {
   AbstractShapeFactory getFactory(boolean normal) {
	   return normal ? new NormalShapeFactory() : new RoundedShapeFactory();
   }
}
