"use client";

import { useState } from "react";
import { 
  Clock, 
  Truck, 
  AlertTriangle, 
  PackageCheck, 
  HelpCircle, 
  Copy, 
  Check, 
  Building2,
  Navigation
} from "lucide-react";

export default function OrderStatusCard({ 
  order, 
  onCopyTracking, 
  onOpenSupport,
  onOpenReportIssue,
  onToggleMap,
  showMap
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (order.trackingNumber && order.trackingNumber !== "Pending Generation") {
      navigator.clipboard.writeText(order.trackingNumber);
      setCopied(true);
      onCopyTracking(order.trackingNumber);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Status configuration
  const getStatusBadge = () => {
    switch (order.statusCode) {
      case "DELAYED":
        return {
          icon: AlertTriangle,
          bg: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
          dot: "bg-amber-500 animate-ping",
          title: "Delayed in Transit",
          accentColor: "from-amber-500 to-orange-600"
        };
      case "DELIVERED_NOT_RECEIVED":
        return {
          icon: HelpCircle,
          bg: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30",
          dot: "bg-rose-500 animate-pulse",
          title: "Delivered (Issue Reported)",
          accentColor: "from-rose-500 to-red-600"
        };
      case "TRACKING_PENDING":
        return {
          icon: Clock,
          bg: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30",
          dot: "bg-blue-500 animate-pulse",
          title: "Preparing for Dispatch",
          accentColor: "from-blue-500 to-indigo-600"
        };
      case "DELIVERED":
        return {
          icon: PackageCheck,
          bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
          dot: "bg-emerald-500",
          title: "Delivered",
          accentColor: "from-emerald-500 to-teal-600"
        };
      default:
        return {
          icon: Truck,
          bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
          dot: "bg-emerald-500 animate-pulse",
          title: "Out for Delivery",
          accentColor: "from-emerald-500 to-cyan-600"
        };
    }
  };

  const badge = getStatusBadge();
  const StatusIcon = badge.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800/90 p-4 sm:p-5 shadow-lg border border-slate-200/80 dark:border-slate-700/80 transition-all">
      {/* Top Gradient Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${badge.accentColor}`} />

      {/* Main Status Header */}
      <div className="flex items-start justify-between gap-3 mb-3 pt-1">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.bg}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
              <StatusIcon className="h-3.5 w-3.5" />
              <span>{order.status}</span>
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              #{order.id}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
            {order.estimatedDelivery}
          </h3>
        </div>

        {order.carrier && (
          <div className="text-right text-xs shrink-0">
            <div className="flex items-center justify-end space-x-1 text-slate-500 dark:text-slate-400">
              <Building2 className="h-3 w-3" />
              <span className="font-medium text-slate-700 dark:text-slate-300">{order.carrier}</span>
            </div>
            {order.trackingNumber !== "Pending Generation" && (
              <button
                onClick={handleCopy}
                className="mt-1 flex items-center space-x-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-mono font-medium transition-colors"
                title="Click to copy tracking ID"
              >
                <span>{order.trackingNumber}</span>
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Special status context messages */}
      {order.statusCode === "DELAYED" && (
        <div className="mt-2 text-xs p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <span className="font-semibold">Original ETA: {order.originalETA}</span>
            <p className="mt-0.5 text-[11px] text-amber-700/90 dark:text-amber-300/90">
              {order.delayReason}
            </p>
          </div>
        </div>
      )}

      {order.statusCode === "TRACKING_PENDING" && (
        <div className="mt-2 text-xs p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 flex items-start space-x-2">
          <Clock className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <span className="font-semibold">Fulfillment Stage:</span>
            <p className="mt-0.5 text-[11px] text-blue-700/90 dark:text-blue-300/90">
              Package currently at {order.warehouseDetails?.facility}. Carrier tracking link will be generated once package leaves warehouse.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center gap-2">
        {/* Toggle Live Map Button if driver data available */}
        {order.driver && (
          <button
            onClick={onToggleMap}
            className={`flex-1 min-w-[120px] flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              showMap
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800"
            }`}
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>{showMap ? "Hide Map" : "Live Courier Map"}</span>
          </button>
        )}

        {/* Support Action Button */}
        <button
          onClick={onOpenSupport}
          className="flex-1 min-w-[120px] flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Contact Support</span>
        </button>

        {/* Report Issue Button (if delivered or delayed) */}
        {(order.statusCode === "DELIVERED_NOT_RECEIVED" || order.statusCode === "DELAYED") && (
          <button
            onClick={onOpenReportIssue}
            className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 transition-colors"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Report Delivery Issue</span>
          </button>
        )}
      </div>
    </div>
  );
}
