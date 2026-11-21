import React, { useState } from 'react';
import { AuditEvent } from '../types';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { ScrollText, CheckCircle, ShieldCheck, Key, Lock, Settings, FileCheck } from 'lucide-react';

interface GovernanceViewProps {
  auditLogs: AuditEvent[];
}

export const GovernanceView: React.FC<GovernanceViewProps> = ({ auditLogs }) => {
  const [activeTab, setActiveTab] = useState<'AUDIT' | 'COMPLIANCE' | 'SETTINGS'>('AUDIT');

  const complianceStandards = [
    { name: 'ISO 22301:2019', desc: 'Security and Resilience — Business Continuity Management Systems', status: '100% COMPLIANT', lastAudit: '2026-10-14' },
    { name: 'NERC CIP (002-014)', desc: 'Critical Infrastructure Protection Standards for Bulk Power Systems', status: '100% COMPLIANT', lastAudit: '2026-11-01' },
    { name: 'SOC 2 Type II', desc: 'Trust Services Criteria: Security, Availability, and Confidentiality', status: 'AUDITED & CERTIFIED', lastAudit: '2026-09-22' },
    { name: 'NIST SP 800-160 v1r1', desc: 'Engineering Trustworthy Secure and Resilient Systems', status: 'ACTIVE ATTESTATION', lastAudit: '2026-11-10' },
  ];

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#35D6C5]/15 text-[#35D6C5] border border-[#35D6C5]/30">
              ENTERPRISE GOVERNANCE
            </span>
            <span className="text-xs text-[#8492A6]">
              CRYPTOGRAPHICALLY IMMUTABLE AUDIT TRAIL
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            GOVERNANCE, AUDIT LOGS & COMPLIANCE FRAMEWORK
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 font-sans">
            Maintains non-repudiation records of human authorizations, AI agent decisions, policy overrides, and global compliance certifications.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-[#111923] p-1 rounded border border-[#202B38]">
          {(['AUDIT', 'COMPLIANCE', 'SETTINGS'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded transition-all font-bold ${
                activeTab === tab ? 'bg-[#202B38] text-[#35D6C5]' : 'text-[#8492A6] hover:text-[#E8EDF5]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'AUDIT' && (
        <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
            <span className="text-xs font-semibold uppercase text-[#E8EDF5] flex items-center gap-1.5">
              <ScrollText className="w-4 h-4 text-[#35D6C5]" />
              IMMUTABLE AUDIT EVENT STREAM ({auditLogs.length} EVENTS)
            </span>
            <span className="text-[10px] text-[#8492A6]">HMAC SHA-256 SIGNED</span>
          </div>

          <div className="space-y-2">
            {auditLogs.map(log => (
              <div
                key={log.id}
                className="p-3 rounded bg-[#0A0E14] border border-[#202B38] flex flex-col md:flex-row md:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#35D6C5] font-bold">{log.actor}</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#202B38] text-[#8492A6] text-[10px]">
                      {log.category}
                    </span>
                    <SeverityBadge severity={log.riskLevel} />
                  </div>
                  <p className="text-[11px] text-[#E8EDF5] font-sans mt-0.5">{log.description}</p>
                  <span className="text-[10px] text-[#526071]">Target: {log.targetResource}</span>
                </div>

                <div className="text-right text-[10px] text-[#8492A6] shrink-0">
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'COMPLIANCE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceStandards.map((std, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-2">
              <div className="flex items-start justify-between">
                <span className="font-bold text-sm text-[#E8EDF5]">{std.name}</span>
                <span className="px-2 py-0.5 rounded bg-[#35C98A]/20 text-[#35C98A] font-bold text-[10px]">
                  {std.status}
                </span>
              </div>
              <p className="text-[11px] text-[#8492A6] font-sans">{std.desc}</p>
              <div className="pt-2 text-[10px] text-[#526071] border-t border-[#202B38]">
                Last External Recertification: {std.lastAudit}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'SETTINGS' && (
        <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-4 max-w-2xl">
          <span className="text-xs font-bold uppercase text-[#E8EDF5] block">
            INTEGRATION CREDENTIALS & SENSOR HOOKS
          </span>

          <div className="space-y-3">
            <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
              <div className="flex items-center justify-between">
                <span className="text-[#E8EDF5] font-semibold">SPRING BOOT CORE BACKEND</span>
                <span className="text-[#35C98A] text-[10px]">CONNECTED :8080</span>
              </div>
              <span className="text-[10px] text-[#8492A6]">Target: http://localhost:8080/api/v1</span>
            </div>

            <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
              <div className="flex items-center justify-between">
                <span className="text-[#E8EDF5] font-semibold">POSTGRESQL & POSTGIS REPOSITORY</span>
                <span className="text-[#35C98A] text-[10px]">HEALTHY POOL</span>
              </div>
              <span className="text-[10px] text-[#8492A6]">Spatial index on infrastructure lat/long nodes</span>
            </div>

            <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
              <div className="flex items-center justify-between">
                <span className="text-[#E8EDF5] font-semibold">NEO4J GRAPH RELATION ENGINE</span>
                <span className="text-[#35C98A] text-[10px]">CYPHER QUERY ENGINE ACTIVE</span>
              </div>
              <span className="text-[10px] text-[#8492A6]">Bolt protocol port 7687</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
