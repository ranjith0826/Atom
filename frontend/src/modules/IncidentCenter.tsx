import React, { useState } from 'react';
import { Incident } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { 
  Flame, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  FileText, 
  Activity, 
  Users, 
  AlertTriangle 
} from 'lucide-react';

interface IncidentCenterProps {
  incidents: Incident[];
  onApproveIncident: (incidentId: string) => void;
}

export const IncidentCenter: React.FC<IncidentCenterProps> = ({
  incidents,
  onApproveIncident,
}) => {
  const [selectedIncident, setSelectedIncident] = useState<Incident>(incidents[0]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#FF5263]/15 text-[#FF5263] border border-[#FF5263]/30">
              TACTICAL INCIDENT MANAGEMENT
            </span>
            <span className="text-xs font-mono text-[#8492A6]">
              {incidents.length} TOTAL INCIDENTS • AUDITABLE WORKFLOW
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            INCIDENT RESPONSE & ROOT CAUSE RESOLUTION
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 font-sans">
            Orchestrates emergency multi-disciplinary response teams, root cause investigations, and recovery authorization.
          </p>
        </div>
      </div>

      {/* Main Incident Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Incident List (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8492A6] block">
            INCIDENT LOG ({incidents.length})
          </span>
          <div className="space-y-2">
            {incidents.map(inc => {
              const isSelected = selectedIncident.id === inc.id;
              return (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#16202C] border-[#FF5263] shadow-md'
                      : 'bg-[#111923] border-[#202B38] hover:border-[#FF5263]/40'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#FF5263] font-bold">{inc.incidentNumber}</span>
                    <SeverityBadge severity={inc.severity} />
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-[#E8EDF5] font-sans">{inc.title}</h3>
                  <div className="mt-2 flex items-center justify-between text-xs font-mono text-[#8492A6]">
                    <span>{inc.assignedTeam}</span>
                    <StatusBadge status={inc.status} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Incident Details & Workflow (7 cols) */}
        <div className="lg:col-span-7 space-y-3 font-mono text-xs">
          <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#202B38]">
              <div>
                <span className="text-[#FF5263] font-bold text-sm">{selectedIncident.incidentNumber}</span>
                <h2 className="text-base font-bold text-[#E8EDF5] font-sans mt-0.5">{selectedIncident.title}</h2>
              </div>
              <SeverityBadge severity={selectedIncident.severity} />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">AFFECTED ASSETS</span>
                <span className="text-sm font-bold text-[#FF5263]">{selectedIncident.affectedAssetNames.length} Nodes</span>
              </div>
              <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">FINANCIAL EXPOSURE</span>
                <span className="text-sm font-bold text-[#E8EDF5]">
                  ${(selectedIncident.financialExposurePerHour / 1000).toFixed(0)}k/hr
                </span>
              </div>
              <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">RECOVERY APPROVAL</span>
                <span className={`text-xs font-bold ${selectedIncident.recoveryApprovalStatus === 'APPROVED' ? 'text-[#35C98A]' : 'text-[#F5B942]'}`}>
                  {selectedIncident.recoveryApprovalStatus}
                </span>
              </div>
            </div>

            {/* Root Cause Analysis */}
            <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
              <span className="text-[#8492A6] text-[10px] uppercase block mb-1">DETERMINED ROOT CAUSE:</span>
              <p className="text-[#E8EDF5] font-sans text-xs leading-relaxed">{selectedIncident.rootCause}</p>
            </div>

            {/* AI Recovery Recommendation & Approval Box */}
            <div className="p-3 rounded bg-[#0A0E14] border border-[#8B7CFF]/40 space-y-2">
              <span className="text-[#8B7CFF] text-[10px] uppercase block font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI AGENT SUGGESTED MITIGATION PLAYBOOK:
              </span>
              <p className="text-[#E8EDF5] font-sans text-xs">{selectedIncident.aiSuggestedMitigation}</p>

              {selectedIncident.recoveryApprovalStatus === 'PENDING' && (
                <div className="mt-3 pt-2 border-t border-[#202B38] flex items-center justify-between">
                  <span className="text-[11px] text-[#F5B942]">Requires Commander Authorization</span>
                  <button
                    onClick={() => onApproveIncident(selectedIncident.id)}
                    className="px-4 py-2 rounded bg-[#35C98A] hover:bg-[#35C98A]/90 text-[#080B10] font-bold text-xs shadow-md"
                  >
                    AUTHORIZE & EXECUTE RESTORATION
                  </button>
                </div>
              )}
            </div>

            {/* Timeline Stream */}
            <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
              <span className="text-[#8492A6] text-[10px] uppercase block mb-2">AUDITABLE EVENT TIMELINE:</span>
              <div className="space-y-2">
                {selectedIncident.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="text-[#35D6C5] font-mono shrink-0">{item.time}</span>
                    <div>
                      <div className="font-semibold text-[#E8EDF5] font-sans">{item.title}</div>
                      <div className="text-[#8492A6] font-sans text-[11px]">{item.description}</div>
                      <span className="text-[10px] text-[#526071]">{item.actor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
