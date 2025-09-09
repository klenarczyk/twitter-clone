package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.model.Like;
import com.klenarczyk.backend.model.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, LikeId> {

    List<Like> findByPostId(Long postId);

    boolean existsByUserIdAndPostId(Long userId, Long postId);

    @Query("select l.id.postId from Like l where l.id.userId = :userId and l.id.postId in :postIds")
    List<Long> findLikedPostIdsByUserIdAndPostIds(Long userId, List<Long> postIds);

}