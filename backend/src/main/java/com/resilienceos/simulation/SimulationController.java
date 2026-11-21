package com.resilienceos.simulation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/simulations")
@CrossOrigin(origins = "*")
public class SimulationController {

    private final SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> runSimulation(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(simulationService.executeSimulation(request));
    }
}
