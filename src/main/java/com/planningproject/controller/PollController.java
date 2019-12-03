package com.planningproject.controller;

import com.planningproject.model.Poll;
import com.planningproject.model.Vote;
import com.planningproject.service.PollService;
import com.planningproject.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/poll")
public class PollController {

    @Autowired
    PollService pollService;

    @Autowired
    VoteService voteService;

    @PostMapping("")
    public ResponseEntity<?> savePoll(@RequestBody Poll poll) {
        Poll poll1 = new Poll();
        poll1.setDescription(poll.getDescription());
        poll1.setIdentifier(poll.getIdentifier());
        pollService.savePoll(poll1);
        return new ResponseEntity<Poll>(poll1, HttpStatus.CREATED);
    }

    @GetMapping("/{identifier}")
    public ResponseEntity<?> getPoll(@PathVariable String identifier) {
        Poll poll = pollService.findPollByIdentifier(identifier);
        if(poll != null) {
            return new ResponseEntity<Poll>(poll, HttpStatus.OK);
        }
        return new ResponseEntity<Poll>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/vote")
    public ResponseEntity<?> saveOrUpdateVote(@RequestBody Vote vote) {
        Vote vote1 = new Vote();
        vote1.setVoteValue(vote.getVoteValue());
        vote1.setName(vote.getName());
        vote1.setIdentifier(vote.getIdentifier());
        voteService.saveOrUpdateVote(vote1);
        return new ResponseEntity<Vote>(vote1, HttpStatus.CREATED);
    }
}