"use client";

import { useState } from "react";
import { 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  ChevronRight, 
  Camera, 
  MapPin, 
  PhoneCall, 
  Gift, 
  ShieldAlert, 
  Check, 
  BellRing,
  ExternalLink,
  MessageSquare
} from "lucide-react";

export default function SituationBanner({ 
  order, 
  onOpenReportIssue, 
  onOpenSupport,
  onClaimCredit,
  onSubscribeSMS
}) {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [creditClaimed, setCreditClaimed] = useState(false);
  const [smsSubscribed, setSmsSubscribed] = useState(false);

  const handleClaim = () => {
    setCreditClaimed(true);
    onClaimCredit();
  };

  const handleSMS = () => {
    setSmsSubscribed(true);
    onSubscribeSMS();
  };

  // --- Situation 1: Delayed Order ---
  if (order.statusCode === "DELAYED") {
    return (
      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 sm:p-5 space-y-3 shadow-md">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 shadow-md shadow-amber-500/20">
            <AlertTriangle className="h-5 w-5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Situation 1: Delay Notice
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200 font-semibold">
                Updated Schedule
              </span>
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              We&apos;re sorry your delivery is running late
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {order.delayReason}
            </p>
          </div>
        </div>

        {/* Action Options for Delayed Order */}
        <div className="pt-2 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Claim Delay Credit */}
          <button
            onClick={handleClaim}
            disabled={creditClaimed}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              creditClaimed
                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                : "bg-amber-500 text-white hover:bg-amber-600 shadow-sm"
            }`}
          >
            <span className="flex items-center space-x-2">
              <Gift className="h-4 w-4" />
              <span>{creditClaimed ? "claimed $5 Store Credit!" : "Claim $5 Delay Voucher"}</span>
            </span>
            {creditClaimed ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {/* Priority Support */}
          <button
            onClick={onOpenSupport}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <PhoneCall className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Priority Courier Support</span>
            </span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
    );
  }

  // --- Situation 2: Delivered but Not Received ---
  if (order.statusCode === "DELIVERED_NOT_RECEIVED") {
    return (
      <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 sm:p-5 space-y-4 shadow-md">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-rose-500 text-white shrink-0 shadow-md shadow-rose-500/20">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Situation 2: Missing Package Assistance
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-200 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200 font-semibold">
                Urgent Action
              </span>
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              System shows delivered, but you haven&apos;t received it?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Carrier logged drop-off at <span className="font-semibold">{order.deliveryProof?.deliveredAt}</span>: &quot;{order.deliveryProof?.locationNote}&quot;.
            </p>
          </div>
        </div>

        {/* Proof Photo Button & Checklist */}
        <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-3 border border-rose-200 dark:border-rose-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
              <Camera className="h-4 w-4 text-rose-500" />
              <span>Delivery Photo & GPS Proof</span>
            </div>
            <button
              onClick={() => setShowPhotoModal(!showPhotoModal)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <span>{showPhotoModal ? "Hide Photo" : "View Photo"}</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Delivery Photo Expand */}
          {showPhotoModal && (
            <div className="mt-2 space-y-2 animate-fadeIn">
              <div className="relative rounded-lg overflow-hidden h-40 bg-slate-900 border border-slate-700">
                {/* eslint-disable-next-html-next-image */}
                <img
                  src={order.deliveryProof?.photo}
                  alt="Delivery drop-off proof"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-white flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-rose-400" />
                    <span>GPS: {order.deliveryProof?.gpsLocation}</span>
                  </span>
                  <span>{order.deliveryProof?.deliveredAt}</span>
                </div>
              </div>
            </div>
          )}

          {/* Checklist */}
          <div className="text-xs space-y-1.5 pt-1 text-slate-600 dark:text-slate-300">
            <p className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] uppercase tracking-wider">
              Quick Checklist Before Reporting:
            </p>
            <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-600 dark:text-slate-400">
              <li>Check mailbox, side porch, back gate, or apartment mailroom</li>
              <li>Ask neighbors or building receptionist if accepted on your behalf</li>
            </ul>
          </div>
        </div>

        {/* Resolution Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={onOpenReportIssue}
            className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/20 transition-all"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Report Missing & Reship/Refund</span>
          </button>

          <button
            onClick={onOpenSupport}
            className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-rose-500" />
            <span>Chat Live with Courier</span>
          </button>
        </div>
      </div>
    );
  }

  // --- Situation 3: Tracking Not Available Yet ---
  if (order.statusCode === "TRACKING_PENDING") {
    return (
      <div className="rounded-2xl bg-blue-500/10 border border-blue-500/30 p-4 sm:p-5 space-y-4 shadow-md">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 shadow-md shadow-blue-500/20">
            <Clock className="h-5 w-5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Situation 3: Preparing Dispatch
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200 font-semibold">
                In Warehouse
              </span>
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              Order Confirmed – Tracking Code Generating Soon
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your items are currently being packed at <span className="font-semibold">{order.warehouseDetails?.facility}</span>. Official carrier tracking link will update automatically within 12–24 hours.
            </p>
          </div>
        </div>

        {/* Packing status progress widget */}
        <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-3 border border-blue-200 dark:border-blue-900/50 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Current Stage: {order.warehouseDetails?.currentStage}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-mono text-[11px] font-bold">
              Dispatching Soon
            </span>
          </div>
          <div className="h-1.5 w-full bg-blue-100 dark:bg-blue-950 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full w-2/3 animate-pulse"></div>
          </div>
        </div>

        {/* Interactive Subscription */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <button
            onClick={handleSMS}
            disabled={smsSubscribed}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              smsSubscribed
                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            }`}
          >
            <BellRing className="h-4 w-4" />
            <span>{smsSubscribed ? "Subscribed to Instant SMS Alerts!" : "Get SMS & WhatsApp Alerts"}</span>
          </button>

          <button
            onClick={onOpenSupport}
            className="flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <HelpCircle className="h-4 w-4 text-blue-500" />
            <span>Need Help?</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}
