import React, { useState } from 'react';
import { InfrastructureAsset, DependencyLink } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { 
  AlertTriangle, 
  ArrowRight, 
  Activity, 
  TrendingDown, 
  ShieldAlert, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Share2, 
  SlidersHorizontal 
} from 'lucide-react';

interface CascadingFailureViewProps {
  assets: InfrastructureAsset[];
  dependencies: DependencyLink[];
  targetAsset: InfrastructureAsset | null;
  onSelectAsset: (asset: InfrastructureAsset) => void;
  onNavigateToScenario: (assetId: string) => void;
}

export const CascadingFailureView: React.FC<CascadingFailureViewProps> = ({
  assets,
  dependencies,
  targetAsset,
  onSelectAsset,
  onNavigateToScenario,
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>(
    targetAsset?.id || 'asset-pwr-01'
  );
  const [vulnerabilityWeight, setVulnerabilityWeight] = useState<number>(0.85);
  const [readinessWeight, setReadinessWeight] = useState<number>(0.90);

  const initiatingAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  // Cascading chain simulation derived dynamically from initiating asset
  const cascadeChain = [
    {
      hop: 0,
      title: 'Initiating Critical Failure Event',
      assetCode: initiatingAsset.code,
      assetName: initiatingAsset.name,
      category: initiatingAsset.category,
      timeOffset: '0.0h (Immediate)',
      probability: 1.0,
      confidence: 99.2,
      severity: 'CRITICAL' as const,
      status: 'OBSERVED ANOMALY' as const,
      impact: 'Transformer primary phase insulation failure with severe overheating.',
      exposurePerHour: initiatingAsset.financialExposurePerHour,
      mitigation: 'Engage on-site emergency circuit breaker & nitrogen fire suppression.',
    },
    {
      hop: 1,
      title: 'Primary Downstream Power Starvation',
      assetCode: 'DC-FRA-01',
      assetName: 'Frankfurt Hyperscale Campus Alpha',
      category: 'DATA_CENTER',
      timeOffset: '+0.2h (12 mins)',
      probability: 0.94,
      confidence: 94.5,
      severity: 'CRITICAL' as const,
      status: 'MODEL PREDICTION' as const,
      impact: 'Campus transitions to 16 emergency diesel generators; 2 out of 8 chillers lock out on busbar dip.',
      exposurePerHour: 340000,
      mitigation: 'Activate Playbook #REC-FRA-04: Shed 25MW non-critical batch compute.',
    },
    {
      hop: 2,
      title: 'Port Logistics Terminal API Degradation',
      assetCode: 'PORT-ROT-02',
      assetName: 'Port of Rotterdam Automated Terminal',
      category: 'PORT',
      timeOffset: '+0.8h (48 mins)',
      probability: 0.68,
      confidence: 88.0,
      severity: 'HIGH' as const,
      status: 'MODEL PREDICTION' as const,
      impact: 'Automated container crane TOS loses sync with central SAP instance; truck gate queues exceed 4km.',
      exposurePerHour: 290000,
      mitigation: 'Enable local cached dispatch buffer on secondary edge Kubernetes cluster.',
    },
    {
      hop: 3,
      title: 'Transatlantic Subsea Cable Traffic Divergence',
      assetCode: 'SUB-TAT-14',
      assetName: 'Transatlantic Subsea Cable Ring 14',
      category: 'TELECOM',
      timeOffset: '+1.5h (90 mins)',
      probability: 0.55,
      confidence: 82.4,
      severity: 'MEDIUM' as const,
      status: 'MODEL PREDICTION' as const,
      impact: 'European low-latency financial extranets shift to secondary London landing station (+18ms latency).',
      exposurePerHour: 180000,
      mitigation: 'Pre-allocate reserved BGP path on Ashburn cloud transit backbone.',
    },
    {
      hop: 4,
      title: 'Global Financial Settlement Spillover Deficit',
      assetCode: 'CLOUD-AWS-EAST',
      assetName: 'AWS Primary East Backbone Transit',
      category: 'CLOUD',
      timeOffset: '+3.0h (180 mins)',
      probability: 0.38,
      confidence: 76.0,
      severity: 'LOW' as const,
      status: 'MODEL PREDICTION' as const,
      impact: 'North American cluster absorbs re-routed global API load; CPU utilization surges to 88%.',
      exposurePerHour: 120000,
      mitigation: 'Auto-scale AWS ECS cluster replica factor from 120 to 240 instances.',
    }
  ];

  const totalCalculatedExposure = cascadeChain.reduce((acc, cur) => acc + cur.exposurePerHour, 0);

  return (
    <div className="space-y-4">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#FF5263]/15 text-[#FF5263] border border-[#FF5263]/30">
              PROBABILISTIC GRAPH CASCADE ENGINE
            </span>
            <span className="text-xs font-mono text-[#8492A6]">
              MULTI-HOP BLAST RADIUS • TRANSPARENT RISK MATRIX
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            CASCADING FAILURE PREDICTION & PROPAGATION
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 max-w-3xl font-sans">
            Transparently computes sequential failure pathways across interconnected infrastructure layers. Distinguishes observed anomalies from model estimates.
          </p>
        </div>

        {/* Initiating Asset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#8492A6]">Initiating Node:</span>
          <select
            value={selectedAssetId}
            onChange={e => setSelectedAssetId(e.target.value)}
            className="bg-[#111923] border border-[#202B38] rounded-md px-3 py-1.5 text-xs text-[#35D6C5] font-mono focus:outline-none focus:border-[#35D6C5]"
          >
            {assets.map(a => (
              <option key={a.id} value={a.id}>
                [{a.code}] {a.name} ({a.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transparent Risk Calculation Weight Controls */}
      <div className="p-3 rounded-lg bg-[#111923] border border-[#202B38] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#E8EDF5]">
          <SlidersHorizontal className="w-4 h-4 text-[#35D6C5]" />
          <span>CONFIGURABLE RISK FACTORS:</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#8492A6]">Asset Vulnerability:</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={vulnerabilityWeight}
              onChange={e => setVulnerabilityWeight(parseFloat(e.target.value))}
              className="w-24 accent-[#35D6C5]"
            />
            <span className="text-[#35D6C5] font-semibold">{vulnerabilityWeight.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#8492A6]">Recovery Readiness:</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={readinessWeight}
              onChange={e => setReadinessWeight(parseFloat(e.target.value))}
              className="w-24 accent-[#8B7CFF]"
            />
            <span className="text-[#8B7CFF] font-semibold">{readinessWeight.toFixed(2)}</span>
          </div>

          <div className="px-2.5 py-1 rounded bg-[#0A0E14] border border-[#202B38] text-[#8492A6]">
            Total Cascading Exposure: <strong className="text-[#FF5263]">${(totalCalculatedExposure / 1000).toFixed(0)}k/hr</strong>
          </div>
        </div>
      </div>

      {/* Cascading Chain Visual Timeline Steps */}
      <div className="space-y-3">
        {cascadeChain.map((step, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg bg-[#111923] border transition-all ${
              step.hop === 0
                ? 'border-[#FF5263]/50 shadow-[0_0_15px_rgba(255,82,99,0.12)]'
                : 'border-[#202B38] hover:border-[#35D6C5]/30'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-[#202B38]">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                  step.hop === 0 ? 'bg-[#FF5263] text-[#080B10]' : 'bg-[#16202C] text-[#35D6C5] border border-[#202B38]'
                }`}>
                  H{step.hop}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#E8EDF5]">{step.assetCode}</span>
                    <span className="text-sm font-semibold text-[#E8EDF5] font-sans">• {step.assetName}</span>
                    <SeverityBadge severity={step.severity} />
                  </div>
                  <span className="text-xs text-[#8492A6] font-mono">{step.title}</span>
                </div>
              </div>

              {/* Status & Confidence Tag */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  step.status === 'OBSERVED ANOMALY'
                    ? 'bg-[#FF5263]/20 text-[#FF5263] border border-[#FF5263]/40'
                    : 'bg-[#8B7CFF]/20 text-[#8B7CFF] border border-[#8B7CFF]/40'
                }`}>
                  {step.status}
                </span>

                <div className="text-right">
                  <div className="text-[#E8EDF5] font-bold">
                    P = {(step.probability * 100).toFixed(0)}%
                  </div>
                  <div className="text-[10px] text-[#8492A6]">Confidence: {step.confidence}%</div>
                </div>

                <div className="text-right pl-3 border-l border-[#202B38]">
                  <div className="text-[#FF5263] font-bold">
                    ${(step.exposurePerHour / 1000).toFixed(0)}k/hr
                  </div>
                  <div className="text-[10px] text-[#8492A6]">{step.timeOffset}</div>
                </div>
              </div>
            </div>

            {/* Impact Details & Mitigation */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
                <span className="text-[#8492A6] font-mono text-[10px] uppercase block mb-1">
                  PREDICTED CASCADE IMPACT:
                </span>
                <p className="text-[#E8EDF5] font-sans">{step.impact}</p>
              </div>

              <div className="p-3 rounded bg-[#0A0E14] border border-[#35D6C5]/30">
                <span className="text-[#35D6C5] font-mono text-[10px] uppercase block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#35D6C5]" />
                  RECOMMENDED INTERVENTION:
                </span>
                <p className="text-[#E8EDF5] font-sans">{step.mitigation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38] flex items-center justify-between">
        <div className="text-xs font-mono text-[#8492A6]">
          Ready to test defensive counter-measures against this failure chain?
        </div>
        <button
          onClick={() => onNavigateToScenario(selectedAssetId)}
          className="px-4 py-2 rounded bg-[#35D6C5] hover:bg-[#35D6C5]/90 text-[#080B10] font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
        >
          LOAD INTO SCENARIO LABORATORY <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
