package com.pwr.StoliceSwiata.Repositories;

import com.pwr.StoliceSwiata.dbSchema.Comment;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Integer> {

    public List<Comment> findByCapitalId(int capitalId);

}
