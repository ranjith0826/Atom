package com.resilienceos.asset;

import com.resilienceos.identity.Organization;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "infrastructure_assets")
public class InfrastructureAsset {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetCategory category;

    @Column(nullable = false)
    private String region;

    private String locationName;
    private double latitude;
    private double longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HealthStatus healthStatus;

    private int riskScore;
    private String criticality; // TIER_1, TIER_2, TIER_3
    private double operationalCapacityPct;
    private double powerRedundancyPct;
    private double financialExposurePerHour;
    private int blastRadiusCount;
    private int mtbfHours;

    @Column(name = "last_telemetry_time")
    private Instant lastTelemetryTime = Instant.now();

    public InfrastructureAsset() {}

    public InfrastructureAsset(String id, String code, String name, AssetCategory category, String region,
                               String locationName, double latitude, double longitude, HealthStatus healthStatus,
                               int riskScore, String criticality, double operationalCapacityPct,
                               double powerRedundancyPct, double financialExposurePerHour, int blastRadiusCount,
                               int mtbfHours) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.category = category;
        this.region = region;
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.healthStatus = healthStatus;
        this.riskScore = riskScore;
        this.criticality = criticality;
        this.operationalCapacityPct = operationalCapacityPct;
        this.powerRedundancyPct = powerRedundancyPct;
        this.financialExposurePerHour = financialExposurePerHour;
        this.blastRadiusCount = blastRadiusCount;
        this.mtbfHours = mtbfHours;
        this.lastTelemetryTime = Instant.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Organization getOrganization() { return organization; }
    public void setOrganization(Organization organization) { this.organization = organization; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public AssetCategory getCategory() { return category; }
    public void setCategory(AssetCategory category) { this.category = category; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public HealthStatus getHealthStatus() { return healthStatus; }
    public void setHealthStatus(HealthStatus healthStatus) { this.healthStatus = healthStatus; }

    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }

    public String getCriticality() { return criticality; }
    public void setCriticality(String criticality) { this.criticality = criticality; }

    public double getOperationalCapacityPct() { return operationalCapacityPct; }
    public void setOperationalCapacityPct(double operationalCapacityPct) { this.operationalCapacityPct = operationalCapacityPct; }

    public double getPowerRedundancyPct() { return powerRedundancyPct; }
    public void setPowerRedundancyPct(double powerRedundancyPct) { this.powerRedundancyPct = powerRedundancyPct; }

    public double getFinancialExposurePerHour() { return financialExposurePerHour; }
    public void setFinancialExposurePerHour(double financialExposurePerHour) { this.financialExposurePerHour = financialExposurePerHour; }

    public int getBlastRadiusCount() { return blastRadiusCount; }
    public void setBlastRadiusCount(int blastRadiusCount) { this.blastRadiusCount = blastRadiusCount; }

    public int getMtbfHours() { return mtbfHours; }
    public void setMtbfHours(int mtbfHours) { this.mtbfHours = mtbfHours; }

    public Instant getLastTelemetryTime() { return lastTelemetryTime; }
    public void setLastTelemetryTime(Instant lastTelemetryTime) { this.lastTelemetryTime = lastTelemetryTime; }
}
