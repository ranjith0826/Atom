import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  isAlert?: boolean;
  icon: any;
  sparklineData?: number[];
  color?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive,
  isAlert,
  icon: Icon,
  sparklineData = [65, 70, 68, 74, 82, 79, 85, 88, 92],
  color = '#35D6C5',
}) => {
  // Simple SVG sparkline
  const max = Math.max(...sparklineData);
  const min = Math.min(...sparklineData);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={`relative p-4 rounded-lg bg-[#111923] border ${isAlert ? 'border-[#FF5263]/40 shadow-[0_0_15px_rgba(255,82,99,0.15)]' : 'border-[#202B38]'} hover:border-[#35D6C5]/40 transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <span className="text-xs uppercase font-mono tracking-wider text-[#8492A6]">{title}</span>
        <div className={`p-1.5 rounded bg-[#0A0E14] border border-[#202B38] text-[#35D6C5] ${isAlert ? 'text-[#FF5263]' : ''}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-2xl font-semibold tracking-tight font-mono text-[#E8EDF5]">
          {value}
        </div>
        
        {/* Sparkline */}
        <div className="w-20 h-6">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            <polyline
              fill="none"
              stroke={isAlert ? '#FF5263' : color}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      {(subtitle || change) && (
        <div className="mt-2 flex items-center justify-between text-xs text-[#8492A6]">
          <span>{subtitle}</span>
          {change && (
            <span className={`font-mono font-medium ${isPositive ? 'text-[#35C98A]' : isAlert ? 'text-[#FF5263]' : 'text-[#8492A6]'}`}>
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
