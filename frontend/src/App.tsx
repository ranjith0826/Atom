import React, { useState, useEffect } from 'react';
import { 
  InfrastructureAsset, 
  Incident, 
  AIAgent, 
  DependencyLink, 
  GlobalKpiMetrics, 
  RecoveryPlan, 
  AuditEvent 
} from './types';
import { api } from './services/api';
import { 
  INITIAL_METRICS, 
  MOCK_ASSETS, 
  MOCK_DEPENDENCY_LINKS, 
  MOCK_AGENTS, 
  MOCK_INCIDENTS, 
  MOCK_RECOVERY_PLANS, 
  MOCK_AUDIT_LOGS 
} from './services/mockData';

import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { CommandPalette } from './components/layout/CommandPalette';
import { CopilotDrawer } from './components/copilot/CopilotDrawer';
import { AssetInspectorModal } from './components/digitaltwin/AssetInspectorModal';

import { CommandCenter } from './modules/CommandCenter';
import { DigitalTwinExplorer } from './modules/DigitalTwinExplorer';
import { CascadingFailureView } from './modules/CascadingFailureView';
import { ScenarioLaboratory } from './modules/ScenarioLaboratory';
import { AgentControlCenter } from './modules/AgentControlCenter';
import { IncidentCenter } from './modules/IncidentCenter';
import { SupplyChainView } from './modules/SupplyChainView';
import { CyberResilienceView } from './modules/CyberResilienceView';
import { EnvironmentalView } from './modules/EnvironmentalView';
import { RecoveryPlanningView } from './modules/RecoveryPlanningView';
import { GovernanceView } from './modules/GovernanceView';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('command-center');
  const [selectedRegion, setSelectedRegion] = useState<string>('GLOBAL');
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Core Data State
  const [assets, setAssets] = useState<InfrastructureAsset[]>(MOCK_ASSETS);
  const [dependencies, setDependencies] = useState<DependencyLink[]>(MOCK_DEPENDENCY_LINKS);
  const [agents, setAgents] = useState<AIAgent[]>(MOCK_AGENTS);
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [metrics, setMetrics] = useState<GlobalKpiMetrics>(INITIAL_METRICS);
  const [recoveryPlans, setRecoveryPlans] = useState<RecoveryPlan[]>(MOCK_RECOVERY_PLANS);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(MOCK_AUDIT_LOGS);

  // Inspector State
  const [selectedAsset, setSelectedAsset] = useState<InfrastructureAsset | null>(null);

  // Load initial data from API / Fallback
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [a, d, ag, inc, m, r, aud] = await Promise.all([
          api.getAssets(),
          api.getDependencies(),
          api.getAgents(),
          api.getIncidents(),
          api.getMetrics(),
          api.getRecoveryPlans(),
          api.getAuditLogs(),
        ]);
        setAssets(a);
        setDependencies(d);
        setAgents(ag);
        setIncidents(inc);
        setMetrics(m);
        setRecoveryPlans(r);
        setAuditLogs(aud);
      } catch (err) {
        // Fallback is handled inside api service
      }
    };
    fetchData();

    // Check periodically
    const timer = setInterval(fetchData, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleApproveIncident = (incId: string) => {
    setIncidents(prev => prev.map(i => {
      if (i.id === incId) {
        return {
          ...i,
          recoveryApprovalStatus: 'APPROVED',
          approvedBy: 'Commander B. Vance',
          status: 'RESTORED',
        };
      }
      return i;
    }));
  };

  const handleApproveAgentAction = (agentId: string, actionId: string) => {
    setAgents(prev => prev.map(ag => {
      if (ag.id === agentId) {
        return {
          ...ag,
          status: 'EXECUTING',
          requiresHumanApproval: false,
          currentTask: 'Executing authorized 45MW failover to Paris cluster...',
        };
      }
      return ag;
    }));
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'command-center':
      case 'global-ops':
        return (
          <CommandCenter
            assets={assets}
            incidents={incidents}
            agents={agents}
            dependencies={dependencies}
            metrics={metrics}
            selectedAsset={selectedAsset}
            onSelectAsset={setSelectedAsset}
            onNavigate={setCurrentScreen}
            selectedRegion={selectedRegion}
          />
        );
      case 'infra-map':
      case 'twin-explorer':
      case 'asset-registry':
      case 'dep-graph':
        return (
          <DigitalTwinExplorer
            assets={assets}
            dependencies={dependencies}
            selectedAsset={selectedAsset}
            onSelectAsset={setSelectedAsset}
            onAnalyzeCascading={asset => {
              setSelectedAsset(asset);
              setCurrentScreen('cascading-failure');
            }}
          />
        );
      case 'cascading-failure':
      case 'pred-analytics':
      case 'risk-forecast':
        return (
          <CascadingFailureView
            assets={assets}
            dependencies={dependencies}
            targetAsset={selectedAsset}
            onSelectAsset={setSelectedAsset}
            onNavigateToScenario={assetId => {
              const a = assets.find(item => item.id === assetId) || null;
              setSelectedAsset(a);
              setCurrentScreen('scenario-lab');
            }}
          />
        );
      case 'scenario-lab':
      case 'whatif-analysis':
      case 'intervention-comp':
        return (
          <ScenarioLaboratory
            assets={assets}
            initialAssetId={selectedAsset?.id}
            onSelectAsset={setSelectedAsset}
          />
        );
      case 'agent-control':
      case 'response-teams':
        return (
          <AgentControlCenter
            agents={agents}
            onApproveAction={handleApproveAgentAction}
          />
        );
      case 'active-incidents':
        return (
          <IncidentCenter
            incidents={incidents}
            onApproveIncident={handleApproveIncident}
          />
        );
      case 'threat-intel':
        return <CyberResilienceView />;
      case 'recovery-plan':
        return (
          <RecoveryPlanningView
            recoveryPlans={recoveryPlans}
            onRefresh={async () => {
              const plans = await api.getRecoveryPlans();
              setRecoveryPlans(plans);
            }}
          />
        );
      case 'audit-trail':
      case 'compliance':
      case 'integrations':
      case 'settings':
        return <GovernanceView auditLogs={auditLogs} />;
      default:
        return (
          <CommandCenter
            assets={assets}
            incidents={incidents}
            agents={agents}
            dependencies={dependencies}
            metrics={metrics}
            selectedAsset={selectedAsset}
            onSelectAsset={setSelectedAsset}
            onNavigate={setCurrentScreen}
            selectedRegion={selectedRegion}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080B10] text-[#E8EDF5]">
      {/* Left Collapsible Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TopBar */}
        <TopBar
          onOpenCopilot={() => setIsCopilotOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        {/* Scrollable Main Application Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#080B10]">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Slide-out Contextual Asset Inspector Modal */}
      <AssetInspectorModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onTriggerSimulation={asset => {
          setSelectedAsset(asset);
          setCurrentScreen('scenario-lab');
        }}
        onViewCascading={asset => {
          setSelectedAsset(asset);
          setCurrentScreen('cascading-failure');
        }}
      />

      {/* Persistent AI Resilience Copilot Drawer */}
      <CopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onNavigate={setCurrentScreen}
      />

      {/* Global Cmd+K Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        assets={assets}
        incidents={incidents}
        agents={agents}
        onSelectScreen={setCurrentScreen}
        onSelectAsset={setSelectedAsset}
      />
    </div>
  );
};

export default App;
