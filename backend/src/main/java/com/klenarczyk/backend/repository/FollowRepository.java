package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
}