import java.util.*;

public class myChannel implements iChannel{
   List<iSubScriber> subs;// = new ArrayList<subScribers>();
   public void addSub(iSubScriber s) {
	   subs.add(s);
   }
   public void NewMessage(String msg) {
	   notifySubs(msg);
   }
   public void notifySubs(String msg) {
	   for(iSubScriber sub: subs) {
		   sub.update(msg);
	   }
   }

}
