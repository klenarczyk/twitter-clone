package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.entity.Like;
import com.klenarczyk.backend.entity.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, LikeId> {

    List<Like> findByPostId(Long postId);

}