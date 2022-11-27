package com.pwr.StoliceSwiata.Repositories;

import com.pwr.StoliceSwiata.dbSchema.Capital;
import com.pwr.StoliceSwiata.dbSchema.Comment;
import com.pwr.StoliceSwiata.dbSchema.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Integer> {

    List<Comment> findByCapital(Capital capital);

    List<Comment> findByCapital(Capital capital, Sort sort);
    List<Comment> findById(int id);
    List<Comment> findByUserAndCapital(User user, Capital capital);

    List<Comment> findByUser(User user);

    @Transactional
    Long deleteByUserAndCapital(User user, Capital capital);

}
