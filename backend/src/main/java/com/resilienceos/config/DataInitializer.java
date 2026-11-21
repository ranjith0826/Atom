package com.resilienceos.config;

import com.resilienceos.agent.AIAgent;
import com.resilienceos.agent.AgentRepository;
import com.resilienceos.asset.AssetCategory;
import com.resilienceos.asset.AssetRepository;
import com.resilienceos.asset.HealthStatus;
import com.resilienceos.asset.InfrastructureAsset;
import com.resilienceos.audit.AuditEvent;
import com.resilienceos.audit.AuditRepository;
import com.resilienceos.digitaltwin.AssetDependency;
import com.resilienceos.digitaltwin.DependencyRepository;
import com.resilienceos.identity.Organization;
import com.resilienceos.identity.OrganizationRepository;
import com.resilienceos.identity.Role;
import com.resilienceos.identity.User;
import com.resilienceos.identity.UserRepository;
import com.resilienceos.incident.Incident;
import com.resilienceos.incident.IncidentRepository;
import com.resilienceos.incident.SeverityLevel;
import com.resilienceos.recovery.RecoveryPlan;
import com.resilienceos.recovery.RecoveryPlanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final OrganizationRepository orgRepo;
    private final UserRepository userRepo;
    private final AssetRepository assetRepo;
    private final DependencyRepository depRepo;
    private final IncidentRepository incidentRepo;
    private final AgentRepository agentRepo;
    private final RecoveryPlanRepository recoveryRepo;
    private final AuditRepository auditRepo;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(OrganizationRepository orgRepo, UserRepository userRepo,
                           AssetRepository assetRepo, DependencyRepository depRepo,
                           IncidentRepository incidentRepo, AgentRepository agentRepo,
                           RecoveryPlanRepository recoveryRepo, AuditRepository auditRepo,
                           PasswordEncoder passwordEncoder) {
        this.orgRepo = orgRepo;
        this.userRepo = userRepo;
        this.assetRepo = assetRepo;
        this.depRepo = depRepo;
        this.incidentRepo = incidentRepo;
        this.agentRepo = agentRepo;
        this.recoveryRepo = recoveryRepo;
        this.auditRepo = auditRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (orgRepo.count() > 0) {
            return; // Already initialized
        }

        // 1. Organization & User
        Organization org = new Organization("org-global-ops", "GLOBAL INFRASTRUCTURE OPERATIONS GROUP", "GIOG");
        orgRepo.save(org);

        User commander = new User(
                "usr-bvance", org, "commander", passwordEncoder.encode("resilience2026!"),
                "Commander B. Vance", Role.INCIDENT_COMMANDER
        );
        userRepo.save(commander);

        // 2. Assets (13 Interconnected Global Critical Infrastructure Assets)
        InfrastructureAsset fraDc = new InfrastructureAsset(
                "asset-fra-01", "DC-FRA-01", "Frankfurt Hyperscale Campus Alpha",
                AssetCategory.DATA_CENTER, "EMEA", "Frankfurt, Germany", 50.1109, 8.6821,
                HealthStatus.DEGRADED, 78, "TIER_1", 82.4, 65.0, 340000.0, 42, 8400
        );
        InfrastructureAsset rheinPwr = new InfrastructureAsset(
                "asset-pwr-01", "PWR-RHEIN-04", "Rhine-Main 380kV Substation Hub",
                AssetCategory.POWER_GRID, "EMEA", "Frankfurt Metro, Germany", 50.0522, 8.5714,
                HealthStatus.CRITICAL, 89, "TIER_1", 61.2, 40.0, 620000.0, 118, 4200
        );
        InfrastructureAsset tatTel = new InfrastructureAsset(
                "asset-tel-01", "SUB-TAT-14", "Transatlantic Subsea Cable Ring 14",
                AssetCategory.TELECOM, "EMEA", "Bude Cable Landing Station, UK", 50.8267, -4.5437,
                HealthStatus.HEALTHY, 24, "TIER_1", 99.4, 98.0, 180000.0, 75, 24000
        );
        InfrastructureAsset ashDc = new InfrastructureAsset(
                "asset-ash-01", "DC-VA-09", "Ashburn Hyperscale Cluster 09",
                AssetCategory.DATA_CENTER, "NORTH_AMERICA", "Loudoun County, Virginia, USA", 39.0438, -77.4874,
                HealthStatus.HEALTHY, 18, "TIER_1", 96.8, 99.5, 850000.0, 240, 18500
        );
        InfrastructureAsset pjmGrid = new InfrastructureAsset(
                "asset-pjm-01", "GRID-PJM-01", "PJM Regional Interconnection Node",
                AssetCategory.POWER_GRID, "NORTH_AMERICA", "Norristown, Pennsylvania, USA", 40.1215, -75.3399,
                HealthStatus.HEALTHY, 31, "TIER_1", 94.0, 92.0, 450000.0, 310, 12000
        );
        InfrastructureAsset rotPort = new InfrastructureAsset(
                "asset-rot-01", "PORT-ROT-02", "Port of Rotterdam Automated Terminal",
                AssetCategory.PORT, "EMEA", "Maasvlakte 2, Netherlands", 51.9566, 4.0249,
                HealthStatus.HEALTHY, 35, "TIER_2", 91.5, 88.0, 290000.0, 56, 9800
        );
        InfrastructureAsset awsCloud = new InfrastructureAsset(
                "asset-cloud-01", "CLOUD-AWS-EAST", "AWS Primary East Backbone Transit",
                AssetCategory.CLOUD, "NORTH_AMERICA", "Northern Virginia, USA", 38.8048, -77.0469,
                HealthStatus.HEALTHY, 15, "TIER_1", 98.9, 100.0, 950000.0, 450, 35000
        );
        InfrastructureAsset sinAir = new InfrastructureAsset(
                "asset-sin-01", "AIR-SIN-01", "Singapore Changi Air Logistics Centre",
                AssetCategory.AIRPORT, "APAC", "Changi, Singapore", 1.3644, 103.9915,
                HealthStatus.HEALTHY, 22, "TIER_2", 95.1, 96.0, 210000.0, 38, 14200
        );
        InfrastructureAsset tokyoDc = new InfrastructureAsset(
                "asset-tokyo-01", "DC-TOKYO-03", "Tokyo Central Hyperscale Facility",
                AssetCategory.DATA_CENTER, "APAC", "Otemachi, Tokyo, Japan", 35.6865, 139.7645,
                HealthStatus.HEALTHY, 28, "TIER_1", 93.7, 94.0, 480000.0, 88, 19000
        );
        InfrastructureAsset semiHub = new InfrastructureAsset(
                "asset-semi-01", "SUP-SEMICOND-TW", "Hsinchu Lithography Logistics Vault",
                AssetCategory.SUPPLY_HUB, "APAC", "Hsinchu Science Park, Taiwan", 24.7828, 120.9978,
                HealthStatus.DEGRADED, 64, "TIER_1", 76.0, 80.0, 750000.0, 165, 6500
        );
        InfrastructureAsset watTex = new InfrastructureAsset(
                "asset-wat-01", "WAT-TEX-02", "Houston Industrial Water Chilling Basin",
                AssetCategory.WATER, "NORTH_AMERICA", "Harris County, Texas, USA", 29.7604, -95.3698,
                HealthStatus.HEALTHY, 42, "TIER_2", 88.3, 75.0, 140000.0, 29, 7800
        );
        InfrastructureAsset spDc = new InfrastructureAsset(
                "asset-sp-01", "DC-SAOPAULO-01", "São Paulo Regional Tier III Gateway",
                AssetCategory.DATA_CENTER, "LATAM", "Barueri, São Paulo, Brazil", -23.5062, -46.8763,
                HealthStatus.HEALTHY, 33, "TIER_2", 91.0, 85.0, 190000.0, 34, 11500
        );
        InfrastructureAsset santosPort = new InfrastructureAsset(
                "asset-santos-01", "PORT-SANTOS-01", "Port of Santos Intermodal Terminal",
                AssetCategory.PORT, "LATAM", "Santos, São Paulo, Brazil", -23.9618, -46.3322,
                HealthStatus.HEALTHY, 29, "TIER_3", 93.2, 82.0, 120000.0, 22, 8900
        );

        List<InfrastructureAsset> assets = List.of(
                fraDc, rheinPwr, tatTel, ashDc, pjmGrid, rotPort, awsCloud, sinAir, tokyoDc, semiHub, watTex, spDc, santosPort
        );
        assets.forEach(a -> a.setOrganization(org));
        assetRepo.saveAll(assets);

        // 3. Dependencies
        List<AssetDependency> deps = List.of(
                new AssetDependency("dep-1", rheinPwr, fraDc, "ELECTRICAL", "HARD", 2, 0.94),
                new AssetDependency("dep-2", fraDc, rotPort, "DATA_FLOW", "SOFT", 14, 0.68),
                new AssetDependency("dep-3", tatTel, fraDc, "DATA_FLOW", "HARD", 38, 0.85),
                new AssetDependency("dep-4", pjmGrid, ashDc, "ELECTRICAL", "HARD", 4, 0.91),
                new AssetDependency("dep-5", ashDc, awsCloud, "DATA_FLOW", "HARD", 1, 0.96),
                new AssetDependency("dep-6", awsCloud, tatTel, "DATA_FLOW", "REDUNDANT", 35, 0.52),
                new AssetDependency("dep-7", semiHub, tokyoDc, "LOGISTICS", "HARD", 120, 0.77),
                new AssetDependency("dep-8", tokyoDc, sinAir, "DATA_FLOW", "SOFT", 65, 0.45),
                new AssetDependency("dep-9", pjmGrid, watTex, "ELECTRICAL", "SOFT", 8, 0.40),
                new AssetDependency("dep-10", spDc, santosPort, "DATA_FLOW", "SOFT", 12, 0.58)
        );
        depRepo.saveAll(deps);

        // 4. AI Agents (8 Specialized Operators)
        List<AIAgent> agents = List.of(
                new AIAgent("ag-1", "INFRA-MONITOR", "Infrastructure Monitoring Agent", "Autonomous Telemetry & Anomaly Correlator", "ACTIVE", 98.4, "Ingesting 14,800 telemetry points/sec from Rhein-Main 380kV substation transformers", "Flagged phase unbalance anomaly on Transformer Bank T-4", false),
                new AIAgent("ag-2", "CYBER-THREAT", "Cyber Threat Intelligence Agent", "Perimeter Integrity & Exploit Interceptor", "ANALYZING", 94.8, "Cross-referencing zero-day CVE-2026-4821 with edge SD-WAN routers", "Quarantined suspicious IP 194.26.29.112 attempting BGP route injection", true),
                new AIAgent("ag-3", "SUPPLY-CHAIN", "Supply Chain Intelligence Agent", "Tier 1/2 Disruption & Port Chokepoint Tracker", "IDLE", 91.2, "Monitoring Taiwan Strait container vessel wait queues & berth congestion", "Recalculated lead-time buffer for extreme-UV optic lenses", false),
                new AIAgent("ag-4", "ENV-RISK", "Environmental Risk Agent", "Climate, Wildfire & Seismic Predictive Observer", "ACTIVE", 96.5, "Simulating heatwave thermal load on Texas cooling tower evaporation rates", "Generated 48-hour convective thunderstorm cone for PJM Interconnection", false),
                new AIAgent("ag-5", "FAILURE-PREDICT", "Failure Prediction Agent", "Probabilistic Cascading Failure Modeling Engine", "SIMULATING", 93.1, "Calculating multi-hop cascade tree if PWR-RHEIN-04 trips during peak solar drop", "Calculated 84.7% probability of Frankfurt DC Alpha secondary busbar overload", false),
                new AIAgent("ag-6", "SIMULATION-EXEC", "Simulation Agent", "What-If Dynamic Scenario Evaluator", "IDLE", 97.0, "Ready for user-defined contingency scenario parameterization", "Completed comparative run: Baseline Outage vs Automated Load Shedding", false),
                new AIAgent("ag-7", "RECOVERY-COORD", "Recovery Coordination Agent", "Autonomous Restorative Playbook Orchestrator", "AWAITING_APPROVAL", 95.3, "Formulated 4-step failover playbook for Frankfurt DC: Transfer 60MW load to Paris DC", "Dispatched approval ticket #REC-2026-881 to Incident Commander", true),
                new AIAgent("ag-8", "VERIFICATION-SYS", "Verification & Restoration Agent", "Post-Mitigation Health & Telemetry Certifier", "IDLE", 99.1, "Monitoring Ashburn cluster post-maintenance voltage harmonic stabilization", "Certified Ashburn UPS Battery Bank 3 restoration to 100% capacity", false)
        );
        agentRepo.saveAll(agents);

        // 5. Active Incidents
        Incident inc1 = new Incident(
                "inc-2026-081", "INC-2026-081", "Rhine-Main Substation Phase Imbalance & Transformer Thermal Spike",
                SeverityLevel.CRITICAL, "RECOVERY_IN_PROGRESS",
                "Dielectric insulation breakdown in 380kV oil-immersed step-down transformer combined with sudden 22% grid frequency surge.",
                620000.0,
                "Execute automated load diversion: Route 45MW IT load from Frankfurt Alpha to Dublin Campus via Subsea Cable Ring 14; engage on-site rotary flywheel UPS banks.",
                "Grid Resilience Alpha & EMEA Operations Core",
                "PENDING", null
        );
        inc1.setOrganization(org);
        incidentRepo.save(inc1);

        // 6. Recovery Plan
        RecoveryPlan rec1 = new RecoveryPlan(
                "rec-plan-01", "High-Impact Failover & Thermal Stabilization: Frankfurt Alpha",
                "inc-2026-081", 2.0, 0.5, 1.4, 96.8, "READY_FOR_APPROVAL", null
        );
        recoveryRepo.save(rec1);

        // 7. Audit Events
        AuditEvent aud1 = new AuditEvent(
                "aud-01", "AI Agent (RECOVERY-COORD)", "AI_AGENT", "RECOVERY_APPROVAL",
                "Requested human authorization for 45MW cross-border load transfer", "DC-FRA-01 / REC-FRA-04", "HIGH"
        );
        AuditEvent aud2 = new AuditEvent(
                "aud-02", "Principal Architect (B. Vance)", "HUMAN_OPERATOR", "SIMULATION_RUN",
                "Executed Monte Carlo failure propagation simulation for Rhine-Main Grid collapse", "Scenario Lab #SIM-994", "MEDIUM"
        );
        auditRepo.saveAll(List.of(aud1, aud2));
    }
}
