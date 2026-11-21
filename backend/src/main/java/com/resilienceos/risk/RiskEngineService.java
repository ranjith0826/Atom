package com.resilienceos.risk;

import com.resilienceos.asset.AssetRepository;
import com.resilienceos.asset.InfrastructureAsset;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RiskEngineService {

    private final AssetRepository assetRepository;

    public RiskEngineService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public Map<String, Object> calculateGlobalRisk() {
        List<InfrastructureAsset> assets = assetRepository.findAll();
        double totalExposure = assets.stream().mapToDouble(InfrastructureAsset::getFinancialExposurePerHour).sum();
        double avgHealth = assets.isEmpty() ? 98.7 : assets.stream().mapToDouble(InfrastructureAsset::getOperationalCapacityPct).average().orElse(98.7);

        Map<String, Object> map = new HashMap<>();
        map.put("overallRiskScore", 42);
        map.put("infrastructureHealthPct", Math.round(avgHealth * 10.0) / 10.0);
        map.put("activeThreatsCount", 12);
        map.put("totalExposurePerHour", totalExposure);
        map.put("highestRiskNode", "PWR-RHEIN-04");
        map.put("riskMatrixStatus", "STABLE_MONITORING");
        return map;
    }

    public List<Map<String, Object>> getFailurePredictions() {
        return List.of(
                Map.of("id", "pred-1", "assetCode", "PWR-RHEIN-04", "assetName", "Rhine-Main 380kV Substation Hub", "predictedWindow", "Next 2-4 Hours", "failureProbability", 0.89, "cascadeRisk", "CRITICAL", "exposurePerHour", 620000.0),
                Map.of("id", "pred-2", "assetCode", "DC-FRA-01", "assetName", "Frankfurt Hyperscale Campus Alpha", "predictedWindow", "Next 4-8 Hours", "failureProbability", 0.78, "cascadeRisk", "HIGH", "exposurePerHour", 340000.0),
                Map.of("id", "pred-3", "assetCode", "SUP-SEMICOND-TW", "assetName", "Hsinchu Lithography Vault", "predictedWindow", "Next 12-24 Hours", "failureProbability", 0.64, "cascadeRisk", "HIGH", "exposurePerHour", 750000.0)
        );
    }
}
