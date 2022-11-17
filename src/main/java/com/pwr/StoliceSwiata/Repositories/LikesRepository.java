package com.pwr.StoliceSwiata.Repositories;


import com.pwr.StoliceSwiata.dbSchema.Comment;
import com.pwr.StoliceSwiata.dbSchema.Likes;
import com.pwr.StoliceSwiata.dbSchema.User;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface LikesRepository extends CrudRepository<Likes, Integer> {
    List<Likes> findByCommentAndUser(Comment comment, User user);
    @Transactional
    Long deleteById(int id);
}
