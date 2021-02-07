
public class Canvas {
  /*private ToolType currentTool;
  public ToolType getCurrentTool() {
	return currentTool;
  }
  public void setCurrentTool(ToolType currentTool) {
 	this.currentTool = currentTool;
  }
  public void mouseDown() {
	  if(currentTool == ToolType.SELECTION) {
		  System.out.println("SELECTION ICON");
	  }else if(currentTool == ToolType.BRUSH) {
		  System.out.println("BRUSH ICON");
	  }else if(currentTool == ToolType.ERASER) {
		  System.out.println("ERASER ICON");
	  }
  }
  public void mouseUp() {
	  if(currentTool == ToolType.SELECTION) {
		  System.out.println("Draw Dash REctangle");
	  }else if(currentTool == ToolType.BRUSH) {
		  System.out.println("Draw a ine");
	  }else if(currentTool == ToolType.ERASER) {
		  System.out.println("Erase Something");
	  }
  }*/
    private state CurrentTool;

    public state getS() {
	   return CurrentTool;
    }

    public void setS(state s) {
	    this.CurrentTool = s;
    }	
    public void mouseDown() {
    	CurrentTool.mouseDown();
    }
    public void mouseUp() {
    	CurrentTool.mouseUp();
    }
}
