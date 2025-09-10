package com.klenarczyk.backend.service.impl;

import com.klenarczyk.backend.common.exception.ResourceNotFoundException;
import com.klenarczyk.backend.model.Like;
import com.klenarczyk.backend.model.LikeId;
import com.klenarczyk.backend.model.Post;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.repository.LikeRepository;
import com.klenarczyk.backend.service.LikeService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;
    private final UserServiceImpl userService;
    private final PostServiceImpl postService;

    public LikeServiceImpl(LikeRepository likeRepository, UserServiceImpl userService, PostServiceImpl postService) {
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.postService = postService;
    }

    // Methods
    @Override
    @Transactional(readOnly = true)
    public Like getLikeByUserAndPost(Long userId, Long postId) {
        return likeRepository.findById(new LikeId(userId, postId))
                .orElseThrow(() -> new ResourceNotFoundException("Like not found"));
    }

    @Override
    @Transactional
    public void likePost(@AuthenticationPrincipal UserDetails currentUser,
                         Long postId) {
        User user = userService.getUserByEmail(currentUser.getUsername());
        Post post = postService.getPostById(postId);

        if(!isPostLikedByUser(user.getId(), postId)) {
            Like like = new Like(user, post);
            likeRepository.save(like);

            post.setLikeCount(post.getLikeCount() + 1);
            postService.updatePost(post);
        }
    }

    @Override
    @Transactional
    public void unlikePost(@AuthenticationPrincipal UserDetails currentUser,
                           Long postId) {
        User user = userService.getUserByEmail(currentUser.getUsername());
        Post post = postService.getPostById(postId);

        if(isPostLikedByUser(user.getId(), postId)) {
            Like like = getLikeByUserAndPost(user.getId(), postId);
            likeRepository.delete(like);

            post.setLikeCount(post.getLikeCount() - 1);
            postService.updatePost(post);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Long> getLikedPostIdsByUserId(Long userId, List<Long> postIds) {
        List<Long> likedPostIds = likeRepository.findLikedPostIdsByUserIdAndPostIds(userId, postIds);
        return Set.copyOf(likedPostIds);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isPostLikedByUser(Long userId, Long postId) {
        return likeRepository.existsByUserIdAndPostId(userId, postId);
    }

}
