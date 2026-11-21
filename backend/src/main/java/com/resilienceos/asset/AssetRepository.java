package com.resilienceos.asset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<InfrastructureAsset, String> {
    Optional<InfrastructureAsset> findByCode(String code);
    List<InfrastructureAsset> findByRegion(String region);
    List<InfrastructureAsset> findByCategory(AssetCategory category);
    List<InfrastructureAsset> findByHealthStatus(HealthStatus status);
}
