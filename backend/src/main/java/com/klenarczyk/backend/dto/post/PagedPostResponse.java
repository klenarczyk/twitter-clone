package com.klenarczyk.backend.dto.post;

import java.util.List;

public record PagedPostResponse(List<PostResponse> items, boolean hasMore) {
}
