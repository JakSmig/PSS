package com.pwr.StoliceSwiata.controllers;

import com.pwr.StoliceSwiata.Repositories.CapitalRepository;
import com.pwr.StoliceSwiata.dbSchema.Capital;
import com.pwr.StoliceSwiata.dbSchema.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping(path="/capital")
public class CapitalController {
    @Autowired
    private CapitalRepository capitalRepository;
    @GetMapping(path="/get/all")
    public @ResponseBody Iterable<Capital> getAllCapitals() {
        return capitalRepository.findAll();
    }
    @GetMapping(path="/get/country")
    public @ResponseBody ResponseEntity getByCountry(@RequestParam String country) {
        List<Capital> queryResult = capitalRepository.findByCountry(country);
        if(queryResult.size() > 0) {

            return new ResponseEntity<Capital>(queryResult.get(0), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("No such country", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(path="/get/name")
    public @ResponseBody ResponseEntity getByName(@RequestParam String name) {
        List<Capital> queryResult = capitalRepository.findByName(name);
        if(queryResult.size() > 0) {

            return new ResponseEntity<Capital>(queryResult.get(0), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("No such capital", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/add")
    public @ResponseBody ResponseEntity<String> addCapital(@RequestParam String name,
                                                           @RequestParam String country,
                                                           @RequestParam String description,
                                                           String coordinates){
        Capital nCapital = new Capital();
        nCapital.setName(name);
        nCapital.setCountry(country);
        nCapital.setDescription(description);
        nCapital.setCoordenates(coordinates);

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
