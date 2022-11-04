package com.pwr.StoliceSwiata.Repositories;

import org.springframework.data.repository.CrudRepository;

import com.pwr.StoliceSwiata.dbSchema.User;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findByEmailAndPassword(String email, String password);
    List<User> findByEmail(String email);
    List<User> findByUsername(String username);

    List<User> findBySessiontoken(String sessionId);

}