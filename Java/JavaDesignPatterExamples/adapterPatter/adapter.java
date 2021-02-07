
public class adapter implements newRequest {
	oldRequest or;
    public adapter(oldRequest o) {
    	or = o;
    }
	@Override
	public void SendnewRequst() {
		// TODO Auto-generated method stub
		or.oldRequst();
	}

}
