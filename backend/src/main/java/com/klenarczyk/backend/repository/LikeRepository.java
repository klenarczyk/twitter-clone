package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
}