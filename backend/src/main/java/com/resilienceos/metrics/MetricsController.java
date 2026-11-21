package com.resilienceos.metrics;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/metrics")
@CrossOrigin(origins = "*")
public class MetricsController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getMetrics() {
        Map<String, Object> map = new HashMap<>();
        map.put("infrastructureHealthPct", 98.7);
        map.put("activeThreatsCount", 12);
        map.put("criticalDependenciesCount", 1284);
        map.put("predictedFailuresCount", 3);
        map.put("recoveryReadinessPct", 94.2);
        map.put("activeAgentsCount", 18);
        map.put("totalAgentsCount", 20);
        map.put("financialExposureTotal", 4250000.0);
        map.put("synchronizedSecondsAgo", 4);
        return ResponseEntity.ok(map);
    }
}
