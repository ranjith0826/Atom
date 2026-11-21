import React, { useState, useEffect } from 'react';
import { InfrastructureAsset, Incident, AIAgent } from '../../types';
import { Search, Server, AlertTriangle, Bot, Compass, Shield, ArrowRight, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  assets: InfrastructureAsset[];
  incidents: Incident[];
  agents: AIAgent[];
  onSelectScreen: (screenId: string) => void;
  onSelectAsset: (asset: InfrastructureAsset) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  assets,
  incidents,
  agents,
  onSelectScreen,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAssets = assets.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.code.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredIncidents = incidents.filter(i =>
    i.title.toLowerCase().includes(query.toLowerCase()) ||
    i.incidentNumber.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredAgents = agents.filter(ag =>
    ag.name.toLowerCase().includes(query.toLowerCase()) ||
    ag.role.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const navigationCommands = [
    { title: 'Global Resilience Command Center', id: 'command-center', icon: Compass },
    { title: 'Digital Twin Explorer & Graph', id: 'twin-explorer', icon: Server },
    { title: 'Cascading Failure Prediction', id: 'cascading-failure', icon: AlertTriangle },
    { title: 'Scenario Laboratory', id: 'scenario-lab', icon: Shield },
    { title: 'AI Agent Control Center', id: 'agent-control', icon: Bot },
    { title: 'Active Incidents', id: 'active-incidents', icon: AlertTriangle },
  ].filter(c => c.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0D121A] border border-[#202B38] rounded-xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-3 bg-[#111923] border-b border-[#202B38] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#35D6C5]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command, asset name (DC-FRA-01), incident, or AI agent..."
            className="w-full bg-transparent text-sm text-[#E8EDF5] placeholder-[#526071] focus:outline-none font-mono"
          />
          <span className="px-1.5 py-0.5 rounded bg-[#080B10] border border-[#202B38] text-[10px] font-mono text-[#8492A6]">
            ESC to close
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs font-mono">
          {/* Navigation Screens */}
          {navigationCommands.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8492A6] px-2 mb-1 block">
                NAVIGATION COMMANDS
              </span>
              <div className="space-y-1">
                {navigationCommands.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectScreen(item.id);
                        onClose();
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#111923]/60 hover:bg-[#202B38] text-[#E8EDF5] flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#35D6C5]" />
                        <span className="font-sans font-medium text-xs">{item.title}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#526071] group-hover:text-[#35D6C5]" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Infrastructure Assets */}
          {filteredAssets.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8492A6] px-2 mb-1 block">
                INFRASTRUCTURE ASSETS
              </span>
              <div className="space-y-1">
                {filteredAssets.map(asset => (
                  <button
                    key={asset.id}
                    onClick={() => {
                      onSelectAsset(asset);
                      onClose();
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#111923]/60 hover:bg-[#202B38] text-[#E8EDF5] flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-[#0A0E14] text-[#35D6C5] font-semibold text-[11px]">
                        {asset.code}
                      </span>
                      <span className="font-sans text-xs">{asset.name}</span>
                    </div>
                    <span className="text-[#8492A6] text-[11px]">{asset.locationName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Incidents */}
          {filteredIncidents.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8492A6] px-2 mb-1 block">
                ACTIVE INCIDENTS
              </span>
              <div className="space-y-1">
                {filteredIncidents.map(inc => (
                  <button
                    key={inc.id}
                    onClick={() => {
                      onSelectScreen('active-incidents');
                      onClose();
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#111923]/60 hover:bg-[#202B38] text-[#E8EDF5] flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-[#FF5263]/15 text-[#FF5263] border border-[#FF5263]/30 font-semibold text-[11px]">
                        {inc.incidentNumber}
                      </span>
                      <span className="font-sans text-xs">{inc.title}</span>
                    </div>
                    <span className="text-[#F5B942] text-[10px] uppercase font-semibold">{inc.status}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
