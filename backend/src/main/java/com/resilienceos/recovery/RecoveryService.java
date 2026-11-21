package com.resilienceos.recovery;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class RecoveryService {

    private final RecoveryPlanRepository repository;

    public RecoveryService(RecoveryPlanRepository repository) {
        this.repository = repository;
    }

    public List<Map<String, Object>> getAllPlans() {
        return repository.findAll().stream().map(this::mapPlan).toList();
    }

    @Transactional
    public Optional<Map<String, Object>> approvePlan(String id, String approver) {
        return repository.findById(id).map(p -> {
            p.setStatus("APPROVED");
            p.setApprovedBy(approver);
            return mapPlan(repository.save(p));
        });
    }

    @Transactional
    public Optional<Map<String, Object>> executePlan(String id) {
        return repository.findById(id).map(p -> {
            p.setStatus("EXECUTING");
            return mapPlan(repository.save(p));
        });
    }

    private Map<String, Object> mapPlan(RecoveryPlan p) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", p.getId());
        map.put("incidentId", p.getIncidentId());
        map.put("title", p.getTitle());
        map.put("targetRtoHours", p.getTargetRtoHours());
        map.put("targetRpoMinutes", p.getTargetRpoMinutes());
        map.put("estimatedRestorationHours", p.getEstimatedRestorationHours());
        map.put("backupReadinessPct", p.getBackupReadinessPct());
        map.put("status", p.getStatus());
        map.put("approvedBy", p.getApprovedBy());

        List<Map<String, Object>> steps = List.of(
                Map.of("id", "s-1", "sequenceOrder", 1, "title", "Verify flywheel energy frequency stabilization", "responsibleTeam", "Facility Engineering", "status", "COMPLETED", "verified", true),
                Map.of("id", "s-2", "sequenceOrder", 2, "title", "Authorize DNS Anycast load migration to Paris", "responsibleTeam", "Network Core", "status", p.getStatus().equals("EXECUTING") ? "IN_PROGRESS" : "PENDING", "verified", false)
        );
        map.put("steps", steps);
        return map;
    }
}
