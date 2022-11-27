package com.pwr.StoliceSwiata.controllers;

import com.pwr.StoliceSwiata.Repositories.*;
import com.pwr.StoliceSwiata.dbSchema.Capital;
import com.pwr.StoliceSwiata.dbSchema.Comment;
import com.pwr.StoliceSwiata.dbSchema.Likes;
import com.pwr.StoliceSwiata.dbSchema.User;
import com.pwr.StoliceSwiata.DTOs.CommentPOSTdto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
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

    @Autowired
    private ImagesRepository imagesRepository;

    //Getters
    @GetMapping(path="/allforcapital")
    public @ResponseBody Iterable<Comment> getCommentsForCapital(@RequestParam String capitalName, String optionalSessionToken, String optionalSort, Boolean reverse_sort){
        String[] ALLOWED_SORTS = {"creationTime", "likeRatio", "rating_general"};
        List<Capital> queryCapital = capitalRepository.findByName(capitalName);
        if(queryCapital.size() == 0) {
            return new ArrayList<Comment>();
        }
        List<Comment> commentList = null;
        if(optionalSort != null && Arrays.asList(ALLOWED_SORTS).contains(optionalSort)) {
            reverse_sort = reverse_sort != null && (reverse_sort);
            if(reverse_sort){
                commentList = commentRepository.findByCapital(queryCapital.get(0), Sort.by(Sort.Direction.ASC, optionalSort));
            }else{
                commentList = commentRepository.findByCapital(queryCapital.get(0), Sort.by(Sort.Direction.DESC, optionalSort));
            }

        }else{
            commentList = commentRepository.findByCapital(queryCapital.get(0));
        }

        if (optionalSessionToken != null) {
            List<User> queryUser = userRepository.findBySessiontoken(optionalSessionToken);
            if (queryUser.size() > 0) {
                User mUser = queryUser.get(0);
                for (Comment comment : commentList) {
                    List<Likes> queryLikes = likesRepository.findByCommentAndUser(comment, mUser);
                    if (queryLikes.size() > 0) {
                        comment.setLikedByCurrentUser(queryLikes.get(0).getValue());
                    }
                }
            }
        }
        return commentList;
    }

    @GetMapping(path="/allforuser")
    public @ResponseBody Iterable<Comment> getCommentsForUser(@RequestParam String sessionToken){

        List<User> queryUser = userRepository.findBySessiontoken(sessionToken);
        if(queryUser.size()>0){
            return commentRepository.findByUser(queryUser.get(0));
        }
        return new ArrayList<Comment>();
    }

    //Posters
    @PostMapping(path="/addbyuser")
    public @ResponseBody ResponseEntity<String> addCommentToCapitalNew(@RequestBody CommentPOSTdto comment){


        List<Capital> queryCapital = capitalRepository.findByName(comment.capitalName);
        if(queryCapital.size() == 0) {
            return new ResponseEntity<String>("No capital", HttpStatus.BAD_REQUEST);
        }
        Capital capital = queryCapital.get(0);

        List<User> queryUser = userRepository.findBySessiontoken(comment.sessionId);
        if(queryUser.size() == 0) {
            return new ResponseEntity<String>("No User with this token", HttpStatus.BAD_REQUEST);
        }
        User user = queryUser.get(0);

        List<Comment> queryComments = commentRepository.findByUserAndCapital(user, capital);

        if(queryComments.size() == 0){
            Comment newComment = new Comment(user, capital, comment.c_text, comment.rating_food, comment.rating_attraction, comment.rating_general, comment.rating_transport);
            if(!comment.image.getValue().equals("")){
                newComment.setImageLocation(imagesRepository.save(comment.image));
            }
            commentRepository.save(newComment);
            return new ResponseEntity<>("Comment added", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("User already commented under capital", HttpStatus.BAD_REQUEST);
        }
    }
    public @ResponseBody ResponseEntity<String> addCommentToCapital(@RequestParam String capital,
                                                                    @RequestParam String sessionToken,
                                                                    @RequestParam(required = false) String optionalUsername,
                                                                    @RequestBody String text,
                                                                    @RequestParam float rating_food,
                                                                    @RequestParam float rating_attraction,
                                                                    @RequestParam float rating_general,
                                                                    @RequestParam float rating_transport){
        if(optionalUsername != null){
            List<User> findSession = userRepository.findByUsername(optionalUsername);
            if(findSession.size() > 0 ){
                sessionToken = findSession.get(0).getSessiontoken();
            }
        }

        List<Capital> queryCapital = capitalRepository.findByName(capital);
        if(queryCapital.size() == 0) {
            return new ResponseEntity<String>("No capital", HttpStatus.BAD_REQUEST);
        }
        List<User> queryUser = userRepository.findBySessiontoken(sessionToken);
        if(queryUser.size() == 0) {
            return new ResponseEntity<String>("No User with this token", HttpStatus.BAD_REQUEST);
        }
        List<Comment> queryComments = commentRepository.findByUserAndCapital(queryUser.get(0), queryCapital.get(0));
        if(queryComments.size() == 0){
            Comment newComment = new Comment(queryUser.get(0), queryCapital.get(0), text, rating_food, rating_attraction, rating_general, rating_transport);
            commentRepository.save(newComment);
            return new ResponseEntity<>("Comment added", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("User already commented under capital", HttpStatus.BAD_REQUEST);
        }


    }

    @PostMapping(path = "/likechange")
    public @ResponseBody ResponseEntity changeLikeValueInComment(@RequestParam Integer commentID, @RequestParam String sessionToken, @RequestParam int value){
        //Checks
        if(value > 1 || value < -1){
            return new ResponseEntity<String>("Value should be between 1 and -1", HttpStatus.BAD_REQUEST);
        }
        Optional<Comment> queryComments = commentRepository.findById(commentID);
        if(queryComments.isEmpty()){
            return new ResponseEntity<String>("No comment", HttpStatus.BAD_REQUEST);
        }
        List<User> queryUser = userRepository.findBySessiontoken(sessionToken);
        if(queryUser.size() == 0) {
            return new ResponseEntity<String>("No User with this token", HttpStatus.BAD_REQUEST);
        }

        Comment com = queryComments.get();
        List<Likes> queryLikes = likesRepository.findByCommentAndUser(com, queryUser.get(0));
        if(queryLikes.size() > 0){
            int previousLikeValue = queryLikes.get(0).getValue();
            queryLikes.get(0).setValue(value);
            int currentComValue = com.getLikeRatio();
            com.setLikeRatio(currentComValue - previousLikeValue + value);

            commentRepository.save(com);
            if(value == 0){
                likesRepository.deleteById(queryLikes.get(0).getId());
            }else{
                likesRepository.save(queryLikes.get(0));
            }

            return new ResponseEntity("Edited like value", HttpStatus.OK);
        }else{
            //value wont be 0
            likesRepository.save(new Likes(queryUser.get(0), queryComments.get(), value));
            com.setLikeRatio(com.getLikeRatio() + value);
            commentRepository.save(com);
            return new ResponseEntity("Created new like value", HttpStatus.OK);
        }
    }

    @DeleteMapping(path = "/delete")
    public @ResponseBody ResponseEntity deleteCommentBySessionAndCapitalName(@RequestParam String sessionToken, String capitalName){
        List<Capital> queryCapital = capitalRepository.findByName(capitalName);
        if(queryCapital.size() == 0) {
            return new ResponseEntity<String>("No capital", HttpStatus.BAD_REQUEST);
        }
        List<User> queryUser = userRepository.findBySessiontoken(sessionToken);
        if(queryUser.size() == 0) {
            return new ResponseEntity<String>("No User with this token", HttpStatus.BAD_REQUEST);
        }
        Long resp = commentRepository.deleteByUserAndCapital(queryUser.get(0), queryCapital.get(0));
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
}
