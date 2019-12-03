package com.planningproject.service;

import com.planningproject.model.Poll;
import com.planningproject.repository.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PollService {

    @Autowired
    PollRepository pollRepository;

    public Poll savePoll(Poll poll) {
        return pollRepository.save(poll);
    }

    public Poll findPollByIdentifier(String identifier) {
        return pollRepository.findByIdentifier(identifier);
    }
}