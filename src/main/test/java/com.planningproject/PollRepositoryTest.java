package com.planningproject;

import com.planningproject.model.Poll;
import com.planningproject.repository.PollRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class PollRepositoryTest {

    @Autowired
    private PollRepository pollRepository;

    @Test
    public void savePoll() {
        Poll poll = new Poll();
        poll.setIdentifier("POLL");
        poll.setDescription("Description");
        pollRepository.save(poll);
        Poll poll1 = pollRepository.findByIdentifier("POLL");

        assertThat(poll.getIdentifier()).isEqualTo(poll1.getIdentifier());
    }
}
