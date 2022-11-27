package com.pwr.StoliceSwiata.controllers;

import com.pwr.StoliceSwiata.Repositories.AvatarRepository;
import com.pwr.StoliceSwiata.dbSchema.Avatar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping(path="/avatar")
public class AvatarController {
    @Autowired
    private AvatarRepository avatarRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Avatar> getAllAvatars(){
        List<Avatar> queryAvatars = avatarRepository.findAll();
        System.out.println(queryAvatars);
        return queryAvatars;
    }
}
