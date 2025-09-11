package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.common.exception.handler.docs.annotation.NotFoundResponse;
import com.klenarczyk.backend.common.exception.handler.docs.annotation.UnauthorizedResponse;
import com.klenarczyk.backend.dto.post.*;
import com.klenarczyk.backend.model.Post;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.service.UserService;
import com.klenarczyk.backend.service.impl.LikeServiceImpl;
import com.klenarczyk.backend.service.impl.PostServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("${app.api.base}/posts")
@Tag(name = "Posts")
public class PostController {

    private final PostServiceImpl postService;
    private final LikeServiceImpl likeService;
    private final UserService userService;

    public PostController(PostServiceImpl postService, LikeServiceImpl likeService, UserService userService) {
        this.postService = postService;
        this.likeService = likeService;
        this.userService = userService;
    }

    // Endpoints
    @GetMapping
    @Operation(summary = "Returns a paginated list of posts")
    @ApiResponse(responseCode = "200", description = "Posts retrieved successfully")
    public ResponseEntity<PagedPostResponse> getPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) Long parentId,
            @RequestParam(required = false) Long authorId,
            @RequestParam(required = false) Boolean followed,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Pageable pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        Page<Post> postPage;

        if (parentId != null) {
            postPage = postService.getReplies(parentId, pageable);
        } else if (authorId != null) {
            postPage = postService.getPostsByAuthor(authorId, pageable);
        } else if (followed != null && followed && userDetails != null) {
            User user = userService.getAuthenticatedUser(userDetails);
            postPage = postService.getPostsByFollowedUsers(user.getId(), pageable);
        } else {
            postPage = postService.getTopLevelPosts(pageable);
        }

        List<PostResponse> postResponses;

        if (userDetails != null) {
            User user = userService.getAuthenticatedUser(userDetails);
            List<Long> postIds = postPage.getContent().stream().map(Post::getId).toList();
            Set<Long> likedPostIds = likeService.getLikedPostIdsByUserId(user.getId(), postIds);
            postResponses = PostResponse.fromEntities(postPage.getContent(), likedPostIds);
        } else {
            postResponses = PostResponse.fromEntities(postPage.getContent());
        }

        boolean hasMore = postPage.hasNext();

        return ResponseEntity.ok(new PagedPostResponse(postResponses, hasMore));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Returns a post by id")
    @ApiResponse(responseCode = "200", description = "Post retrieved successfully")
    @NotFoundResponse
    public ResponseEntity<PostResponse> getPost(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Post post = postService.getPostById(id);
        boolean isLiked = false;

        if (userDetails != null) {
            User user = userService.getAuthenticatedUser(userDetails);
            isLiked = likeService.isPostLikedByUser(user.getId(), id);
        }

        return ResponseEntity.ok(PostResponse.fromEntity(post, isLiked));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Creates a new post")
    @ApiResponse(responseCode = "201", description = "Post created successfully")
    @UnauthorizedResponse
    public ResponseEntity<PostResponse> createPost(@AuthenticationPrincipal UserDetails currentUser,
                                                   @Valid @RequestBody CreatePostRequest req) {
        Post post = postService.createPost(currentUser, req);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(post.getId())
                .toUri();

        return ResponseEntity.created(location).body(PostResponse.fromEntity(post));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletes a post by id")
    @ApiResponse(responseCode = "204", description = "Post deleted successfully")
    @NotFoundResponse
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{postId}/like")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Likes a post")
    @ApiResponse(responseCode = "200", description = "Post liked successfully")
    @UnauthorizedResponse
    @NotFoundResponse
    public ResponseEntity<Void> likePost(@AuthenticationPrincipal UserDetails currentUser,
                                         @PathVariable Long postId) {
        likeService.likePost(currentUser, postId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}/like")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Unlikes a post")
    @ApiResponse(responseCode = "204", description = "Post unliked successfully")
    @UnauthorizedResponse
    @NotFoundResponse
    public ResponseEntity<Void> unlikePost(@AuthenticationPrincipal UserDetails currentUser,
                                           @PathVariable Long postId) {
        likeService.unlikePost(currentUser, postId);
        return ResponseEntity.noContent().build();
    }

}