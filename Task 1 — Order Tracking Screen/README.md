# TrackFlow — Next.js Mobile Order Tracking Screen 🚀

A modern, professional, and interactive **mobile Order Tracking Screen** built with **Next.js 16 (App Router, JavaScript)** and **Tailwind CSS**.

Designed to replace static status lists (*Processing*, *Shipped*, *Out for Delivery*, *Delivered*) with an intuitive, transparent, and actionable delivery experience.

---

## 🌟 Key Features

1. **Interactive Scenario Switcher (All 3 Edge Cases Handled)**:
   - 🟢 **Standard In-Transit**: Active delivery with live courier map, stops away, ETA, and progress bar.
   - ⚠️ **Situation 1: Delayed Order**: Communicates delivery delays clearly with revised ETA, delay cause explanation, **Priority Support**, and **Claim $5 Delay Voucher**.
   - ❓ **Situation 2: Delivered but Not Received**: For system-marked delivered packages where customer reports missing items. Includes **Proof Photo & GPS Viewer**, checklist, and **Report Missing & Reship/Refund**.
   - 📦 **Situation 3: Tracking Not Available Yet**: Informative warehouse packing state (Facility #4 Atlanta), avoids broken screens, provides **SMS/WhatsApp Alerts subscription**.
   - ✅ **Completed Delivery**: Successful delivery card with review options.

2. **Mobile Frame & Responsive Views**:
   - **Simulated Mobile Chassis (393px)**: iPhone 15 Pro style frame with status bar, dynamic island, and home bar indicator for mobile evaluation.
   - **Fluid Desktop View**: Responsive full-screen experience.

3. **Live Courier Vector Map**:
   - Simulated SVG street grid with driver vehicle location pin, destination pin, driver rating, stops away countdown, and direct call button.

4. **24/7 AI Live Chat & Issue Resolution Center**:
   - Interactive support modal with real-time automated assistance and formal ticket filing for instant replacement/refund claims.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, JavaScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **Animations & Effects**: Custom CSS keyframes & `canvas-confetti`

---

## ⚙️ Setup & Local Execution Instructions

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher

### Steps

1. **Clone Repository & Install Dependencies**:
   ```bash
   git clone <your-repo-url>
   cd Task-1
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
   
   **Live Url** [https://task-1-order-tracking-screen.vercel.app](https://task-1-order-tracking-screen.vercel.app) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📊 Evaluation Criteria Checklist

- [x] Clear visual delivery progress/timeline
- [x] Prominent current order status & ETA date/time
- [x] Complete order/product summary with item thumbnails & pricing
- [x] Clear contact support buttons & interactive live chat
- [x] Loading, skeleton, and empty/pending states
- [x] Responsive design for 360–430px mobile widths
- [x] Handled Situation 1 (Delayed Order)
- [x] Handled Situation 2 (Delivered but Not Received)
- [x] Handled Situation 3 (Tracking Not Available Yet)
