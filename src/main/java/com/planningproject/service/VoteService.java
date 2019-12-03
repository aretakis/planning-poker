package com.planningproject.service;

import com.planningproject.model.Poll;
import com.planningproject.model.Vote;
import com.planningproject.repository.PollRepository;
import com.planningproject.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    @Autowired
    VoteRepository voteRepository;

    @Autowired
    PollRepository pollRepository;

    public Vote saveOrUpdateVote(Vote vote) {
        Poll poll = pollRepository.findByIdentifier(vote.getIdentifier());
        Vote vote1 = findVoteByNameAndIdentifier(vote.getName(), vote.getIdentifier());
        if (vote1 != null) {
            vote1.setVoteValue(vote.getVoteValue());
            return voteRepository.save(vote1);
        }
        vote.setPoll(poll);
        return voteRepository.save(vote);
    }

    private Vote findVoteByNameAndIdentifier(String name, String identifier) {
        return voteRepository.findVoteByNameAndAndIdentifier(name, identifier);
    }
}