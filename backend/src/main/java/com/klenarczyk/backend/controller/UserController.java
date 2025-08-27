package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.dto.post.PostResponse;
import com.klenarczyk.backend.dto.user.ProfileImageResponse;
import com.klenarczyk.backend.dto.user.UpdateUserRequest;
import com.klenarczyk.backend.entity.Post;
import com.klenarczyk.backend.service.impl.PostServiceImpl;
import com.klenarczyk.backend.dto.user.UserResponse;
import com.klenarczyk.backend.entity.User;
import com.klenarczyk.backend.service.impl.StorageServiceImpl;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("${app.api.base}/users")
@Tag(name = "Users")
public class UserController {

    private final UserServiceImpl userService;
    private final PostServiceImpl postService;
    private final StorageServiceImpl storageService;

    public UserController(UserServiceImpl userService, PostServiceImpl postService, StorageServiceImpl storageService) {
        this.userService = userService;
        this.postService = postService;
        this.storageService = storageService;
    }

    // Endpoints

    @GetMapping
    @Operation(summary = "Returns a user by handle or the current authenticated user if no handle is provided")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User retrieved successfully"),
    })
    public ResponseEntity<UserResponse> getUser(@RequestParam(required = false) String handle) {
        User user = userService.getUserByHandle(handle);
        return ResponseEntity.ok(UserResponse.fromEntity(user));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Returns a user by Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User retrieved successfully"),
    })
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(UserResponse.fromEntity(user));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Update user details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
    })
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest req) {
        User updatedUser = userService.updateUser(id, req);
        return ResponseEntity.ok(UserResponse.fromEntity(updatedUser));
    }

    @PostMapping("/pfp")
    @Operation(summary = "Upload profile image")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Profile image uploaded successfully"),
    })
    public ResponseEntity<ProfileImageResponse> uploadProfileImage(@RequestParam("file") MultipartFile file,
                                                                   @AuthenticationPrincipal UserDetails currentUser) {
        Long userId = userService.getUserByEmail(currentUser.getUsername()).getId();
        String imageUrl = storageService.uploadProfileImage(file, userId);

        return ResponseEntity.ok(new ProfileImageResponse(imageUrl));
    }

    @GetMapping("/{id}/posts")
    @Operation(summary = "Get posts by a specific user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Posts retrieved successfully"),
    })
    public ResponseEntity<List<PostResponse>> getUserPosts(@PathVariable Long id) {
        List<Post> posts = postService.getPostsByAuthor(id);
        return ResponseEntity.ok(PostResponse.fromEntities(posts));
    }

}