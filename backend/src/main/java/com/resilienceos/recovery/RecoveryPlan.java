package com.resilienceos.recovery;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "recovery_plans")
public class RecoveryPlan {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    private String incidentId;
    private double targetRtoHours;
    private double targetRpoMinutes;
    private double estimatedRestorationHours;
    private double backupReadinessPct;

    @Column(nullable = false)
    private String status; // DRAFT, READY_FOR_APPROVAL, APPROVED, EXECUTING, COMPLETED

    private String approvedBy;
    private Instant createdAt = Instant.now();

    public RecoveryPlan() {}

    public RecoveryPlan(String id, String title, String incidentId, double targetRtoHours,
                        double targetRpoMinutes, double estimatedRestorationHours,
                        double backupReadinessPct, String status, String approvedBy) {
        this.id = id;
        this.title = title;
        this.incidentId = incidentId;
        this.targetRtoHours = targetRtoHours;
        this.targetRpoMinutes = targetRpoMinutes;
        this.estimatedRestorationHours = estimatedRestorationHours;
        this.backupReadinessPct = backupReadinessPct;
        this.status = status;
        this.approvedBy = approvedBy;
        this.createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getIncidentId() { return incidentId; }
    public void setIncidentId(String incidentId) { this.incidentId = incidentId; }

    public double getTargetRtoHours() { return targetRtoHours; }
    public void setTargetRtoHours(double targetRtoHours) { this.targetRtoHours = targetRtoHours; }

    public double getTargetRpoMinutes() { return targetRpoMinutes; }
    public void setTargetRpoMinutes(double targetRpoMinutes) { this.targetRpoMinutes = targetRpoMinutes; }

    public double getEstimatedRestorationHours() { return estimatedRestorationHours; }
    public void setEstimatedRestorationHours(double estimatedRestorationHours) { this.estimatedRestorationHours = estimatedRestorationHours; }

    public double getBackupReadinessPct() { return backupReadinessPct; }
    public void setBackupReadinessPct(double backupReadinessPct) { this.backupReadinessPct = backupReadinessPct; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
