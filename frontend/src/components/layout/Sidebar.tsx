import React, { useState } from 'react';
import { 
  Compass, 
  Globe2, 
  Layers, 
  Network, 
  Database, 
  GitFork, 
  ShieldAlert, 
  TrendingUp, 
  AlertTriangle, 
  LineChart, 
  Cpu, 
  FlaskConical, 
  Scale, 
  Flame, 
  Workflow, 
  Bot, 
  Users2, 
  ScrollText, 
  CheckCircle, 
  Plug, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Radio
} from 'lucide-react';

interface SidebarProps {
  currentScreen: string;
  onSelectScreen: (screenId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onSelectScreen }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigationGroups = [
    {
      groupTitle: 'COMMAND',
      items: [
        { id: 'command-center', label: 'Command Center', icon: Compass, badge: 'LIVE' },
        { id: 'global-ops', label: 'Global Operations', icon: Globe2 },
      ]
    },
    {
      groupTitle: 'DIGITAL TWIN',
      items: [
        { id: 'infra-map', label: 'Infrastructure Map', icon: Layers },
        { id: 'twin-explorer', label: 'Digital Twin Explorer', icon: Network },
        { id: 'asset-registry', label: 'Asset Registry', icon: Database },
        { id: 'dep-graph', label: 'Dependency Graph', icon: GitFork },
      ]
    },
    {
      groupTitle: 'INTELLIGENCE',
      items: [
        { id: 'threat-intel', label: 'Threat Intelligence', icon: ShieldAlert, badge: '12' },
        { id: 'pred-analytics', label: 'Predictive Analytics', icon: TrendingUp },
        { id: 'cascading-failure', label: 'Cascading Failure', icon: AlertTriangle, alert: true },
        { id: 'risk-forecast', label: 'Risk Forecasting', icon: LineChart },
      ]
    },
    {
      groupTitle: 'SIMULATION',
      items: [
        { id: 'scenario-lab', label: 'Scenario Laboratory', icon: FlaskConical },
        { id: 'whatif-analysis', label: 'What-if Analysis', icon: Cpu },
        { id: 'intervention-comp', label: 'Intervention Comparison', icon: Scale },
      ]
    },
    {
      groupTitle: 'OPERATIONS',
      items: [
        { id: 'active-incidents', label: 'Active Incidents', icon: Flame, badge: '03', alert: true },
        { id: 'recovery-plan', label: 'Recovery Planning', icon: Workflow },
        { id: 'agent-control', label: 'AI Agent Control', icon: Bot, badge: '18/20' },
        { id: 'response-teams', label: 'Response Teams', icon: Users2 },
      ]
    },
    {
      groupTitle: 'GOVERNANCE',
      items: [
        { id: 'audit-trail', label: 'Audit Trail', icon: ScrollText },
        { id: 'compliance', label: 'Compliance', icon: CheckCircle },
        { id: 'integrations', label: 'Integrations', icon: Plug },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside
      className={`h-screen bg-[#0A0E14] border-r border-[#202B38] flex flex-col transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-[#202B38] flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#35D6C5]/20 to-[#8B7CFF]/30 border border-[#35D6C5]/40 flex items-center justify-center text-[#35D6C5] shadow-[0_0_12px_rgba(53,214,197,0.25)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono font-bold tracking-wider text-sm text-[#E8EDF5] flex items-center gap-1.5">
                RESILIENCE<span className="text-[#35D6C5]">OS</span>
              </div>
              <div className="text-[10px] text-[#8492A6] font-mono tracking-tight uppercase">
                Autonomous Intelligence
              </div>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="mx-auto w-8 h-8 rounded-lg bg-gradient-to-br from-[#35D6C5]/20 to-[#8B7CFF]/30 border border-[#35D6C5]/40 flex items-center justify-center text-[#35D6C5]">
            <ShieldCheck className="w-5 h-5" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-[#202B38] text-[#8492A6] hover:text-[#E8EDF5] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 text-xs font-sans">
        {navigationGroups.map(group => (
          <div key={group.groupTitle} className="space-y-0.5">
            {!collapsed && (
              <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#526071] font-semibold">
                {group.groupTitle}
              </div>
            )}

            {group.items.map(item => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectScreen(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-left group ${
                    isActive
                      ? 'bg-[#16202C] text-[#35D6C5] border border-[#35D6C5]/30 font-medium shadow-sm'
                      : 'text-[#8492A6] hover:text-[#E8EDF5] hover:bg-[#111923]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-[#35D6C5]' : 'text-[#8492A6] group-hover:text-[#E8EDF5]'
                    } ${item.alert ? 'text-[#FF5263]' : ''}`}
                  />

                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between truncate">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`px-1.5 py-0.2 rounded font-mono text-[10px] ${
                            item.badge === 'LIVE'
                              ? 'bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/30 font-semibold'
                              : item.alert
                              ? 'bg-[#FF5263]/20 text-[#FF5263] border border-[#FF5263]/30 font-semibold'
                              : 'bg-[#202B38] text-[#8492A6]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Node Health Status */}
      <div className="p-3 border-t border-[#202B38] bg-[#080B10]">
        {!collapsed ? (
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8492A6]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#35C98A] animate-pulse" />
              <span>CORE TWIN ENGINE</span>
            </div>
            <span className="text-[#35D6C5]">98.7%</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="w-2 h-2 rounded-full bg-[#35C98A] animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
};
