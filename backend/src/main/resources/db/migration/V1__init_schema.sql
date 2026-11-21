-- ResilienceOS Initial Schema
CREATE TABLE IF NOT EXISTS organizations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) REFERENCES organizations(id),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS infrastructure_assets (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) REFERENCES organizations(id),
    code VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    location_name VARCHAR(255),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    health_status VARCHAR(50) NOT NULL,
    risk_score INTEGER NOT NULL,
    criticality VARCHAR(50) NOT NULL,
    operational_capacity_pct DOUBLE PRECISION NOT NULL,
    power_redundancy_pct DOUBLE PRECISION NOT NULL,
    financial_exposure_per_hour DOUBLE PRECISION NOT NULL,
    blast_radius_count INTEGER NOT NULL,
    mtbf_hours INTEGER NOT NULL,
    last_telemetry_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS asset_dependencies (
    id VARCHAR(64) PRIMARY KEY,
    source_asset_id VARCHAR(64) REFERENCES infrastructure_assets(id),
    target_asset_id VARCHAR(64) REFERENCES infrastructure_assets(id),
    dependency_type VARCHAR(50) NOT NULL,
    criticality VARCHAR(50) NOT NULL,
    latency_impact_ms INTEGER,
    risk_propagation_probability DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS incidents (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) REFERENCES organizations(id),
    incident_number VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    root_cause TEXT,
    financial_exposure_per_hour DOUBLE PRECISION NOT NULL,
    ai_suggested_mitigation TEXT,
    assigned_team VARCHAR(150),
    recovery_approval_status VARCHAR(50) NOT NULL,
    approved_by VARCHAR(150),
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_agents (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    confidence_score DOUBLE PRECISION NOT NULL,
    current_task TEXT,
    last_action TEXT,
    requires_human_approval BOOLEAN DEFAULT FALSE,
    last_active_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_events (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) REFERENCES organizations(id),
    actor VARCHAR(150) NOT NULL,
    actor_type VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    target_resource VARCHAR(255),
    risk_level VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
