
public class Delete extends Cost{

	public Delete(iOperation op) {
		super(op);
		// TODO Auto-generated constructor stub
	}

	@Override
	public int apply() {
		// TODO Auto-generated method stub
		return this.i.apply() - 50;
	}

}
