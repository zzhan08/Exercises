package Hibernet.my.example.HibernetInstance;

import javax.persistence.Embeddable;

@Embeddable
public class ProjectDescription {
    private String title;
    private String body;
    private String tail;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getTail() {
		return tail;
	}
	public void setTail(String tail) {
		this.tail = tail;
	}
	@Override
	public String toString() {
		return "ProjectDescription [title=" + title + ", body=" + body + ", tail=" + tail + "]";
	}
   
}
