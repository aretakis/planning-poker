package com.planningproject.repository;

import com.planningproject.model.Poll;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollRepository extends CrudRepository<Poll, Long> {
    Poll findByIdentifier(String identifier);
}