package com.pwr.StoliceSwiata.Repositories;

import com.pwr.StoliceSwiata.dbSchema.Capital;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CapitalRepository extends CrudRepository<Capital, Integer> {
    List<Capital> findByCountry(String country);
    List<Capital> findByName(String name);
    @Transactional
    Long deleteByName(String name);

}
