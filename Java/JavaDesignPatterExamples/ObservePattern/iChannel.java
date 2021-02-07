
public interface iChannel {
	void addSub(iSubScriber is);
	void NewMessage(String s);
	void notifySubs(String s);
}
