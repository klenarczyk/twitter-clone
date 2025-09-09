package com.klenarczyk.backend.service.impl;

import com.klenarczyk.backend.dto.post.CreatePostRequest;
import com.klenarczyk.backend.dto.post.PagedPostResponse;
import com.klenarczyk.backend.model.*;
import com.klenarczyk.backend.common.exception.ResourceNotFoundException;
import com.klenarczyk.backend.repository.CommentRepository;
import com.klenarczyk.backend.repository.LikeRepository;
import com.klenarczyk.backend.repository.PostRepository;
import com.klenarczyk.backend.service.PostService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserServiceImpl userService;
    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;

    public PostServiceImpl(PostRepository postRepository, UserServiceImpl userService, LikeRepository likeRepository,
                           CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userService = userService;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
    }

    // Methods
    @Override
    @Transactional
    public Post createPost(@AuthenticationPrincipal UserDetails currentUser,
                           @Valid CreatePostRequest req) {
        User user = userService.getAuthenticatedUser(currentUser);

        Post newPost = new Post();
        newPost.setUser(user);
        newPost.setContent(req.getContent());

        return postRepository.save(newPost);
    }

    @Override
    @Transactional
    public Post updatePost(Post post) {
        return postRepository.save(post);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post with id #" + id + " not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getPostsByAuthor(Long userId) {
        return postRepository.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Post> getPostsByAuthor(Long authorId, Pageable pageable) {
        return postRepository.findByUserId(authorId, pageable);
    }

    @Override
    @Transactional
    public void deletePost(Long id) {
        Post post = getPostById(id);
        postRepository.delete(post);
    }

    @Override
    @Transactional
    public Like likePost(Long userId, Long postId) {
        User user = userService.getUserById(userId);
        Post post = getPostById(postId);
        Like like = new Like(user, post);
        return likeRepository.save(like);
    }

    @Override
    @Transactional
    public void unlikePost(Long userId, Long postId) {
        Like like = likeRepository.findById(new LikeId(userId, postId))
                .orElseThrow(() -> new ResourceNotFoundException("Like not found for post id #" + postId + " and user id #" + userId));

        likeRepository.delete(like);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Like> getPostLikes(Long postId) {
        Post post = getPostById(postId);
        return likeRepository.findByPostId(postId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Comment> getPostReplies(Long postId) {
        Post post = getPostById(postId);
        return commentRepository.findByPostId(postId);
    }

}