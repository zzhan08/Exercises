
public class dogFactory implements animalFactory {

	@Override
	public animal createAnimal() {
		// TODO Auto-generated method stub
		return new dog();
	}

}
