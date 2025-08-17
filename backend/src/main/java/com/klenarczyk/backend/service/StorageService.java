package com.klenarczyk.backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    String uploadProfileImage(MultipartFile file, Long userId);

    String uploadPostImage(MultipartFile file, Long postId);

}
