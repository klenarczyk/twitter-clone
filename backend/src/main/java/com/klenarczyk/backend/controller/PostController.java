package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.config.ApiPaths;
import com.klenarczyk.backend.service.CommentService;
import com.klenarczyk.backend.service.LikeService;
import com.klenarczyk.backend.service.PostService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.BASE_API + "/posts")
public class PostController {

    private final PostService postService;
    private final LikeService likeService;
    private final CommentService commentService;

    public PostController(PostService postService, LikeService likeService, CommentService commentService) {
        this.postService = postService;
        this.likeService = likeService;
        this.commentService = commentService;
    }

    // Request mapping methods will go here

}