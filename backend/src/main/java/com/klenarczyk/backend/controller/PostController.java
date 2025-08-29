package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.dto.post.*;
import com.klenarczyk.backend.model.Post;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("${app.api.base}/posts")
@Tag(name = "Posts")
public class PostController {

    private final PostServiceImpl postService;

    public PostController(PostServiceImpl postService) {
        this.postService = postService;
    }

    // Endpoints

    @GetMapping
    @Operation(summary = "Get paginated list of posts, optionally filtered by authorId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Posts retrieved successfully"),
    })
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
    @Operation(summary = "Create a new post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Post created successfully"),
    })
    public ResponseEntity<PostResponse> createPost(@Valid @RequestBody CreatePostRequest req,
                                                   @AuthenticationPrincipal UserDetails currentUser) {
        Post post = postService.createPost(req, currentUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(post.getId())
                .toUri();

        return ResponseEntity.created(location).body(PostResponse.fromEntity(post));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Returns a post by Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post retrieved successfully"),
    })
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(PostResponse.fromEntity(post));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a post by Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Post deleted successfully"),
    })
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

}