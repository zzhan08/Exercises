package AsynchronousAPI;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class CompletableFutureExample {
	public static void completeFutureRunnAsyncRunnable() {
		CompletableFuture<Void> completableFuture = CompletableFuture.runAsync(new Runnable() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				try {
					TimeUnit.SECONDS.sleep(1);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				};
			}
			
		});
		try {
			completableFuture.get();
			System.out.println("get future result");
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	} 
	public static void completeFutureSupplyAsyncSupplier() {
		CompletableFuture<String> completableFuture = CompletableFuture.supplyAsync(new Supplier<String>() {

			@Override
			public String get() {
				// TODO Auto-generated method stub
				try {
					TimeUnit.SECONDS.sleep(1);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return "Complete";
			}
			
		});
		String result;
		try {
			result = completableFuture.get();
			System.out.println(result);

		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	} 
	public static void completableFutureThreadPool() {
		/*  static CompletableFuture<Void>  runAsync(Runnable runnable)
			static CompletableFuture<Void>  runAsync(Runnable runnable, Executor executor)
			static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier)
			static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier, Executor executor)
		 * */
		ExecutorService executor = Executors.newFixedThreadPool(2);
		CompletableFuture<String> completableFuture = CompletableFuture.supplyAsync(() -> {
		    try {
		        TimeUnit.SECONDS.sleep(1);
		    } catch (InterruptedException e) {
		        throw new IllegalStateException(e);
		    }
		    return "Result of the asynchronous computation";
		}, executor);
		CompletableFuture<String> completableFuture2 = CompletableFuture.supplyAsync(() -> {
		    try {
		        TimeUnit.SECONDS.sleep(1);
		    } catch (InterruptedException e) {
		        throw new IllegalStateException(e);
		    }
		    return "Result2 of the asynchronous computation";
		}, executor);
		String result;
		try {
			result = completableFuture.get();
			System.out.println(result);
			result = completableFuture2.get();
			System.out.println(result);

			executor.awaitTermination(4, TimeUnit.SECONDS);//pervent submitting tasks
			executor.shutdown();

		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void completableFutureThenApplyThreadPool() {
		CompletableFuture<String> completableFuture = CompletableFuture.supplyAsync(() -> {
		    try {
		        TimeUnit.SECONDS.sleep(1);
		    } catch (InterruptedException e) {
		        throw new IllegalStateException(e);
		    }
		    return "Result of the asynchronous computation";
		}).thenApply((result)->{
			return result+"________";
		});
		CompletableFuture<String> thencompletableFuture = completableFuture.thenApply(result->{
			return result+"XXXXXXXXXXXXXXX";
		}).thenApply(result->{
			return result+"????";
		});
		thencompletableFuture.thenAccept(result->{
			System.out.println("result&&&&&&&: "+result);
		});
		try {
			System.out.println(thencompletableFuture.get());
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} // Hello Rajeev

	}
	public static void Veryfy() {
		CompletableFuture.supplyAsync(() -> {
		    System.out.println("Some Result");

		    try {
Thread.sleep(100);
		    } catch (InterruptedException e) {
			    System.out.println("Some Result");

		      throw new IllegalStateException(e);

		    }
		    System.out.println("Some Result");
		    return "Some Result";
		}).thenApply(result -> {
		    /* 
		      Executed in the same thread where the supplyAsync() task is executed
		      or in the main thread If the supplyAsync() task completes immediately (Remove sleep() call to verify)
		    */
		    System.out.println("Processed Result");

		    return "Processed Result";
		}).thenAccept(result->{
		    System.out.println("accept"+result);

		});
	}
	public static void thenCombine() {
		System.out.println("Retrieving weight.");
		CompletableFuture<Double> weightInKgFuture = CompletableFuture.supplyAsync(() -> {
		    try {
		        TimeUnit.SECONDS.sleep(1);
		    } catch (InterruptedException e) {
		       throw new IllegalStateException(e);
		    }
		    return 65.0;
		});

		System.out.println("Retrieving height.");
		CompletableFuture<Double> heightInCmFuture = CompletableFuture.supplyAsync(() -> {
		    try {
		        TimeUnit.SECONDS.sleep(1);
		    } catch (InterruptedException e) {
		       throw new IllegalStateException(e);
		    }
		    return 177.8;
		});

		System.out.println("Calculating BMI.");
		CompletableFuture<Double> combinedFuture = weightInKgFuture
		        .thenCombine(heightInCmFuture, (weightInKg, heightInCm) -> {
		    Double heightInMeter = heightInCm/100;
		    return weightInKg/(heightInMeter*heightInMeter);
		});

		try {
			System.out.println("Your BMI is - " + combinedFuture.get());
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static CompletableFuture<String> downloadWebPage(String pageLink) {
		return CompletableFuture.supplyAsync(() -> {
			// Code to download and return the web page's content
			return pageLink;
		});
	} 
	public static void combineMultipleCompleteFutureAllOF() {
		/*
		 * static CompletableFuture<Void>	 allOf(CompletableFuture<?>... cfs)
         * static CompletableFuture<Object> anyOf(CompletableFuture<?>... cfs)
		 * */
		List<String> webPageLinks = Arrays.asList("a","b","c");
		List<CompletableFuture<String>> pageContentFutures = webPageLinks.stream()
		        .map(webPageLink -> downloadWebPage(webPageLink))
		        .collect(Collectors.toList());
		CompletableFuture<Void> allFutures = CompletableFuture.allOf(
		        pageContentFutures.toArray(new CompletableFuture[pageContentFutures.size()]));
		CompletableFuture<List<String>> allPageContentsFuture = allFutures.thenApply(v -> {
     	   return pageContentFutures.stream()
     	           .map(pageContentFuture -> pageContentFuture.join())
     	           .collect(Collectors.toList());
     	});
		CompletableFuture<Long> countFuture = allPageContentsFuture.thenApply(pageContents -> {
		    return pageContents.stream()
		            .filter(pageContent -> pageContent.contains("CompletableFuture"))
		            .count();
		});

		
		try {
			System.out.println("Number of Web Pages having CompletableFuture keyword - " + 
			        countFuture.get());
			//System.out.println(allPageContentsFuture.get());
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		        
	}
	public static void anyofExample() {
		CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
		    try {
		        TimeUnit.SECONDS.sleep(2);
		    } catch (InterruptedException e) {
		       throw new IllegalStateException(e);
		    }
		    return "Result of Future 1";
		});

		CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
		    try {
		        TimeUnit.SECONDS.sleep(1);
		    } catch (InterruptedException e) {
		       throw new IllegalStateException(e);
		    }
		    return "Result of Future 2";
		});

		CompletableFuture<String> future3 = CompletableFuture.supplyAsync(() -> {
		    try {
		        TimeUnit.SECONDS.sleep(3);
		    } catch (InterruptedException e) {
		       throw new IllegalStateException(e);
		    }
		    return "Result of Future 3";
		});

		CompletableFuture<Object> anyOfFuture = CompletableFuture.anyOf(future1, future2, future3);

		try {
			System.out.println(anyOfFuture.get());
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} // Result of Future 2
	}
	public static void handleExceptionexceptionallyExample() {
		Integer age = -1;

		CompletableFuture<String> maturityFuture = CompletableFuture.supplyAsync(() -> {
		    if(age < 0) {
		        throw new IllegalArgumentException("Age can not be negative");
		    }
		    if(age > 18) {
		        return "Adult";
		    } else {
		        return "Child";
		    }
		}).exceptionally(ex -> {
		    System.out.println("Oops! We have an exception - " + ex.getMessage());
		    return "Unknown!";
		});

		try {
			System.out.println("Maturity : " + maturityFuture.get());
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	public static void handleExceptionGeneric() {
		Integer age = -1;

		CompletableFuture<String> maturityFuture = CompletableFuture.supplyAsync(() -> {
		    if(age < 0) {
		        throw new IllegalArgumentException("Age can not be negative");
		    }
		    if(age > 18) {
		        return "Adult";
		    } else {
		        return "Child";
		    }
		}).handle((res, ex) -> {
		    if(ex != null) {
		        System.out.println("Oops! We have an exception - " + ex.getMessage());
		        return "Unknown!";
		    }
		    return res;
		});
	}
	public static void main(String [] args) {
		//completeFutureSupplyAsyncSupplier();
		//completableFutureThreadPool();
		//completableFutureThenApplyThreadPool();
		//Veryfy();
		//thenCombine();
		//combineMultipleCompleteFutureAllOF();
		//anyofExample();
//		handleExceptionexceptionallyExample();
		//handleExceptionGeneric();
		for(int i=0;i<10;i++) {
			final int j = i;
			CompletableFuture.supplyAsync(()->{
				
				return j+1;
			}).thenApplyAsync(result->{
				return result+2;
			}).thenAcceptAsync(result->{
				System.out.println("result: "+result);
			});
			
		}
	}
}
