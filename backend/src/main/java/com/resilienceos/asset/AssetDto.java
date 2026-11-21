package com.resilienceos.asset;

import java.util.List;

public class AssetDto {
    private String id;
    private String code;
    private String name;
    private String category;
    private String region;
    private String locationName;
    private double latitude;
    private double longitude;
    private String healthStatus;
    private int riskScore;
    private String criticality;
    private double operationalCapacityPct;
    private double powerRedundancyPct;
    private double financialExposurePerHour;
    private int blastRadiusCount;
    private int mtbfHours;
    private List<String> dependencies;
    private List<String> connectedSystems;
    private String lastTelemetryTime;

    public AssetDto() {}

    public static AssetDto fromEntity(InfrastructureAsset asset, List<String> dependencies, List<String> systems) {
        AssetDto dto = new AssetDto();
        dto.id = asset.getId();
        dto.code = asset.getCode();
        dto.name = asset.getName();
        dto.category = asset.getCategory().name();
        dto.region = asset.getRegion();
        dto.locationName = asset.getLocationName();
        dto.latitude = asset.getLatitude();
        dto.longitude = asset.getLongitude();
        dto.healthStatus = asset.getHealthStatus().name();
        dto.riskScore = asset.getRiskScore();
        dto.criticality = asset.getCriticality();
        dto.operationalCapacityPct = asset.getOperationalCapacityPct();
        dto.powerRedundancyPct = asset.getPowerRedundancyPct();
        dto.financialExposurePerHour = asset.getFinancialExposurePerHour();
        dto.blastRadiusCount = asset.getBlastRadiusCount();
        dto.mtbfHours = asset.getMtbfHours();
        dto.dependencies = dependencies != null ? dependencies : List.of();
        dto.connectedSystems = systems != null ? systems : List.of();
        dto.lastTelemetryTime = "12s ago";
        return dto;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }
    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }
    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
    public String getHealthStatus() { return healthStatus; }
    public void setHealthStatus(String healthStatus) { this.healthStatus = healthStatus; }
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
    public List<String> getDependencies() { return dependencies; }
    public void setDependencies(List<String> dependencies) { this.dependencies = dependencies; }
    public List<String> getConnectedSystems() { return connectedSystems; }
    public void setConnectedSystems(List<String> connectedSystems) { this.connectedSystems = connectedSystems; }
    public String getLastTelemetryTime() { return lastTelemetryTime; }
    public void setLastTelemetryTime(String lastTelemetryTime) { this.lastTelemetryTime = lastTelemetryTime; }
}
