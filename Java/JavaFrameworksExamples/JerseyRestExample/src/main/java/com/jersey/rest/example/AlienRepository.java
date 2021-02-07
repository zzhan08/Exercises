package com.jersey.rest.example;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.sql.*;

public class AlienRepository {
    Connection conn;
    String url = "jdbc:mysql://localhost:3306/db?useSSL=false";
    String username = "root";
    String password =  "admin";
    public AlienRepository() {
    	try {
    		Class.forName("com.mysql.cj.jdbc.Driver");
			conn=DriverManager.getConnection(url, username, password);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    }
    public List<Alien> getAliens() {
    	List<Alien> aliens = new ArrayList<>();
    	String sql = "select * from alien";
    	try {
			Statement st = conn.createStatement();
			ResultSet rs=st.executeQuery(sql);
			while(rs.next()) {
				Alien a = new Alien();
				a.setId(rs.getInt(1));
				a.setName(rs.getString(2));
				a.setPoints(rs.getInt(3));
                aliens.add(a);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return aliens;
    }
    public Alien getAlien(int id) {
    	Alien a1 = new Alien();
    	String sql = "select * from alien where id="+id;
    	try {
			Statement st = conn.createStatement();
			ResultSet rs=st.executeQuery(sql);
			if(rs.next()) {
				a1.setId(rs.getInt(1));
				a1.setName(rs.getString(2));
				a1.setPoints(rs.getInt(3));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return  a1;
    }
    public void create(Alien a1) {
    	String sql = "insert into alien(id,name,points) values (?,?,?)";
    	try {
			PreparedStatement st = conn.prepareStatement(sql);
			st.setInt(1,  a1.getId());
			st.setString(2,  a1.getName());
			st.setInt(3,  a1.getPoints());
            st.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	System.out.println("aliens==="+a1);
    }
    public void update(Alien a1) {
    	String sql = "update alien set name=?, points=? where id=?";
    	try {
			PreparedStatement st = conn.prepareStatement(sql);
			st.setInt(3,  a1.getId());
			st.setString(1,  a1.getName());
			st.setInt(2,  a1.getPoints());
            st.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	System.out.println("aliens==="+a1);
    }
    public void deleteAlien(int id) {
    	String sql = "delete from alien where id=?";
    	try {
			PreparedStatement st = conn.prepareStatement(sql);
			st.setInt(1,  id);
            boolean sst = st.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
