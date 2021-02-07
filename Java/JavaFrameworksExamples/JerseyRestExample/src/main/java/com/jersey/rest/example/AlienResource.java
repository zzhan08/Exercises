package com.jersey.rest.example;

import java.util.Arrays;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("aliens")
public class AlienResource {
	AlienRepository rep = new AlienRepository();
	@GET
	//@Produces(MediaType.APPLICATION_XML)
	//@Produces(MediaType.APPLICATION_JSON)
	@Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public List<Alien> getAlien() {
		System.out.println("rep.getAliens()"+rep.getAliens());
    	return rep.getAliens();
    }
	@GET
	@Path("alien/{id}")
	//@Produces(MediaType.APPLICATION_XML)
	@Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public Alien getAlien(@PathParam("id") int id) {
    	return rep.getAlien(id);
    }
	@POST
	@Path("alien")
	@Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
	@Consumes({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public Alien createAlien(Alien a1) {
		System.out.println("Alien a1"+a1.toString());
		rep.create(a1);
    	return a1;
    }
	@PUT
	@Path("alien")
	@Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
	@Consumes({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public Alien updateAlien(Alien a1) {
		System.out.println("Alien a1"+a1.toString());
		rep.update(a1);
    	return a1;
    }
	@DELETE
	@Path("alien/{id}")
	//@Produces(MediaType.APPLICATION_XML)
	@Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public Alien deleteAlien(@PathParam("id") int id) {
		Alien a = rep.getAlien(id);
		rep.deleteAlien(id);
    	return a;
    }
}
