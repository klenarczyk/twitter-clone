package com.klenarczyk.backend.dto.users;

import com.klenarczyk.backend.model.User;

public record UserSummary(Long id, String handle, String imageUrl, String fullName) {

    public static UserSummary fromEntity(User user) {
        return new UserSummary(user.getId(), user.getHandle(), user.getImageUrl(), user.getFullName());
    }

}
