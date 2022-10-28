package com.pwr.StoliceSwiata.dbSchema;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Capital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String country;

    private String coordinates;

    private String description;

    private String flaglocation;

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
        country = country;
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

    public String getFlaglocation() {
        return flaglocation;
    }

    public void setFlaglocation(String flaglocation) {
        this.flaglocation = flaglocation;
    }
}
