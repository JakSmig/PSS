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

    @Transient
    private Avatar userAvatar;

    @ManyToOne
    @JoinColumn(name = "capital")
    private Capital capital;

    @Column(length = 1000)
    private String cText;

    @Column
    @CreationTimestamp
    private Timestamp creationTime;

    @Column
    private Float ratingFood;

    @Column
    private Float ratingTransport;

    @Column
    private Float ratingAttraction;

    @Column
    private Float ratingGeneral;

    @Column
    private Integer likeRatio;

//    @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private List<Likes> likes;

    @OneToOne
    private Images image;

    @Transient
    public int likedByCurrentUser;



    public Comment(){

    }
    public Comment(User user, Capital capital, String text, float ratingFood, float ratingAttraction, float ratingGeneral, float ratingTransport){
        this.user = user;
        this.capital = capital;
        this.cText = text;
        this.ratingFood = ratingFood;
        this.ratingAttraction = ratingAttraction;
        this.ratingGeneral = ratingGeneral;
        this.ratingTransport = ratingTransport;
        this.likeRatio = 0;
    }
    public Integer getId() {
        return id;
    }
    public String getUser() {
        return user.getUsername();
    }
    public Avatar getUserAvatar(){return user.getAvatar();}
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

    public Float getRatingFood() {
        return ratingFood;
    }

    public void setRatingFood(Float ratingFood) {
        this.ratingFood = ratingFood;
    }

    public Float getRatingTransport() {
        return ratingTransport;
    }

    public void setRatingTransport(Float ratingTransport) {
        this.ratingTransport = ratingTransport;
    }

    public Float getRatingAttraction() {
        return ratingAttraction;
    }

    public void setRatingAttraction(Float ratingAttraction) {
        this.ratingAttraction = ratingAttraction;
    }

    public Float getRatingGeneral() {
        return ratingGeneral;
    }

    public void setRatingGeneral(Float ratingGeneral) {
        this.ratingGeneral = ratingGeneral;
    }

    public Integer getLikeRatio() {
        return likeRatio;
    }

    public void setLikeRatio(Integer likeRatio) {
        this.likeRatio = likeRatio;
    }

    public Images getImageLocation() {
        return image;
    }

    public void setImageLocation(Images image) {
        this.image = image;
    }

    public void setLikedByCurrentUser(int likedByCurrentUser) {
        this.likedByCurrentUser = likedByCurrentUser;
    }
}
