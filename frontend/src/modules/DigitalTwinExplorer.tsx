import React, { useState } from 'react';
import { InfrastructureAsset, DependencyLink } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Network, 
  Layers, 
  Server, 
  Cpu, 
  Share2, 
  Zap, 
  Users, 
  Briefcase, 
  Truck, 
  Compass, 
  Search, 
  ChevronRight, 
  Activity, 
  ShieldAlert 
} from 'lucide-react';

interface DigitalTwinExplorerProps {
  assets: InfrastructureAsset[];
  dependencies: DependencyLink[];
  selectedAsset: InfrastructureAsset | null;
  onSelectAsset: (asset: InfrastructureAsset) => void;
  onAnalyzeCascading: (asset: InfrastructureAsset) => void;
}

export const DigitalTwinExplorer: React.FC<DigitalTwinExplorerProps> = ({
  assets,
  dependencies,
  selectedAsset,
  onSelectAsset,
  onAnalyzeCascading,
}) => {
  const [selectedLayer, setSelectedLayer] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const layers = [
    { id: 'ALL', label: 'All Connected Layers', icon: Layers },
    { id: 'PHYSICAL', label: 'Physical Assets', icon: Server },
    { id: 'SOFTWARE', label: 'Software Systems', icon: Cpu },
    { id: 'NETWORKS', label: 'Networks & Grid', icon: Zap },
    { id: 'SUPPLIERS', label: 'Global Suppliers', icon: Truck },
    { id: 'PROCESSES', label: 'Business Processes', icon: Briefcase },
    { id: 'HUMAN', label: 'Human Operations', icon: Users },
  ];

  const filteredAssets = assets.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#8B7CFF]/10 text-[#8B7CFF] border border-[#8B7CFF]/30">
              CROSS-LAYER TOPOLOGY
            </span>
            <span className="text-xs font-mono text-[#8492A6]">
              6 OPERATIONAL TIERS • {dependencies.length} DEPENDENCY EDGES
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            DIGITAL TWIN EXPLORER
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 font-sans">
            Connected graph representing Physical Assets → Software Systems → Networks → Suppliers → Business Processes → Human Operations.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-[#8492A6] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search twin entities..."
            className="w-full bg-[#111923] border border-[#202B38] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#E8EDF5] placeholder-[#526071] focus:outline-none focus:border-[#35D6C5] font-mono"
          />
        </div>
      </div>

      {/* Cross-Layer Operational Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono">
        {layers.map(layer => {
          const Icon = layer.icon;
          const isSelected = selectedLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setSelectedLayer(layer.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-[#16202C] text-[#35D6C5] border-[#35D6C5]/50 shadow-sm font-semibold'
                  : 'bg-[#111923] text-[#8492A6] border-[#202B38] hover:text-[#E8EDF5] hover:border-[#202B38]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{layer.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Graph & Entity Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Interactive Topological Graph Viewer (8 cols) */}
        <div className="lg:col-span-8 p-4 rounded-lg bg-[#0A0E14] border border-[#202B38] cyber-grid relative min-h-[550px] flex flex-col justify-between">
          {/* Top HUD */}
          <div className="flex items-center justify-between text-xs font-mono z-10">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#111923] border border-[#202B38]">
              <span className="w-2 h-2 rounded-full bg-[#35D6C5]" />
              <span className="text-[#8492A6]">ENGINE:</span>
              <span className="text-[#35D6C5]">NEO4J GRAPH RELATIONSHIP MATRIX</span>
            </div>

            <div className="text-[11px] text-[#8492A6]">
              CLICK ANY NODE TO TRAVERSE BLAST RADIUS
            </div>
          </div>

          {/* SVG Interactive Topology Canvas */}
          <div className="relative w-full h-[450px] my-auto">
            <svg className="w-full h-full" viewBox="0 0 800 450">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#35D6C5" opacity="0.6" />
                </marker>
                <linearGradient id="link-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#35D6C5" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8B7CFF" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {/* Render Connection Edges */}
              {dependencies.map(link => {
                // Static positioning mapped across the visual canvas
                const nodePositions: Record<string, { x: number; y: number }> = {
                  'asset-pwr-01': { x: 120, y: 150 },
                  'asset-fra-01': { x: 280, y: 180 },
                  'asset-rot-01': { x: 440, y: 120 },
                  'asset-tel-01': { x: 280, y: 310 },
                  'asset-pjm-01': { x: 140, y: 340 },
                  'asset-ash-01': { x: 440, y: 280 },
                  'asset-cloud-01': { x: 600, y: 220 },
                  'asset-semi-01': { x: 440, y: 380 },
                  'asset-tokyo-01': { x: 620, y: 360 },
                  'asset-sin-01': { x: 730, y: 380 },
                  'asset-wat-01': { x: 120, y: 410 },
                  'asset-sp-01': { x: 650, y: 90 },
                  'asset-santos-01': { x: 740, y: 140 },
                };

                const s = nodePositions[link.source];
                const t = nodePositions[link.target];
                if (!s || !t) return null;

                const isHighlighted = selectedAsset && (selectedAsset.id === link.source || selectedAsset.id === link.target);

                return (
                  <g key={link.id}>
                    <line
                      x1={s.x}
                      y1={s.y}
                      x2={t.x}
                      y2={t.y}
                      stroke={isHighlighted ? '#35D6C5' : '#202B38'}
                      strokeWidth={isHighlighted ? '2.5' : '1.2'}
                      strokeDasharray={link.criticality === 'HARD' ? 'none' : '4 3'}
                      markerEnd="url(#arrow)"
                    />
                    {isHighlighted && (
                      <circle r="3" fill="#35D6C5">
                        <animateMotion
                          path={`M ${s.x} ${s.y} L ${t.x} ${t.y}`}
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Render Graph Nodes */}
              {assets.map(asset => {
                const nodePositions: Record<string, { x: number; y: number }> = {
                  'asset-pwr-01': { x: 120, y: 150 },
                  'asset-fra-01': { x: 280, y: 180 },
                  'asset-rot-01': { x: 440, y: 120 },
                  'asset-tel-01': { x: 280, y: 310 },
                  'asset-pjm-01': { x: 140, y: 340 },
                  'asset-ash-01': { x: 440, y: 280 },
                  'asset-cloud-01': { x: 600, y: 220 },
                  'asset-semi-01': { x: 440, y: 380 },
                  'asset-tokyo-01': { x: 620, y: 360 },
                  'asset-sin-01': { x: 730, y: 380 },
                  'asset-wat-01': { x: 120, y: 410 },
                  'asset-sp-01': { x: 650, y: 90 },
                  'asset-santos-01': { x: 740, y: 140 },
                };

                const pos = nodePositions[asset.id] || { x: 300, y: 200 };
                const isSelected = selectedAsset?.id === asset.id;
                const statusColor =
                  asset.healthStatus === 'CRITICAL' ? '#FF5263' :
                  asset.healthStatus === 'DEGRADED' ? '#F5B942' : '#35D6C5';

                return (
                  <g
                    key={asset.id}
                    className="cursor-pointer transition-transform hover:scale-110"
                    onClick={() => onSelectAsset(asset)}
                  >
                    {/* Pulsing ring for critical */}
                    {asset.healthStatus === 'CRITICAL' && (
                      <circle cx={pos.x} cy={pos.y} r="24" fill="none" stroke="#FF5263" strokeWidth="1.5">
                        <animate attributeName="r" values="16;32;16" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Node Card Container */}
                    <rect
                      x={pos.x - 55}
                      y={pos.y - 18}
                      width="110"
                      height="36"
                      rx="6"
                      fill="#111923"
                      stroke={isSelected ? '#35D6C5' : statusColor}
                      strokeWidth={isSelected ? '2' : '1.2'}
                      className="filter drop-shadow-md"
                    />

                    {/* Node Text & Code */}
                    <text
                      x={pos.x}
                      y={pos.y - 3}
                      textAnchor="middle"
                      fill="#E8EDF5"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                    >
                      {asset.code}
                    </text>

                    <text
                      x={pos.x}
                      y={pos.y + 11}
                      textAnchor="middle"
                      fill="#8492A6"
                      fontSize="8"
                      fontFamily="sans-serif"
                    >
                      {asset.category.replace('_', ' ')}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom HUD Legend */}
          <div className="flex items-center justify-between p-2 rounded bg-[#111923] border border-[#202B38] text-[11px] font-mono text-[#8492A6]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-[#35D6C5]" /> Data Flow
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-[#F5B942]" /> Power Link
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-[#8B7CFF]" /> Logistics Channel
              </span>
            </div>
            <span>GRAPH ZOOM: 100%</span>
          </div>
        </div>

        {/* Selected Entity Context & Deep Traversal Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {selectedAsset ? (
            <div className="p-4 rounded-lg bg-[#111923] border border-[#35D6C5]/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
                <span className="text-xs font-mono font-semibold text-[#35D6C5]">
                  INSPECTED NODE
                </span>
                <StatusBadge status={selectedAsset.healthStatus} size="sm" />
              </div>

              <div>
                <span className="font-mono text-sm font-bold text-[#E8EDF5]">{selectedAsset.code}</span>
                <h3 className="text-sm font-semibold text-[#E8EDF5] mt-0.5">{selectedAsset.name}</h3>
                <p className="text-xs text-[#8492A6]">{selectedAsset.locationName}</p>
              </div>

              {/* Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                  <span className="text-[#8492A6] text-[10px] block">CRITICALITY TIER</span>
                  <span className="text-sm font-bold text-[#35D6C5]">{selectedAsset.criticality}</span>
                </div>
                <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                  <span className="text-[#8492A6] text-[10px] block">RISK SCORE</span>
                  <span className="text-sm font-bold text-[#FF5263]">{selectedAsset.riskScore}/100</span>
                </div>
                <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                  <span className="text-[#8492A6] text-[10px] block">EXPOSURE / HR</span>
                  <span className="text-sm font-bold text-[#E8EDF5]">
                    ${(selectedAsset.financialExposurePerHour / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="p-2.5 rounded bg-[#0A0E14] border border-[#202B38]">
                  <span className="text-[#8492A6] text-[10px] block">BLAST RADIUS</span>
                  <span className="text-sm font-bold text-[#F5B942]">{selectedAsset.blastRadiusCount} nodes</span>
                </div>
              </div>

              {/* Connected Dependencies */}
              <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38] text-xs font-mono">
                <span className="text-[#8492A6] text-[10px] uppercase block mb-1.5">
                  DIRECT GRAPH DEPENDENCIES ({selectedAsset.dependencies.length})
                </span>
                {selectedAsset.dependencies.length === 0 ? (
                  <p className="text-[#8492A6] text-[11px] italic">Root feeder asset.</p>
                ) : (
                  <div className="space-y-1">
                    {selectedAsset.dependencies.map((dep, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px] text-[#35D6C5]">
                        <span>{dep}</span>
                        <span className="text-[#8492A6]">HARD LINK</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action */}
              <button
                onClick={() => onAnalyzeCascading(selectedAsset)}
                className="w-full py-2 px-3 rounded bg-[#35D6C5] hover:bg-[#35D6C5]/90 text-[#080B10] font-mono text-xs font-bold transition-all shadow-md"
              >
                PREDICT CASCADING RISK FROM THIS NODE
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-lg bg-[#111923] border border-[#202B38] text-center text-xs font-mono text-[#8492A6] space-y-2">
              <Network className="w-8 h-8 text-[#526071] mx-auto" />
              <p>Select any infrastructure entity on the topology graph to inspect dependencies, telemetry, and blast radius.</p>
            </div>
          )}

          {/* Quick Registry Table Snippet */}
          <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38]">
            <span className="text-xs font-mono font-semibold uppercase text-[#E8EDF5] block mb-2">
              FILTERED ASSET REGISTRY ({filteredAssets.length})
            </span>
            <div className="space-y-1.5 max-h-56 overflow-y-auto text-xs font-mono pr-1">
              {filteredAssets.map(a => (
                <div
                  key={a.id}
                  onClick={() => onSelectAsset(a)}
                  className={`p-2 rounded cursor-pointer transition-colors flex items-center justify-between border ${
                    selectedAsset?.id === a.id
                      ? 'bg-[#16202C] border-[#35D6C5]/50'
                      : 'bg-[#0A0E14] border-[#202B38] hover:border-[#35D6C5]/30'
                  }`}
                >
                  <div>
                    <span className="text-[#35D6C5] font-semibold">{a.code}</span>
                    <span className="text-[#8492A6] block text-[10px] font-sans truncate w-40">{a.name}</span>
                  </div>
                  <StatusBadge status={a.healthStatus} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
