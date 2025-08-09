package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.entity.Comment;
import com.klenarczyk.backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPostId(Long postId);

}