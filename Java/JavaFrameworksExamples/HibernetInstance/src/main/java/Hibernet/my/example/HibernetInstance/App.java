package Hibernet.my.example.HibernetInstance;


import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.hibernate.service.ServiceRegistry;

/**
 * Hello world!
 *
 */
public class App 
{
	public static void create() {
		ProjectDescription projDes= new ProjectDescription();
		projDes.setTitle("the title");
		projDes.setBody("the body");
		projDes.setTail("the tail");

		Project proj= new Project();
    	proj.setName("Join Me1");
    	proj.setDescription(projDes);
    	proj.setProjectId("Project One121");
    	proj.setTime(new Date());
    	
    	HumanUser hu = new HumanUser();
        hu.setName("Jason"); 
    	hu.setPassword("123456");
    	hu.getProjects().add(proj);
    	hu.setTime(new Date());
    	hu.setUserId("Human1");
    	proj.getHUsers().add(hu);
    	Configuration conn = new Configuration().configure().addAnnotatedClass(Project.class).addAnnotatedClass(HumanUser.class);
    	ServiceRegistry reg=new StandardServiceRegistryBuilder().applySettings(conn.getProperties()).build();
    	
    	SessionFactory sf = conn.buildSessionFactory(reg);
    	Session sn = sf.openSession();
    	Transaction ts =sn.beginTransaction();

    	sn.save(proj);
    	sn.save(hu);
    	ts.commit();
        System.out.println( "Hello World!" );
	}
	//JPA Java persistent API
	public static <SQLQuery> void fetch() {
		Project proj= new Project();

    	Configuration conn = new Configuration().configure().addAnnotatedClass(Project.class).addAnnotatedClass(HumanUser.class);
    	ServiceRegistry reg=new StandardServiceRegistryBuilder().applySettings(conn.getProperties()).build();
    	
    	SessionFactory sf = conn.buildSessionFactory(reg);
    	Session sn = sf.openSession();
    	Transaction ts =sn.beginTransaction();

    	//proj = (Project)sn.get(Project.class, "Project One121");
    	//HumanUser user = (HumanUser)sn.get(HumanUser.class, "Human1");
        /*Query q1 = sn.createQuery("from Project");
        proj=(Project)q1.uniqueResult();
        List<Project> projs= q1.list();*/
    	String b="Project One121";
    	//Query q1 = sn.createQuery("Select Time,Name from Project where ProjectId=:b");
    	/*List<Object []> project = (List<Object []>)q1.list();
    	for(Object[] o: project) {
    		System.out.println( o);
    	}*/
    	//SQLQuery q1 = sn.createSQLQuery("Select Time,ProjectName from ProjectX");
    	//q1.addEntity(Project.class);
    	//List<Project> projs=(Project)q1.list();
    	proj = (Project)sn.load(Project.class, "Project One121");
    	// return proxy object
        // load return exception when no data found
    	
        System.out.println(proj);//hit the database
    	ts.commit();
        //System.out.println( proj);
        //System.out.println( user);

	}
    public static void main( String[] args )
    {
    	//create();
    	fetch();
    }
}
