package com.klenarczyk.backend.dto.user;

import com.klenarczyk.backend.entity.User;

public record UserSummary(Long id, String handle, String fullName) {

    public static UserSummary fromUser(User user) {
        return new UserSummary(user.getId(), user.getHandle(), user.getFullName());
    }

}
