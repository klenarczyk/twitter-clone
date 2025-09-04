package com.klenarczyk.backend.service.impl;

import com.klenarczyk.backend.model.User;
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

    public StorageServiceImpl() {}

    @Override
    @Transactional
    public String uploadProfileImage(MultipartFile file, User user) {
        String fileName = UUID.randomUUID() + ".jpg";
        Path path = Paths.get(uploadDir, "pfp/", fileName);
        String pathString = "uploads/pfp/" + fileName;

        try {
            Files.createDirectories(path.getParent());
            file.transferTo(path);

            String existingImageUrl = user.getImageUrl();
            if (existingImageUrl != null && !existingImageUrl.isEmpty()) {
                Path existingImagePath = Paths.get(existingImageUrl);
                Files.deleteIfExists(existingImagePath);
            }

            return pathString;

        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }

    @Override
    @Transactional
    public String uploadPostImage(MultipartFile file, Long postId) {
        return "post-image-url"; // Placeholder return value
    }

}
