package com.klenarczyk.backend.repository;

import com.klenarczyk.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}