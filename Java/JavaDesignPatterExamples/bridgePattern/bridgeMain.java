
public class bridgeMain {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        Factory bigcarFactory = new CarFactory(new bigCar());
        Factory smallcarFactory = new CarFactory(new smallCar());
        bigcarFactory.howTOmakeCar();
        smallcarFactory.howTOmakeCar();

	}

}
