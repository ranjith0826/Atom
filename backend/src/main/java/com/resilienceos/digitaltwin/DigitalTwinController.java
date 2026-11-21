package com.resilienceos.digitaltwin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/digital-twin")
@CrossOrigin(origins = "*")
public class DigitalTwinController {

    private final DigitalTwinService digitalTwinService;

    public DigitalTwinController(DigitalTwinService digitalTwinService) {
        this.digitalTwinService = digitalTwinService;
    }

    @GetMapping("/graph")
    public ResponseEntity<Map<String, Object>> getGraph() {
        return ResponseEntity.ok(digitalTwinService.getFullGraph());
    }

    @GetMapping("/relationships")
    public ResponseEntity<List<Map<String, Object>>> getRelationships() {
        return ResponseEntity.ok(digitalTwinService.getAllRelationships());
    }

    @GetMapping("/assets/{id}/dependencies")
    public ResponseEntity<List<Map<String, Object>>> getAssetDependencies(@PathVariable String id) {
        return ResponseEntity.ok(digitalTwinService.getDependenciesForAsset(id));
    }
}
