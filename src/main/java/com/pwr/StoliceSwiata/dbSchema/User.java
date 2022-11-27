package com.pwr.StoliceSwiata.dbSchema;

import com.pwr.StoliceSwiata.dbSchema.enums.UserRole;

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

    private UserRole role;
    private String sessiontoken;

    @ManyToOne
    private Avatar avatar;

    public User(){

    }
    public User(String username, String password, String email, UserRole role){
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.sessiontoken = "";
    }


    public Integer getId() {
        return id;
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

    /*public String getPassword() {
        return password;
    }*/

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getSessiontoken() {
        return sessiontoken;
    }

    public void setSessiontoken(String sessiontoken) {
        this.sessiontoken = sessiontoken;
    }

    public Avatar getAvatar() {
        return avatar;
    }

    public void setAvatar(Avatar avatar) {
        this.avatar = avatar;
    }
}