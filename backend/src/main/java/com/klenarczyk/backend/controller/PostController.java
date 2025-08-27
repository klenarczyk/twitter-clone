package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.dto.post.*;
import com.klenarczyk.backend.entity.Comment;
import com.klenarczyk.backend.entity.Like;
import com.klenarczyk.backend.entity.Post;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import com.klenarczyk.backend.util.Constants;
import com.klenarczyk.backend.service.impl.PostServiceImpl;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${app.api.base}/posts")
public class PostController {

    private final PostServiceImpl postService;
    private final UserServiceImpl userService;

    public PostController(PostServiceImpl postService, UserServiceImpl userService) {
        this.postService = postService;
        this.userService = userService;
    }

    // Request mapping methods will go here
    @GetMapping
    public ResponseEntity<PagedPostResponse> getPosts(
            @RequestParam(required = false) Long authorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        Pageable pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        Page<Post> postPage;

        if (authorId != null) {
            postPage = postService.getPostsByAuthor(authorId, pageable);
        } else {
            postPage = postService.getAllPosts(pageable);
        }

        List<PostResponse> postResponses = PostResponse.fromEntities(postPage.getContent());
        boolean hasMore = postPage.hasNext();

        return ResponseEntity.ok(new PagedPostResponse(postResponses, hasMore));
    }

    @PostMapping
    public ResponseEntity<PostResponse> createPost(@Valid @RequestBody CreatePostRequest req,
                                                   @AuthenticationPrincipal UserDetails currentUser) {
        Post newPost = postService.createPost(req, currentUser);
        return ResponseEntity.ok(PostResponse.fromEntity(newPost));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(PostResponse.fromEntity(post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<LikeResponse> likePost(@PathVariable Long postId,
                                                 @AuthenticationPrincipal UserDetails currentUser) {
        Long currentUserId = userService.getUserByEmail(currentUser.getUsername()).getId();
        Like like = postService.likePost(currentUserId, postId);
        return ResponseEntity.ok(LikeResponse.fromEntity(like));
    }

    @DeleteMapping("/{postId}/unlike")
    public ResponseEntity<Void> unlikePost(@PathVariable Long postId,
                                           @AuthenticationPrincipal UserDetails currentUser) {
        Long currentUserId = userService.getUserByEmail(currentUser.getUsername()).getId();
        postService.unlikePost(currentUserId, postId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{postId}/likes")
    public ResponseEntity<List<LikeResponse>> getPostLikes(@PathVariable Long postId) {
        List<Like> likes = postService.getPostLikes(postId);
        return ResponseEntity.ok(LikeResponse.fromEntities(likes));
    }

    @GetMapping("/{postId}/replies")
    public ResponseEntity<List<CommentResponse>> getPostReplies(@PathVariable Long postId) {
        List<Comment> replies = postService.getPostReplies(postId);
        return ResponseEntity.ok(CommentResponse.fromEntities(replies));
    }

}