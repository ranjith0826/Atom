import React, { useState } from 'react';
import { RecoveryPlan } from '../types';
import { api } from '../services/api';
import { Workflow, CheckCircle2, Clock, ShieldCheck, Play, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface RecoveryPlanningViewProps {
  recoveryPlans: RecoveryPlan[];
  onRefresh: () => void;
}

export const RecoveryPlanningView: React.FC<RecoveryPlanningViewProps> = ({
  recoveryPlans,
  onRefresh,
}) => {
  const [plans, setPlans] = useState<RecoveryPlan[]>(recoveryPlans);
  const [isProcessing, setIsProcessing] = useState(false);

  const plan = plans[0];

  const handleApprove = async () => {
    setIsProcessing(true);
    await api.approveRecoveryPlan(plan.id, 'Commander B. Vance');
    plan.status = 'APPROVED';
    plan.approvedBy = 'Commander B. Vance';
    setIsProcessing(false);
    onRefresh();
  };

  const handleExecute = async () => {
    setIsProcessing(true);
    await api.executeRecoveryPlan(plan.id);
    plan.status = 'EXECUTING';
    plan.steps[1].status = 'IN_PROGRESS';
    setIsProcessing(false);
    onRefresh();
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#35D6C5]/15 text-[#35D6C5] border border-[#35D6C5]/30">
              BUSINESS CONTINUITY & RESTORATION
            </span>
            <span className="text-xs text-[#8492A6]">
              ISO 22301 COMPLIANT PLAYBOOK ORCHESTRATION
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            AUTONOMOUS RECOVERY PLANNING & RESTORATION VERIFICATION
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 font-sans">
            Synthesizes dependency-aware restoration workflows, tracks strict RTO/RPO targets, and verifies operational SLO restoration.
          </p>
        </div>
      </div>

      {/* RTO / RPO Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-[#111923] border border-[#202B38]">
          <span className="text-[#8492A6] text-[10px] uppercase block">TARGET RTO (MAX ALLOWED)</span>
          <span className="text-xl font-bold text-[#E8EDF5] mt-1 block">{plan?.targetRtoHours || 2.0} Hours</span>
          <span className="text-[10px] text-[#35D6C5]">Recovery Time Objective</span>
        </div>
        <div className="p-3 rounded-lg bg-[#111923] border border-[#202B38]">
          <span className="text-[#8492A6] text-[10px] uppercase block">TARGET RPO (DATA LOSS)</span>
          <span className="text-xl font-bold text-[#E8EDF5] mt-1 block">{plan?.targetRpoMinutes || 0.5} Minutes</span>
          <span className="text-[10px] text-[#35D6C5]">Zero Data Loss Ledger Sync</span>
        </div>
        <div className="p-3 rounded-lg bg-[#111923] border border-[#202B38]">
          <span className="text-[#8492A6] text-[10px] uppercase block">ESTIMATED RESTORATION</span>
          <span className="text-xl font-bold text-[#35C98A] mt-1 block">{plan?.estimatedRestorationHours || 1.4} Hours</span>
          <span className="text-[10px] text-[#35C98A]">Ahead of RTO Deadline</span>
        </div>
        <div className="p-3 rounded-lg bg-[#111923] border border-[#35C98A]/40">
          <span className="text-[#8492A6] text-[10px] uppercase block">BACKUP READINESS</span>
          <span className="text-xl font-bold text-[#35C98A] mt-1 block">{plan?.backupReadinessPct || 96.8}%</span>
          <span className="text-[10px] text-[#35C98A]">16 Redundant Flywheels Ready</span>
        </div>
      </div>

      {/* Active Recovery Plan Card */}
      {plan && (
        <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#202B38]">
            <div>
              <span className="text-xs text-[#35D6C5] font-bold">ACTIVE RESTORATION PLAN: {plan.id.toUpperCase()}</span>
              <h2 className="text-base font-bold text-[#E8EDF5] font-sans mt-0.5">{plan.title}</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded text-xs font-bold border ${
                plan.status === 'APPROVED' ? 'bg-[#35C98A]/20 text-[#35C98A] border-[#35C98A]/40' :
                plan.status === 'EXECUTING' ? 'bg-[#35D6C5]/20 text-[#35D6C5] border-[#35D6C5]/40 animate-pulse' :
                'bg-[#F5B942]/20 text-[#F5B942] border-[#F5B942]/40'
              }`}>
                STATUS: {plan.status}
              </span>

              {plan.status === 'READY_FOR_APPROVAL' && (
                <button
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="px-4 py-1.5 rounded bg-[#35D6C5] hover:bg-[#35D6C5]/90 text-[#080B10] font-bold text-xs"
                >
                  COMMANDER AUTHORIZE
                </button>
              )}

              {plan.status === 'APPROVED' && (
                <button
                  onClick={handleExecute}
                  disabled={isProcessing}
                  className="px-4 py-1.5 rounded bg-[#35C98A] hover:bg-[#35C98A]/90 text-[#080B10] font-bold text-xs flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  DISPATCH RECOVERY SEQUENCE
                </button>
              )}
            </div>
          </div>

          {/* Sequential Step Verification Checklist */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase text-[#8492A6] block tracking-wider">
              SEQUENTIAL DEPENDENCY-AWARE RESTORATION CHECKLIST
            </span>

            {plan.steps.map(step => (
              <div
                key={step.id}
                className="p-3 rounded bg-[#0A0E14] border border-[#202B38] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#16202C] border border-[#202B38] flex items-center justify-center font-bold text-xs text-[#35D6C5]">
                    {step.sequenceOrder}
                  </span>
                  <div>
                    <span className="text-[#E8EDF5] font-sans text-xs font-medium block">{step.title}</span>
                    <span className="text-[10px] text-[#8492A6]">Team: {step.responsibleTeam}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    step.status === 'COMPLETED' ? 'bg-[#35C98A]/20 text-[#35C98A]' :
                    step.status === 'IN_PROGRESS' ? 'bg-[#F5B942]/20 text-[#F5B942] animate-pulse' :
                    'bg-[#202B38] text-[#8492A6]'
                  }`}>
                    {step.status}
                  </span>
                  {step.verified && (
                    <span className="text-[#35C98A] flex items-center gap-1 text-[10px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
