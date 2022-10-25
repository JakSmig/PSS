package com.pwr.StoliceSwiata.dbSchema;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Capital {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String name;

    private String coordenates;

    private String description;

    private String flagLocation;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCoordenates() {
        return coordenates;
    }

    public void setCoordenates(String coordenates) {
        this.coordenates = coordenates;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFlagLocation() {
        return flagLocation;
    }

    public void setFlagLocation(String flagLocation) {
        this.flagLocation = flagLocation;
    }
}
