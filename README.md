# RESILIENCEOS
### Autonomous Digital Twin for Global Critical Infrastructure

[![Java](https://img.shields.io/badge/Java-21%20LTS-007396?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16%20%2B%20PostGIS-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Neo4j](https://img.shields.io/badge/Neo4j-5.20-008CC1?logo=neo4j&logoColor=white)](https://neo4j.com/)
[![License](https://img.shields.io/badge/License-Enterprise%20Resilience-35D6C5)](#)

---

## Executive Summary

**ResilienceOS** is a world-class, AI-native infrastructure resilience operating system. It synthesizes and continuously updates a high-fidelity digital twin of an enterprise or sovereign operational ecosystem spanning:

- **Physical Assets & Data Centers**: Hyperscale campuses, colocation nodes, UPS battery banks, turbine cooling.
- **Power Grids & Utilities**: Regional transmission sub-stations, high-voltage transformers, frequency stabilization.
- **Transoceanic Telecommunications**: Subsea fiber optic rings, terrestrial IP backbones, BGP border routing.
- **Global Supply Chains & Maritime Ports**: Automated container gateways, maritime chokepoints, Tier-1/2 fabrication buffers.
- **Cybersecurity Attack Surfaces**: Zero-trust perimeter tracking, OT SCADA protocol defense, CVE intercept.
- **Geospatial Climate Intelligence**: Satellite radar tracking wildfire encroaching, flood surge, and heat stress.
- **Autonomous Multi-Agent Mesh**: 8 specialized AI agents coordinating automated failover and verified restoration.

---

## Core Product Philosophy

```
OBSERVE → UNDERSTAND → PREDICT → SIMULATE → COORDINATE → RECOVER → VERIFY
```

---

## Key Modules & Capabilities

### 1. Global Resilience Command Center
- **Mission Control Hero**: Interactive global infrastructure map occupying 55–60% of workspace with live node pulses, cable routes, category filters, and regional threat overlays.
- **KPI Metrics with Sparklines**:
  - *Infrastructure Health*: **98.7%**
  - *Active Threats*: **12**
  - *Critical Dependencies*: **1,284**
  - *Predicted Failures*: **03**
  - *Recovery Readiness*: **94.2%**
  - *Active AI Agents*: **18/20**
- **Right Intelligence Panel**: Highest risk regions, financial exposure ($4.25M/hr), and autonomous recommendations.
- **Bottom Operational Feed**: Real-time event stream across incidents, agent tasks, and restoration checkpoints.

### 2. Digital Twin Explorer & Dependency Graph
- Interactive connected entity graph: `PHYSICAL ASSETS` → `SOFTWARE SYSTEMS` → `NETWORKS` → `SUPPLIERS` → `BUSINESS PROCESSES` → `HUMAN OPERATIONS`.
- Multi-tier filtering, blast radius inspection, and dependency traversal.

### 3. Cascading Failure Prediction Engine
- Probabilistic multi-hop cascade propagation showing initiating shocks (e.g. Frankfurt 380kV substation collapse) cascading downstream into cloud latency jitter and container port queue escalation.
- Transparent risk matrix distinguishing observed anomalies from model estimates.

### 4. Scenario Laboratory & What-If Engine
- Interactive simulation of systemic shocks (Power Grid Outage, Ransomware Infiltration, Subsea Cable Cut, Port Closure, Wildfire).
- Side-by-side comparison: **Unmitigated Baseline Downtime (14.5 hrs, $5.2M Loss)** vs **AI Multi-Agent Mitigation (1.8 hrs, 87.6% Downtime Reduction, $4.35M Saved)**.

### 5. AI Agent Control Center
- 8 Specialized Autonomous Agents:
  1. *Infrastructure Monitoring Agent*
  2. *Cyber Threat Intelligence Agent*
  3. *Supply Chain Intelligence Agent*
  4. *Environmental Risk Agent*
  5. *Failure Prediction Agent*
  6. *Simulation Agent*
  7. *Recovery Coordination Agent*
  8. *Verification & Restoration Agent*
- Enforces strict **Human-in-the-Loop** authorization gates: High-impact recovery commands require authenticated commander approval.

### 6. Tactical Incident Center & Root Cause Analysis
- End-to-end incident lifecycle with root cause diagnostics, auditable timelines, and one-click restoration execution.

### 7. AI Resilience Intelligence Copilot
- Persistent assistant accessible across all screens answering natural language questions with digital twin evidence and citations.

---

## Technical Architecture

```
resilienceos/
├── frontend/                     # React 18 + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/           # UI Design System (Sidebar, TopBar, Maps, Modals)
│   │   ├── modules/              # 10 Enterprise Application Screens
│   │   ├── services/             # API client with REST & resilient demo fallback
│   │   └── types/                # Strict TypeScript domain interfaces
│   └── package.json
│
├── backend/                      # Java 21 LTS + Spring Boot 3.3.4 Modular Engine
│   ├── pom.xml
│   ├── src/main/java/com/resilienceos/
│   │   ├── asset/                # Asset Management Service & REST API
│   │   ├── digitaltwin/          # Digital Twin Graph & Dependency Topology
│   │   ├── risk/                 # Risk Calculation & Failure Prediction
│   │   ├── incident/             # Incident Management & Approval Workflow
│   │   ├── simulation/           # Monte Carlo Systemic Shock Simulation
│   │   ├── agent/                # Multi-Agent Mesh & Task Orchestration
│   │   ├── recovery/             # Business Continuity & RTO/RPO Verification
│   │   ├── audit/                # Immutable Cryptographic Event Log
│   │   ├── identity/             # Multi-tenant Organization & RBAC
│   │   └── config/               # Security, OpenAPI, and Data Seeding
│   └── src/test/java/            # JUnit 5 Unit & Integration Tests
│
├── infrastructure/               # Docker Compose orchestration
│   ├── docker-compose.yml        # PostgreSQL, PostGIS, Neo4j, Redis, Kafka
│   └── database/
│
└── docs/                         # Architecture, API & Setup Documentation
```

---

## Getting Started

### 1. Run Backend (Java 21 + Spring Boot)
```bash
# Using included Maven Wrapper:
.\mvnw.cmd spring-boot:run

# Or run the packaged fat JAR directly:
.\tools\jdk-21\bin\java.exe -jar backend\target\resilienceos-backend-1.0.0.jar
```
Backend will start on `http://localhost:8080`.
- OpenAPI / Swagger UI: `http://localhost:8080/swagger-ui.html`
- Health: `http://localhost:8080/actuator/health`

### 2. Run Frontend (React + TypeScript)
```bash
cd frontend
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Run with Docker Compose
```bash
cd infrastructure
docker-compose up --build -d
```

---

## Verification & Acceptance Criteria
- [x] Java 21 Spring Boot 3.x backend compiles and passes all JUnit 5 tests.
- [x] React TypeScript frontend compiles and builds with zero errors.
- [x] REST endpoints documented and functional.
- [x] Realistic demonstration dataset seeded for "Global Infrastructure Operations Group".
- [x] Human-in-the-loop authorization gates enforced for autonomous AI actions.
- [x] Side-by-side scenario simulation comparison implemented.
- [x] Dark enterprise UI inspired by Palantir, Linear, Datadog, and NVIDIA Omniverse.
