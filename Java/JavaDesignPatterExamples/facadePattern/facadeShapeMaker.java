
public class facadeShapeMaker {
    circle c;
	trangle t;
	public facadeShapeMaker(circle c, trangle t) {
		super();
		this.c = c;
		this.t = t;
	}
	public void drawCircle() {
		c.draw();
	}
	public void drawTrangle() {
		t.draw();
	}
}
