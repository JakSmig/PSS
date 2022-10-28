package com.pwr.StoliceSwiata.controllers;

import com.pwr.StoliceSwiata.Repositories.UserRepository;
import com.pwr.StoliceSwiata.dbSchema.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Calendar;
import java.util.List;

@CrossOrigin
@Controller
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    // Check on frontend?
    @PostMapping(path = "/add")
    public @ResponseBody ResponseEntity<String> addUser(@RequestParam String username, @RequestParam String password, @RequestParam String email){
        if(userRepository.findByEmail(email).size()>0){
            return new ResponseEntity<String>("Email already used", HttpStatus.CONFLICT);
        }
        if(userRepository.findByUsername(username).size()>0){
            return new ResponseEntity<String>("User already exists", HttpStatus.CONFLICT);
        }
        User newUser = new User(username, password, email);
        //newUser.setUsername(username);
        //newUser.setPassword(password);
        //newUser.setEmail(email);
        userRepository.save(newUser);
        return new ResponseEntity<String>("User added", HttpStatus.OK);
    }

    @PostMapping(path = "/update")
    public @ResponseBody ResponseEntity<String> updateUser(@RequestParam String sessionToken, @RequestParam String newUsername, @RequestParam String newPassword, @RequestParam String newEmail){
        List<User> queryResult = userRepository.findByUsername(sessionToken);
        if(queryResult.size() == 1) {
            User mUser = queryResult.get(0);
            if(!newUsername.equals("")){
                mUser.setUsername(newUsername);
            }
            if(!newPassword.equals("")){
                mUser.setUsername(newPassword);
            }
            if(!newEmail.equals("")){
                mUser.setUsername(newEmail);
            }
            return new ResponseEntity<>("User update", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("No user with this session token", HttpStatus.BAD_REQUEST);
        }
    }

    //###GETS   in futere strip password
    @GetMapping(path="/get/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }

    @GetMapping(path = "/get/bysession")
    public @ResponseBody ResponseEntity<User> getBySession(@RequestParam String sessionToken){
        List<User> queryResult = userRepository.findBySessiontoken(sessionToken);
        if(queryResult.size() == 1) {
            return new ResponseEntity <User> (queryResult.get(0), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping(path = "/get/username")
    public @ResponseBody ResponseEntity<User> getByUsername(@RequestParam String username){
        List<User> queryResult = userRepository.findByUsername(username);
        if(queryResult.size() == 1) {
            return new ResponseEntity <User> (queryResult.get(0), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }


    @PostMapping(path="/login")
    public @ResponseBody ResponseEntity<String> loginUser(@RequestParam String email, @RequestParam String password) {
        System.out.println("login: " + email + "  " + password);
        List<User> queryResult = userRepository.findByEmailAndPassword(email, password);
        if(queryResult.size() == 1){
            Calendar calInst = Calendar.getInstance();
            User logUser = queryResult.get(0);

            String s = logUser.getId() + "|" + calInst.getTimeInMillis();
            String token = Base64.getUrlEncoder().encodeToString(s.getBytes());

            logUser.setSessiontoken(token);
            userRepository.save(logUser);

            return new ResponseEntity<String>(token, HttpStatus.OK);
        }
        else{
            System.out.println("No user found");
            return new ResponseEntity<String>("No user found", HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/logout")
    public @ResponseBody ResponseEntity<String> logoutUser(@RequestParam String sessionToken){
        List<User> queryResult = userRepository.findBySessiontoken(sessionToken);
        if(queryResult.size() == 1){
            User mUser = queryResult.get(0);
            mUser.setSessiontoken("");
            userRepository.save(mUser);
            return new ResponseEntity<String>("User logged out", HttpStatus.OK);
        }
        return new ResponseEntity<String>("User not logged in", HttpStatus.BAD_REQUEST);
    }
}
