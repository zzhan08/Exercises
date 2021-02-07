
public class momentoMain {
  public static void main(String[] args) {
	 HIstory h = new HIstory();
	 Editor editor = new Editor(); 
     editor.setContent("a");
     h.states.add(editor.createState());

     editor.setContent("b");
     h.states.add(editor.createState());
     editor.setContent("c");
     h.states.add(editor.createState());

     editor.restore(h.states.remove(h.states.size() - 1));
     
     System.out.println("history" + h.states.toString());
  }
}
