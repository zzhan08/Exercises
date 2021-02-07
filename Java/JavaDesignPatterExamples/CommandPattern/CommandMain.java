import java.util.*;

public class CommandMain {
    public static List produceRequests() {
        List<action> queue = new ArrayList<>();
        queue.add(new Light());
        queue.add(new hitter());
        return queue;
    }

    public static void workOffRequests(List queue) {
        for (Object action : queue) {
            ((action)action).execute();
        }
    }

    public static void main( String[] args ) {
        List queue = produceRequests();
        workOffRequests(queue);
    }
}