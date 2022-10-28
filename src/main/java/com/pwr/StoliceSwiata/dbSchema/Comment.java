package com.pwr.StoliceSwiata.dbSchema;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer UserId;

    private Integer CapitalId;

    private Float rating;

    private String ImageLocation;




}
