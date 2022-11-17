package com.pwr.StoliceSwiata.Repositories;


import com.pwr.StoliceSwiata.dbSchema.Comment;
import com.pwr.StoliceSwiata.dbSchema.Likes;
import com.pwr.StoliceSwiata.dbSchema.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LikesRepository extends CrudRepository<Likes, Integer> {
    public List<Likes> findByCommentAndUser(Comment comment, User user);
}
