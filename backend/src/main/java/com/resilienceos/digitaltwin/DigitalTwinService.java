package com.resilienceos.digitaltwin;

import com.resilienceos.asset.AssetDto;
import com.resilienceos.asset.AssetService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class DigitalTwinService {

    private final DependencyRepository dependencyRepository;
    private final AssetService assetService;

    public DigitalTwinService(DependencyRepository dependencyRepository, AssetService assetService) {
        this.dependencyRepository = dependencyRepository;
        this.assetService = assetService;
    }

    public List<Map<String, Object>> getAllRelationships() {
        return dependencyRepository.findAll().stream().map(d -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", d.getId());
            map.put("source", d.getSourceAsset().getId());
            map.put("target", d.getTargetAsset().getId());
            map.put("type", d.getDependencyType());
            map.put("criticality", d.getCriticality());
            map.put("latencyImpactMs", d.getLatencyImpactMs());
            map.put("riskPropagationProbability", d.getRiskPropagationProbability());
            return map;
        }).collect(Collectors.toList());
    }

    public Map<String, Object> getFullGraph() {
        Map<String, Object> graph = new HashMap<>();
        graph.put("nodes", assetService.getAllAssets());
        graph.put("edges", getAllRelationships());
        return graph;
    }

    public List<Map<String, Object>> getDependenciesForAsset(String assetId) {
        return dependencyRepository.findBySourceAssetId(assetId).stream().map(d -> {
            Map<String, Object> map = new HashMap<>();
            map.put("dependencyId", d.getId());
            map.put("targetAssetId", d.getTargetAsset().getId());
            map.put("targetAssetName", d.getTargetAsset().getName());
            map.put("type", d.getDependencyType());
            map.put("criticality", d.getCriticality());
            map.put("riskPropagationProbability", d.getRiskPropagationProbability());
            return map;
        }).collect(Collectors.toList());
    }
}
