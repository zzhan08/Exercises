
public abstract class Cost implements iOperation{
    iOperation i;
    public Cost(iOperation io) {
    	i = io;
    }
	@Override
	public abstract int apply();
}
