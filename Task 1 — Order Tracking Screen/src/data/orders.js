export const mockOrders = {
  "in-transit": {
    id: "ORD-98421",
    scenario: "in-transit",
    scenarioTitle: "On Track / In Transit",
    scenarioDescription: "Standard active delivery with live tracking and driver map",
    status: "Out for Delivery",
    statusCode: "OUT_FOR_DELIVERY",
    statusColor: "emerald",
    estimatedDelivery: "Today, Sep 26 by 6:30 PM",
    carrier: "Express Logistics",
    trackingNumber: "EXP-883920149-US",
    carrierPhone: "+1 (800) 555-0199",
    driver: {
      name: "Marcus Vance",
      phone: "+1 (555) 234-5678",
      rating: 4.9,
      trips: 1420,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      stopsAway: 3,
      etaMinutes: 25,
      vehicle: "White Ford Transit (Lic: 7XYZ89)"
    },
    progressPercent: 78,
    steps: [
      { key: "placed", title: "Order Placed", date: "Sep 24, 10:15 AM", completed: true, location: "Online Store" },
      { key: "processed", title: "Processing", date: "Sep 24, 02:30 PM", completed: true, location: "Central Warehouse, NJ" },
      { key: "shipped", title: "Shipped", date: "Sep 25, 08:45 AM", completed: true, location: "Sort Facility, Newark NJ" },
      { key: "out_for_delivery", title: "Out for Delivery", date: "Sep 26, 08:15 AM", completed: true, active: true, location: "Local Depot, Brooklyn NY" },
      { key: "delivered", title: "Delivered", date: "Est. Today 6:30 PM", completed: false, location: "Your Address" }
    ],
    detailedTimeline: [
      { time: "Today, 02:40 PM", status: "Driver Marcus is 3 stops away", location: "Grand St & 4th Ave" },
      { time: "Today, 08:15 AM", status: "Package loaded onto delivery vehicle", location: "Brooklyn Local Depot" },
      { time: "Sep 25, 11:20 PM", status: "Arrived at regional sorting hub", location: "Newark, NJ" },
      { time: "Sep 25, 08:45 AM", status: "Departed fulfillment center", location: "Mahwah, NJ" },
      { time: "Sep 24, 02:30 PM", status: "Payment verified & items packed", location: "Central Warehouse" }
    ],
    items: [
      {
        id: "p1",
        name: "Pro Sound Wireless Headphones",
        variant: "Space Black / Active Noise Canceling",
        price: 199.00,
        qty: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80"
      },
      {
        id: "p2",
        name: "MagSafe Fast Charging Pad",
        variant: "Silver / 15W Turbo",
        price: 39.00,
        qty: 1,
        image: "https://images.unsplash.com/photo-1616876195047-522271be4e66?q=80"
      }
    ],
    summary: {
      subtotal: 238.00,
      shipping: 0.00,
      tax: 19.04,
      total: 257.04
    },
    shippingAddress: {
      name: "Alex Morgan",
      street: "742 Evergreen Terrace, Apt 4B",
      city: "Brooklyn",
      state: "NY 11201",
      phone: "+1 (555) 987-6543"
    },
    paymentMethod: "Visa ending in 4821"
  },

  "delayed": {
    id: "ORD-98422",
    scenario: "delayed",
    scenarioTitle: "Situation 1: Delayed Order",
    scenarioDescription: "Estimated delivery time passed due to transit delay",
    status: "Delayed in Transit",
    statusCode: "DELAYED",
    statusColor: "amber",
    estimatedDelivery: "Updated: Tomorrow, Sep 27 by 2:00 PM",
    originalETA: "Sep 25 by 7:00 PM (Passed)",
    carrier: "SwiftPack Express",
    trackingNumber: "SWF-99401284-US",
    carrierPhone: "+1 (888) 555-0144",
    delayReason: "Severe weather conditions & Highway 95 logistics bottleneck caused a temporary reroute.",
    progressPercent: 55,
    steps: [
      { key: "placed", title: "Order Placed", date: "Sep 22, 09:00 AM", completed: true, location: "Online Store" },
      { key: "processed", title: "Processing", date: "Sep 22, 01:15 PM", completed: true, location: "Main Hub" },
      { key: "shipped", title: "Shipped", date: "Sep 23, 11:30 AM", completed: true, location: "Hub Freight Depot" },
      { key: "out_for_delivery", title: "Out for Delivery", date: "Delayed", active: true, error: true, location: "En-route Hub" },
      { key: "delivered", title: "Delivered", date: "Est. Sep 27", completed: false, location: "Your Address" }
    ],
    detailedTimeline: [
      { time: "Today, 10:15 AM", status: "Logistics update: Package rerouted due to highway closure", location: "Scranton Hub, PA" },
      { time: "Sep 25, 07:00 PM", status: "Delivery window elapsed - Rerouting in progress", location: "Transit Hub" },
      { time: "Sep 24, 04:20 PM", status: "Departed sorting facility", location: "Philadelphia, PA" },
      { time: "Sep 23, 11:30 AM", status: "Package picked up by carrier", location: "Central Warehouse" }
    ],
    items: [
      {
        id: "p3",
        name: "Ergonomic Mechanical Keyboard",
        variant: "RGB Backlit / Tactile Brown Switches",
        price: 149.00,
        qty: 1,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&auto=format&fit=crop&q=80"
      }
    ],
    summary: {
      subtotal: 149.00,
      shipping: 5.99,
      tax: 12.40,
      total: 167.39
    },
    shippingAddress: {
      name: "Alex Morgan",
      street: "742 Evergreen Terrace, Apt 4B",
      city: "Brooklyn",
      state: "NY 11201",
      phone: "+1 (555) 987-6543"
    },
    paymentMethod: "Apple Pay (Mastercard •••• 9102)"
  },

  "delivered-not-received": {
    id: "ORD-98423",
    scenario: "delivered-not-received",
    scenarioTitle: "Situation 2: Delivered but Not Received",
    scenarioDescription: "Marked delivered by system, but user cannot locate package",
    status: "Delivered (Issue Reported)",
    statusCode: "DELIVERED_NOT_RECEIVED",
    statusColor: "rose",
    estimatedDelivery: "Delivered on Sep 26 at 2:15 PM",
    carrier: "CityCourier Global",
    trackingNumber: "CCG-44820193-US",
    carrierPhone: "+1 (800) 555-0811",
    deliveryProof: {
      photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
      locationNote: "Left at Front Door / Porch near doormat",
      gpsLocation: "40.6782° N, 73.9442° W (Verified Drop-off)",
      deliveredAt: "Sep 26, 2:15 PM"
    },
    progressPercent: 100,
    steps: [
      { key: "placed", title: "Order Placed", date: "Sep 23, 08:30 AM", completed: true, location: "Online Store" },
      { key: "processed", title: "Processing", date: "Sep 23, 11:00 AM", completed: true, location: "Warehouse" },
      { key: "shipped", title: "Shipped", date: "Sep 24, 09:15 AM", completed: true, location: "Local Hub" },
      { key: "out_for_delivery", title: "Out for Delivery", date: "Sep 26, 07:30 AM", completed: true, location: "Driver Vehicle" },
      { key: "delivered", title: "Delivered", date: "Sep 26, 02:15 PM", completed: true, warning: true, location: "Front Porch" }
    ],
    detailedTimeline: [
      { time: "Sep 26, 02:15 PM", status: "Delivered & photo captured by driver", location: "Front Door" },
      { time: "Sep 26, 07:30 AM", status: "Out for delivery with Driver Carlos", location: "Brooklyn Depot" },
      { time: "Sep 25, 06:10 PM", status: "Arrived at destination delivery facility", location: "Brooklyn, NY" }
    ],
    items: [
      {
        id: "p4",
        name: "Ultra-Clear 4K Monitor Arm",
        variant: "Single Arm / Matte Aluminium",
        price: 89.99,
        qty: 1,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&auto=format&fit=crop&q=80"
      }
    ],
    summary: {
      subtotal: 89.99,
      shipping: 0.00,
      tax: 7.20,
      total: 97.19
    },
    shippingAddress: {
      name: "Alex Morgan",
      street: "742 Evergreen Terrace, Apt 4B",
      city: "Brooklyn",
      state: "NY 11201",
      phone: "+1 (555) 987-6543"
    },
    paymentMethod: "PayPal (alex@example.com)"
  },

  "tracking-pending": {
    id: "ORD-98424",
    scenario: "tracking-pending",
    scenarioTitle: "Situation 3: Tracking Not Available Yet",
    scenarioDescription: "Order confirmed & processing; carrier tracking assignment pending",
    status: "Preparing for Dispatch",
    statusCode: "TRACKING_PENDING",
    statusColor: "blue",
    estimatedDelivery: "Expected Sep 28 – Sep 30",
    carrier: "Carrier to be assigned",
    trackingNumber: "Pending Generation",
    progressPercent: 25,
    warehouseDetails: {
      facility: "Distribution Center #4 (Atlanta, GA)",
      currentStage: "Quality Check & Custom Packaging",
      estimatedDispatch: "Within 12 to 24 hours"
    },
    steps: [
      { key: "placed", title: "Order Placed", date: "Today, 11:30 AM", completed: true, location: "Online Store" },
      { key: "processed", title: "Packing Package", date: "In Progress", active: true, location: "Fulfillment Center #4" },
      { key: "shipped", title: "Shipped", date: "Pending", completed: false, location: "Carrier Hand-off" },
      { key: "out_for_delivery", title: "Out for Delivery", date: "Pending", completed: false, location: "Local Destination" },
      { key: "delivered", title: "Delivered", date: "Est. Sep 28-30", completed: false, location: "Your Address" }
    ],
    detailedTimeline: [
      { time: "Today, 11:35 AM", status: "Order verified & routed to Fulfillment Center #4", location: "System" },
      { time: "Today, 11:30 AM", status: "Payment received & order confirmed", location: "Online Store" }
    ],
    items: [
      {
        id: "p5",
        name: "Smart Ambient LED Desk Lamp",
        variant: "Dual Spectrum / Touch Dimmer",
        price: 64.50,
        qty: 2,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&auto=format&fit=crop&q=80"
      }
    ],
    summary: {
      subtotal: 129.00,
      shipping: 0.00,
      tax: 10.32,
      total: 139.32
    },
    shippingAddress: {
      name: "Alex Morgan",
      street: "742 Evergreen Terrace, Apt 4B",
      city: "Brooklyn",
      state: "NY 11201",
      phone: "+1 (555) 987-6543"
    },
    paymentMethod: "Visa ending in 4821"
  },

  "delivered-success": {
    id: "ORD-98425",
    scenario: "delivered-success",
    scenarioTitle: "Delivered Successfully",
    scenarioDescription: "Completed delivery with customer confirmation option",
    status: "Delivered",
    statusCode: "DELIVERED",
    statusColor: "emerald",
    estimatedDelivery: "Delivered Yesterday at 4:10 PM",
    carrier: "Express Logistics",
    trackingNumber: "EXP-77210923-US",
    carrierPhone: "+1 (800) 555-0199",
    progressPercent: 100,
    deliveryProof: {
      photo: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80",
      locationNote: "Handed directly to resident",
      deliveredAt: "Sep 25, 4:10 PM"
    },
    steps: [
      { key: "placed", title: "Order Placed", date: "Sep 22, 10:00 AM", completed: true, location: "Online Store" },
      { key: "processed", title: "Processing", date: "Sep 22, 02:00 PM", completed: true, location: "Warehouse" },
      { key: "shipped", title: "Shipped", date: "Sep 23, 09:00 AM", completed: true, location: "Sort Hub" },
      { key: "out_for_delivery", title: "Out for Delivery", date: "Sep 25, 08:00 AM", completed: true, location: "Driver Van" },
      { key: "delivered", title: "Delivered", date: "Sep 25, 04:10 PM", completed: true, location: "Handed to Resident" }
    ],
    detailedTimeline: [
      { time: "Sep 25, 04:10 PM", status: "Package handed directly to Alex", location: "Recipient" },
      { time: "Sep 25, 08:00 AM", status: "Out for delivery", location: "Brooklyn Hub" }
    ],
    items: [
      {
        id: "p6",
        name: "Wireless Ergonomic Mouse",
        variant: "Graphite / Silent Click",
        price: 49.99,
        qty: 1,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200&auto=format&fit=crop&q=80"
      }
    ],
    summary: {
      subtotal: 49.99,
      shipping: 0.00,
      tax: 4.00,
      total: 53.99
    },
    shippingAddress: {
      name: "Alex Morgan",
      street: "742 Evergreen Terrace, Apt 4B",
      city: "Brooklyn",
      state: "NY 11201",
      phone: "+1 (555) 987-6543"
    },
    paymentMethod: "Mastercard ending in 1104"
  }
};
