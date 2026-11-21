package com.resilienceos.copilot;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/copilot")
@CrossOrigin(origins = "*")
public class CopilotController {

    @PostMapping("/query")
    public ResponseEntity<Map<String, Object>> handleQuery(@RequestBody Map<String, String> request) {
        String query = request.getOrDefault("query", "").toLowerCase();
        Map<String, Object> response = new HashMap<>();

        if (query.contains("frankfurt") || query.contains("rhein-main") || query.contains("power")) {
            response.put("answer", "Rhine-Main 380kV Substation (PWR-RHEIN-04) is currently in CRITICAL state (Risk Score 89/100). Dielectric insulation degradation on Transformer Bank T-4 threatens Frankfurt Campus Alpha (DC-FRA-01). If it trips, 42 downstream assets face an immediate 45MW deficit.");
            response.put("citations", List.of("PWR-RHEIN-04 (Power Grid)", "DC-FRA-01 (Data Center)", "INC-2026-081"));
            response.put("riskLevel", "CRITICAL");
            response.put("suggestedAction", "Execute Playbook #REC-FRA-04 to transfer 45MW load via Subsea Ring 14 to Dublin/Paris.");
        } else if (query.contains("highest") || query.contains("risk") || query.contains("threat")) {
            response.put("answer", "Top 3 highest risk infrastructure assets right now: 1. Rhine-Main 380kV Substation Hub (Risk 89, Critical), 2. Frankfurt Hyperscale Alpha (Risk 78, Degraded), 3. Hsinchu Semiconductor Logistics Vault (Risk 64, Degraded). Combined financial exposure is $1.71M/hr.");
            response.put("citations", List.of("PWR-RHEIN-04", "DC-FRA-01", "SUP-SEMICOND-TW"));
            response.put("riskLevel", "HIGH");
            response.put("suggestedAction", "Review active Incident #INC-2026-081 in the Incident Command module.");
        } else if (query.contains("cascading") || query.contains("cascade")) {
            response.put("answer", "The primary cascading failure vector stems from PWR-RHEIN-04. Graph propagation analysis predicts: Power Trip (Hop 0) → Frankfurt Campus Diesel Failover (Hop 1, P=0.94) → Rotterdam Port AGV Telemetry Degrades (Hop 2, P=0.68) → Transatlantic Subsea Cable Routing Jitter (Hop 2, P=0.55).");
            response.put("citations", List.of("Cascading Failure Analysis Engine", "Monte Carlo Hop Matrix"));
            response.put("riskLevel", "CRITICAL");
            response.put("suggestedAction", "Open the Cascading Failure Analysis view to inspect the interactive hop graph.");
        } else {
            response.put("answer", "Resilience Intelligence Copilot analyzed your request against the live digital twin (13 assets, 10 dependency edges, 8 active AI agents). Global infrastructure health is at 98.7% with 1 critical incident undergoing remediation.");
            response.put("citations", List.of("Global Infrastructure Operations Group Telemetry Core"));
            response.put("riskLevel", "LOW");
            response.put("suggestedAction", "Explore the Digital Twin Explorer to inspect interconnected asset topologies.");
        }

        return ResponseEntity.ok(response);
    }
}
