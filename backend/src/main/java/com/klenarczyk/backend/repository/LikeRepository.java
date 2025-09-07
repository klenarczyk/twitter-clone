package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.model.Like;
import com.klenarczyk.backend.model.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, LikeId> {

    List<Like> findByPostId(Long postId);
    boolean existsByUserIdAndPostId(Long userId, Long postId);

}