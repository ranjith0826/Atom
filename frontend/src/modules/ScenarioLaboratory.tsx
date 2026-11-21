import React, { useState } from 'react';
import { InfrastructureAsset, ScenarioType, SimulationResult } from '../types';
import { api } from '../services/api';
import { 
  FlaskConical, 
  Play, 
  Sliders, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Scale, 
  Sparkles, 
  Zap, 
  Flame, 
  Waves, 
  CloudRain, 
  Truck, 
  Radio 
} from 'lucide-react';

interface ScenarioLaboratoryProps {
  assets: InfrastructureAsset[];
  initialAssetId?: string;
  onSelectAsset: (asset: InfrastructureAsset) => void;
}

export const ScenarioLaboratory: React.FC<ScenarioLaboratoryProps> = ({
  assets,
  initialAssetId,
  onSelectAsset,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('POWER_GRID_COLLAPSE');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(initialAssetId || 'asset-pwr-01');
  const [severity, setSeverity] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('CRITICAL');
  const [durationHours, setDurationHours] = useState<number>(12);
  const [enableAutomatedMitigation, setEnableAutomatedMitigation] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const scenarioOptions = [
    { type: 'POWER_GRID_COLLAPSE' as ScenarioType, title: 'Regional Power Grid Collapse', icon: Zap, desc: 'Transmission busbar fault cascading across cooling & secondary feeds' },
    { type: 'RANSOMWARE_INFILTRATION' as ScenarioType, title: 'Zero-Day Ransomware Infiltration', icon: Flame, desc: 'Lateral movement across OT SCADA networks & encrypted storage arrays' },
    { type: 'SUBSEA_CABLE_SEVER' as ScenarioType, title: 'Transatlantic Subsea Cable Physical Cut', icon: Radio, desc: 'Anchor drag severing 400Tbps transatlantic IP transit capacity' },
    { type: 'PORT_CHOKEPOINT_CLOSURE' as ScenarioType, title: 'Major Maritime Port Chokepoint Closure', icon: Truck, desc: 'Berth cranes locked down with global container demurrage escalation' },
    { type: 'CLOUD_REGION_BLACKOUT' as ScenarioType, title: 'Hyperscale Cloud Multi-AZ Outage', icon: CloudRain, desc: 'Control-plane split-brain disruption in primary transit cluster' },
    { type: 'WILDFIRE_PERIMETER' as ScenarioType, title: 'Catastrophic Wildfire Encroachment', icon: Flame, desc: 'Substation forced de-energization due to smoke ionization' },
  ];

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await api.runSimulation({
        scenarioType: selectedScenario,
        initiatingAssetId: selectedAssetId,
        severity,
        durationHours,
      });
      setSimulationResult(res);
    } catch {
      // fallback
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30">
              SYNTHETIC STRESS LAB
            </span>
            <span className="text-xs font-mono text-[#F5B942] flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              SIMULATED OUTCOMES • ISOLATED SANDBOX
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            SCENARIO LABORATORY & WHAT-IF ENGINE
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 max-w-3xl font-sans">
            Stress-test global critical infrastructure against systemic shocks, evaluate automated countermeasures, and compare downtime reductions side-by-side.
          </p>
        </div>

        {/* Run Simulation Button */}
        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#35D6C5] hover:bg-[#35D6C5]/90 disabled:bg-[#202B38] text-[#080B10] disabled:text-[#526071] font-mono text-xs font-bold transition-all shadow-glow-teal"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              CALCULATING MONTE CARLO TRAJECTORIES...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              EXECUTE CONTINGENCY SIMULATION
            </>
          )}
        </button>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Scenario Selection Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8492A6] block">
            1. SELECT CONTINGENCY SCENARIO DISRUPTION
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scenarioOptions.map(opt => {
              const Icon = opt.icon;
              const isSelected = selectedScenario === opt.type;
              return (
                <div
                  key={opt.type}
                  onClick={() => setSelectedScenario(opt.type)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#16202C] border-[#35D6C5] shadow-sm'
                      : 'bg-[#111923] border-[#202B38] hover:border-[#35D6C5]/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded ${isSelected ? 'bg-[#35D6C5] text-[#080B10]' : 'bg-[#0A0E14] text-[#35D6C5]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#E8EDF5]">{opt.title}</span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#8492A6] line-clamp-2">{opt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scenario Parameters Slider & Options (6 cols) */}
        <div className="lg:col-span-6 p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-4 font-mono text-xs">
          <span className="uppercase tracking-wider text-[#8492A6] block font-semibold">
            2. CONFIGURE PARAMETERS & INTERVENTIONS
          </span>

          {/* Initiating Asset Target */}
          <div>
            <label className="text-[#8492A6] text-[11px] block mb-1">INITIATING ZERO-HOUR TARGET ASSET</label>
            <select
              value={selectedAssetId}
              onChange={e => setSelectedAssetId(e.target.value)}
              className="w-full bg-[#0A0E14] border border-[#202B38] rounded-md px-3 py-2 text-[#35D6C5] text-xs focus:outline-none focus:border-[#35D6C5]"
            >
              {assets.map(a => (
                <option key={a.id} value={a.id}>
                  [{a.code}] {a.name} • {a.region}
                </option>
              ))}
            </select>
          </div>

          {/* Severity & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#8492A6] text-[11px] block mb-1">SHOCK SEVERITY LEVEL</label>
              <div className="grid grid-cols-4 gap-1">
                {(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const).map(sev => (
                  <button
                    key={sev}
                    onClick={() => setSeverity(sev)}
                    className={`py-1.5 rounded text-[10px] font-bold transition-all ${
                      severity === sev
                        ? sev === 'CRITICAL' ? 'bg-[#FF5263] text-[#080B10]' : 'bg-[#35D6C5] text-[#080B10]'
                        : 'bg-[#0A0E14] text-[#8492A6] border border-[#202B38]'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[#8492A6] text-[11px] block mb-1">
                SIMULATION DURATION: <strong className="text-[#E8EDF5]">{durationHours} HOURS</strong>
              </label>
              <input
                type="range"
                min="4"
                max="72"
                step="4"
                value={durationHours}
                onChange={e => setDurationHours(parseInt(e.target.value))}
                className="w-full accent-[#35D6C5] mt-1"
              />
            </div>
          </div>

          {/* AI Countermeasure Toggle */}
          <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B7CFF]" />
              <div>
                <span className="text-[#E8EDF5] font-semibold block text-xs">Simulate Automated AI Agent Failover</span>
                <span className="text-[10px] text-[#8492A6]">Evaluate BGP diversion & flywheel UPS engagement</span>
              </div>
            </div>
            <button
              onClick={() => setEnableAutomatedMitigation(!enableAutomatedMitigation)}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                enableAutomatedMitigation
                  ? 'bg-[#8B7CFF] text-[#080B10]'
                  : 'bg-[#202B38] text-[#8492A6]'
              }`}
            >
              {enableAutomatedMitigation ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>
      </div>

      {/* SIMULATION RESULTS COMPARISON (Always present or auto-loaded) */}
      <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#202B38]">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#35D6C5]" />
            <h3 className="text-sm font-mono font-bold uppercase text-[#E8EDF5]">
              SIDE-BY-SIDE INTERVENTION COMPARISON
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#35D6C5]/10 text-[#35D6C5] font-mono text-xs border border-[#35D6C5]/30">
            SIMULATION ID: SIM-994
          </span>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card A: Baseline Outage (No Intervention) */}
          <div className="p-4 rounded-lg bg-[#0A0E14] border border-[#FF5263]/40 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
              <span className="text-[#FF5263] font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                BASELINE: UNMITIGATED SHOCK
              </span>
              <span className="text-[#8492A6] text-[10px]">MANUAL RESTORATION ONLY</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">TOTAL DOWNTIME</span>
                <span className="text-lg font-bold text-[#FF5263]">14.5 Hours</span>
              </div>
              <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">FINANCIAL EXPOSURE</span>
                <span className="text-lg font-bold text-[#FF5263]">$5,200,000</span>
              </div>
              <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">AFFECTED ASSETS</span>
                <span className="text-base font-bold text-[#E8EDF5]">7 Global Facilities</span>
              </div>
              <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">SLA BREACH PROBABILITY</span>
                <span className="text-base font-bold text-[#FF5263]">98.4%</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8492A6] font-sans">
              Without automated multi-agent coordination, manual failovers require human ticket triaging resulting in average 4.2-hour delay before generator start validation.
            </p>
          </div>

          {/* Card B: AI Multi-Agent Coordinated Recovery */}
          <div className="p-4 rounded-lg bg-[#0A0E14] border border-[#35C98A]/50 space-y-3 font-mono text-xs shadow-[0_0_15px_rgba(53,201,138,0.1)]">
            <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
              <span className="text-[#35C98A] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                RESILIENCEOS: AUTONOMOUS INTERVENTION
              </span>
              <span className="px-2 py-0.5 rounded bg-[#35C98A]/20 text-[#35C98A] text-[10px] font-bold">
                87.6% DOWNTIME REDUCTION
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">MITIGATED DOWNTIME</span>
                <span className="text-lg font-bold text-[#35C98A]">1.8 Hours</span>
              </div>
              <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">NET PREVENTED LOSS</span>
                <span className="text-lg font-bold text-[#35D6C5]">$4,350,000 SAVED</span>
              </div>
              <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">ISOLATED NODES</span>
                <span className="text-base font-bold text-[#35C98A]">1 Isolated Node</span>
              </div>
              <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">SLA PRESERVATION</span>
                <span className="text-base font-bold text-[#35C98A]">99.8% Nominal</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8492A6] font-sans">
              Autonomous agents execute sub-second load shedding and BGP diversion to Dublin & Paris before busbar collapse, keeping downstream ports and banks nominal.
            </p>
          </div>
        </div>

        {/* Recommended Intervention Playbook Sequence */}
        <div className="mt-4 pt-3 border-t border-[#202B38]">
          <span className="text-xs font-mono font-semibold uppercase text-[#35D6C5] block mb-2">
            SYNTHESIZED RESTORATION INTERVENTION PLAYBOOK
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38] flex items-center justify-between">
              <div>
                <span className="text-[#35D6C5] font-semibold">STEP 1: Autonomous BGP Latency Failover</span>
                <span className="block text-[11px] text-[#8492A6]">Migrate 45MW IT load to Paris Campus Alpha</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#35C98A]/20 text-[#35C98A] font-bold">EXECUTED</span>
            </div>

            <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38] flex items-center justify-between">
              <div>
                <span className="text-[#35D6C5] font-semibold">STEP 2: Battery Thermal Reserve Injection</span>
                <span className="block text-[11px] text-[#8492A6]">Suppress battery temperature surge below 40°C</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#35C98A]/20 text-[#35C98A] font-bold">EXECUTED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
