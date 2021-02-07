package JPA.my.example.demoJPA;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
    	EntityManagerFactory emf = Persistence.createEntityManagerFactory("TestPersistence");
    	EntityManager em = emf.createEntityManager();
    	em.getTransaction().begin();
    	Alien b = null;
    	em.persist(b);;
    	Alien a = em.find(Alien.class,4);
    	em.getTransaction().commit();
        System.out.println( "Hello World!" );
    }
}
