package com.planningproject;

import com.planningproject.model.Poll;
import com.planningproject.model.Vote;
import com.planningproject.repository.PollRepository;
import com.planningproject.repository.VoteRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class VoteRepositoryTest {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PollRepository pollRepository;

    @Test
    public void saveVote() {
        Poll poll = new Poll();
        poll.setIdentifier("LLLL");
        poll.setDescription("Description");
        pollRepository.save(poll);

        Vote vote = new Vote();
        vote.setIdentifier("LLLL");
        vote.setVoteValue("1");
        vote.setName("Voter");
        Poll poll1 = pollRepository.findByIdentifier("LLLL");
        vote.setPoll(poll1);
        Vote vote1 = voteRepository.save(vote);

        assertThat(vote1).isNotNull();
    }
}
