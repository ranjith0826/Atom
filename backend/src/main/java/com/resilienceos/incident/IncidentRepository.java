package com.resilienceos.incident;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, String> {
    Optional<Incident> findByIncidentNumber(String incidentNumber);
    List<Incident> findBySeverity(SeverityLevel severity);
    List<Incident> findByStatus(String status);
}
