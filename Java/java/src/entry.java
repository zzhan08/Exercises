class node{
	public int value;
	public node next;
}
public class entry {
   
	public static void main(String[] args) {
		// TODO Auto-generated method stub
        node n = new node();
        n.value = 1;
        node n1 = new node();
        n1.value =2;
        n.next = n1;
        System.out.println(n.value+"|"+n.next.value);
	}

}
