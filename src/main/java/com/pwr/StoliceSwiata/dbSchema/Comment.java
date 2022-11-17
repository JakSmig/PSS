package com.pwr.StoliceSwiata.dbSchema;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "capital")
    private Capital capital;

    @Column(length = 1000)
    private String cText;

    @Column
    @CreationTimestamp
    private Timestamp creationTime;

    @Column
    private Float rating_food;

    @Column
    private Float rating_transport;

    @Column
    private Float rating_atraction;

    @Column
    private Float rating_general;

    @Column
    private Integer likeRatio;

    @Column
    private String imageLocation;

    @Transient
    public int likedByCurrentUser;

    public Comment(){

    }
    public Comment(User user, Capital capital, String text, float rating_food, float rating_atraction, float rating_general, float rating_transport){ //, Float rating_food, String rating_transport){
        this.user = user;
        this.capital = capital;
        this.cText = text;
        this.rating_food = rating_food;
        this.rating_atraction = rating_atraction;
        this.rating_general = rating_general;
        this.rating_transport = rating_transport;
        this.likeRatio = 0;
    }
    public Integer getId() {
        return id;
    }
    public String getUser() {
        return user.getUsername();
    }
    public String getCapital() {
        return capital.getName();
    }

    public String getcText() {
        return cText;
    }

    public void setcText(String cText) {
        this.cText = cText;
    }

    public Timestamp getCreationTime() {
        return creationTime;
    }

    public Float getRating_food() {
        return rating_food;
    }

    public void setRating_food(Float rating_food) {
        this.rating_food = rating_food;
    }

    public Float getRating_transport() {
        return rating_transport;
    }

    public void setRating_transport(Float rating_transport) {
        this.rating_transport = rating_transport;
    }

    public Float getRating_atraction() {
        return rating_atraction;
    }

    public void setRating_atraction(Float rating_atraction) {
        this.rating_atraction = rating_atraction;
    }

    public Float getRating_general() {
        return rating_general;
    }

    public void setRating_general(Float rating_general) {
        this.rating_general = rating_general;
    }

    public Integer getLikeRatio() {
        return likeRatio;
    }

    public void setLikeRatio(Integer likeRatio) {
        this.likeRatio = likeRatio;
    }

    public String getImageLocation() {
        return imageLocation;
    }

    public void setImageLocation(String imageLocation) {
        this.imageLocation = imageLocation;
    }
}
