package Hibernet.my.example.HibernetInstance;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;


@Entity//(name='HumanUser')
@Table(name="HumanUser") 
@Cacheable
@Cache(usage=CacheConcurrencyStrategy.READ_ONLY)
public class HumanUser {
	@Column(name="UserName")
    String Name;
    @Id
    String UserId;
    Date Time;
    @ManyToMany(mappedBy="HUsers",fetch=FetchType.LAZY)
	List<Project> projects = new ArrayList<>();
	String password;
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getUserId() {
		return UserId;
	}
	public void setUserId(String userId) {
		UserId = userId;
	}
	public Date getTime() {
		return Time;
	}
	public void setTime(Date time) {
		Time = time;
	}
	public List<Project> getProjects() {
		return projects;
	}
	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "HumanUser [Name=" + Name + ", UserId=" + UserId + ", Time=" + Time + ", projects=" + projects.size()
				+ ", password=" + password + "]";
	}
	
}
