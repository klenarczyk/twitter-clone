package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.dto.auth.RegisterRequest;
import com.klenarczyk.backend.util.ApiPaths;
import com.klenarczyk.backend.dto.user.UserResponse;
import com.klenarczyk.backend.entity.User;
import com.klenarczyk.backend.service.FollowService;
import com.klenarczyk.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPaths.BASE_API + "/users")
public class UserController {

    private final UserService userService;
    private final FollowService followService;

    public UserController(UserService userService, FollowService followService) {
        this.userService = userService;
        this.followService = followService;
    }

    // Request mapping methods will go here
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody RegisterRequest req) {
        User created = userService.createUser(req);
        UserResponse res = new UserResponse();
        res.setId(created.getId());
        res.setHandle(created.getHandle());
        res.setFullName(created.getFullName());
        res.setBio(created.getBio());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setHandle(user.getHandle());
        res.setFullName(user.getFullName());
        res.setBio(user.getBio());
        return ResponseEntity.ok(res);
    }

}