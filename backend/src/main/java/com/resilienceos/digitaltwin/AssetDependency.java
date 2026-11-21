package com.resilienceos.digitaltwin;

import com.resilienceos.asset.InfrastructureAsset;
import jakarta.persistence.*;

@Entity
@Table(name = "asset_dependencies")
public class AssetDependency {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source_asset_id")
    private InfrastructureAsset sourceAsset;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_asset_id")
    private InfrastructureAsset targetAsset;

    @Column(nullable = false)
    private String dependencyType; // ELECTRICAL, DATA_FLOW, LOGISTICS, COOLING, API_GATEWAY

    @Column(nullable = false)
    private String criticality; // HARD, SOFT, REDUNDANT

    private int latencyImpactMs;
    private double riskPropagationProbability;

    public AssetDependency() {}

    public AssetDependency(String id, InfrastructureAsset sourceAsset, InfrastructureAsset targetAsset,
                           String dependencyType, String criticality, int latencyImpactMs,
                           double riskPropagationProbability) {
        this.id = id;
        this.sourceAsset = sourceAsset;
        this.targetAsset = targetAsset;
        this.dependencyType = dependencyType;
        this.criticality = criticality;
        this.latencyImpactMs = latencyImpactMs;
        this.riskPropagationProbability = riskPropagationProbability;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public InfrastructureAsset getSourceAsset() { return sourceAsset; }
    public void setSourceAsset(InfrastructureAsset sourceAsset) { this.sourceAsset = sourceAsset; }

    public InfrastructureAsset getTargetAsset() { return targetAsset; }
    public void setTargetAsset(InfrastructureAsset targetAsset) { this.targetAsset = targetAsset; }

    public String getDependencyType() { return dependencyType; }
    public void setDependencyType(String dependencyType) { this.dependencyType = dependencyType; }

    public String getCriticality() { return criticality; }
    public void setCriticality(String criticality) { this.criticality = criticality; }

    public int getLatencyImpactMs() { return latencyImpactMs; }
    public void setLatencyImpactMs(int latencyImpactMs) { this.latencyImpactMs = latencyImpactMs; }

    public double getRiskPropagationProbability() { return riskPropagationProbability; }
    public void setRiskPropagationProbability(double riskPropagationProbability) { this.riskPropagationProbability = riskPropagationProbability; }
}
