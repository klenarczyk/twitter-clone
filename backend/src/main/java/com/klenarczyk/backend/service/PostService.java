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

    Post createPost(@AuthenticationPrincipal UserDetails currentUser,
                    @Valid CreatePostRequest req);

    Post updatePost(Post post);

    Page<Post> getAllPosts(Pageable pageable);

    Page<Post> getPostsByFollowedUsers(Long userId, Pageable pageable);

    Page<Post> getTopLevelPosts(Pageable pageable);

    Page<Post> getReplies(Long parentId, Pageable pageable);

    Post getPostById(Long id);

    List<Post> getPostsByAuthor(Long userId);
    Page<Post> getPostsByAuthor(Long authorId, Pageable pageable);

    void deletePost(Long id);

    Like likePost(Long userId, Long postId);

    void unlikePost(Long userId, Long postId);

    List<Like> getPostLikes(Long postId);

}
