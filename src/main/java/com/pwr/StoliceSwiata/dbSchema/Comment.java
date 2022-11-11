package com.pwr.StoliceSwiata.dbSchema;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer userId;

    @Column
    private Integer capitalId;

    @Column(length = 1000)
    private String cText;

    @Column
    @CreationTimestamp
    private Timestamp creationTime;

    @Column
    private Float rating;

    @Column
    private Integer likeRatio;

    @Column
    private String imageLocation;

    public Comment(){

    }
    public Comment(int userId, int capitalId, String text){
        this.userId = userId;
        this.capitalId = capitalId;
        this.cText = text;
    }
    public Integer getId() {
        return id;
    }
    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getCapitalId() {
        return capitalId;
    }

    public void setCapitalId(Integer capitalId) {
        this.capitalId = capitalId;
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

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
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
