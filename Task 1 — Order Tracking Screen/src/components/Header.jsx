"use client";

import { 
  Sun, 
  Moon, 
  AlertTriangle, 
  Clock, 
  PackageCheck, 
  HelpCircle,
  Truck,
  Sparkles,
  ChevronDown,
  Layers
} from "lucide-react";

export default function Header({ 
  activeScenario, 
  onSelectScenario, 
  darkMode, 
  onToggleDarkMode
}) {
  const scenarios = [
    { 
      id: "in-transit", 
      label: "In Transit", 
      badge: "Live Map", 
      icon: Truck, 
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
    },
    { 
      id: "delayed", 
      label: "Situation 1: Delayed", 
      badge: "Req Case 1", 
      icon: Clock, 
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" 
    },
    { 
      id: "delivered-not-received", 
      label: "Situation 2: Not Received", 
      badge: "Req Case 2", 
      icon: HelpCircle, 
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" 
    },
    { 
      id: "tracking-pending", 
      label: "Situation 3: Tracking Pending", 
      badge: "Req Case 3", 
      icon: AlertTriangle, 
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" 
    },
    { 
      id: "delivered-success", 
      label: "Delivered", 
      badge: "Success", 
      icon: PackageCheck, 
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" 
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
              <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <h1 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                  TrackFlow
                </h1>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Tracking System
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Next.js Mobile & Web Order Tracking Experience
              </p>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center shrink-0">
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 text-xs font-semibold"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* RESPONSIVE SCENARIO SWITCHER SECTION                             */}
        {/* ----------------------------------------------------------------- */}
        <div className="mt-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
          
          {/* MOBILE ONLY: Dropdown Selector (Hidden on medium/large screens >= 768px) */}
          <div className="block md:hidden">
            <div className="relative">
              <select
                value={activeScenario}
                onChange={(e) => onSelectScenario(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-slate-800 text-indigo-950 dark:text-indigo-200 border border-indigo-200 dark:border-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              >
                {scenarios.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.label} ({sc.badge})
                  </option>
                ))}
              </select>
              <Layers className="absolute left-3 top-2.5 h-4 w-4 text-indigo-600 dark:text-indigo-400 pointer-events-none" />
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* DESKTOP / TABLET ONLY: Horizontal Scenario Pills Bar (Hidden on small devices < 768px) */}
          <div className="hidden md:flex items-center space-x-2 py-0.5">
            <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400 font-semibold shrink-0 pr-1 select-none">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>Scenarios:</span>
            </div>

            {scenarios.map((sc) => {
              const Icon = sc.icon;
              const isSelected = activeScenario === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => onSelectScenario(sc.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border shrink-0 ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25 ring-2 ring-indigo-500/20"
                      : `${sc.color} hover:opacity-90`
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{sc.label}</span>
                  {sc.badge && !isSelected && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-black/5 dark:bg-white/10 font-normal">
                      {sc.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </header>
  );
}
