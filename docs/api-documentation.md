# ResilienceOS REST & WebSocket API Specification

Base URL: `http://localhost:8080/api/v1`  
OpenAPI / Swagger UI: `http://localhost:8080/swagger-ui.html`  
OpenAPI Spec JSON: `http://localhost:8080/v3/api-docs`

---

## Endpoints Summary

### 1. Infrastructure Assets
- `GET /api/v1/assets`
  - Returns list of all infrastructure assets with live health status, risk score, capacity, and blast radius.
- `GET /api/v1/assets/{id}`
  - Returns detailed asset record including dependencies and hosted systems.
- `POST /api/v1/assets`
  - Registers new critical infrastructure asset.

### 2. Digital Twin & Relationships
- `GET /api/v1/digital-twin/graph`
  - Returns entire connected digital twin topology (nodes and directed edges).
- `GET /api/v1/digital-twin/relationships`
  - Returns all dependency links (electrical, data flow, logistics, cooling).
- `GET /api/v1/digital-twin/assets/{id}/dependencies`
  - Traverses upstream and downstream dependencies for a specific asset.

### 3. Risk & Failure Predictions
- `GET /api/v1/risks`
  - Returns aggregate systemic risk score, health percentage, and total financial exposure.
- `GET /api/v1/risks/predictions`
  - Returns multi-hop failure predictions for upcoming 12-hour horizon.
- `POST /api/v1/risks/analyze`
  - Triggers on-demand risk re-calculation across all nodes.

### 4. Tactical Incidents
- `GET /api/v1/incidents`
  - Returns all active and historic incidents.
- `GET /api/v1/incidents/{id}`
  - Returns incident details, root cause, and timeline events.
- `POST /api/v1/incidents/{id}/approve`
  - Authorizes recovery playbook execution for an incident.

### 5. Scenario Simulation Laboratory
- `POST /api/v1/simulations`
  - Runs what-if systemic shock simulation (e.g. `POWER_GRID_COLLAPSE`, `SUBSEA_CABLE_SEVER`).
  - Request:
    ```json
    {
      "scenarioType": "POWER_GRID_COLLAPSE",
      "initiatingAssetId": "asset-pwr-01",
      "severity": "CRITICAL",
      "durationHours": 12
    }
    ```
  - Response: Comparison of baseline downtime vs automated AI mitigation, prevented losses, and step-by-step propagation path.

### 6. AI Agent Mesh Control
- `GET /api/v1/agents`
  - Returns status of all 8 specialized AI agents with confidence scores.
- `POST /api/v1/agents/{id}/tasks`
  - Dispatches automated monitoring or investigation task to an agent.

### 7. Recovery & Continuity Planning
- `GET /api/v1/recovery-plans`
  - Returns business continuity plans with RTO and RPO objectives.
- `POST /api/v1/recovery-plans/{id}/approve`
  - Human-in-the-loop commander authorization.
- `POST /api/v1/recovery-plans/{id}/execute`
  - Dispatches automated failover execution sequence.

### 8. Audit & Compliance
- `GET /api/v1/audit/events`
  - Returns immutable audit trail of all authorizations, agent tasks, and policy overrides.

### 9. AI Resilience Copilot
- `POST /api/v1/copilot/query`
  - Answers natural language questions referencing actual digital twin evidence and citations.

### 10. System Metrics
- `GET /api/v1/metrics`
  - Returns global telemetry KPIs (Health, Active Threats, Critical Dependencies, Readiness).
