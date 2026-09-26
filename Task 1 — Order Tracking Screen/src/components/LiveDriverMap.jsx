"use client";

import { Phone, Star, ShieldCheck, MapPin, Truck, Navigation, Sparkles } from "lucide-react";

export default function LiveDriverMap({ driver }) {
  if (!driver) return null;

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/90 overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-700/80 transition-all">
      {/* Map Header */}
      <div className="bg-slate-900 text-white p-3 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Live Courier GPS Tracker
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
          ETA {driver.etaMinutes} mins ({driver.stopsAway} stops away)
        </span>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative h-48 w-full bg-slate-950 overflow-hidden select-none">
        {/* SVG Grid and Roads */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Main Highway & Streets */}
          <path d="M -10 120 C 100 120, 150 40, 400 40" fill="none" stroke="#475569" strokeWidth="12" />
          <path d="M -10 120 C 100 120, 150 40, 400 40" fill="none" stroke="#64748B" strokeWidth="6" />
          
          <path d="M 120 0 L 120 200" fill="none" stroke="#475569" strokeWidth="8" />
          <path d="M 280 0 L 280 200" fill="none" stroke="#475569" strokeWidth="8" />

          {/* Dotted Route Line from Courier to Home */}
          <path 
            d="M 90 120 Q 180 120 280 80" 
            fill="none" 
            stroke="#6366F1" 
            strokeWidth="4" 
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        </svg>

        {/* Home Destination Pin */}
        <div className="absolute top-16 right-20 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg ring-4 ring-indigo-500/30">
              <MapPin className="h-4 w-4 fill-current" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-600 rotate-45"></div>
          </div>
          <span className="mt-1 text-[10px] font-bold bg-slate-900/90 text-white px-2 py-0.5 rounded-full border border-slate-700 shadow">
            Your Home
          </span>
        </div>

        {/* Courier Driver Live Icon Pin */}
        <div className="absolute top-28 left-20 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-pulse">
          <div className="relative">
            <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-emerald-400 opacity-60"></span>
            <div className="h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl ring-4 ring-emerald-500/40">
              <Truck className="h-5 w-5" />
            </div>
          </div>
          <span className="mt-1 text-[10px] font-bold bg-emerald-950 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-800 shadow flex items-center space-x-1">
            <Navigation className="h-2.5 w-2.5" />
            <span>Driver Marcus</span>
          </span>
        </div>

        {/* Live Distance Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-white text-xs flex items-center space-x-2">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-spin" />
          <span className="font-semibold">Live GPS: 1.4 miles away</span>
        </div>
      </div>

      {/* Driver Info Footer */}
      <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {/* eslint-disable-next-html-next-image */}
            <img 
              src={driver.avatar} 
              alt={driver.name} 
              className="h-11 w-11 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
            />
            <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 text-white">
              <ShieldCheck className="h-3 w-3" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                {driver.name}
              </h5>
              <span className="flex items-center text-[11px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded">
                <Star className="h-3 w-3 fill-current mr-0.5" />
                {driver.rating}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {driver.vehicle}
            </p>
          </div>
        </div>

        <a
          href={`tel:${driver.phone}`}
          className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all shrink-0"
        >
          <Phone className="h-3.5 w-3.5" />
          <span>Call Driver</span>
        </a>
      </div>
    </div>
  );
}
