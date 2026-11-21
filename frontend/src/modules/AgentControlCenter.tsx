import React, { useState } from 'react';
import { AIAgent } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Activity, 
  Workflow, 
  Clock, 
  Cpu, 
  Database, 
  Layers, 
  AlertTriangle,
  Play
} from 'lucide-react';

interface AgentControlCenterProps {
  agents: AIAgent[];
  onApproveAction: (agentId: string, actionId: string) => void;
}

export const AgentControlCenter: React.FC<AgentControlCenterProps> = ({
  agents,
  onApproveAction,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(agents[0]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const workflowSteps = [
    'DETECT', 'INVESTIGATE', 'ANALYZE', 'PREDICT', 'SIMULATE', 'RECOMMEND', 'APPROVE', 'EXECUTE', 'VERIFY'
  ];

  const filteredAgents = agents.filter(a => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'APPROVAL') return a.requiresHumanApproval;
    return a.status === filterStatus;
  });

  return (
    <div className="space-y-4">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30">
              MULTI-AGENT COGNITIVE MESH
            </span>
            <span className="text-xs font-mono text-[#35D6C5]">
              8 SPECIALIZED AUTONOMOUS OPERATORS
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            AI AGENT ORCHESTRATION & CONTROL CENTER
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 font-sans">
            Coordinates autonomous agents through controlled tools, transparent decision records, and enforced human-in-the-loop governance.
          </p>
        </div>

        {/* Global Agent Stats */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded bg-[#111923] border border-[#202B38] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#35C98A] animate-pulse" />
            <span className="text-[#8492A6]">ONLINE:</span>
            <span className="text-[#35C98A] font-bold">18/20</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-[#FF5263]/15 border border-[#FF5263]/30 text-[#FF5263] flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>1 APPROVAL PENDING</span>
          </div>
        </div>
      </div>

      {/* Workflow Sequence Ribbon */}
      <div className="p-3 rounded-lg bg-[#111923] border border-[#202B38] overflow-x-auto">
        <span className="text-[10px] font-mono uppercase text-[#8492A6] block mb-2 tracking-wider">
          AGENT ORCHESTRATION PIPELINE LIFECYCLE
        </span>
        <div className="flex items-center gap-1 min-w-[700px]">
          {workflowSteps.map((step, idx) => (
            <React.Fragment key={step}>
              <div
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 ${
                  step === 'APPROVE'
                    ? 'bg-[#FF5263]/20 text-[#FF5263] border border-[#FF5263]/40'
                    : step === 'RECOMMEND' || step === 'SIMULATE'
                    ? 'bg-[#8B7CFF]/20 text-[#8B7CFF] border border-[#8B7CFF]/40'
                    : 'bg-[#0A0E14] text-[#8492A6] border border-[#202B38]'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-[#202B38] text-[10px] flex items-center justify-center text-[#E8EDF5]">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
              {idx < workflowSteps.length - 1 && (
                <div className="w-3 h-0.5 bg-[#202B38]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Agent Grid & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Agent Cards Roster (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono pb-1">
            <span className="text-[#8492A6]">SPECIALIZED AGENTS ({filteredAgents.length})</span>
            <div className="flex items-center gap-1">
              {['ALL', 'APPROVAL', 'ACTIVE', 'IDLE'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    filterStatus === f ? 'bg-[#35D6C5] text-[#080B10] font-bold' : 'text-[#8492A6] bg-[#111923]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filteredAgents.map(agent => {
              const isSelected = selectedAgent.id === agent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#16202C] border-[#8B7CFF] shadow-[0_0_15px_rgba(139,124,255,0.12)]'
                      : 'bg-[#111923] border-[#202B38] hover:border-[#8B7CFF]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0A0E14] border border-[#202B38] text-[#8B7CFF]">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#E8EDF5]">{agent.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0A0E14] text-[#8492A6]">
                            {agent.code}
                          </span>
                        </div>
                        <span className="text-xs text-[#8492A6] font-sans">{agent.role}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 font-mono text-xs">
                      <StatusBadge status={agent.status} size="sm" />
                      <span className="text-[10px] text-[#35D6C5] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> {agent.confidenceScore}% Confidence
                      </span>
                    </div>
                  </div>

                  {/* Current Active Task */}
                  <div className="mt-2.5 p-2 rounded bg-[#0A0E14] border border-[#202B38] text-xs font-mono text-[#8492A6]">
                    <span className="text-[#35D6C5] font-semibold text-[10px] block">CURRENT ASSIGNED TASK:</span>
                    <span className="text-[#E8EDF5] font-sans text-xs">{agent.currentTask}</span>
                  </div>

                  {/* Approval Banner if pending */}
                  {agent.requiresHumanApproval && agent.status === 'AWAITING_APPROVAL' && (
                    <div className="mt-2 p-2 rounded bg-[#FF5263]/15 border border-[#FF5263]/40 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#FF5263] font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> AWAITING COMMANDER AUTHORIZATION
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onApproveAction(agent.id, 'REC-2026-881');
                        }}
                        className="px-2.5 py-1 rounded bg-[#35D6C5] hover:bg-[#35D6C5]/90 text-[#080B10] font-bold text-[10px]"
                      >
                        APPROVE NOW
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Agent Deep Telemetry & Action Log (5 cols) */}
        <div className="lg:col-span-5 space-y-3 font-mono text-xs">
          <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
              <span className="text-[#8B7CFF] font-bold uppercase tracking-wider">
                AGENT DECISION RECORD
              </span>
              <span className="text-[#8492A6] text-[10px]">ID: {selectedAgent.id}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#E8EDF5]">{selectedAgent.name}</h3>
              <p className="text-xs text-[#8492A6] font-sans">{selectedAgent.role}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">CONFIDENCE SCORE</span>
                <span className="text-lg font-bold text-[#35D6C5]">{selectedAgent.confidenceScore}%</span>
              </div>
              <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">HUMAN GATE POLICY</span>
                <span className="text-xs font-bold text-[#FF5263]">
                  {selectedAgent.requiresHumanApproval ? 'MANDATORY APPROVAL' : 'AUTONOMOUS SAFE'}
                </span>
              </div>
            </div>

            {/* Connected Data Sources */}
            <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
              <span className="text-[#8492A6] text-[10px] uppercase block mb-1.5 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#35D6C5]" />
                ATTACHED LIVE SENSORS & FEEDS ({selectedAgent.connectedSources.length})
              </span>
              <div className="space-y-1">
                {selectedAgent.connectedSources.map((src, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px] text-[#E8EDF5]">
                    <span>{src}</span>
                    <span className="text-[#35C98A] text-[10px]">HEALTHY</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action History Log */}
            <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
              <span className="text-[#8492A6] text-[10px] uppercase block mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8B7CFF]" />
                RECENT EXECUTION AUDIT LOG
              </span>
              <div className="space-y-2">
                {selectedAgent.actionLog.map((log, idx) => (
                  <div key={idx} className="pb-2 border-b border-[#202B38] last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[#35D6C5] font-semibold">{log.action}</span>
                      <span className="text-[#526071] text-[10px]">{log.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-[#8492A6] font-sans mt-0.5">{log.details}</p>
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
