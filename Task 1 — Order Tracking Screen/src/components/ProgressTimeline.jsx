"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Truck, 
  AlertTriangle,
  HelpCircle
} from "lucide-react";

export default function ProgressTimeline({ order }) {
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  // Icon getter for steps
  const getStepIcon = (step) => {
    if (step.completed) {
      if (step.warning) {
        return <HelpCircle className="h-4 w-4 text-rose-500 fill-rose-100 dark:fill-rose-950" />;
      }
      return <CheckCircle2 className="h-4 w-4 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />;
    }
    if (step.active) {
      if (step.error) {
        return <AlertTriangle className="h-4 w-4 text-amber-500 animate-bounce" />;
      }
      return (
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-indigo-400 opacity-75"></span>
          <div className="h-3.5 w-3.5 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900"></div>
        </div>
      );
    }
    return <Circle className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />;
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/90 p-4 sm:p-5 shadow-lg border border-slate-200/80 dark:border-slate-700/80 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
          <Truck className="h-4 w-4 text-indigo-500" />
          <span>Delivery Progress</span>
        </h4>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
          {order.progressPercent}% Complete
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="relative py-2">
        {/* Background track line */}
        <div className="absolute top-5 left-4 right-4 h-1 bg-slate-100 dark:bg-slate-700 rounded-full" />
        
        {/* Active progress fill */}
        <div 
          className={`absolute top-5 left-4 h-1 rounded-full transition-all duration-700 ${
            order.statusCode === "DELAYED"
              ? "bg-amber-500"
              : order.statusCode === "DELIVERED_NOT_RECEIVED"
              ? "bg-rose-500"
              : "bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500"
          }`}
          style={{ width: `${Math.max(5, Math.min(100, order.progressPercent))}%` }}
        />

        {/* Step Nodes Row */}
        <div className="relative flex items-center justify-between z-10">
          {order.steps.map((step, idx) => (
            <div key={step.key || idx} className="flex flex-col items-center text-center max-w-[64px]">
              {/* Step Icon circle wrapper */}
              <div className="h-7 w-7 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm transition-transform hover:scale-110">
                {getStepIcon(step)}
              </div>

              {/* Step Title */}
              <span className={`mt-1.5 text-[10px] font-semibold leading-tight line-clamp-2 ${
                step.active 
                  ? "text-indigo-600 dark:text-indigo-400 font-bold" 
                  : step.completed 
                  ? "text-slate-800 dark:text-slate-200" 
                  : "text-slate-400 dark:text-slate-500"
              }`}>
                {step.title}
              </span>

              {/* Step Date */}
              <span className="text-[9px] text-slate-400 dark:text-slate-500 truncate max-w-[60px] font-mono mt-0.5">
                {step.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Checkpoints Toggle */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
        <button
          onClick={() => setShowFullTimeline(!showFullTimeline)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1"
        >
          <span className="flex items-center space-x-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>Logistics Checkpoint History ({order.detailedTimeline?.length || 0})</span>
          </span>
          {showFullTimeline ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {/* Detailed Timeline Events */}
        {showFullTimeline && (
          <div className="mt-3 space-y-3 pl-2 border-l-2 border-slate-200 dark:border-slate-700 ml-2 animate-fadeIn">
            {order.detailedTimeline?.map((item, index) => (
              <div key={index} className="relative pl-4 space-y-0.5">
                {/* Bullet pin */}
                <div className={`absolute -left-[9px] top-1 h-3 w-3 rounded-full border-2 border-white dark:border-slate-800 ${
                  index === 0 
                    ? "bg-indigo-600 ring-2 ring-indigo-200 dark:ring-indigo-900" 
                    : "bg-slate-300 dark:bg-slate-600"
                }`} />

                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {item.status}
                  </p>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    {item.time}
                  </span>
                </div>
                
                {item.location && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{item.location}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
