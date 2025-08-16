package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserId(Long userId);
    Page<Post> findByUserId(Long authorId, Pageable pageable);

}