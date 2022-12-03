package com.pwr.StoliceSwiata.controllers;

import com.pwr.StoliceSwiata.DTOs.ReportPOSTdto;
import com.pwr.StoliceSwiata.Repositories.CapitalRepository;
import com.pwr.StoliceSwiata.Repositories.CommentRepository;
import com.pwr.StoliceSwiata.Repositories.ReportRepository;
import com.pwr.StoliceSwiata.Repositories.UserRepository;
import com.pwr.StoliceSwiata.dbSchema.Comment;
import com.pwr.StoliceSwiata.dbSchema.Report;
import com.pwr.StoliceSwiata.dbSchema.User;
import com.pwr.StoliceSwiata.dbSchema.enums.CommentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping(path="/report")
public class ReportController {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CapitalRepository capitalRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReportRepository reportRepository;

    @GetMapping(path = "/foruser")
    public @ResponseBody List<Report> getReportsForUser(@RequestParam String sessionToken){
        User user = userRepository.findBySessiontoken(sessionToken).get(0);
        return reportRepository.findByUser(user);
    }

    @PostMapping()
    public @ResponseBody ResponseEntity reportComment(@RequestBody ReportPOSTdto report){
        Comment comment = commentRepository.findById(report.commentID).get(0);
        User user = userRepository.findBySessiontoken(report.sessionToken).get(0);

        //Check if already reported
        List<Report> queryReportsForRepetition = reportRepository.findByUserAndComment(user, comment);
        if(queryReportsForRepetition.size()>0){
            return new ResponseEntity("User already reporterd this comment", HttpStatus.BAD_REQUEST);
        }
        reportRepository.save(new Report(user, comment, report.reasonText));
        List<Report> queryReportsForCount = reportRepository.findByComment(comment);
        if(queryReportsForCount.size() >= 5){
            comment.setCommentStatus(CommentStatus.HIDDEN);
            commentRepository.save(comment);
        }
        return new ResponseEntity<>("Report added", HttpStatus.OK);
    }
}
