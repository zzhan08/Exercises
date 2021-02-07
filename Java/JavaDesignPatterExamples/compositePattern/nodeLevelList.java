import java.util.List;

public class nodeLevelList implements component {
    List<node>nodes;
	public nodeLevelList(List<node> nodes) {
		super();
		this.nodes = nodes;
	}
	@Override
	public void render() {
		// TODO Auto-generated method stub
		for(node n: nodes) {
			n.render();
		}
	}

}
