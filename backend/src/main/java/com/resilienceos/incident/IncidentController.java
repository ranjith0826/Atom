package com.resilienceos.incident;

import com.resilienceos.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/incidents")
@CrossOrigin(origins = "*")
public class IncidentController {

    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getIncidents() {
        return ResponseEntity.ok(incidentService.getAllIncidents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getIncidentById(@PathVariable String id) {
        return incidentService.getIncidentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<Incident>> approveRecovery(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String approver = body.getOrDefault("approver", "Commander B. Vance");
        return incidentService.approveIncidentRecovery(id, approver)
                .map(inc -> ResponseEntity.ok(ApiResponse.ok("Incident recovery authorized", inc)))
                .orElse(ResponseEntity.notFound().build());
    }
}
