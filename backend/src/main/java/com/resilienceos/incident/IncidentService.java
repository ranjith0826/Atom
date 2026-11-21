package com.resilienceos.incident;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public List<Map<String, Object>> getAllIncidents() {
        return incidentRepository.findAll().stream().map(this::mapIncident).toList();
    }

    public Optional<Map<String, Object>> getIncidentById(String id) {
        return incidentRepository.findById(id).map(this::mapIncident);
    }

    @Transactional
    public Incident createIncident(Incident incident) {
        return incidentRepository.save(incident);
    }

    @Transactional
    public Optional<Incident> approveIncidentRecovery(String id, String approver) {
        return incidentRepository.findById(id).map(inc -> {
            inc.setRecoveryApprovalStatus("APPROVED");
            inc.setApprovedBy(approver);
            inc.setStatus("RESTORED");
            return incidentRepository.save(inc);
        });
    }

    private Map<String, Object> mapIncident(Incident inc) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", inc.getId());
        map.put("incidentNumber", inc.getIncidentNumber());
        map.put("title", inc.getTitle());
        map.put("severity", inc.getSeverity().name());
        map.put("status", inc.getStatus());
        map.put("rootCause", inc.getRootCause());
        map.put("financialExposurePerHour", inc.getFinancialExposurePerHour());
        map.put("aiSuggestedMitigation", inc.getAiSuggestedMitigation());
        map.put("assignedTeam", inc.getAssignedTeam());
        map.put("recoveryApprovalStatus", inc.getRecoveryApprovalStatus());
        map.put("approvedBy", inc.getApprovedBy());
        map.put("detectedAt", inc.getDetectedAt().toString());
        map.put("affectedAssetIds", List.of("asset-pwr-01", "asset-fra-01"));
        map.put("affectedAssetNames", List.of("Rhine-Main 380kV Substation Hub", "Frankfurt Hyperscale Campus Alpha"));

        List<Map<String, String>> timeline = List.of(
                Map.of("time", "11:32:10", "title", "Thermal Spike Detected", "description", "Agent INFRA-MONITOR detected 14°C surge over baseline", "actor", "AI Agent"),
                Map.of("time", "11:34:00", "title", "Risk Propagation Forecasted", "description", "Calculated 89% probability of cascading DC shutdown", "actor", "AI Agent"),
                Map.of("time", "11:36:20", "title", "Playbook Formulated", "description", "Playbook #REC-FRA-04 dispatched for approval", "actor", "AI Agent")
        );
        map.put("timeline", timeline);
        return map;
    }
}
