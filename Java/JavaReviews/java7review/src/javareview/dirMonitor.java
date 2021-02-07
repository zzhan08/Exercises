package javareview;

import java.nio.file.*;
import java.nio.file.WatchEvent.Kind;
import java.nio.file.WatchService;
import java.nio.file.StandardWatchEventKinds;

public class dirMonitor {
    Path path =  null;
    WatchService ws = null;
    void init() {
    	path=Paths.get("D:\\TEMP\\");
    	try {
    		ws=FileSystems.getDefault().newWatchService();
        	path.register(ws, StandardWatchEventKinds.ENTRY_CREATE,StandardWatchEventKinds.ENTRY_DELETE, StandardWatchEventKinds.ENTRY_MODIFY);

    	}catch(Exception e) {
    		
    	}
    }
    void listen() {
    	WatchKey key = null;
    	while(true) {
    		try {
    			key = ws.take();
        		for(WatchEvent<?>event:key.pollEvents()) {
        			Kind<?>kind=event.kind();
        			System.out.println("Event: "+event.context().toString()+"|"+kind.toString());
        		}
    		}catch(Exception e) {
    			System.out.println("InterruptedException: "+e);

    		}
    		boolean reset=key.reset();
    		if(!reset)
    			break;
    	}
    }
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		dirMonitor dm = new dirMonitor();
		dm.init();
		dm.listen();
	}

}
