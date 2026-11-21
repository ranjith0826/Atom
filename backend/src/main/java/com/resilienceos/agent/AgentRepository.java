package com.resilienceos.agent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AgentRepository extends JpaRepository<AIAgent, String> {
    Optional<AIAgent> findByCode(String code);
}
