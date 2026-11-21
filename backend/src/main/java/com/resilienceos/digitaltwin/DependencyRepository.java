package com.resilienceos.digitaltwin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DependencyRepository extends JpaRepository<AssetDependency, String> {
    List<AssetDependency> findBySourceAssetId(String sourceAssetId);
    List<AssetDependency> findByTargetAssetId(String targetAssetId);
}
