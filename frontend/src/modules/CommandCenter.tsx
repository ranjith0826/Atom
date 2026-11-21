import React, { useState } from 'react';
import { 
  InfrastructureAsset, 
  Incident, 
  AIAgent, 
  GlobalKpiMetrics, 
  DependencyLink 
} from '../types';
import { KpiCard } from '../components/common/KpiCard';
import { GlobalMap } from '../components/digitaltwin/GlobalMap';
import { StatusBadge } from '../components/common/StatusBadge';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { 
  Activity, 
  ShieldAlert, 
  Network, 
  AlertTriangle, 
  Workflow, 
  Bot, 
  Download, 
  Calendar, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Zap
} from 'lucide-react';

interface CommandCenterProps {
  assets: InfrastructureAsset[];
  incidents: Incident[];
  agents: AIAgent[];
  dependencies: DependencyLink[];
  metrics: GlobalKpiMetrics;
  selectedAsset: InfrastructureAsset | null;
  onSelectAsset: (asset: InfrastructureAsset) => void;
  onNavigate: (screenId: string) => void;
  selectedRegion: string;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  assets,
  incidents,
  agents,
  dependencies,
  metrics,
  selectedAsset,
  onSelectAsset,
  onNavigate,
  selectedRegion,
}) => {
  const [timeRange, setTimeRange] = useState('REALTIME');

  const exportReport = () => {
    const reportData = {
      title: "ResilienceOS Global Resilience Intelligence Audit",
      timestamp: new Date().toISOString(),
      metrics,
      activeIncidentsCount: incidents.length,
      monitoredAssets: assets.length,
      activeAgents: agents.filter(a => a.status !== 'IDLE').length,
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resilienceos-audit-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Screen Title & Top Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#35D6C5]/10 text-[#35D6C5] border border-[#35D6C5]/30">
              MISSION CONTROL ALPHA
            </span>
            <span className="text-xs font-mono text-[#8492A6]">GEO FILTER: {selectedRegion}</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            GLOBAL RESILIENCE COMMAND CENTER
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 max-w-3xl font-sans">
            Unified operational intelligence across physical infrastructure, cyber systems, supply chains and human operations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Time Range Selector */}
          <div className="flex items-center bg-[#111923] p-1 rounded border border-[#202B38]">
            {['REALTIME', '1H', '24H', '7D'].map(tr => (
              <button
                key={tr}
                onClick={() => setTimeRange(tr)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  timeRange === tr ? 'bg-[#202B38] text-[#35D6C5] font-semibold' : 'text-[#8492A6] hover:text-[#E8EDF5]'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>

          {/* Export Report Action */}
          <button
            onClick={exportReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111923] border border-[#202B38] hover:border-[#35D6C5]/50 text-[#E8EDF5] transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#35D6C5]" />
            <span>EXPORT AUDIT</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS (Exact Master Build Prompt Specs) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard
          title="INFRASTRUCTURE HEALTH"
          value="98.7%"
          subtitle="Global Operational Index"
          change="+0.4% (24h)"
          isPositive={true}
          icon={Activity}
          color="#35C98A"
          sparklineData={[97.8, 98.1, 98.0, 98.4, 98.2, 98.5, 98.7]}
        />
        <KpiCard
          title="ACTIVE THREATS"
          value="12"
          subtitle="Perimeter & Grid Infiltration"
          change="3 High Severity"
          isAlert={true}
          icon={ShieldAlert}
          color="#FF5263"
          sparklineData={[8, 9, 11, 14, 13, 12, 12]}
        />
        <KpiCard
          title="CRITICAL DEPENDENCIES"
          value="1,284"
          subtitle="Monitored Hard Links"
          change="100% Mapped"
          icon={Network}
          color="#35D6C5"
          sparklineData={[1260, 1270, 1275, 1280, 1282, 1284]}
        />
        <KpiCard
          title="PREDICTED FAILURES"
          value="03"
          subtitle="Next 12-Hour Horizon"
          change="Cascade Risk 89%"
          isAlert={true}
          icon={AlertTriangle}
          color="#F5B942"
          sparklineData={[1, 2, 2, 4, 3, 3]}
        />
        <KpiCard
          title="RECOVERY READINESS"
          value="94.2%"
          subtitle="Failover Playbooks Valid"
          change="+1.8% Readiness"
          isPositive={true}
          icon={Workflow}
          color="#8B7CFF"
          sparklineData={[91, 92, 92.5, 93.8, 94.0, 94.2]}
        />
        <KpiCard
          title="AI AGENTS ACTIVE"
          value="18/20"
          subtitle="Autonomous Cores Online"
          change="2 Awaiting Approval"
          icon={Bot}
          color="#35D6C5"
          sparklineData={[15, 16, 17, 18, 18, 18]}
        />
      </div>

      {/* MAIN WORKSPACE: DIGITAL TWIN HERO (55-60%) + RIGHT INTELLIGENCE PANEL (40-45%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* HERO: Digital Twin Interactive Map (7 of 12 cols = ~58%) */}
        <div className="lg:col-span-7 space-y-2">
          <GlobalMap
            assets={assets}
            selectedAsset={selectedAsset}
            onSelectAsset={onSelectAsset}
            selectedRegion={selectedRegion}
          />

          {/* Quick Sub-dock beneath map */}
          <div className="p-3 rounded-lg bg-[#111923] border border-[#202B38] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-[#8492A6]">PHYSICAL TWIN CORE:</span>
              <span className="text-[#35D6C5] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 13 Global Facilities Synchronized
              </span>
            </div>
            <button
              onClick={() => onNavigate('twin-explorer')}
              className="text-[#8B7CFF] hover:text-[#8B7CFF]/80 flex items-center gap-1 font-semibold"
            >
              OPEN 3D DEPENDENCY GRAPH <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT INTELLIGENCE PANEL (5 of 12 cols = ~42%) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Highest Risk Regions & Financial Exposure Card */}
          <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38]">
            <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
              <span className="text-xs font-mono font-semibold uppercase text-[#E8EDF5] flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-[#FF5263]" />
                HIGHEST RISK REGIONS & FINANCIAL EXPOSURE
              </span>
              <span className="text-xs font-mono text-[#FF5263] font-bold">
                $4.25M / hr
              </span>
            </div>

            <div className="mt-3 space-y-2.5 text-xs font-mono">
              {/* Region 1 */}
              <div className="p-2.5 rounded bg-[#0A0E14] border border-[#FF5263]/30">
                <div className="flex items-center justify-between">
                  <span className="text-[#E8EDF5] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF5263] animate-pulse" />
                    Frankfurt Metro & Rhine-Main Hub (EMEA)
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#FF5263]/20 text-[#FF5263] font-bold text-[10px]">
                    CRITICAL (89%)
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[#8492A6] text-[11px]">
                  <span>Dielectric breakdown at PWR-RHEIN-04</span>
                  <span className="text-[#E8EDF5] font-semibold">$960k / hr</span>
                </div>
                {/* Cascade Hop Progress */}
                <div className="mt-1.5 text-[10px] text-[#8B7CFF] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#8B7CFF]" />
                  <span>Cascade prediction: 42 assets facing failover load</span>
                </div>
              </div>

              {/* Region 2 */}
              <div className="p-2.5 rounded bg-[#0A0E14] border border-[#F5B942]/30">
                <div className="flex items-center justify-between">
                  <span className="text-[#E8EDF5] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F5B942]" />
                    Taiwan Strait & Hsinchu Tech Vault (APAC)
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#F5B942]/20 text-[#F5B942] font-bold text-[10px]">
                    HIGH (64%)
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[#8492A6] text-[11px]">
                  <span>Export customs hold on lithography chemicals</span>
                  <span className="text-[#E8EDF5] font-semibold">$750k / hr</span>
                </div>
              </div>

              {/* Region 3 */}
              <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                <div className="flex items-center justify-between">
                  <span className="text-[#E8EDF5] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#35D6C5]" />
                    Northern Virginia Transit Cluster (NA)
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#35C98A]/20 text-[#35C98A] font-bold text-[10px]">
                    HEALTHY (18%)
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[#8492A6] text-[11px]">
                  <span>Absorbing Europe failover DNS queries</span>
                  <span className="text-[#8492A6]">Nominal</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Generated Recommendations Card */}
          <div className="p-4 rounded-lg bg-[#111923] border border-[#8B7CFF]/30 shadow-[0_0_15px_rgba(139,124,255,0.08)]">
            <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
              <span className="text-xs font-mono font-semibold uppercase text-[#8B7CFF] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#8B7CFF]" />
                AUTONOMOUS MITIGATION RECOMMENDATIONS
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#8B7CFF]/20 text-[#8B7CFF] text-[10px] font-mono">
                CONFIDENCE 95.3%
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-[#35D6C5] font-semibold">PLAYBOOK #REC-FRA-04</span>
                  <span className="text-[#F5B942] text-[10px]">HUMAN APPROVAL REQUIRED</span>
                </div>
                <p className="mt-1 text-[#E8EDF5] font-sans text-xs">
                  Shed 25MW non-critical batch processing and migrate 45MW core financial settlement traffic to Paris campus.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#8492A6]">Agent: RECOVERY-COORD</span>
                  <button
                    onClick={() => onNavigate('recovery-plan')}
                    className="px-2 py-1 rounded bg-[#35D6C5] text-[#080B10] font-mono text-[10px] font-bold hover:bg-[#35D6C5]/90"
                  >
                    REVIEW & APPROVE
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-[#35D6C5] font-semibold">PRE-EMPTIVE NITROGEN INJECTION</span>
                  <span className="text-[#35C98A] text-[10px]">EXECUTED (AUTONOMOUS)</span>
                </div>
                <p className="mt-1 text-[#8492A6] font-sans text-xs">
                  Thermal suppression activated on Frankfurt Battery Bank 3. Prevented thermal runaway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM OPERATIONAL FEED (Events, Disruption Forecasts, Agent Activities, Recovery Progress) */}
      <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38]">
        <div className="flex items-center justify-between pb-3 border-b border-[#202B38]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#35D6C5] animate-ping" />
            <h3 className="text-xs font-mono font-semibold uppercase text-[#E8EDF5]">
              LIVE OPERATIONAL & INCIDENT TIMELINE STREAM
            </h3>
          </div>
          <span className="text-xs font-mono text-[#8492A6]">
            REAL-TIME EVENT DISPATCHER • 250 TPS
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Stream 1: Active Critical Incidents */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#8492A6] block tracking-wider">
              ACTIVE CRITICAL DISRUPTIONS
            </span>
            {incidents.slice(0, 2).map(inc => (
              <div
                key={inc.id}
                onClick={() => onNavigate('active-incidents')}
                className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38] hover:border-[#FF5263]/40 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#FF5263] font-semibold">{inc.incidentNumber}</span>
                  <SeverityBadge severity={inc.severity} />
                </div>
                <h4 className="mt-1 text-xs font-sans text-[#E8EDF5] font-medium line-clamp-1">{inc.title}</h4>
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#8492A6]">
                  <span>{inc.affectedAssetNames[0]}</span>
                  <span className="text-[#F5B942] uppercase">{inc.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stream 2: AI Agent Live Tasks */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#8492A6] block tracking-wider">
              AUTONOMOUS AGENT ACTIONS
            </span>
            {agents.slice(0, 2).map(agent => (
              <div
                key={agent.id}
                onClick={() => onNavigate('agent-control')}
                className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38] hover:border-[#8B7CFF]/40 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#8B7CFF] font-semibold">{agent.name}</span>
                  <StatusBadge status={agent.status} size="sm" />
                </div>
                <p className="mt-1 text-[11px] font-sans text-[#8492A6] line-clamp-2">{agent.currentTask}</p>
                <div className="mt-2 text-[10px] font-mono text-[#35D6C5] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Confidence: {agent.confidenceScore}%
                </div>
              </div>
            ))}
          </div>

          {/* Stream 3: Recovery & Restoration Verification */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#8492A6] block tracking-wider">
              RESTORATION VERIFICATION STATUS
            </span>
            <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#35C98A] font-semibold">ASHBURN BATTERY BANK 3</span>
                <span className="text-[#35C98A] text-[10px]">VERIFIED 100%</span>
              </div>
              <p className="mt-1 text-[11px] font-sans text-[#8492A6]">
                SLO validated: Core banking settlement extranet latency stabilized at 1.8ms.
              </p>
              <div className="mt-2 text-[10px] font-mono text-[#8492A6] flex items-center justify-between">
                <span>Certified by: Agent VERIFICATION-SYS</span>
                <span className="text-[#35C98A]">RESTORED</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#F5B942] font-semibold">ROTTERDAM CONTAINER GATEWAY</span>
                <span className="text-[#F5B942] text-[10px]">RECOVERY 65%</span>
              </div>
              <p className="mt-1 text-[11px] font-sans text-[#8492A6]">
                AGV telemetry re-synchronization underway with secondary edge compute node.
              </p>
              <div className="mt-2 text-[10px] font-mono text-[#8492A6] flex items-center justify-between">
                <span>ETA to 100%: 24 mins</span>
                <span className="text-[#F5B942]">IN PROGRESS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
