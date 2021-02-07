
public class Editor {
    private String content;
    public Editor() {
    }
	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public EditorState createState() {
		return new EditorState(this.content);
	}
	public void restore(EditorState state) {
        content = state.getContent();
	}
}
