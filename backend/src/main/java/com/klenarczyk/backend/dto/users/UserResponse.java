package com.klenarczyk.backend.dto.users;

import com.klenarczyk.backend.model.User;

import java.util.List;
import java.util.Set;

public record UserResponse(Long id, String handle, String imageUrl, String fullName, Long followerCount,
                           Long followingCount, Long postCount, boolean isFollowed, String bio) {

    public static UserResponse fromEntity(User user) {
        return new UserResponse(user.getId(), user.getHandle(), user.getImageUrl(), user.getFullName(),
                user.getFollowerCount(), user.getFollowingCount(), user.getPostCount(), false, user.getBio());
    }

    public static UserResponse fromEntity(User user, boolean isFollowed) {
        return new UserResponse(user.getId(), user.getHandle(), user.getImageUrl(), user.getFullName(),
                user.getFollowerCount(), user.getFollowingCount(), user.getPostCount(), isFollowed, user.getBio());
    }

    public static List<UserResponse> fromEntities(List<User> users) {
        return users.stream()
                .map(UserResponse::fromEntity)
                .toList();
    }

    public static List<UserResponse> fromEntities(List<User> users, Set<Long> followedIds) {
        return users.stream()
                .map(user -> fromEntity(user, followedIds.contains(user.getId())))
                .toList();
    }

}
