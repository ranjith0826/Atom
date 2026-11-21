package com.resilienceos.incident;

import com.resilienceos.identity.Organization;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "incidents")
public class Incident {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;

    @Column(nullable = false, unique = true)
    private String incidentNumber;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SeverityLevel severity;

    @Column(nullable = false)
    private String status; // DETECTED, INVESTIGATING, RECOVERY_IN_PROGRESS, RESTORED, VERIFIED

    @Column(columnDefinition = "TEXT")
    private String rootCause;

    private double financialExposurePerHour;

    @Column(columnDefinition = "TEXT")
    private String aiSuggestedMitigation;

    private String assignedTeam;
    private String recoveryApprovalStatus; // NONE, PENDING, APPROVED, REJECTED
    private String approvedBy;

    private Instant detectedAt = Instant.now();

    public Incident() {}

    public Incident(String id, String incidentNumber, String title, SeverityLevel severity, String status,
                    String rootCause, double financialExposurePerHour, String aiSuggestedMitigation,
                    String assignedTeam, String recoveryApprovalStatus, String approvedBy) {
        this.id = id;
        this.incidentNumber = incidentNumber;
        this.title = title;
        this.severity = severity;
        this.status = status;
        this.rootCause = rootCause;
        this.financialExposurePerHour = financialExposurePerHour;
        this.aiSuggestedMitigation = aiSuggestedMitigation;
        this.assignedTeam = assignedTeam;
        this.recoveryApprovalStatus = recoveryApprovalStatus;
        this.approvedBy = approvedBy;
        this.detectedAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Organization getOrganization() { return organization; }
    public void setOrganization(Organization organization) { this.organization = organization; }

    public String getIncidentNumber() { return incidentNumber; }
    public void setIncidentNumber(String incidentNumber) { this.incidentNumber = incidentNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public SeverityLevel getSeverity() { return severity; }
    public void setSeverity(SeverityLevel severity) { this.severity = severity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRootCause() { return rootCause; }
    public void setRootCause(String rootCause) { this.rootCause = rootCause; }

    public double getFinancialExposurePerHour() { return financialExposurePerHour; }
    public void setFinancialExposurePerHour(double financialExposurePerHour) { this.financialExposurePerHour = financialExposurePerHour; }

    public String getAiSuggestedMitigation() { return aiSuggestedMitigation; }
    public void setAiSuggestedMitigation(String aiSuggestedMitigation) { this.aiSuggestedMitigation = aiSuggestedMitigation; }

    public String getAssignedTeam() { return assignedTeam; }
    public void setAssignedTeam(String assignedTeam) { this.assignedTeam = assignedTeam; }

    public String getRecoveryApprovalStatus() { return recoveryApprovalStatus; }
    public void setRecoveryApprovalStatus(String recoveryApprovalStatus) { this.recoveryApprovalStatus = recoveryApprovalStatus; }

    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }

    public Instant getDetectedAt() { return detectedAt; }
    public void setDetectedAt(Instant detectedAt) { this.detectedAt = detectedAt; }
}
