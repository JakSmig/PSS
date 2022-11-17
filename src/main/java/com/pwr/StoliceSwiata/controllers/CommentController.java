package com.pwr.StoliceSwiata.controllers;

import com.pwr.StoliceSwiata.Repositories.CapitalRepository;
import com.pwr.StoliceSwiata.Repositories.CommentRepository;
import com.pwr.StoliceSwiata.Repositories.LikesRepository;
import com.pwr.StoliceSwiata.Repositories.UserRepository;
import com.pwr.StoliceSwiata.dbSchema.Capital;
import com.pwr.StoliceSwiata.dbSchema.Comment;
import com.pwr.StoliceSwiata.dbSchema.Likes;
import com.pwr.StoliceSwiata.dbSchema.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@Controller
@RequestMapping(path="/comment")
public class CommentController{
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CapitalRepository capitalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LikesRepository likesRepository;

    //Getters
    @GetMapping(path="/allforcapital")
    public @ResponseBody Iterable<Comment> getCommentsForCapitalOfCountry(@RequestParam String countryName){
        List<Capital> queryCapital = capitalRepository.findByCountry(countryName);
        if(queryCapital.size() == 0) {
            return new ArrayList<Comment>();
        }
        //List<Comment> queryComments = commentRepository.findByCapitalId(queryCapital.get(0).getId());
        //System.out.println("Return query of size: " + String.valueOf(queryComments.size()));
        //System.out.println(queryComments.get(0).get);
        return commentRepository.findByCapital(queryCapital.get(0));
    }
    //Posters
    @PostMapping(path="/addbyuser")
    public @ResponseBody ResponseEntity<String> addCommentToCapital(@RequestParam String capital,
                                                                    @RequestParam String sessionToken,
                                                                    @RequestParam String text,
                                                                    @RequestParam float rating_food,
                                                                    @RequestParam float rating_atraction,
                                                                    @RequestParam float rating_general,
                                                                    @RequestParam float rating_transport){
        List<Capital> queryCapital = capitalRepository.findByName(capital);
        if(queryCapital.size() == 0) {
            return new ResponseEntity<String>("No capital", HttpStatus.BAD_REQUEST);
        }
        List<User> queryUser = userRepository.findBySessiontoken(sessionToken);
        if(queryUser.size() == 0) {
            return new ResponseEntity<String>("No User with this token", HttpStatus.BAD_REQUEST);
        }
        Comment newComment = new Comment(queryUser.get(0), queryCapital.get(0), text, rating_food, rating_atraction, rating_general, rating_transport);
        commentRepository.save(newComment);
        return new ResponseEntity<>("Comment added", HttpStatus.OK);

    }
    /*
    @PostMapping(path = "/like")
    public @ResponseBody ResponseEntity likeComment(@RequestParam Integer commentID, @RequestParam String sessionToken, @RequestParam int value){
        Optional<Comment> queryComments = commentRepository.findById(commentID);
        if(queryComments.isEmpty()){
            return new ResponseEntity<String>("No comment", HttpStatus.BAD_REQUEST);
        }
        Comment com = queryComments.get();

        List<User> queryUser = userRepository.findBySessiontoken(sessionToken);
        if(queryUser.size() == 0) {
            return new ResponseEntity<String>("No User with this token", HttpStatus.BAD_REQUEST);
        }

        List<Likes> queryLikes = likesRepository.findByCommentAndUser(com, queryUser.get(0));
        if(queryLikes.size() > 0){

            queryLikes.get(0).setValue(value);
            int currentValue = com.getLikeRatio();

        }


    }*/

}
