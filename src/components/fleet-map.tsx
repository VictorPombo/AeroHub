'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mockFlightTracking } from '@/lib/mock-data';
import { Plane, Navigation, Gauge, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import L from 'leaflet';

export default function FleetMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] rounded-xl bg-black/40 border border-border/50 flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Carregando mapa da frota...</p>
      </div>
    );
  }

  // Define center (São Paulo general area to cover the mocks)
  const center: [number, number] = [-23.4, -46.7];

  // Custom DivIcon for Aircraft based on status
  const getAircraftIcon = (status: string, heading: number) => {
    const colorClass = status === 'in_flight' ? 'text-aero-cyan drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]' : 'text-muted-foreground';
    
    // Create an HTML string for the icon
    const htmlString = `
      <div style="transform: rotate(${heading}deg); transform-origin: center; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="${colorClass}">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-.5-.5-2.5 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 3.1-3.5 3.5L3 14l-1 1 2.5 1.5L6 19l1-1-.6-2.5 3.5-3.5 3.1 6c.4.2.7-.2.6-.6z"/>
        </svg>
      </div>
    `;

    return new L.DivIcon({
      html: htmlString,
      className: 'bg-transparent border-none', // Override default Leaflet styles
      iconSize: [32, 32],
      iconAnchor: [16, 16], // Center
      popupAnchor: [0, -16],
    });
  };

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-border/50 relative z-0">
      <MapContainer 
        center={center} 
        zoom={9} 
        scrollWheelZoom={false} 
        className="w-full h-full bg-slate-900"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {mockFlightTracking.map((track) => {
          if (!track.latitude || !track.longitude) return null;
          
          const isFlying = track.status === 'in_flight';
          
          return (
            <Marker 
              key={track.id} 
              position={[track.latitude, track.longitude]}
              icon={getAircraftIcon(track.status, track.heading || 0)}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center gap-2 border-b border-slate-700/50 pb-2 mb-2">
                    <Plane className={cn("w-4 h-4", isFlying ? "text-aero-cyan" : "text-muted-foreground")} />
                    <span className="font-bold text-slate-100">{track.registration}</span>
                    <span className={cn(
                      "ml-auto text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider",
                      isFlying ? "bg-aero-cyan/20 text-aero-cyan" : "bg-slate-800 text-slate-400"
                    )}>
                      {isFlying ? 'Em Voo' : 'No Solo'}
                    </span>
                  </div>
                  
                  {isFlying && (
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><Navigation className="w-3.5 h-3.5 text-slate-400"/> Proa</span>
                        <span className="font-mono font-semibold text-slate-100">{track.heading}°</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-slate-400"/> Velocidade</span>
                        <span className="font-mono font-semibold text-slate-100">{track.speed} kt</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-slate-400"/> Altitude</span>
                        <span className="font-mono font-semibold text-slate-100">{track.altitude} ft</span>
                      </div>
                    </div>
                  )}
                  {!isFlying && (
                    <div className="text-xs text-slate-400 text-center py-2">
                      Aeronave estacionada / hangarada.
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Global styles override for Leaflet dark mode popup */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-popup-content-wrapper {
          background-color: #0f172a;
          color: #f8fafc;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
        }
        .leaflet-popup-tip {
          background-color: #0f172a;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .leaflet-popup-content {
          margin: 12px;
        }
        .leaflet-container a.leaflet-popup-close-button {
          color: #94a3b8;
          padding: 4px;
        }
        .leaflet-container a.leaflet-popup-close-button:hover {
          color: #f8fafc;
        }
      `}} />
    </div>
  );
}
