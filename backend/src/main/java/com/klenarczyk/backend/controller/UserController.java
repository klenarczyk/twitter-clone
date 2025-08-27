package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.dto.post.PostResponse;
import com.klenarczyk.backend.dto.user.FollowResponse;
import com.klenarczyk.backend.dto.user.UpdateUserRequest;
import com.klenarczyk.backend.entity.Follow;
import com.klenarczyk.backend.entity.Post;
import com.klenarczyk.backend.service.impl.PostServiceImpl;
import com.klenarczyk.backend.dto.user.UserResponse;
import com.klenarczyk.backend.entity.User;
import com.klenarczyk.backend.service.impl.StorageServiceImpl;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("${app.api.base}/users")
public class UserController {

    private final UserServiceImpl userService;
    private final PostServiceImpl postService;
    private final StorageServiceImpl storageService;

    public UserController(UserServiceImpl userService, PostServiceImpl postService, StorageServiceImpl storageService) {
        this.userService = userService;
        this.postService = postService;
        this.storageService = storageService;
    }

    // Request mapping methods will go here
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(UserResponse.fromEntity(user));
    }

    @GetMapping
    public ResponseEntity<UserResponse> getUser(@RequestParam(required = false) String handle) {
        User user = userService.getUserByHandle(handle);
        return ResponseEntity.ok(UserResponse.fromEntity(user));
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long userId, @RequestBody UpdateUserRequest req) {
        User updatedUser = userService.updateUser(userId, req);
        return ResponseEntity.ok(UserResponse.fromEntity(updatedUser));
    }

    @PostMapping("/pfp")
    public ResponseEntity<?> uploadProfileImage(@RequestParam("file") MultipartFile file,
                                                     @AuthenticationPrincipal UserDetails currentUser) {
        Long userId = userService.getUserByEmail(currentUser.getUsername()).getId();
        String imageUrl = storageService.uploadProfileImage(file, userId);
        return ResponseEntity.ok(imageUrl);
    }

    @GetMapping("/{authorId}/posts")
    public ResponseEntity<List<PostResponse>> getUserPosts(@PathVariable Long authorId) {
        List<Post> posts = postService.getPostsByAuthor(authorId);
        return ResponseEntity.ok(PostResponse.fromEntities(posts));
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<UserResponse>> getUserFollowers(@PathVariable Long userId) {
        List<User> followers = userService.getFollowers(userId);
        return ResponseEntity.ok(UserResponse.fromEntities(followers));
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<UserResponse>> getUserFollowing(@PathVariable Long userId) {
        List<User> following = userService.getFollowing(userId);
        return ResponseEntity.ok(UserResponse.fromEntities(following));
    }

    @PostMapping("/{userId}/follow")
    public ResponseEntity<FollowResponse> followUser(@PathVariable Long userId,
                                                     @AuthenticationPrincipal UserDetails currentUser) {
        Long currentUserId = userService.getUserByEmail(currentUser.getUsername()).getId();
        Follow follow = userService.createFollow(userId, currentUserId);
        return ResponseEntity.ok(FollowResponse.fromFollow(follow));
    }

    @DeleteMapping("/{id}/unfollow")
    public ResponseEntity<Void> unfollowUser(@PathVariable Long id,
                                             @AuthenticationPrincipal UserDetails currentUser) {
        Long currentUserId = userService.getUserByEmail(currentUser.getUsername()).getId();
        userService.deleteFollow(id, currentUserId);
        return ResponseEntity.noContent().build();
    }

}