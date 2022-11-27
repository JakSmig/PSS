package com.pwr.StoliceSwiata.controllers;

import com.pwr.StoliceSwiata.Repositories.CapitalRepository;
import com.pwr.StoliceSwiata.dbSchema.Capital;
import com.pwr.StoliceSwiata.dbSchema.Comment;
import com.pwr.StoliceSwiata.dbSchema.Images;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@Controller
@RequestMapping(path="/capital")
public class CapitalController {
    @Autowired
    private CapitalRepository capitalRepository;
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Capital> getAllCapitals() {
        return capitalRepository.findAll();
    }
    @GetMapping(path="/country")
    public @ResponseBody ResponseEntity getByCountry(@RequestParam String country) {
        List<Capital> queryResult = capitalRepository.findByCountry(country);
        if(queryResult.size() > 0) {

            return new ResponseEntity<Capital>(queryResult.get(0), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("No such country", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(path="/name")
    public @ResponseBody ResponseEntity getByName(@RequestParam String name) {
        List<Capital> queryResult = capitalRepository.findByName(name);
        if(queryResult.size() > 0) {

            return new ResponseEntity<Capital>(queryResult.get(0), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("No such capital", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(path="/average")
    public @ResponseBody ResponseEntity getAverageRatingByName(@RequestParam String name){
        List<Capital> queryResult = capitalRepository.findByName(name);
        if(queryResult.size() > 0) {
            List<Comment> comments = queryResult.get(0).getCommentList();
            float r_food_sum = 0;
            float r_transport_sum = 0;
            float r_attractions_sum = 0;
            float r_general_sum = 0;
            float com_size = comments.size();
            if(com_size>0){
                for(Comment comment : comments){
                    r_food_sum += comment.getRatingFood();
                    r_transport_sum += comment.getRatingTransport();
                    r_attractions_sum += comment.getRatingAttraction();
                    r_general_sum += comment.getRatingGeneral();
                }
                r_food_sum /= com_size;
                r_transport_sum /= com_size;
                r_attractions_sum /= com_size;
                r_general_sum /= com_size;
            }
            Map<String, Float> response_body = new HashMap<>();
            response_body.put("rating_food_avg", r_food_sum);
            response_body.put("rating_transport_avg", r_transport_sum);
            response_body.put("rating_attraction_avg", r_attractions_sum);
            response_body.put("rating_general_avg", r_general_sum);


            return new ResponseEntity<>(response_body, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("No such capital", HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping(path = "/add")
    public @ResponseBody ResponseEntity<String> addCapital(@RequestParam String name,
                                                           @RequestParam String country,
                                                           @RequestBody String description,
                                                           String coordinates,
                                                           Images flag,
                                                           String currency){
        List<Capital> queryResult = capitalRepository.findByCountry(country);
        if(queryResult.size() > 0){
            return new ResponseEntity<String>("Country already has assigned capital", HttpStatus.BAD_REQUEST);
        }
        Capital nCapital = new Capital();
        nCapital.setName(name);
        nCapital.setCountry(country);
        nCapital.setDescription(description);
        nCapital.setCoordenates(coordinates);
        nCapital.setFlaglocation(flag);
        nCapital.setCurrency(currency);

        capitalRepository.save(nCapital);
        return new ResponseEntity<>("Capital added", HttpStatus.OK);
    }
    @PostMapping(path = "/updateForCountry")
    public @ResponseBody ResponseEntity<String> updateCapital(String name,
                                                           @RequestParam String country,
                                                           String description,
                                                           String coordinates){
        List<Capital> queryResult = capitalRepository.findByCountry(country);
        if(queryResult.size() > 0) {
            Capital mCap = queryResult.get(0);
            if(name != null && !name.equals("")){
                mCap.setName(name);
            }
            if(description != null && !description.equals("")){
                mCap.setDescription(description);
            }
            if(coordinates != null && !coordinates.equals("")){
                mCap.setCoordenates(coordinates);
            }
            capitalRepository.save(mCap);
            return new ResponseEntity<String>("Capital for country updated", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("No such country", HttpStatus.BAD_REQUEST);
        }

    }
    @DeleteMapping("/deleteByName")
    public @ResponseBody ResponseEntity updateCapital(@RequestParam String name){
        System.out.println(capitalRepository.findByName(name));
        Long resp = capitalRepository.deleteByName(name);

        return new ResponseEntity(resp, HttpStatus.OK);
    }



}
