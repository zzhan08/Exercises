package javareview;

import java.util.prefs.Preferences;

public class javaNio {
	public static void main(String[] args) {
		// GRAPHICAL APPLICATION
		// lightweight, store application in user preferences without directly access file system or use jndi(JAVA NAMING DIRECTORY INTERFACE)
		// not means to interface troductional database engines, rather use propriate OS specific backend
		// it means to save small amount data
		// font.. config stuff
      Preferences userPreference =Preferences.userRoot();
      Preferences system =Preferences.systemRoot();
      userPreference.putInt("X_DEFAULT",5);
      int numberofRows = userPreference.getInt("X_DEFAULT", 5);// second parameter will be returned if key("X_DEFAULT") not found
      userPreference.remove("X_DEFAULT ");
   // two java program can run with the same preference and this case preference canbe overwritten by each other
      
      Preferences userPreferencePackage = Preferences.userNodeForPackage(car.class);// so java has package level sub root but not distinguish by project
      // two project with same package name, can still access the same preferenece
      Preferences userPreferenceCustomNodeForPackage = Preferences.userRoot().node("/user/custom/root");// define preference of sub root with distinguish logical name
      
      userPreference.put("USER_LANGUAGE","DUTCH");

    }
}
