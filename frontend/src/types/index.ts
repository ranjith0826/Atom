export type HealthStatus = 'HEALTHY' | 'DEGRADED' | 'CRITICAL' | 'OFFLINE' | 'MAINTENANCE';
export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AgentStatus = 'IDLE' | 'ANALYZING' | 'SIMULATING' | 'AWAITING_APPROVAL' | 'EXECUTING' | 'VERIFYING';
export type ScenarioType = 
  | 'POWER_GRID_COLLAPSE'
  | 'RANSOMWARE_INFILTRATION'
  | 'SUBSEA_CABLE_SEVER'
  | 'WILDFIRE_PERIMETER'
  | 'CLOUD_REGION_BLACKOUT'
  | 'PORT_CHOKEPOINT_CLOSURE'
  | 'TELECOM_BACKBONE_SEVER'
  | 'EXTREME_HEAT_TURBINE_TRIP';

export interface InfrastructureAsset {
  id: string;
  code: string;
  name: string;
  category: 'DATA_CENTER' | 'POWER_GRID' | 'PORT' | 'AIRPORT' | 'TELECOM' | 'CLOUD' | 'SUPPLY_HUB' | 'WATER';
  region: 'NORTH_AMERICA' | 'EMEA' | 'APAC' | 'LATAM';
  locationName: string;
  latitude: number;
  longitude: number;
  healthStatus: HealthStatus;
  riskScore: number; // 0 to 100
  criticality: 'TIER_1' | 'TIER_2' | 'TIER_3';
  operationalCapacityPct: number;
  powerRedundancyPct: number;
  financialExposurePerHour: number;
  blastRadiusCount: number;
  dependencies: string[]; // target asset IDs
  connectedSystems: string[];
  lastTelemetryTime: string;
  mtbfHours: number;
}

export interface DependencyLink {
  id: string;
  source: string;
  target: string;
  type: 'ELECTRICAL' | 'DATA_FLOW' | 'LOGISTICS' | 'COOLING' | 'API_GATEWAY';
  criticality: 'HARD' | 'SOFT' | 'REDUNDANT';
  latencyImpactMs: number;
  riskPropagationProbability: number; // 0 to 1
}

export interface AIAgent {
  id: string;
  code: string;
  name: string;
  role: string;
  avatarIcon: string;
  status: AgentStatus;
  confidenceScore: number; // 0 to 100
  currentTask: string;
  lastAction: string;
  lastActiveTime: string;
  requiresHumanApproval: boolean;
  connectedSources: string[];
  actionLog: {
    timestamp: string;
    action: string;
    status: 'SUCCESS' | 'WARNING' | 'PENDING_APPROVAL';
    details: string;
  }[];
}

export interface Incident {
  id: string;
  incidentNumber: string;
  title: string;
  severity: SeverityLevel;
  status: 'DETECTED' | 'INVESTIGATING' | 'RECOVERY_IN_PROGRESS' | 'RESTORED' | 'VERIFIED';
  affectedAssetIds: string[];
  affectedAssetNames: string[];
  rootCause: string;
  financialExposurePerHour: number;
  aiSuggestedMitigation: string;
  assignedTeam: string;
  detectedAt: string;
  recoveryApprovalStatus: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  timeline: {
    time: string;
    title: string;
    description: string;
    actor: string;
  }[];
}

export interface SimulationStep {
  hourOffset: number;
  affectedAssetId: string;
  assetName: string;
  status: HealthStatus;
  probability: number;
  impactDescription: string;
  cascadingHop: number;
}

export interface SimulationResult {
  id: string;
  scenarioType: ScenarioType;
  scenarioTitle: string;
  initiatingAssetId: string;
  initiatingAssetName: string;
  severityLevel: SeverityLevel;
  durationHours: number;
  baselineDowntimeHours: number;
  mitigatedDowntimeHours: number;
  totalFinancialExposure: number;
  preventedLossesWithAI: number;
  affectedNodesCount: number;
  propagationPath: SimulationStep[];
  recommendedInterventions: {
    id: string;
    stepNumber: number;
    actionTitle: string;
    targetAsset: string;
    estimatedEffectiveness: number;
    approvalRequired: boolean;
    executed: boolean;
  }[];
}

export interface RecoveryPlan {
  id: string;
  incidentId: string;
  title: string;
  targetRtoHours: number;
  targetRpoMinutes: number;
  estimatedRestorationHours: number;
  status: 'DRAFT' | 'READY_FOR_APPROVAL' | 'APPROVED' | 'EXECUTING' | 'COMPLETED';
  approvedBy?: string;
  backupReadinessPct: number;
  steps: {
    id: string;
    sequenceOrder: number;
    title: string;
    responsibleTeam: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
    verified: boolean;
  }[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'HUMAN_OPERATOR' | 'AI_AGENT' | 'SYSTEM_RULE';
  category: 'RECOVERY_APPROVAL' | 'SIMULATION_RUN' | 'ASSET_STATE_CHANGE' | 'FAILOVER_TRIGGERED' | 'POLICY_OVERRIDE';
  description: string;
  targetResource: string;
  riskLevel: SeverityLevel;
}

export interface GlobalKpiMetrics {
  infrastructureHealthPct: number;
  activeThreatsCount: number;
  criticalDependenciesCount: number;
  predictedFailuresCount: number;
  recoveryReadinessPct: number;
  activeAgentsCount: number;
  totalAgentsCount: number;
  financialExposureTotal: number;
  synchronizedSecondsAgo: number;
}
