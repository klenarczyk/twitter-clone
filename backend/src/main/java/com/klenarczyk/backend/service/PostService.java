package com.klenarczyk.backend.service;

import com.klenarczyk.backend.dto.post.CreatePostRequest;
import com.klenarczyk.backend.entity.*;
import jakarta.validation.Valid;

import java.util.List;

public interface PostService {

    Post createPost(@Valid CreatePostRequest req);

    List<Post> getAllPosts();

    Post getPostById(Long id);

    List<Post> getPostsByAuthor(Long userId);

    void deletePost(Long id);

    Like likePost(Long userId, Long postId);

    void unlikePost(Long userId, Long postId);

    List<Like> getPostLikes(Long postId);

    List<Comment> getPostReplies(Long postId);

}
