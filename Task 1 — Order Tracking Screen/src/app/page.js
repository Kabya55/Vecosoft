"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { mockOrders } from "@/data/orders";
import Header from "@/components/Header";
import TrackingContainer from "@/components/TrackingContainer";
import OrderStatusCard from "@/components/OrderStatusCard";
import SituationBanner from "@/components/SituationBanner";
import ProgressTimeline from "@/components/ProgressTimeline";
import LiveDriverMap from "@/components/LiveDriverMap";
import OrderSummary from "@/components/OrderSummary";
import SupportModal from "@/components/SupportModal";
import Toast from "@/components/Toast";

export default function Home() {
  const [activeScenario, setActiveScenario] = useState("in-transit");
  const [darkMode, setDarkMode] = useState(false); // Default to Light Mode
  const [showMap, setShowMap] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Modal state
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportInitialTab, setSupportInitialTab] = useState("chat");

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  // Apply dark mode class to html document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const currentOrder = mockOrders[activeScenario] || mockOrders["in-transit"];

  const handleSelectScenario = (scenarioKey) => {
    setIsRefreshing(true);
    setActiveScenario(scenarioKey);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 350);
  };

  const handleCopyTracking = (trackingNum) => {
    setToastMessage(`Copied tracking number: ${trackingNum}`);
  };

  const handleClaimCredit = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
    setToastMessage("🎉 $5 Delay Voucher applied to your account balance!");
  };

  const handleSubscribeSMS = () => {
    setToastMessage("📱 Subscribed to instant SMS & WhatsApp tracking updates!");
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setToastMessage("Refreshing courier GPS data...");
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans">
      
      {/* Top Header & Scenario Switcher Toolbar */}
      <Header
        activeScenario={activeScenario}
        onSelectScenario={handleSelectScenario}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 flex flex-col">
        
        {/* Scenario Explanation Banner */}
        <div className="max-w-2xl mx-auto w-full mb-3">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="font-bold text-slate-900 dark:text-white">
                {currentOrder.scenarioTitle}:
              </span>
              <span className="text-slate-600 dark:text-slate-300">
                {currentOrder.scenarioDescription}
              </span>
            </div>
          </div>
        </div>

        {/* Tracking Page Container */}
        <TrackingContainer
          orderId={currentOrder.id}
          onOpenSupport={() => {
            setSupportInitialTab("chat");
            setIsSupportOpen(true);
          }}
          onRefreshData={handleRefreshData}
          isRefreshing={isRefreshing}
        >
          {isRefreshing ? (
            /* Skeleton Loading State */
            <div className="space-y-4 animate-pulse p-2">
              <div className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
              <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
              <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
            </div>
          ) : (
            <>
              {/* 1. Primary Order Status Card */}
              <OrderStatusCard
                order={currentOrder}
                onCopyTracking={handleCopyTracking}
                onOpenSupport={() => {
                  setSupportInitialTab("chat");
                  setIsSupportOpen(true);
                }}
                onOpenReportIssue={() => {
                  setSupportInitialTab("report");
                  setIsSupportOpen(true);
                }}
                onToggleMap={() => setShowMap(!showMap)}
                showMap={showMap}
              />

              {/* 2. Situation Specific Alert / Banner (Delayed / Missing / Tracking Pending) */}
              <SituationBanner
                order={currentOrder}
                onOpenReportIssue={() => {
                  setSupportInitialTab("report");
                  setIsSupportOpen(true);
                }}
                onOpenSupport={() => {
                  setSupportInitialTab("chat");
                  setIsSupportOpen(true);
                }}
                onClaimCredit={handleClaimCredit}
                onSubscribeSMS={handleSubscribeSMS}
              />

              {/* 3. Live Driver GPS Vector Map (If Driver available & map toggled) */}
              {currentOrder.driver && showMap && (
                <LiveDriverMap
                  driver={currentOrder.driver}
                />
              )}

              {/* 4. Visual Delivery Progress Timeline & Checkpoints */}
              <ProgressTimeline order={currentOrder} />

              {/* 5. Order Summary & Purchased Items */}
              <OrderSummary order={currentOrder} />
            </>
          )}
        </TrackingContainer>
      </main>

      {/* Support & Issue Resolution Modal Drawer */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        order={currentOrder}
        initialTab={supportInitialTab}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* Toast Notification Popups */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Task 1 — Order Tracking System</span>
          <span className="text-[11px] font-mono">Built with Next.js & Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}
