package security.example.springBootRest1;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
    String name;
    String password;
    String role;
    @Id
    String userId;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "User [name=" + name + ", password=" + password + ", role=" + role + ", userId=" + userId + "]";
	}
   
}
