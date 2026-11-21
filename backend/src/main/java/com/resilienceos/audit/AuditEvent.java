package com.resilienceos.audit;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "audit_events")
public class AuditEvent {

    @Id
    private String id;

    @Column(nullable = false)
    private String actor;

    @Column(nullable = false)
    private String actorType; // HUMAN_OPERATOR, AI_AGENT, SYSTEM_RULE

    @Column(nullable = false)
    private String category; // RECOVERY_APPROVAL, SIMULATION_RUN, ASSET_STATE_CHANGE, FAILOVER_TRIGGERED

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    private String targetResource;

    @Column(nullable = false)
    private String riskLevel; // LOW, MEDIUM, HIGH, CRITICAL

    private Instant timestamp = Instant.now();

    public AuditEvent() {}

    public AuditEvent(String id, String actor, String actorType, String category, String description,
                      String targetResource, String riskLevel) {
        this.id = id;
        this.actor = actor;
        this.actorType = actorType;
        this.category = category;
        this.description = description;
        this.targetResource = targetResource;
        this.riskLevel = riskLevel;
        this.timestamp = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getActor() { return actor; }
    public void setActor(String actor) { this.actor = actor; }

    public String getActorType() { return actorType; }
    public void setActorType(String actorType) { this.actorType = actorType; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTargetResource() { return targetResource; }
    public void setTargetResource(String targetResource) { this.targetResource = targetResource; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
