package com.resilienceos.agent;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class AgentOrchestrationService {

    private final AgentRepository agentRepository;

    public AgentOrchestrationService(AgentRepository agentRepository) {
        this.agentRepository = agentRepository;
    }

    public List<Map<String, Object>> getAllAgents() {
        return agentRepository.findAll().stream().map(this::mapAgent).toList();
    }

    public Optional<Map<String, Object>> getAgentById(String id) {
        return agentRepository.findById(id).map(this::mapAgent);
    }

    @Transactional
    public Optional<Map<String, Object>> assignTask(String id, String task) {
        return agentRepository.findById(id).map(ag -> {
            ag.setCurrentTask(task);
            ag.setStatus("ACTIVE");
            agentRepository.save(ag);
            return mapAgent(ag);
        });
    }

    private Map<String, Object> mapAgent(AIAgent ag) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", ag.getId());
        map.put("code", ag.getCode());
        map.put("name", ag.getName());
        map.put("role", ag.getRole());
        map.put("status", ag.getStatus());
        map.put("confidenceScore", ag.getConfidenceScore());
        map.put("currentTask", ag.getCurrentTask());
        map.put("lastAction", ag.getLastAction());
        map.put("requiresHumanApproval", ag.isRequiresHumanApproval());
        map.put("lastActiveTime", "Just now");
        map.put("connectedSources", List.of("Telemetry SCADA Poller", "Kubernetes Mesh API", "Live Satellite Feed"));

        List<Map<String, String>> actionLog = List.of(
                Map.of("timestamp", "11:52:10", "action", "Stream validated", "status", "SUCCESS", "details", "Synchronized global endpoints"),
                Map.of("timestamp", "11:48:33", "action", "Threshold trigger", "status", "WARNING", "details", "Thermal load spike identified")
        );
        map.put("actionLog", actionLog);
        return map;
    }
}
