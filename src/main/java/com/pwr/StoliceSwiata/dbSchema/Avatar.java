package com.pwr.StoliceSwiata.dbSchema;

import javax.persistence.*;

@Entity
@Table
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String value;


}
