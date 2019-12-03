package com.planningproject.repository;

import com.planningproject.model.Vote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends CrudRepository<Vote, Long> {
    Vote findVoteByNameAndAndIdentifier(String name, String identifier);
}