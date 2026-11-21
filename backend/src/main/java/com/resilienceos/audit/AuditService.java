package com.resilienceos.audit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class AuditService {

    private final AuditRepository auditRepository;

    public AuditService(AuditRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    public List<Map<String, Object>> getAllEvents() {
        return auditRepository.findAll().stream().map(this::mapEvent).toList();
    }

    @Transactional
    public AuditEvent logEvent(String actor, String actorType, String category, String description, String resource, String risk) {
        AuditEvent event = new AuditEvent(
                "aud-" + UUID.randomUUID().toString().substring(0, 8),
                actor, actorType, category, description, resource, risk
        );
        return auditRepository.save(event);
    }

    private Map<String, Object> mapEvent(AuditEvent e) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", e.getId());
        map.put("actor", e.getActor());
        map.put("actorType", e.getActorType());
        map.put("category", e.getCategory());
        map.put("description", e.getDescription());
        map.put("targetResource", e.getTargetResource());
        map.put("riskLevel", e.getRiskLevel());
        map.put("timestamp", e.getTimestamp().toString());
        return map;
    }
}
