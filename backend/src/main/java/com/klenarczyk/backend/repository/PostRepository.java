package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserId(Long userId);
    Page<Post> findByUserId(Long authorId, Pageable pageable);

    Page<Post> findByParentPostNull(Pageable pageable);
    Page<Post> findByParentPostId(Long parentPostId, Pageable pageable);

    List<Post> findByUserIdAndParentPostIsNull(Long userId);
    Page<Post> findByUserIdAndParentPostIsNull(Long userId, Pageable pageable);

}