package com.klenarczyk.backend.dto.user;

import com.klenarczyk.backend.entity.User;

import java.util.List;

public record UserResponse(Long id, String handle, String profileImageUrl, String fullName, String bio) {

    public static UserResponse fromUser(User user) {
        return new UserResponse(user.getId(), user.getHandle(), user.getProfileImageUrl(), user.getFullName(), user.getBio());
    }

    public static List<UserResponse> fromUsers(List<User> users) {
        return users.stream()
                .map(UserResponse::fromUser)
                .toList();
    }

}
