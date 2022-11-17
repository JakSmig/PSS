package com.pwr.StoliceSwiata.dbSchema;

import javax.persistence.*;

@Entity
@Table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String sessiontoken;

    public User(){

    }
    public User(String username, String password, String email){
        this.username = username;
        this.password = password;
        this.email = email;
        this.sessiontoken = "";
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSessiontoken() {
        return sessiontoken;
    }

    public void setSessiontoken(String sessiontoken) {
        this.sessiontoken = sessiontoken;
    }
}