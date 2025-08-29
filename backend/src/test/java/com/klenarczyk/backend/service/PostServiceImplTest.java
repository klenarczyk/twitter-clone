package com.klenarczyk.backend.service;

import com.klenarczyk.backend.dto.post.CreatePostRequest;
import com.klenarczyk.backend.model.Post;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.common.exception.ResourceNotFoundException;
import com.klenarczyk.backend.repository.PostRepository;
import com.klenarczyk.backend.service.impl.PostServiceImpl;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PostServiceImplTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserServiceImpl userService;

    @InjectMocks
    private PostServiceImpl postService;

    // Common test data
    private Post post;
    private User user;

    @BeforeEach
    void setup() {
        user = new User();
        post = new Post();
        post.setUser(user);
        post.setContent("This is a test post content.");
    }

    @Test
    void createPost_throwsWhenUserNotFound() {
        CreatePostRequest req = new CreatePostRequest();
        req.setUserId(999L);
        req.setContent("Hello world");

        when(userService.getUserById(req.getUserId()))
                .thenThrow(new ResourceNotFoundException("User not found"));

        assertThrows(ResourceNotFoundException.class, () -> postService.createPost(req));

        verify(userService).getUserById(req.getUserId());
        verify(postRepository, never()).save(any(Post.class));
    }

}
