package com.klenarczyk.backend.dto.user;

import com.klenarczyk.backend.entity.User;

public record UserSummary(Long id, String handle, String imageUrl, String fullName) {

    public static UserSummary fromEntity(User user) {
        return new UserSummary(user.getId(), user.getHandle(), user.getImageUrl(), user.getFullName());
    }

}
