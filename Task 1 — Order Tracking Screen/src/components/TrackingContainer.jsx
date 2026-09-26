"use client";

import { ChevronLeft, RefreshCw, HelpCircle } from "lucide-react";

export default function TrackingContainer({ children, orderId, onOpenSupport, onRefreshData, isRefreshing }) {
  return (
    <div className="w-full max-w-2xl mx-auto py-2 space-y-4">
      {/* Navigation Header for Order */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-3 px-4 shadow-sm border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-slate-900 dark:text-white">
        <div className="flex items-center space-x-2">
          <button 
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Order Tracking Details</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Order ID: #{orderId}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onRefreshData}
            disabled={isRefreshing}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors disabled:opacity-50"
            title="Refresh delivery status"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-indigo-500" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <button 
            onClick={onOpenSupport}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-xs font-semibold transition-colors"
            title="Support"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Support</span>
          </button>
        </div>
      </div>

      {/* Main Tracking Content Cards */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
