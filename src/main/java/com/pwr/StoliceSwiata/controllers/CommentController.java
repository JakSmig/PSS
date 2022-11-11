package com.pwr.StoliceSwiata.controllers;

import com.pwr.StoliceSwiata.Repositories.CapitalRepository;
import com.pwr.StoliceSwiata.Repositories.CommentRepository;
import com.pwr.StoliceSwiata.Repositories.UserRepository;
import com.pwr.StoliceSwiata.dbSchema.Capital;
import com.pwr.StoliceSwiata.dbSchema.Comment;
import com.pwr.StoliceSwiata.dbSchema.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@Controller
@RequestMapping(path="/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CapitalRepository capitalRepository;

    @Autowired
    private UserRepository userRepository;

    //Getters
    @GetMapping(path="/get/allforcapital")
    public @ResponseBody Iterable<Comment> getCommentsForCapitalOfCountry(@RequestParam String countryName){
        List<Capital> queryCapital = capitalRepository.findByCountry(countryName);
        if(queryCapital.size() == 0) {
            return new ArrayList<Comment>();
        }
        //List<Comment> queryComments = commentRepository.findByCapitalId(queryCapital.get(0).getId());
        //System.out.println("Return query of size: " + String.valueOf(queryComments.size()));
        //System.out.println(queryComments.get(0).get);
        return commentRepository.findByCapitalId(queryCapital.get(0).getId());
    }
    //Posters
    @PostMapping(path="/addbyuser")
    public @ResponseBody ResponseEntity<String> addCommentToCapital(@RequestParam String capital, @RequestParam String sessionToken, @RequestParam String text){
        List<Capital> queryCapital = capitalRepository.findByCountry(capital);
        if(queryCapital.size() == 0) {
            return new ResponseEntity<String>("No User with this token", HttpStatus.BAD_REQUEST);
        }
        List<User> queryUser = userRepository.findBySessiontoken(sessionToken);
        if(queryUser.size() == 0) {
            return new ResponseEntity<String>("No User with this token", HttpStatus.BAD_REQUEST);
        }
        Comment newComment = new Comment(queryUser.get(0).getId(), queryCapital.get(0).getId(), text);
        commentRepository.save(newComment);
        return new ResponseEntity<>("Comment added", HttpStatus.OK);

    }

}
