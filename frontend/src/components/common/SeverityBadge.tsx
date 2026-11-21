import React from 'react';
import { SeverityLevel } from '../../types';

export const SeverityBadge: React.FC<{ severity: SeverityLevel }> = ({ severity }) => {
  const getStyle = () => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-[#FF5263]/15 text-[#FF5263] border-[#FF5263]/40 shadow-[0_0_8px_rgba(255,82,99,0.25)]';
      case 'HIGH':
        return 'bg-[#F5B942]/15 text-[#F5B942] border-[#F5B942]/40';
      case 'MEDIUM':
        return 'bg-[#8B7CFF]/15 text-[#8B7CFF] border-[#8B7CFF]/40';
      case 'LOW':
      default:
        return 'bg-[#35D6C5]/15 text-[#35D6C5] border-[#35D6C5]/40';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold border ${getStyle()}`}>
      {severity}
    </span>
  );
};
