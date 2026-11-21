import React from 'react';
import { InfrastructureAsset } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { X, Shield, Activity, Zap, Server, AlertTriangle, ArrowRight, Play, Compass, ExternalLink } from 'lucide-react';

interface AssetInspectorModalProps {
  asset: InfrastructureAsset | null;
  onClose: () => void;
  onTriggerSimulation?: (asset: InfrastructureAsset) => void;
  onViewCascading?: (asset: InfrastructureAsset) => void;
}

export const AssetInspectorModal: React.FC<AssetInspectorModalProps> = ({
  asset,
  onClose,
  onTriggerSimulation,
  onViewCascading,
}) => {
  if (!asset) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] bg-[#0D121A] border-l border-[#202B38] shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 bg-[#111923] border-b border-[#202B38] flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#202B38] text-[#35D6C5]">
              {asset.code}
            </span>
            <StatusBadge status={asset.healthStatus} size="sm" />
            <span className="font-mono text-[11px] text-[#8492A6]">{asset.criticality}</span>
          </div>
          <h2 className="mt-1.5 text-base font-semibold text-[#E8EDF5]">{asset.name}</h2>
          <p className="text-xs text-[#8492A6] flex items-center gap-1 mt-0.5">
            <Compass className="w-3.5 h-3.5 text-[#35D6C5]" />
            {asset.locationName} ({asset.latitude.toFixed(2)}°, {asset.longitude.toFixed(2)}°)
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-[#202B38] text-[#8492A6] hover:text-[#E8EDF5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono">
        {/* Core Operational Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded bg-[#111923] border border-[#202B38]">
            <span className="text-[#8492A6] block text-[10px] uppercase">Risk Probability Score</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className={`text-xl font-bold ${asset.riskScore > 70 ? 'text-[#FF5263]' : asset.riskScore > 40 ? 'text-[#F5B942]' : 'text-[#35C98A]'}`}>
                {asset.riskScore}
              </span>
              <span className="text-[#8492A6] text-[10px]">/ 100</span>
            </div>
            {/* Risk bar */}
            <div className="mt-2 w-full h-1.5 rounded-full bg-[#080B10] overflow-hidden">
              <div
                className={`h-full ${asset.riskScore > 70 ? 'bg-[#FF5263]' : asset.riskScore > 40 ? 'bg-[#F5B942]' : 'bg-[#35C98A]'}`}
                style={{ width: `${asset.riskScore}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded bg-[#111923] border border-[#202B38]">
            <span className="text-[#8492A6] block text-[10px] uppercase">Financial Exposure</span>
            <div className="mt-1 text-xl font-bold text-[#E8EDF5]">
              ${(asset.financialExposurePerHour / 1000).toFixed(0)}k<span className="text-xs font-normal text-[#8492A6]">/hr</span>
            </div>
            <span className="text-[10px] text-[#8492A6] mt-1 block">Est. cascade impact</span>
          </div>

          <div className="p-3 rounded bg-[#111923] border border-[#202B38]">
            <span className="text-[#8492A6] block text-[10px] uppercase">Operational Capacity</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#35D6C5]">{asset.operationalCapacityPct}%</span>
            </div>
            <span className="text-[10px] text-[#8492A6]">Power Redundancy: {asset.powerRedundancyPct}%</span>
          </div>

          <div className="p-3 rounded bg-[#111923] border border-[#202B38]">
            <span className="text-[#8492A6] block text-[10px] uppercase">Blast Radius</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#FF5263]">{asset.blastRadiusCount}</span>
              <span className="text-[#8492A6] text-[10px]">Entities</span>
            </div>
            <span className="text-[10px] text-[#8492A6]">MTBF: {asset.mtbfHours.toLocaleString()}h</span>
          </div>
        </div>

        {/* Connected Mission Critical Systems */}
        <div className="p-3 rounded bg-[#111923] border border-[#202B38]">
          <span className="text-[#8492A6] block text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-[#8B7CFF]" />
            HOSTED CRITICAL SYSTEMS ({asset.connectedSystems.length})
          </span>
          <div className="space-y-1.5">
            {asset.connectedSystems.map((sys, idx) => (
              <div key={idx} className="p-2 rounded bg-[#0A0E14] border border-[#202B38] flex items-center justify-between">
                <span className="text-[#E8EDF5] font-sans">{sys}</span>
                <span className="text-[10px] text-[#35C98A] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C98A]" /> ACTIVE
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upstream & Downstream Dependencies */}
        <div className="p-3 rounded bg-[#111923] border border-[#202B38]">
          <span className="text-[#8492A6] block text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#F5B942]" />
            UPSTREAM CRITICAL DEPENDENCIES ({asset.dependencies.length})
          </span>
          {asset.dependencies.length === 0 ? (
            <p className="text-[#8492A6] italic text-[11px]">No upstream single points of failure detected (Root Source Node).</p>
          ) : (
            <div className="space-y-1.5">
              {asset.dependencies.map((depId, idx) => (
                <div key={idx} className="p-2 rounded bg-[#0A0E14] border border-[#202B38] flex items-center justify-between">
                  <span className="text-[#35D6C5] font-mono">{depId}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#202B38] text-[#8492A6]">HARD LINK</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-2 space-y-2">
          {onViewCascading && (
            <button
              onClick={() => {
                onViewCascading(asset);
                onClose();
              }}
              className="w-full py-2 px-3 rounded bg-[#8B7CFF]/15 border border-[#8B7CFF]/40 hover:bg-[#8B7CFF]/25 text-[#8B7CFF] font-semibold flex items-center justify-center gap-2 transition-all shadow-panel"
            >
              <Activity className="w-4 h-4" />
              ANALYZE CASCADING FAILURE PATH
            </button>
          )}

          {onTriggerSimulation && (
            <button
              onClick={() => {
                onTriggerSimulation(asset);
                onClose();
              }}
              className="w-full py-2 px-3 rounded bg-[#35D6C5] hover:bg-[#35D6C5]/90 text-[#080B10] font-semibold flex items-center justify-center gap-2 transition-all shadow-panel"
            >
              <Play className="w-4 h-4 fill-current" />
              RUN WHAT-IF CONTINGENCY SIMULATION
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
