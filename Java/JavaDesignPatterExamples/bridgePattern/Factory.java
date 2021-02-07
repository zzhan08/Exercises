
public abstract class Factory implements makeCar {
   makeCar c;
   public Factory(makeCar mc) {
	   c=mc;
   }
}
