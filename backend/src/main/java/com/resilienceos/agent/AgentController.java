package com.resilienceos.agent;

import com.resilienceos.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/agents")
@CrossOrigin(origins = "*")
public class AgentController {

    private final AgentOrchestrationService agentService;

    public AgentController(AgentOrchestrationService agentService) {
        this.agentService = agentService;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllAgents() {
        return ResponseEntity.ok(agentService.getAllAgents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getAgentById(@PathVariable String id) {
        return agentService.getAgentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/tasks")
    public ResponseEntity<ApiResponse<Map<String, Object>>> assignTask(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String task = body.getOrDefault("task", "Analyze telemetry anomalies");
        return agentService.assignTask(id, task)
                .map(ag -> ResponseEntity.ok(ApiResponse.ok("Task dispatched to agent", ag)))
                .orElse(ResponseEntity.notFound().build());
    }
}
