package com.klenarczyk.backend.dto.users;

import java.util.List;

public record PagedUserResponse(List<UserResponse> items, boolean hasMore) {
}
