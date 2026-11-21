package com.resilienceos.risk;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/risks")
@CrossOrigin(origins = "*")
public class RiskController {

    private final RiskEngineService riskService;

    public RiskController(RiskEngineService riskService) {
        this.riskService = riskService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getGlobalRisk() {
        return ResponseEntity.ok(riskService.calculateGlobalRisk());
    }

    @GetMapping("/predictions")
    public ResponseEntity<List<Map<String, Object>>> getPredictions() {
        return ResponseEntity.ok(riskService.getFailurePredictions());
    }

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeRisk(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(riskService.calculateGlobalRisk());
    }
}
