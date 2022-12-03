package com.pwr.StoliceSwiata.dbSchema;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Comment comment;

    @Column
    private String reason;

    public Report(){}

    public Report(User user, Comment comment, String reason){
        this.user = user;
        this.comment = comment;
        this.reason = reason;
    }

    public Integer getId() {
        return id;
    }

    public Comment getComment() {
        return comment;
    }

    public User getUser() {
        return user;
    }

    public String getReason() {
        return reason;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
