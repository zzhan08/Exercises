
public class node implements component{
   String tag;
	public node(String tag) {
		super();
		this.tag = tag;
	}
	@Override
	public void render() {
		// TODO Auto-generated method stub
		System.out.println(tag);
	}

}
