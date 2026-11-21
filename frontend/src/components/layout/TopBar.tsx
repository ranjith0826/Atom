import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Globe, 
  Bell, 
  Bot, 
  User, 
  ChevronDown, 
  Radio, 
  Sparkles, 
  Check, 
  AlertTriangle,
  Server
} from 'lucide-react';

interface TopBarProps {
  onOpenCopilot: () => void;
  onOpenCommandPalette: () => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenCopilot,
  onOpenCommandPalette,
  selectedRegion,
  onSelectRegion,
}) => {
  const [showOrgMenu, setShowOrgMenu] = useState(false);
  const [showRegionMenu, setShowRegionMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Rhine-Main Transformer Alert', desc: 'Core temperature reached 92°C at PWR-RHEIN-04', time: '4m ago', critical: true },
    { id: 2, title: 'AI Agent Recovery Ticket #REC-881', desc: 'Awaiting human authorization for 45MW failover', time: '8m ago', critical: false },
    { id: 3, title: 'Ashburn Peering Validation', desc: 'Autonomous border ACL prevented BGP route leak', time: '45m ago', critical: false },
  ];

  return (
    <header className="h-16 bg-[#0A0E14] border-b border-[#202B38] px-4 flex items-center justify-between z-20 select-none">
      {/* Left: Organization & Environment */}
      <div className="flex items-center gap-3">
        {/* Org Selector */}
        <div className="relative">
          <button
            onClick={() => setShowOrgMenu(!showOrgMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#111923] border border-[#202B38] hover:border-[#35D6C5]/50 text-xs font-mono text-[#E8EDF5] transition-all"
          >
            <Building2 className="w-4 h-4 text-[#35D6C5]" />
            <span className="font-semibold tracking-wide">GLOBAL INFRASTRUCTURE OPS GROUP</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8492A6]" />
          </button>

          {showOrgMenu && (
            <div className="absolute top-full left-0 mt-1 w-72 bg-[#111923] border border-[#202B38] rounded-md shadow-2xl p-2 z-50 text-xs font-mono">
              <div className="px-2 py-1 text-[10px] text-[#8492A6] uppercase">Active Organization</div>
              <div className="px-2 py-1.5 rounded bg-[#16202C] text-[#35D6C5] flex items-center justify-between font-semibold">
                <span>GLOBAL INFRASTRUCTURE OPS</span>
                <Check className="w-4 h-4" />
              </div>
              <div className="px-2 py-1.5 text-[#8492A6] hover:bg-[#16202C] rounded cursor-pointer mt-1">
                NATO Strategic Infrastructure Div
              </div>
              <div className="px-2 py-1.5 text-[#8492A6] hover:bg-[#16202C] rounded cursor-pointer">
                Federal Energy Resilience Bureau
              </div>
            </div>
          )}
        </div>

        {/* Environment Indicator */}
        <div className="px-2.5 py-1 rounded bg-[#35D6C5]/10 border border-[#35D6C5]/30 text-[11px] font-mono text-[#35D6C5] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#35D6C5] animate-ping" />
          <span>PRODUCTION - LIVE TWIN</span>
        </div>

        {/* Region Selector */}
        <div className="relative">
          <button
            onClick={() => setShowRegionMenu(!showRegionMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#111923] border border-[#202B38] hover:border-[#35D6C5]/50 text-xs font-mono text-[#8492A6] hover:text-[#E8EDF5] transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-[#35D6C5]" />
            <span>{selectedRegion}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {showRegionMenu && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-[#111923] border border-[#202B38] rounded-md shadow-2xl p-1 z-50 text-xs font-mono">
              {['GLOBAL', 'NORTH_AMERICA', 'EMEA', 'APAC', 'LATAM'].map(reg => (
                <button
                  key={reg}
                  onClick={() => {
                    onSelectRegion(reg);
                    setShowRegionMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between ${
                    selectedRegion === reg ? 'bg-[#16202C] text-[#35D6C5] font-semibold' : 'text-[#8492A6] hover:bg-[#16202C]'
                  }`}
                >
                  <span>{reg.replace('_', ' ')}</span>
                  {selectedRegion === reg && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Search / Command Palette Bar */}
      <div className="flex-1 max-w-md mx-6">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-md bg-[#111923] border border-[#202B38] hover:border-[#35D6C5]/50 text-xs font-mono text-[#8492A6] group transition-all"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#526071] group-hover:text-[#35D6C5]" />
            <span>Search assets, incidents, graph nodes, telemetry...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-[#080B10] border border-[#202B38] text-[10px] text-[#8492A6]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Telemetry Sync, Notifications, Copilot, User */}
      <div className="flex items-center gap-3">
        {/* Live System Status */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-[#111923] border border-[#202B38] text-xs font-mono text-[#8492A6]">
          <Radio className="w-3.5 h-3.5 text-[#35C98A] animate-pulse" />
          <span>SYNC: <strong className="text-[#E8EDF5]">4s AGO</strong></span>
          <span className="text-[#526071]">|</span>
          <span className="text-[#35C98A]">98.7% OP</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-md bg-[#111923] border border-[#202B38] text-[#8492A6] hover:text-[#E8EDF5] hover:border-[#35D6C5]/50 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5263] animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-1 w-80 bg-[#111923] border border-[#202B38] rounded-lg shadow-2xl p-3 z-50 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-[#202B38] mb-2">
                <span className="font-semibold text-[#E8EDF5]">LIVE THREAT FEED</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF5263]/20 text-[#FF5263]">3 UNREAD</span>
              </div>
              <div className="space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className="p-2 rounded bg-[#0A0E14] border border-[#202B38] hover:border-[#35D6C5]/30">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${n.critical ? 'text-[#FF5263]' : 'text-[#35D6C5]'}`}>{n.title}</span>
                      <span className="text-[10px] text-[#526071]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#8492A6] font-sans mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Copilot Launcher */}
        <button
          onClick={onOpenCopilot}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#8B7CFF]/15 border border-[#8B7CFF]/40 hover:bg-[#8B7CFF]/25 text-xs font-mono text-[#8B7CFF] transition-all shadow-[0_0_12px_rgba(139,124,255,0.2)]"
        >
          <Bot className="w-4 h-4" />
          <span className="font-semibold">AI COPILOT</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#202B38]">
          <div className="w-8 h-8 rounded-full bg-[#16202C] border border-[#35D6C5]/40 flex items-center justify-center text-[#35D6C5] font-mono text-xs font-bold">
            BV
          </div>
          <div className="hidden xl:block text-left text-xs">
            <div className="font-semibold text-[#E8EDF5]">Commander B. Vance</div>
            <div className="text-[10px] font-mono text-[#8492A6]">Principal Resilience Architect</div>
          </div>
        </div>
      </div>
    </header>
  );
};
