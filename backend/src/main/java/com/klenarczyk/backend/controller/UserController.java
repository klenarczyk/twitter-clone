package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.common.exception.handler.docs.annotation.InternalServerErrorResponse;
import com.klenarczyk.backend.common.exception.handler.docs.annotation.NotFoundResponse;
import com.klenarczyk.backend.common.exception.handler.docs.annotation.UnauthorizedResponse;
import com.klenarczyk.backend.dto.post.PostResponse;
import com.klenarczyk.backend.dto.users.*;
import com.klenarczyk.backend.model.Follow;
import com.klenarczyk.backend.model.Post;
import com.klenarczyk.backend.service.impl.PostServiceImpl;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    public UserController(UserServiceImpl userService, PostServiceImpl postService) {
        this.userService = userService;
        this.postService = postService;
    }

    // Endpoints

    @GetMapping("/me")
    @Operation(summary = "Returns the currently authenticated user")
    @ApiResponse(responseCode = "200", description = "Current user fetched successfully")
    @UnauthorizedResponse
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal UserDetails currentUser) {
        User user = userService.getAuthenticatedUser(currentUser);
        return ResponseEntity.ok(user == null ? null : UserResponse.fromEntity(user));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Returns a user by id")
    @ApiResponse(responseCode = "200", description = "User retrieved successfully")
    @NotFoundResponse
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(UserResponse.fromEntity(user));
    }

    @GetMapping("/handle/{handle}")
    @Operation(summary = "Returns a user by handle")
    @ApiResponse(responseCode = "200", description = "User retrieved successfully")
    @NotFoundResponse
    public ResponseEntity<UserResponse> getUserById(@PathVariable String handle) {
        User user = userService.getUserByHandle(handle);
        return ResponseEntity.ok(UserResponse.fromEntity(user));
    }

    @GetMapping("/search")
    @Operation(summary = "Searches users by query")
    @ApiResponse(responseCode = "200", description = "Users retrieved successfully")
    public ResponseEntity<PagedUserResponse> searchUsers(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<User> users = userService.searchUsers(query, pageable);

        List<UserResponse> userResponses = UserResponse.fromEntities(users.getContent());
        boolean hasMore = users.hasNext();

        return ResponseEntity.ok(new PagedUserResponse(userResponses, hasMore));
    }

    @PatchMapping("/me")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Updates user details")
    @ApiResponse(responseCode = "200", description = "User updated successfully")
    @UnauthorizedResponse
    public ResponseEntity<UserResponse> updateUser(@AuthenticationPrincipal UserDetails currentUser, @RequestBody UpdateUserRequest req) {
        User updatedUser = userService.updateUser(currentUser, req);
        return ResponseEntity.ok(UserResponse.fromEntity(updatedUser));
    }

    @PostMapping("/me/profile-image")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Uploads a profile image")
    @ApiResponse(responseCode = "200", description = "Profile image uploaded successfully")
    @UnauthorizedResponse
    public ResponseEntity<ProfileImageResponse> uploadProfileImage(@AuthenticationPrincipal UserDetails currentUser,
                                                                   @RequestParam("file") MultipartFile file) {
        String imageUrl = userService.uploadUserImage(currentUser, file);
        return ResponseEntity.ok(new ProfileImageResponse(imageUrl));
    }

    @GetMapping("/{id}/posts")
    @Operation(summary = "Returns posts by a specific user")
    @ApiResponse(responseCode = "200", description = "Posts retrieved successfully")
    public ResponseEntity<List<PostResponse>> getUserPosts(@PathVariable Long id) {
        List<Post> posts = postService.getPostsByAuthor(id);
        return ResponseEntity.ok(PostResponse.fromEntities(posts));
    }

    @PostMapping("/follow/{userId}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Follows a user")
    @ApiResponse(responseCode = "200", description = "User followed successfully")
    @UnauthorizedResponse
    @NotFoundResponse
    public ResponseEntity<FollowResponse> followUser(@AuthenticationPrincipal UserDetails currentUser,
                                           @PathVariable Long userId) {

        Follow follow = userService.createFollow(currentUser, userId);
        return ResponseEntity.ok(FollowResponse.fromEntity(follow));
    }

    @DeleteMapping("/unfollow/{userId}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Unfollows a user")
    @ApiResponse(responseCode = "204", description = "User unfollowed successfully")
    @UnauthorizedResponse
    @NotFoundResponse
    public ResponseEntity<Void> unfollowUser(@AuthenticationPrincipal UserDetails currentUser,
                                             @PathVariable Long userId) {
        userService.deleteFollow(currentUser, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/followers")
    @Operation(summary = "Returns followers of a specific user")
    @ApiResponse(responseCode = "200", description = "Followers retrieved successfully")
    public ResponseEntity<List<UserResponse>> getUserFollowers(@PathVariable Long id) {
        List<User> followers = userService.getFollowers(id);
        return ResponseEntity.ok(UserResponse.fromEntities(followers));
    }

    @GetMapping("/{id}/following")
    @Operation(summary = "Returns users followed by a specific user")
    @ApiResponse(responseCode = "200", description = "Following users retrieved successfully")
    public ResponseEntity<List<UserResponse>> getUserFollowing(@PathVariable Long id) {
        List<User> following = userService.getFollowing(id);
        return ResponseEntity.ok(UserResponse.fromEntities(following));
    }

}