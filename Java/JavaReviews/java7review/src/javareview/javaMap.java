package javareview;

public class javaMap {
  int id;
  String name;

  int email;
  public void javaMap() {
	  
  }
  @Override
  public boolean equals(Object object) {
	  if(this==object)
		  return true;
	  else if((object==null)||(object.getClass()!=this.getClass()))		
		  return false;
	  
	  javaMap jm = (javaMap)object;
	  return (this.id == jm.id) && (name != null && name.equals(this.name));
  }
  @Override
  public int hashCode() {
	  final int seed=7;
	  int result = 1;
	  result = seed * result + (name == null ? 0 : name.hashCode());
	  return result;
  }
  @Override
  public String toString() {
	  
	  return id+name+email;
  }
}
