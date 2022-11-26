package com.pwr.StoliceSwiata.dbSchema;

import com.pwr.StoliceSwiata.dbSchema.enums.Status;

import javax.persistence.*;


@Entity
@Table
public class VisitStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn
    private Capital capital;

    @ManyToOne
    @JoinColumn
    private User user;
    @Column
    private Status status;

    public VisitStatus(){}

    public VisitStatus(Capital capital, User user, Status status){
        this.capital = capital;
        this.user = user;
        this.status = status;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getCapitalName() {
        return capital.getName();
    }
}
