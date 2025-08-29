package com.klenarczyk.backend.dto.users;

import com.klenarczyk.backend.model.User;

import java.util.List;

public record UserResponse(Long id, String handle, String imageUrl, String fullName, String bio) {

    public static UserResponse fromEntity(User user) {
        return new UserResponse(user.getId(), user.getHandle(), user.getImageUrl(), user.getFullName(), user.getBio());
    }

    public static List<UserResponse> fromEntities(List<User> users) {
        return users.stream()
                .map(UserResponse::fromEntity)
                .toList();
    }

}
