package com.pwr.StoliceSwiata.dbSchema;

import javax.persistence.*;

@Entity
@Table
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String filename;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String value;

    public Images(){}

    public Images(String filename, String value){
        this.filename = filename;
        this.value = value;
    }

    public String getFilename() {
        return filename;
    }

    public String getValue() {
        return value;
    }
}
