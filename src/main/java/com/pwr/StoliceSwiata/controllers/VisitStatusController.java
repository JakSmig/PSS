package com.pwr.StoliceSwiata.controllers;

import com.pwr.StoliceSwiata.Repositories.CapitalRepository;
import com.pwr.StoliceSwiata.Repositories.UserRepository;
import com.pwr.StoliceSwiata.Repositories.VisitStatusRepository;
import com.pwr.StoliceSwiata.dbSchema.Capital;
import com.pwr.StoliceSwiata.dbSchema.User;
import com.pwr.StoliceSwiata.dbSchema.VisitStatus;
import com.pwr.StoliceSwiata.dbSchema.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping(path="/capital/status")
public class VisitStatusController {
    @Autowired
    private CapitalRepository capitalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VisitStatusRepository visitStatusRepository;

    @GetMapping
    public @ResponseBody ResponseEntity getStatusForCapital(@RequestParam String capitalName, @RequestParam String sessionToken){
        //TODO add checkers
        Capital queryCapital = capitalRepository.findByName(capitalName).get(0);
        User user = userRepository.findBySessiontoken(sessionToken).get(0);
        List<VisitStatus> queryStatus = visitStatusRepository.findByCapitalAndUser(queryCapital, user);
        if (queryStatus.size() == 0){
            return new ResponseEntity<>(Status.UNDEFINED, HttpStatus.OK);
        }

        return new ResponseEntity(queryStatus.get(0).getStatus(), HttpStatus.OK);
    }

    @PostMapping()
    public @ResponseBody ResponseEntity changeStatusForCapital(@RequestParam String capitalName, @RequestParam String sessionToken, @RequestParam Status status){
        Capital queryCapital = capitalRepository.findByName(capitalName).get(0);
        User user = userRepository.findBySessiontoken(sessionToken).get(0);
        List<VisitStatus> queryStatus = visitStatusRepository.findByCapitalAndUser(queryCapital, user);

        if(queryStatus.size()>0){
            queryStatus.get(0).setStatus(status);
            visitStatusRepository.save(queryStatus.get(0));
        }else{
            visitStatusRepository.save(new VisitStatus(queryCapital, user, status));
        }
        return new ResponseEntity<>("Status changed", HttpStatus.OK);

    }

}
