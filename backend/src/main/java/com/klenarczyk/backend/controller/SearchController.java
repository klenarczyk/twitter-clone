package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.service.impl.PostServiceImpl;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import com.klenarczyk.backend.util.Constants;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constants.BASE_API + "/search")
public class SearchController {

    private final UserServiceImpl userService;
    private final PostServiceImpl postService;

    public SearchController(UserServiceImpl userService, PostServiceImpl postService) {
        this.userService = userService;
        this.postService = postService;
    }

}
