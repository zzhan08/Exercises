package JPA.my.example.demoJPA;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.engine.execution.*;

import javax.persistence.*;

@Entity
public class Alien {
	@Id
private int aid;
private String name;
private String tech;
public int getAid() {
	return aid;
}
public void setAid(int aid) {
	this.aid = aid;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getTech() {
	return tech;
}
public void setTech(String tech) {
	this.tech = tech;
}
@Test
public void testGetTech() {
	Alien tester = new Alien();
	assertEquals("", tester.getTech(), "empty string"); 
}
@Override
public String toString() {
	return "Alien [aid=" + aid + ", name=" + name + ", tech=" + tech + "]";
}
public static void main(String[]args) {
	Result result = JUnitCore.runClasses(MyClassTest.class);
    for (Failure failure : result.getFailures()) {
      System.out.println(failure.toString());
    }
}
}
