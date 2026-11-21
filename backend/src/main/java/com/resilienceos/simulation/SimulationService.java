package com.resilienceos.simulation;

import com.resilienceos.asset.AssetRepository;
import com.resilienceos.asset.InfrastructureAsset;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SimulationService {

    private final AssetRepository assetRepository;

    public SimulationService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public Map<String, Object> executeSimulation(Map<String, Object> request) {
        String scenarioType = (String) request.getOrDefault("scenarioType", "POWER_GRID_COLLAPSE");
        String initiatingAssetId = (String) request.getOrDefault("initiatingAssetId", "asset-pwr-01");
        int durationHours = ((Number) request.getOrDefault("durationHours", 12)).intValue();

        InfrastructureAsset initiatingAsset = assetRepository.findById(initiatingAssetId)
                .orElse(null);

        String assetName = initiatingAsset != null ? initiatingAsset.getName() : "Rhine-Main 380kV Substation Hub";

        Map<String, Object> result = new HashMap<>();
        result.put("id", "sim-run-" + System.currentTimeMillis());
        result.put("scenarioType", scenarioType);
        result.put("scenarioTitle", scenarioType.replace('_', ' ') + " Systemic Simulation");
        result.put("initiatingAssetId", initiatingAssetId);
        result.put("initiatingAssetName", assetName);
        result.put("durationHours", durationHours);
        result.put("baselineDowntimeHours", 14.5);
        result.put("mitigatedDowntimeHours", 1.8);
        result.put("totalFinancialExposure", 5200000.0);
        result.put("preventedLossesWithAI", 4350000.0);
        result.put("affectedNodesCount", 7);

        List<Map<String, Object>> propagation = List.of(
                Map.of("hourOffset", 0.0, "affectedAssetId", initiatingAssetId, "assetName", assetName, "status", "OFFLINE", "probability", 1.0, "impactDescription", "Zero-hour busbar trip and phase loss", "cascadingHop", 0),
                Map.of("hourOffset", 0.2, "affectedAssetId", "asset-fra-01", "assetName", "Frankfurt Hyperscale Campus Alpha", "status", "DEGRADED", "probability", 0.94, "impactDescription", "Failover to diesel generation; chiller bus lock", "cascadingHop", 1),
                Map.of("hourOffset", 0.8, "affectedAssetId", "asset-rot-01", "assetName", "Port of Rotterdam Automated Terminal", "status", "DEGRADED", "probability", 0.68, "impactDescription", "Container AGV dispatch latency surge", "cascadingHop", 2)
        );
        result.put("propagationPath", propagation);

        List<Map<String, Object>> interventions = List.of(
                Map.of("id", "int-1", "stepNumber", 1, "actionTitle", "Autonomous BGP Latency Failover to Dublin & Paris", "targetAsset", "Frankfurt Campus Alpha", "estimatedEffectiveness", 92, "approvalRequired", true, "executed", true),
                Map.of("id", "int-2", "stepNumber", 2, "actionTitle", "Nitrogen Fire Suppression Pre-activation", "targetAsset", "Frankfurt Campus Alpha", "estimatedEffectiveness", 88, "approvalRequired", false, "executed", true)
        );
        result.put("recommendedInterventions", interventions);

        return result;
    }
}
