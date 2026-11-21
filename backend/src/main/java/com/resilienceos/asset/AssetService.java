package com.resilienceos.asset;

import com.resilienceos.digitaltwin.AssetDependency;
import com.resilienceos.digitaltwin.DependencyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AssetService {

    private final AssetRepository assetRepository;
    private final DependencyRepository dependencyRepository;

    public AssetService(AssetRepository assetRepository, DependencyRepository dependencyRepository) {
        this.assetRepository = assetRepository;
        this.dependencyRepository = dependencyRepository;
    }

    public List<AssetDto> getAllAssets() {
        return assetRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public Optional<AssetDto> getAssetById(String id) {
        return assetRepository.findById(id).map(this::mapToDto);
    }

    @Transactional
    public AssetDto createAsset(InfrastructureAsset asset) {
        InfrastructureAsset saved = assetRepository.save(asset);
        return mapToDto(saved);
    }

    @Transactional
    public Optional<AssetDto> updateAssetHealth(String id, HealthStatus status, int riskScore) {
        return assetRepository.findById(id).map(asset -> {
            asset.setHealthStatus(status);
            asset.setRiskScore(riskScore);
            return mapToDto(assetRepository.save(asset));
        });
    }

    private AssetDto mapToDto(InfrastructureAsset asset) {
        List<String> deps = dependencyRepository.findBySourceAssetId(asset.getId()).stream()
                .map(d -> d.getTargetAsset().getId())
                .collect(Collectors.toList());

        List<String> systems = List.of("Telemetry Scada Bus", "Core Transaction Hub", "Edge API Gateway");
        return AssetDto.fromEntity(asset, deps, systems);
    }
}
