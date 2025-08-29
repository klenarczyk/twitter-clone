package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.model.Follow;
import com.klenarczyk.backend.model.FollowId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, FollowId> {

    List<Follow> findFollowsByFollowedId(Long followedId);
    List<Follow> findFollowsByFollowerId(Long followerId);

}