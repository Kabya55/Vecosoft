"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-slideUp">
      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
      <span className="text-xs font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white p-0.5"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
