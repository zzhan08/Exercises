package ThreadControls;

public abstract class ThreadSpinLockExample {
/* 
 * when operation is fast, use spinlock to check if get resource
 * without go to waiting state
 * -xx:-usespinning - enable spinning for locks
 * -xx: preblocksping=12 try 12 times; if still not availale go state
 * previous option is deprecated in java 8, but JVM still use it internally
 * */
}
