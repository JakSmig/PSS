package com.pwr.StoliceSwiata.Repositories;

import com.pwr.StoliceSwiata.dbSchema.Capital;
import com.pwr.StoliceSwiata.dbSchema.User;
import com.pwr.StoliceSwiata.dbSchema.VisitStatus;
import com.pwr.StoliceSwiata.dbSchema.enums.Status;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VisitStatusRepository extends CrudRepository<VisitStatus, Integer> {
    List<VisitStatus> findByCapitalAndUser(Capital capital, User user);
    List<VisitStatus> findByUserAndStatus(User user, Status status);
}
