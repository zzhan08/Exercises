package Hibernet.my.example.HibernetInstance;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicUpdate;

import java.util.*;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;


@Entity//(name='projectX')
@Table(name="ProjectX") 
@Cacheable
@Cache(usage=CacheConcurrencyStrategy.READ_ONLY)
public class Project {
	@Column(name="ProjectName")
    String Name;
    @Id
    String ProjectId;
    Date Time;
	ProjectDescription Description;
	@ManyToMany(fetch=FetchType.EAGER)
	List<HumanUser> HUsers = new ArrayList<HumanUser>();
	public List<HumanUser> getHUsers() {
		return HUsers;
	}
	public void setHUsers(List<HumanUser> hUsers) {
		HUsers = hUsers;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getProjectId() {
		return ProjectId;
	}
	public void setProjectId(String projectId) {
		ProjectId = projectId;
	}
	public Date getTime() {
		return Time;
	}
	public void setTime(Date time) {
		Time = time;
	}
	public ProjectDescription getDescription() {
		return Description;
	}
	public void setDescription(ProjectDescription description) {
		Description = description;
	}
	@Override
	public String toString() {
		return "Project [Name=" + Name + ", ProjectId=" + ProjectId + ", Time=" + Time + ", Description=" + Description
				+ ", HUsers=" + HUsers.size() + "]";
	}
	
	
}
