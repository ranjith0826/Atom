import React from 'react';
import { ShieldAlert, ShieldCheck, Lock, Radio, AlertTriangle, Bug, Server, Eye } from 'lucide-react';

export const CyberResilienceView: React.FC = () => {
  const threats = [
    { id: 'thr-1', name: 'APT-29 BGP Route Prepending Campaign', target: 'Ashburn Peering & DNS Anycast Root', severity: 'HIGH', status: 'INTERCEPTED', cve: 'BGP-ROA-POISON', time: '12m ago' },
    { id: 'thr-2', name: 'SCADA DNP3 Out-of-Band Malformed Packet Probe', target: 'Rhine-Main 380kV Substation RTU', severity: 'CRITICAL', status: 'BLOCKED', cve: 'CVE-2026-4821', time: '28m ago' },
    { id: 'thr-3', name: 'Microarchitectural Side-Channel Flaw in Xeon Cluster', target: 'Frankfurt Campus Alpha Host Node 14', severity: 'MEDIUM', status: 'PATCHED', cve: 'CVE-2026-1194', time: '2h ago' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#FF5263]/15 text-[#FF5263] border border-[#FF5263]/30">
              CYBER-PHYSICAL PERIMETER
            </span>
            <span className="text-xs font-mono text-[#8492A6]">
              ZERO-TRUST OT/IT TELEMETRY • AUTOMATED THREAT INTERCEPT
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            CYBER THREAT INTELLIGENCE & ATTACK SURFACE RESILIENCE
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 font-sans">
            Monitors adversarial network probes, SCADA protocol anomalies, BGP route manipulation, and zero-day vulnerabilities across critical cyber infrastructure.
          </p>
        </div>
      </div>

      {/* Cyber Security KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-lg bg-[#111923] border border-[#202B38]">
          <span className="text-[#8492A6] text-[10px] uppercase block">ZERO-TRUST PERIMETER</span>
          <span className="text-xl font-bold text-[#35C98A] mt-1 block">99.98% CLEAN</span>
          <span className="text-[10px] text-[#8492A6]">0 active breach penetrations</span>
        </div>
        <div className="p-3 rounded-lg bg-[#111923] border border-[#202B38]">
          <span className="text-[#8492A6] text-[10px] uppercase block">BGP ROUTE INTEGRITY</span>
          <span className="text-xl font-bold text-[#35D6C5] mt-1 block">100% RPKI VALID</span>
          <span className="text-[10px] text-[#8492A6]">1 rogue prefix rejected</span>
        </div>
        <div className="p-3 rounded-lg bg-[#111923] border border-[#202B38]">
          <span className="text-[#8492A6] text-[10px] uppercase block">PATCH LATENCY (CRITICAL)</span>
          <span className="text-xl font-bold text-[#8B7CFF] mt-1 block">4.2 HOURS</span>
          <span className="text-[10px] text-[#8492A6]">Automated micro-code rollout</span>
        </div>
        <div className="p-3 rounded-lg bg-[#111923] border border-[#FF5263]/40">
          <span className="text-[#8492A6] text-[10px] uppercase block">ACTIVE CVE EXPOSURES</span>
          <span className="text-xl font-bold text-[#FF5263] mt-1 block">1 CONTAINED</span>
          <span className="text-[10px] text-[#FF5263]">CVE-2026-4821 SCADA RTU</span>
        </div>
      </div>

      {/* Attack Surface & Threat Correlation Stream */}
      <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-3 font-mono text-xs">
        <span className="text-xs font-semibold uppercase text-[#E8EDF5] block">
          REAL-TIME ADVERSARIAL THREAT INTERCEPTION LOG
        </span>

        <div className="space-y-2">
          {threats.map(t => (
            <div key={t.id} className="p-3 rounded bg-[#0A0E14] border border-[#202B38] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#E8EDF5] font-sans">{t.name}</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#202B38] text-[#35D6C5] text-[10px] font-mono">{t.cve}</span>
                </div>
                <p className="text-[11px] text-[#8492A6] mt-0.5">Target: {t.target}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  t.status === 'BLOCKED' ? 'bg-[#35C98A]/20 text-[#35C98A]' : 'bg-[#35D6C5]/20 text-[#35D6C5]'
                }`}>
                  {t.status}
                </span>
                <span className="text-[#526071] text-[10px]">{t.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
