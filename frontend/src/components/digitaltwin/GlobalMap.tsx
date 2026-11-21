import React, { useState } from 'react';
import { InfrastructureAsset } from '../../types';
import { Layers, ZoomIn, ZoomOut, Compass, ShieldAlert, Cpu, Radio } from 'lucide-react';

interface GlobalMapProps {
  assets: InfrastructureAsset[];
  selectedAsset: InfrastructureAsset | null;
  onSelectAsset: (asset: InfrastructureAsset) => void;
  selectedRegion?: string;
}

export const GlobalMap: React.FC<GlobalMapProps> = ({
  assets,
  selectedAsset,
  onSelectAsset,
  selectedRegion = 'GLOBAL'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [showThreatOverlay, setShowThreatOverlay] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Filter assets based on category & region
  const filteredAssets = assets.filter(a => {
    const matchesCat = activeCategory === 'ALL' || a.category === activeCategory;
    const matchesReg = selectedRegion === 'GLOBAL' || a.region === selectedRegion;
    return matchesCat && matchesReg;
  });

  // Convert lat/long to map percentage coordinates (Equirectangular projection)
  const getCoordinates = (lat: number, lon: number) => {
    const x = ((lon + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x: Math.max(3, Math.min(97, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CRITICAL':
      case 'OFFLINE':
        return '#FF5263';
      case 'DEGRADED':
        return '#F5B942';
      case 'HEALTHY':
      default:
        return '#35D6C5';
    }
  };

  return (
    <div className="relative w-full h-[520px] rounded-lg bg-[#0A0E14] border border-[#202B38] overflow-hidden cyber-grid select-none group">
      {/* Top Map HUD Controls */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <div className="px-2.5 py-1 rounded bg-[#111923]/90 backdrop-blur border border-[#202B38] flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#35D6C5] animate-ping" />
          <span className="text-[#8492A6]">DIGITAL TWIN:</span>
          <span className="text-[#35D6C5] font-semibold">LIVE GLOBAL SYNC</span>
          <span className="text-[#526071]">|</span>
          <span className="text-[#8492A6]">{filteredAssets.length} ACTIVE NODES</span>
        </div>

        <button
          onClick={() => setShowThreatOverlay(!showThreatOverlay)}
          className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-all border ${
            showThreatOverlay
              ? 'bg-[#FF5263]/15 border-[#FF5263]/40 text-[#FF5263]'
              : 'bg-[#111923]/80 border-[#202B38] text-[#8492A6] hover:text-[#E8EDF5]'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          THREAT OVERLAY {showThreatOverlay ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Top Right Category Filters */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-[#111923]/90 backdrop-blur p-1 rounded-md border border-[#202B38] text-xs font-mono">
        {['ALL', 'DATA_CENTER', 'POWER_GRID', 'PORT', 'TELECOM', 'CLOUD'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2 py-0.5 rounded transition-all ${
              activeCategory === cat
                ? 'bg-[#35D6C5] text-[#080B10] font-semibold shadow-sm'
                : 'text-[#8492A6] hover:text-[#E8EDF5]'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* SVG Map Canvas with World Vector Silhouettes & Cables */}
      <svg
        className="w-full h-full transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#080B10" />
            <stop offset="100%" stopColor="#0D121A" />
          </linearGradient>
          <linearGradient id="cable-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#35D6C5" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#8B7CFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#35D6C5" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="threat-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF5263" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#FF5263" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FF5263" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1000" height="500" fill="url(#grid-grad)" />

        {/* Continental Outlines (Stylized enterprise geometry) */}
        <g fill="#141E2B" stroke="#223142" strokeWidth="0.8" opacity="0.85">
          {/* North America */}
          <path d="M 120,70 L 260,60 L 310,110 L 270,160 L 240,190 L 200,240 L 170,240 L 150,180 L 110,130 Z" />
          {/* South America */}
          <path d="M 230,260 L 310,270 L 340,340 L 290,440 L 250,440 L 220,330 Z" />
          {/* Europe */}
          <path d="M 450,70 L 550,60 L 570,110 L 530,160 L 470,150 L 440,110 Z" />
          {/* Africa */}
          <path d="M 460,180 L 560,180 L 580,260 L 540,380 L 490,380 L 460,250 Z" />
          {/* Asia */}
          <path d="M 570,60 L 850,70 L 890,160 L 820,240 L 740,240 L 680,180 L 580,140 Z" />
          {/* Australia */}
          <path d="M 760,310 L 860,310 L 880,390 L 780,410 L 740,360 Z" />
        </g>

        {/* Global Subsea Telecom & Critical Backbone Cables */}
        <g stroke="url(#cable-glow)" strokeWidth="1.5" strokeDasharray="4 2" fill="none" opacity="0.75">
          {/* Transatlantic Ashburn <-> Frankfurt */}
          <path d="M 285,140 Q 390,95 519,138" />
          {/* Europe <-> Asia Transit */}
          <path d="M 519,138 Q 660,150 832,152" />
          {/* Transpacific Tokyo <-> US West */}
          <path d="M 832,152 Q 950,110 990,120" />
          <path d="M 10,120 Q 90,130 285,140" />
          {/* Asia Intra-regional Tokyo <-> Singapore <-> Hsinchu */}
          <path d="M 832,152 L 780,225 L 755,270" />
          {/* North America <-> South America Transit */}
          <path d="M 285,140 Q 295,220 305,340" />
        </g>

        {/* Threat Overlays (Pulsing high-risk zones) */}
        {showThreatOverlay && (
          <g>
            {/* Frankfurt/Rhein-Main Threat Aura */}
            <circle cx="519" cy="138" r="42" fill="url(#threat-aura)">
              <animate attributeName="r" values="32;46;32" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Taiwan Strait Supply Risk */}
            <circle cx="780" cy="180" r="34" fill="url(#threat-aura)">
              <animate attributeName="r" values="24;36;24" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* Dynamic Nodes (Interactive Infrastructure Assets) */}
        {filteredAssets.map(asset => {
          const { x, y } = getCoordinates(asset.latitude, asset.longitude);
          const cx = (x / 100) * 1000;
          const cy = (y / 100) * 500;
          const isSelected = selectedAsset?.id === asset.id;
          const statusColor = getStatusColor(asset.healthStatus);

          return (
            <g
              key={asset.id}
              className="cursor-pointer transition-transform duration-150 hover:scale-125"
              onClick={() => onSelectAsset(asset)}
            >
              {/* Pulse ripple for critical/degraded */}
              {asset.healthStatus !== 'HEALTHY' && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="14"
                  fill="none"
                  stroke={statusColor}
                  strokeWidth="1.2"
                  opacity="0.6"
                >
                  <animate attributeName="r" values="6;20" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Selection Halo */}
              {isSelected && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="16"
                  fill="none"
                  stroke="#35D6C5"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${cx} ${cy}`}
                    to={`360 ${cx} ${cy}`}
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Node Outer Ring */}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? '8' : '6'}
                fill="#0A0E14"
                stroke={statusColor}
                strokeWidth={isSelected ? '2.5' : '1.8'}
              />

              {/* Node Core Center */}
              <circle
                cx={cx}
                cy={cy}
                r="3"
                fill={statusColor}
              />

              {/* Monospace Code Label on Hover or Select */}
              <text
                x={cx + 10}
                y={cy + 4}
                fill={isSelected ? '#35D6C5' : '#E8EDF5'}
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
                fontWeight={isSelected ? 'bold' : 'normal'}
                className="pointer-events-none select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
              >
                {asset.code}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Bottom Map HUD Legend & Zoom Controls */}
      <div className="absolute bottom-3 left-3 z-20 flex items-center gap-4 bg-[#111923]/90 backdrop-blur px-3 py-1.5 rounded border border-[#202B38] text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#35C98A]" />
          <span className="text-[#8492A6]">HEALTHY</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5B942]" />
          <span className="text-[#8492A6]">DEGRADED</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5263] animate-pulse" />
          <span className="text-[#8492A6]">CRITICAL</span>
        </div>
        <span className="text-[#526071]">|</span>
        <div className="text-[#8492A6] flex items-center gap-1">
          <Radio className="w-3.5 h-3.5 text-[#35D6C5]" />
          TELEMETRY: <span className="text-[#E8EDF5]">100ms L1 REFRESH</span>
        </div>
      </div>

      {/* Map Zoom Controls */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-[#111923]/90 backdrop-blur p-1 rounded border border-[#202B38]">
        <button
          onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
          className="p-1.5 rounded hover:bg-[#202B38] text-[#8492A6] hover:text-[#E8EDF5]"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="px-2 py-1 text-[11px] font-mono text-[#8492A6] hover:text-[#E8EDF5] hover:bg-[#202B38] rounded"
          title="Reset Zoom"
        >
          RESET
        </button>
        <button
          onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
          className="p-1.5 rounded hover:bg-[#202B38] text-[#8492A6] hover:text-[#E8EDF5]"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
