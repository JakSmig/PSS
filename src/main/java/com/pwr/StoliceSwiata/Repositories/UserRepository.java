package com.pwr.StoliceSwiata.Repositories;

import org.springframework.data.repository.CrudRepository;

import com.pwr.StoliceSwiata.dbSchema.User;

import javax.transaction.Transactional;
import java.util.List;



public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findByEmailAndPassword(String email, String password);
    List<User> findByEmail(String email);
    List<User> findByUsername(String username);
    List<User> findBySessiontoken(String sessionId);
    @Transactional
    Long deleteBySessiontoken(String sessionToken);

}