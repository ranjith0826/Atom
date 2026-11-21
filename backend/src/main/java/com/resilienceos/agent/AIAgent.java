package com.resilienceos.agent;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "ai_agents")
public class AIAgent {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String status; // IDLE, ACTIVE, ANALYZING, SIMULATING, AWAITING_APPROVAL, EXECUTING, VERIFYING

    private double confidenceScore;

    @Column(columnDefinition = "TEXT")
    private String currentTask;

    @Column(columnDefinition = "TEXT")
    private String lastAction;

    private boolean requiresHumanApproval;

    private Instant lastActiveTime = Instant.now();

    public AIAgent() {}

    public AIAgent(String id, String code, String name, String role, String status,
                   double confidenceScore, String currentTask, String lastAction,
                   boolean requiresHumanApproval) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.role = role;
        this.status = status;
        this.confidenceScore = confidenceScore;
        this.currentTask = currentTask;
        this.lastAction = lastAction;
        this.requiresHumanApproval = requiresHumanApproval;
        this.lastActiveTime = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(double confidenceScore) { this.confidenceScore = confidenceScore; }

    public String getCurrentTask() { return currentTask; }
    public void setCurrentTask(String currentTask) { this.currentTask = currentTask; }

    public String getLastAction() { return lastAction; }
    public void setLastAction(String lastAction) { this.lastAction = lastAction; }

    public boolean isRequiresHumanApproval() { return requiresHumanApproval; }
    public void setRequiresHumanApproval(boolean requiresHumanApproval) { this.requiresHumanApproval = requiresHumanApproval; }

    public Instant getLastActiveTime() { return lastActiveTime; }
    public void setLastActiveTime(Instant lastActiveTime) { this.lastActiveTime = lastActiveTime; }
}
