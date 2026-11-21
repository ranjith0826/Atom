package com.resilienceos.recovery;

import com.resilienceos.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/recovery-plans")
@CrossOrigin(origins = "*")
public class RecoveryController {

    private final RecoveryService recoveryService;

    public RecoveryController(RecoveryService recoveryService) {
        this.recoveryService = recoveryService;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllPlans() {
        return ResponseEntity.ok(recoveryService.getAllPlans());
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<Map<String, Object>>> approvePlan(
            @PathVariable String id,
            @RequestBody(required = false) Map<String, String> body) {
        String approver = body != null ? body.getOrDefault("approver", "Commander B. Vance") : "Commander B. Vance";
        return recoveryService.approvePlan(id, approver)
                .map(p -> ResponseEntity.ok(ApiResponse.ok("Recovery plan approved", p)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/execute")
    public ResponseEntity<ApiResponse<Map<String, Object>>> executePlan(@PathVariable String id) {
        return recoveryService.executePlan(id)
                .map(p -> ResponseEntity.ok(ApiResponse.ok("Recovery plan execution sequence dispatched", p)))
                .orElse(ResponseEntity.notFound().build());
    }
}
