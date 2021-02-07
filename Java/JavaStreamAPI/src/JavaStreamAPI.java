import java.util.IntSummaryStatistics;
import java.util.function.Function;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class JavaStreamAPI {
	public static void simpleExample() {
		int [] intarr = {4,1,1,3,4,5};
		System.out.println(IntStream.of(intarr).min().getAsInt());
		IntStream.of(intarr).min().ifPresent(min->System.out.println(min));
		//min(), max(), average(), count(), sum()
		//IntSummaryStatistics
		IntSummaryStatistics s = IntStream.of(intarr).summaryStatistics();
		s.getMin();//...............
		//3 smallest numbsers
		IntStream.of(intarr).distinct().sorted().limit(3).forEach(System.out::println);
// Three parts for using a stream		
		// 1. Create Stream
		    // of(), range(), rangeClosed(), generate(supplier())
		// 2. IniStream Process
	     	// distinct(), sorted(), limit(), skip(), filter(), map(), boxed()convert each number to int
		// 3. IntStream Consume
		    // average(), min(), max, sum(), count(), forEach(), toArray(), anyMatch(), allMatch(), collect(collectors.toList()/toMap/toArray)
	}
	public static void ListStreamExample() {
		List<String> strs = new ArrayList<String>();
		// using parallel when elements more than 10000
		strs.stream().parallel().collect(Collectors.groupingBy(new Function<String, String>() {

			@Override
			public String apply(String t) {
				
				return t;
			}
			
		}));// create parrellel stream
	}
    public static void main(String [] args) {
    	simpleExample();
    }
}
