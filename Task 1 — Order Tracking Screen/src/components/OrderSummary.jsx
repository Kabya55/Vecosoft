"use client";

import { useState } from "react";
import { 
  ShoppingBag, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  MapPin, 
  ShieldCheck
} from "lucide-react";

export default function OrderSummary({ order }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/90 p-4 sm:p-5 shadow-lg border border-slate-200/80 dark:border-slate-700/80 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center space-x-2 text-slate-900 dark:text-white text-left font-bold text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ShoppingBag className="h-4 w-4 text-indigo-500" />
          <span>Order Items & Summary ({order.items?.length || 0})</span>
        </button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {expanded && (
        <div className="space-y-4 animate-fadeIn">
          {/* Items list */}
          <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-700/60">
            {order.items?.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-center space-x-3">
                <div className="h-14 w-14 rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                  {/* eslint-disable-next-html-next-image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                    {item.name}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {item.variant}
                  </p>
                  <p className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                    Qty: {item.qty} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  ${(item.qty * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Details */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span>${order.summary?.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Shipping</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {order.summary?.shipping === 0 ? "FREE Express" : `$${order.summary?.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Estimated Tax</span>
              <span>${order.summary?.tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
              <span>Total Paid</span>
              <span className="text-indigo-600 dark:text-indigo-400">${order.summary?.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Address & Payment Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            {/* Address */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
                <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                <span>Shipping Address</span>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white">{order.shippingAddress?.name}</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-tight">
                {order.shippingAddress?.street}<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state}
              </p>
            </div>

            {/* Payment */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
                <CreditCard className="h-3.5 w-3.5 text-indigo-500" />
                <span>Payment Method</span>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white">{order.paymentMethod}</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 mt-1">
                <ShieldCheck className="h-3 w-3" />
                <span>Payment Verified & Secured</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
