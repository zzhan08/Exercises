package com.example.springBootRest1;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.io.Serializable;
import java.sql.*;
import org.springframework.data.repository.CrudRepository;
public interface AlienRepository extends CrudRepository<Alien,Serializable>{
   
}
