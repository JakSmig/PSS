package com.pwr.StoliceSwiata.Repositories;

import com.pwr.StoliceSwiata.dbSchema.Comment;
import com.pwr.StoliceSwiata.dbSchema.Report;
import com.pwr.StoliceSwiata.dbSchema.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReportRepository extends CrudRepository<Report, Integer> {
    List<Report> findByComment(Comment comment);
    List<Report> findByUser(User user);
    List<Report> findByUserAndComment(User user, Comment comment);
}
