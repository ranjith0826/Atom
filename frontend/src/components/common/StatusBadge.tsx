import React from 'react';
import { HealthStatus, AgentStatus } from '../../types';

interface StatusBadgeProps {
  status: HealthStatus | AgentStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyle = () => {
    switch (status) {
      case 'HEALTHY':
      case 'ACTIVE':
      case 'RESTORED':
      case 'VERIFIED':
      case 'COMPLETED':
      case 'SUCCESS':
        return 'bg-[#35C98A]/15 text-[#35C98A] border-[#35C98A]/30';
      case 'DEGRADED':
      case 'ANALYZING':
      case 'SIMULATING':
      case 'INVESTIGATING':
      case 'IN_PROGRESS':
      case 'WARNING':
        return 'bg-[#F5B942]/15 text-[#F5B942] border-[#F5B942]/30';
      case 'CRITICAL':
      case 'OFFLINE':
      case 'AWAITING_APPROVAL':
      case 'FAILED':
        return 'bg-[#FF5263]/15 text-[#FF5263] border-[#FF5263]/30 animate-pulse';
      case 'MAINTENANCE':
      case 'IDLE':
      case 'DRAFT':
        return 'bg-[#8492A6]/15 text-[#8492A6] border-[#8492A6]/30';
      default:
        return 'bg-[#202B38] text-[#8492A6] border-[#202B38]';
    }
  };

  const pad = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono font-medium rounded border ${pad} ${getStyle()}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'HEALTHY' || status === 'ACTIVE' ? 'bg-[#35C98A]' :
        status === 'CRITICAL' || status === 'OFFLINE' ? 'bg-[#FF5263]' :
        status === 'DEGRADED' || status === 'WARNING' ? 'bg-[#F5B942]' : 'bg-[#8492A6]'
      }`} />
      {status.replace(/_/g, ' ')}
    </span>
  );
};
