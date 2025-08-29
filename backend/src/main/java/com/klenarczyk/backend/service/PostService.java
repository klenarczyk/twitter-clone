package com.klenarczyk.backend.service;

import com.klenarczyk.backend.dto.post.CreatePostRequest;
import com.klenarczyk.backend.model.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface PostService {

    Post createPost(@Valid CreatePostRequest req,
                    @AuthenticationPrincipal UserDetails currentUser);

    Page<Post> getAllPosts(Pageable pageable);

    Post getPostById(Long id);

    List<Post> getPostsByAuthor(Long userId);
    Page<Post> getPostsByAuthor(Long authorId, Pageable pageable);

    void deletePost(Long id);

    Like likePost(Long userId, Long postId);

    void unlikePost(Long userId, Long postId);

    List<Like> getPostLikes(Long postId);

    List<Comment> getPostReplies(Long postId);

}
