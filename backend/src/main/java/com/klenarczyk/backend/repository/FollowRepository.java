package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.entity.Follow;
import com.klenarczyk.backend.entity.FollowId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, FollowId> {

    List<Follow> findFollowsByFollowedId(Long followedId);
    List<Follow> findFollowsByFollowerId(Long followerId);

}