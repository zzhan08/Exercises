
public class Multiply extends Cost {

	public Multiply(iOperation op) {
		super(op);
		// TODO Auto-generated constructor stub
	}

	@Override
	public int apply() {
		// TODO Auto-generated method stub
		return this.i.apply() * 2;
	}

}
