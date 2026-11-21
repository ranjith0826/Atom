import React, { useState } from 'react';
import { Truck, Anchor, AlertTriangle, ArrowRight, ShieldCheck, Globe, Clock, Package } from 'lucide-react';

export const SupplyChainView: React.FC = () => {
  const [selectedSupplier, setSelectedSupplier] = useState('sup-1');

  const suppliers = [
    {
      id: 'sup-1',
      name: 'TSMC GigaFab 12 & 14',
      tier: 'TIER_1',
      category: 'Semiconductor Fabrication',
      location: 'Hsinchu Science Park, Taiwan',
      riskScore: 78,
      leadTimeDays: 140,
      alternativeSupplier: 'GlobalFoundries (Malta, NY)',
      status: 'DEGRADED',
      exposure: '$1.4M / day',
      chokepoints: ['Taiwan Strait Shipping Lanes', 'Kaohsiung Maritime Gateway']
    },
    {
      id: 'sup-2',
      name: 'Siemens Energy Grid Transformers',
      tier: 'TIER_1',
      category: 'High-Voltage Power Equipment',
      location: 'Nuremberg, Germany',
      riskScore: 42,
      leadTimeDays: 210,
      alternativeSupplier: 'Hitachi Energy (Zurich, Switzerland)',
      status: 'HEALTHY',
      exposure: '$850k / day',
      chokepoints: ['Rhine River Barge Low-Water Draft']
    },
    {
      id: 'sup-3',
      name: 'Subsea Optical Cable Consortium',
      tier: 'TIER_1',
      category: 'Transoceanic Fiber Optic Glass',
      location: 'Southampton, UK',
      riskScore: 28,
      leadTimeDays: 60,
      alternativeSupplier: 'Alcatel Submarine Networks (Calais, France)',
      status: 'HEALTHY',
      exposure: '$320k / day',
      chokepoints: ['English Channel Maritime Chokepoint']
    },
    {
      id: 'sup-4',
      name: 'Texas Industrial Chiller Chem',
      tier: 'TIER_2',
      category: 'Dielectric Cooling Fluids',
      location: 'Pasadena, Texas, USA',
      riskScore: 35,
      leadTimeDays: 30,
      alternativeSupplier: '3M Advanced Materials (St. Paul, MN)',
      status: 'HEALTHY',
      exposure: '$190k / day',
      chokepoints: ['Houston Ship Channel']
    }
  ];

  const current = suppliers.find(s => s.id === selectedSupplier) || suppliers[0];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#35D6C5]/15 text-[#35D6C5] border border-[#35D6C5]/30">
              SUPPLY WEB INTELLIGENCE
            </span>
            <span className="text-xs font-mono text-[#8492A6]">
              TIER 1/2 MARITIME & SEMICONDUCTOR DEPENDENCIES
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            GLOBAL SUPPLY CHAIN RESILIENCE & BOTTLENECK TRACKER
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 font-sans">
            Monitors upstream supplier vulnerability, maritime chokepoints, container dwell spikes, and alternative supplier failover reserves.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Suppliers Roster (5 cols) */}
        <div className="lg:col-span-5 space-y-2 font-mono text-xs">
          <span className="text-[10px] text-[#8492A6] uppercase tracking-wider block">
            STRATEGIC SUPPLIER REGISTRY
          </span>
          {suppliers.map(s => (
            <div
              key={s.id}
              onClick={() => setSelectedSupplier(s.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedSupplier === s.id
                  ? 'bg-[#16202C] border-[#35D6C5] shadow-sm'
                  : 'bg-[#111923] border-[#202B38] hover:border-[#35D6C5]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#E8EDF5] text-sm">{s.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  s.status === 'DEGRADED' ? 'bg-[#F5B942]/20 text-[#F5B942]' : 'bg-[#35C98A]/20 text-[#35C98A]'
                }`}>
                  {s.status}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[#8492A6]">
                <span>{s.category}</span>
                <span className="text-[#35D6C5]">{s.tier}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Supplier Drilldown (7 cols) */}
        <div className="lg:col-span-7 space-y-3 font-mono text-xs">
          <div className="p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#202B38]">
              <div>
                <span className="text-[#35D6C5] font-bold">{current.tier} SUPPLIER</span>
                <h2 className="text-base font-bold text-[#E8EDF5] font-sans mt-0.5">{current.name}</h2>
                <p className="text-xs text-[#8492A6]">{current.location}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[#FF5263]">{current.exposure}</div>
                <div className="text-[10px] text-[#8492A6]">Disruption Exposure</div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">STANDARD LEAD TIME</span>
                <span className="text-base font-bold text-[#E8EDF5]">{current.leadTimeDays} Days</span>
              </div>
              <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">ACTIVE ALTERNATIVE FAILOVER</span>
                <span className="text-xs font-bold text-[#35D6C5] font-sans">{current.alternativeSupplier}</span>
              </div>
            </div>

            {/* Chokepoints */}
            <div className="p-3 rounded bg-[#0A0E14] border border-[#202B38]">
              <span className="text-[#8492A6] text-[10px] uppercase block mb-1.5 flex items-center gap-1.5">
                <Anchor className="w-3.5 h-3.5 text-[#35D6C5]" />
                MARITIME & TRANSIT CHOKEPOINTS ({current.chokepoints.length})
              </span>
              <div className="space-y-1">
                {current.chokepoints.map((cp, idx) => (
                  <div key={idx} className="p-2 rounded bg-[#111923] border border-[#202B38] flex items-center justify-between">
                    <span className="text-[#E8EDF5]">{cp}</span>
                    <span className="text-[10px] text-[#F5B942]">ELEVATED DWELL RISK</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Failover Action */}
            <div className="pt-2">
              <button className="w-full py-2.5 px-3 rounded bg-[#35D6C5] hover:bg-[#35D6C5]/90 text-[#080B10] font-bold transition-all shadow-md flex items-center justify-center gap-2">
                <Package className="w-4 h-4" />
                SIMULATE SWITCH TO ALTERNATIVE SUPPLIER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
