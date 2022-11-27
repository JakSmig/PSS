package com.pwr.StoliceSwiata.controllers;

import com.pwr.StoliceSwiata.Repositories.UserRepository;
import com.pwr.StoliceSwiata.dbSchema.User;
import com.pwr.StoliceSwiata.dbSchema.enums.UserRole;
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
    public @ResponseBody ResponseEntity<String> addUser(@RequestBody String username, @RequestBody String password, @RequestBody String email){
        if(userRepository.findByEmail(email).size()>0){
            return new ResponseEntity<String>("Email already used", HttpStatus.CONFLICT);
        }
        if(userRepository.findByUsername(username).size()>0){
            return new ResponseEntity<String>("User already exists", HttpStatus.CONFLICT);
        }
        User newUser = new User(username, password, email, UserRole.NORMALUSER);
        userRepository.save(newUser);
        return  loginUser(email, password);
    }
    @PutMapping(path = "/changetoadmin")
    public @ResponseBody ResponseEntity<String>changeToAdmin(@RequestParam String sessionToken){
        List<User> queryResult = userRepository.findBySessiontoken(sessionToken);
        if(queryResult.size() == 1) {
            User user = queryResult.get(0);
            user.setRole(UserRole.ADMIN);
            userRepository.save(user);
            return new ResponseEntity("privlages changed", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/update")
    public @ResponseBody ResponseEntity<String> updateUser(@RequestParam String sessionToken,
                                                           @RequestParam String newUsername,
                                                           @RequestParam String newPassword,
                                                           @RequestParam String newEmail){
        List<User> queryResult = userRepository.findBySessiontoken(sessionToken);
        if(queryResult.size() > 0) {
            User mUser = queryResult.get(0);
            if(!(newUsername == null || newUsername.equals("") )){
                mUser.setUsername(newUsername);
            }
            if(!(newPassword == null || newPassword.equals("") )){
                mUser.setPassword(newPassword);
            }
            if(!(newEmail == null || newEmail.equals("") )){
                mUser.setEmail(newEmail);
            }
            userRepository.save(mUser);
            return new ResponseEntity<>("User update", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("No user with this session token", HttpStatus.BAD_REQUEST);
        }
    }

    //###GETS   in futere strip password
    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping(path = "/bysession")
    public @ResponseBody ResponseEntity<User> getBySession(@RequestParam String sessionToken){
        List<User> queryResult = userRepository.findBySessiontoken(sessionToken);
        if(queryResult.size() == 1) {
            return new ResponseEntity <User> (queryResult.get(0), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping(path = "/username")
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
