package com.pwr.StoliceSwiata.Repositories;

import com.pwr.StoliceSwiata.dbSchema.Avatar;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AvatarRepository extends CrudRepository<Avatar, Integer> {
    List<Avatar> findByValue(String value);
    List<Avatar> findAll();
}
