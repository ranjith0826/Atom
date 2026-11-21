import React from 'react';
import { CloudLightning, Flame, Waves, Sun, AlertTriangle, Wind, Thermometer } from 'lucide-react';

export const EnvironmentalView: React.FC = () => {
  const envRisks = [
    { id: 'env-1', title: 'Severe Convective Cell & Lightning Corridor', region: 'Norristown, PA (PJM Interconnection)', severity: 'HIGH', factor: 'Lightning Strike Density', telemetry: '88 strikes/km²', action: 'Engage surge arrestors & redundant busbar tie-lines' },
    { id: 'env-2', title: 'Extreme Ambient Heatwave & Wet-Bulb Surge', region: 'Harris County, TX (Houston Chilling Basin)', severity: 'MEDIUM', factor: 'Thermal Chiller Load', telemetry: '41.4°C Ambient', action: 'Ramp closed-loop water chilling flow by 35%' },
    { id: 'env-3', title: 'Seismic Micro-Tremor Activity', region: 'Otemachi, Tokyo (Tokyo Hyperscale Facility)', severity: 'LOW', factor: 'Ground Motion Acceleration', telemetry: '0.04g Peak', action: 'Seismic base isolators nominal; auto-lock backup elevators' },
    { id: 'env-4', title: 'North Sea Storm Surge & Maasvlakte High Tide', region: 'Maasvlakte 2, Rotterdam (Port Terminal)', severity: 'LOW', factor: 'Sea Level Anomaly', telemetry: '+1.8m NAP', action: 'Storm surge barriers operational; no gate flooding risk' }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#202B38]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#35D6C5]/15 text-[#35D6C5] border border-[#35D6C5]/30">
              GEOSPATIAL CLIMATE INTELLIGENCE
            </span>
            <span className="text-xs font-mono text-[#8492A6]">
              NOAA • COPERNICUS SATELLITE • USGS SENSORS
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#E8EDF5] mt-1 font-sans">
            ENVIRONMENTAL & SEVERE CLIMATE RISK MONITOR
          </h1>
          <p className="text-xs text-[#8492A6] mt-0.5 font-sans">
            Continuous satellite observation tracking wildfire perimeters, flood surges, wet-bulb heat stress, and seismic vibrations threatening physical assets.
          </p>
        </div>
      </div>

      {/* Environmental Risks Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {envRisks.map(r => (
          <div key={r.id} className="p-4 rounded-lg bg-[#111923] border border-[#202B38] space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#E8EDF5] font-sans">{r.title}</span>
                <span className="text-[11px] text-[#35D6C5] block mt-0.5">{r.region}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                r.severity === 'HIGH' ? 'bg-[#FF5263]/20 text-[#FF5263]' :
                r.severity === 'MEDIUM' ? 'bg-[#F5B942]/20 text-[#F5B942]' : 'bg-[#35C98A]/20 text-[#35C98A]'
              }`}>
                {r.severity}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-[#0A0E14] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">CRITICAL FACTOR</span>
                <span className="text-[#E8EDF5] font-semibold">{r.factor}</span>
              </div>
              <div className="p-2 rounded bg-[#0A0E14] border border-[#202B38]">
                <span className="text-[#8492A6] text-[10px] block">LIVE SENSOR TELEMETRY</span>
                <span className="text-[#35D6C5] font-bold">{r.telemetry}</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#0A0E14] border border-[#35D6C5]/30">
              <span className="text-[#35D6C5] text-[10px] uppercase block font-semibold mb-0.5">
                PROTECTIVE COUNTERMEASURE:
              </span>
              <p className="text-[#E8EDF5] font-sans text-xs">{r.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
