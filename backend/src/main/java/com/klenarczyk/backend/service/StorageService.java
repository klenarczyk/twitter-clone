package com.klenarczyk.backend.service;

import com.klenarczyk.backend.model.User;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    String uploadProfileImage(MultipartFile file, User user);

    String uploadPostImage(MultipartFile file, Long postId);

}
