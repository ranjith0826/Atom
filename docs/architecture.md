# ResilienceOS Architecture Specification
### Autonomous Digital Twin for Global Critical Infrastructure

---

## 1. Executive System Overview

ResilienceOS is an autonomous digital twin operating system designed to safeguard systemic critical infrastructure across physical assets, electrical grids, subsea fiber networks, cloud availability clusters, and global maritime logistics.

### Core Philosophy
```
OBSERVE → UNDERSTAND → PREDICT → SIMULATE → COORDINATE → RECOVER → VERIFY
```

---

## 2. High-Level Architecture Diagram

```
+----------------------------------------------------------------------------------------+
|                                    PRESENTATION TIER                                   |
|   React 18 + TypeScript + Tailwind CSS Enterprise Dark System + MapLibre GL / Canvas  |
|   Command Center | Digital Twin Explorer | Cascading Risk | Scenario Lab | Copilot     |
+----------------------------------------------------------------------------------------+
                                            │ HTTP / WebSocket / JSON
                                            ▼
+----------------------------------------------------------------------------------------+
|                       JAVA 21 / SPRING BOOT 3.x MODULAR ENGINE                         |
|                                                                                        |
|  [Identity & RBAC]         [Asset Management]           [Digital Twin Service]         |
|  - Multi-tenant Isolation  - Lat/Long Geospatial        - Neo4j Graph Topology         |
|  - JWT Stateless Tokens    - MTBF / Capacity Telemetry  - Hard/Soft Dependency Edges   |
|                                                                                        |
|  [Risk Engine Service]     [Cascading Failure Engine]   [Scenario Simulation Lab]      |
|  - Exposure / Hour Calc    - Multi-Hop Graph Traversal  - Monte Carlo Shock Evaluator  |
|  - Threat Probabilities    - Unvalidated vs Observed    - Automated Failover Compare   |
|                                                                                        |
|  [AI Agent Orchestrator]   [Incident Management]        [Recovery & Continuity]        |
|  - 8 Specialized Agents    - Root Cause Analysis        - RTO / RPO Sequencing         |
|  - Human-in-the-Loop Gate  - Playbook Formulation       - Restoration Verification     |
|                                                                                        |
|  [Audit & Governance]      [Copilot Assistant Service]  [Actuator / OpenMetrics]       |
|  - Immutable Event Log     - Context-Aware Inference    - Telemetry Health Probes      |
+----------------------------------------------------------------------------------------+
                 │                           │                           │
                 ▼                           ▼                           ▼
       ┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
       │   POSTGRESQL +   │        │   NEO4J GRAPH    │        │  REDIS & KAFKA   │
       │     POSTGIS      │        │   RELATIONSHIP   │        │ EVENT PIPELINE   │
       │ Transactional DB │        │     DATABASE     │        │ State & Streams  │
       └──────────────────┘        └──────────────────┘        └──────────────────┘
```

---

## 3. The 10 Spring Boot Domain Services

1. **Organization and Identity Service** (`com.resilienceos.identity`):
   - Tenant isolation, cryptographically hashed passwords (BCrypt), JWT-based stateless tokens.
   - Enforces Role-Based Access Control (RBAC): `SUPER_ADMINISTRATOR`, `INCIDENT_COMMANDER`, `SECURITY_ANALYST`, etc.

2. **Asset Management Service** (`com.resilienceos.asset`):
   - Entity model across Data Centers, Power Grids, Ports, Airports, Telecom, Cloud, Supply Hubs, and Water Reservoirs.
   - Real-time operational capacity, MTBF, redundancy tracking, blast radius count.

3. **Digital Twin Service** (`com.resilienceos.digitaltwin`):
   - Multi-layer graph topology representing Hard, Soft, and Redundant dependencies between assets.
   - Traversal logic calculating downstream single points of failure.

4. **Risk Engine Service** (`com.resilienceos.risk`):
   - Computes financial exposure per hour, active threat vector probability, and automated risk scoring.

5. **Incident Management Service** (`com.resilienceos.incident`):
   - Lifecycle: `DETECTED` → `INVESTIGATING` → `RECOVERY_IN_PROGRESS` → `RESTORED` → `VERIFIED`.
   - Stores root cause diagnostics, mitigation playbooks, and auditable event timelines.

6. **Simulation Service** (`com.resilienceos.simulation`):
   - Monte Carlo systemic contingency engine simulating zero-hour disruptions across grids, ransomware, and subsea cables.
   - Side-by-side comparison of unmitigated baseline downtime vs AI multi-agent mitigation.

7. **AI Agent Orchestration Service** (`com.resilienceos.agent`):
   - Controls 8 specialized autonomous agents.
   - Enforces Human-in-the-Loop gates: High-impact load transfers or grid breakers require commander approval.

8. **Recovery Management Service** (`com.resilienceos.recovery`):
   - Tracks RTO (Recovery Time Objective) and RPO (Recovery Point Objective) targets.
   - Step-by-step restoration verification with SLO validation.

9. **Audit & Governance Service** (`com.resilienceos.audit`):
   - Cryptographically verifiable immutable audit records adhering to ISO 22301 and SOC 2 Type II compliance standards.

10. **Copilot Assistant Service** (`com.resilienceos.copilot`):
    - Persistent context-aware inference referencing live digital twin nodes, risk evidence, and citations.
