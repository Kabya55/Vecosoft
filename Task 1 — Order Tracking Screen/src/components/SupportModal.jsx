"use client";

import { useState } from "react";
import { 
  X, 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles
} from "lucide-react";

export default function SupportModal({ isOpen, onClose, order, initialTab = "chat", onShowToast }) {
  const [activeTab, setActiveTab] = useState(initialTab); // "chat" | "report"
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: `Hello Alex! I am your 24/7 Delivery Assistant for Order #${order?.id || "ORD-98421"}. How can I assist you today?`,
      time: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Issue report form state
  const [issueType, setIssueType] = useState(
    order?.statusCode === "DELIVERED_NOT_RECEIVED" 
      ? "delivered-not-received" 
      : order?.statusCode === "DELAYED"
      ? "delayed-order"
      : "general-inquiry"
  );
  const [issueNotes, setIssueNotes] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      time: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    // Dynamic automated AI response simulation based on context
    setTimeout(() => {
      let botResponse = "I've logged your request. Our support team is monitoring your delivery status.";
      
      const lower = text.toLowerCase();
      if (lower.includes("missing") || lower.includes("not received") || lower.includes("haven't received")) {
        botResponse = "I understand you haven't received package #" + order.id + ". I have flagged this for driver re-verification. You can also file an instant reshipment/refund claim right here in the Report tab!";
      } else if (lower.includes("delay") || lower.includes("late") || lower.includes("where")) {
        botResponse = "Order #" + order.id + " is currently in transit. We have expedited your package with carrier priority.";
      } else if (lower.includes("refund") || lower.includes("reship")) {
        botResponse = "Your order is eligible for our 100% On-Time Guarantee! Would you like me to process a free replacement order or credit your payment method?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botResponse,
          time: "Just now"
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setReportSubmitted(true);
    onShowToast("Issue report submitted successfully! Reference ticket #TK-88391.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Delivery Support Center</h3>
              <p className="text-[11px] text-slate-400 font-mono">Order #{order?.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center space-x-1.5 border-b-2 transition-all ${
              activeTab === "chat"
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800"
                : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>24/7 AI Live Chat</span>
          </button>

          <button
            onClick={() => setActiveTab("report")}
            className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center space-x-1.5 border-b-2 transition-all ${
              activeTab === "report"
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800"
                : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <ShieldAlert className="h-4 w-4 text-rose-500" />
            <span>File Issue Claim</span>
          </button>
        </div>

        {/* Tab 1: Live Chat */}
        {activeTab === "chat" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] max-h-[360px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${
                    msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-indigo-500" />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-slate-100 dark:bg-slate-700/80 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium">
                  <Bot className="h-4 w-4 text-indigo-500 animate-spin" />
                  <span>Support bot is typing...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="p-2 px-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => handleSendMessage("Where is my package right now?")}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-500 shrink-0"
              >
                📍 Where is my package?
              </button>
              <button
                onClick={() => handleSendMessage("I marked delivered but cannot find package")}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-500 shrink-0"
              >
                ❓ Can&apos;t find package
              </button>
              <button
                onClick={() => handleSendMessage("Request a replacement order")}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-500 shrink-0"
              >
                🔄 Replacement Request
              </button>
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask support anything..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: File Issue Claim */}
        {activeTab === "report" && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[450px]">
            {reportSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-14 w-14 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  Claim Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Ticket #TK-88391 has been assigned. Our resolution team will review within 2 hours. A free replacement or instant refund link has been sent to your email.
                </p>
                <button
                  onClick={() => setReportSubmitted(false)}
                  className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                >
                  File Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Select Issue Category
                  </label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="delivered-not-received">Delivered but Not Received (Required Situation 2)</option>
                    <option value="delayed-order">Significant Delivery Delay (Required Situation 1)</option>
                    <option value="damaged">Damaged or Broken Items</option>
                    <option value="wrong-address">Address Change Request</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Describe details (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any additional details about your package location, property gate codes, or delivery notes..."
                    value={issueNotes}
                    onChange={(e) => setIssueNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-start space-x-2">
                  <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-indigo-800 dark:text-indigo-300">
                    TrackFlow Buyer Protection Guarantee: Orders reported missing or delayed beyond 48 hours are automatically eligible for instant re-shipment or 100% refund.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20"
                  >
                    Submit Ticket Claim
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
