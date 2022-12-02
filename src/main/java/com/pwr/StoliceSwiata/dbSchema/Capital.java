package com.pwr.StoliceSwiata.dbSchema;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Capital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String name;
    @Column(unique = true)
    private String country;
    @Column
    private String coordinates;
    @Column(length = 10000)
    private String description;
    @OneToMany(mappedBy = "capital")
    private List<Comment> commentList;
    @OneToOne
    private Images flaglocation;
    private String currency;

    public Integer getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }
    public String getCoordenates() {
        return coordinates;
    }
    public void setCoordenates(String coordenates) {
        this.coordinates = coordenates;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public List<Comment> getCommentList() {
        return commentList;
    }
    public Images getFlaglocation() {
        return flaglocation;
    }

    public void setFlaglocation(Images flaglocation) {
        this.flaglocation = flaglocation;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
