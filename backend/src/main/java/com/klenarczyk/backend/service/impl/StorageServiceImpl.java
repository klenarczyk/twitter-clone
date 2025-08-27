package com.klenarczyk.backend.service.impl;

import com.klenarczyk.backend.entity.User;
import com.klenarczyk.backend.repository.UserRepository;
import com.klenarczyk.backend.service.StorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class StorageServiceImpl implements StorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    private final UserServiceImpl userService;
    private final UserRepository userRepository;

    public StorageServiceImpl(UserServiceImpl userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public String uploadProfileImage(MultipartFile file, Long userId) {
        String fileName = UUID.randomUUID() + ".jpg";
        Path path = Paths.get(uploadDir, "pfp/", fileName);
        String pathString = "uploads/pfp/" + fileName;

        try {
            Files.createDirectories(path.getParent());
            file.transferTo(path);

            User user = userService.getUserById(userId);

            String existingImageUrl = user.getImageUrl();
            if (existingImageUrl != null && !existingImageUrl.isEmpty()) {
                Path existingImagePath = Paths.get(existingImageUrl);
                Files.deleteIfExists(existingImagePath);
            }

            user.setImageUrl(pathString);
            userRepository.save(user);

            return user.getImageUrl();

        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }

    @Override
    @Transactional
    public String uploadPostImage(MultipartFile file, Long postId) {
        // Implementation for uploading post image
        return "post-image-url"; // Placeholder return value
    }

}
