import { createContext, useContext, useState, ReactNode } from "react";

export interface ComponentData {
  id: string;
  title: string;
  status: "healthy" | "warning" | "critical";
  metrics: { label: string; value: string }[];
  predictedFailure: string;
  lastMaintenance: string;
}

export interface Alert {
  id: string;
  component: string;
  severity: "low" | "medium" | "high";
  message: string;
  timeToFailure: string;
  recommendation: string;
  acknowledged: boolean;
}

export interface VehicleData {
  vehicleId: string;
  mileage: number;
  batteryVoltage: number;
  motorTemp: number;
  ambientTemp: number;
  timestamp: Date;
}

export interface MetricData {
  time: string;
  battery: number;
  motor: number;
  efficiency: number;
}

interface DashboardContextType {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  components: ComponentData[];
  updateComponent: (id: string, updates: Partial<ComponentData>) => void;
  alerts: Alert[];
  acknowledgeAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
  vehicleHistory: VehicleData[];
  addVehicleData: (data: VehicleData) => void;
  metricsData: MetricData[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: { id: string; message: string; read: boolean }[];
  markNotificationRead: (id: string) => void;
  lastSync: Date;
  recordsProcessed: number;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const initialComponents: ComponentData[] = [
  {
    id: "battery",
    title: "Battery Pack",
    status: "healthy",
    metrics: [
      { label: "State of Charge", value: "78%" },
      { label: "State of Health", value: "94%" },
      { label: "Cell Imbalance", value: "12mV" },
    ],
    predictedFailure: "None expected",
    lastMaintenance: "Dec 15, 2025",
  },
  {
    id: "motor",
    title: "Electric Motor",
    status: "healthy",
    metrics: [
      { label: "Peak Efficiency", value: "97.2%" },
      { label: "Operating Temp", value: "48°C" },
      { label: "Vibration Level", value: "0.8 mm/s" },
    ],
    predictedFailure: "None expected",
    lastMaintenance: "Nov 28, 2025",
  },
  {
    id: "thermal",
    title: "Thermal System",
    status: "warning",
    metrics: [
      { label: "Coolant Temp", value: "42°C" },
      { label: "Flow Rate", value: "8.2 L/min" },
      { label: "Pressure Delta", value: "0.3 bar" },
    ],
    predictedFailure: "~15 days",
    lastMaintenance: "Oct 10, 2025",
  },
  {
    id: "charging",
    title: "Charging System",
    status: "healthy",
    metrics: [
      { label: "Max Charge Rate", value: "150 kW" },
      { label: "Connector Health", value: "98%" },
      { label: "Cycles Count", value: "847" },
    ],
    predictedFailure: "None expected",
    lastMaintenance: "Dec 01, 2025",
  },
  {
    id: "inverter",
    title: "Inverter Unit",
    status: "warning",
    metrics: [
      { label: "Efficiency", value: "96.8%" },
      { label: "IGBT Temp", value: "72°C" },
      { label: "Capacitor ESR", value: "0.12Ω" },
    ],
    predictedFailure: "~45 days",
    lastMaintenance: "Sep 22, 2025",
  },
  {
    id: "cooling",
    title: "Cooling Fan",
    status: "healthy",
    metrics: [
      { label: "RPM", value: "2,400" },
      { label: "Current Draw", value: "1.2A" },
      { label: "Bearing Wear", value: "Low" },
    ],
    predictedFailure: "~90 days",
    lastMaintenance: "Nov 15, 2025",
  },
];

const initialAlerts: Alert[] = [
  {
    id: "1",
    component: "Battery Cell Module 3",
    severity: "high",
    message: "Abnormal temperature gradient detected",
    timeToFailure: "~15 days",
    recommendation: "Schedule thermal inspection",
    acknowledged: false,
  },
  {
    id: "2",
    component: "Inverter Unit",
    severity: "medium",
    message: "Efficiency degradation trending",
    timeToFailure: "~45 days",
    recommendation: "Monitor capacitor health",
    acknowledged: false,
  },
  {
    id: "3",
    component: "Cooling Pump",
    severity: "low",
    message: "Bearing wear indicators present",
    timeToFailure: "~90 days",
    recommendation: "Plan replacement during next service",
    acknowledged: false,
  },
];

const initialMetrics: MetricData[] = [
  { time: "00:00", battery: 95, motor: 42, efficiency: 97 },
  { time: "04:00", battery: 94, motor: 45, efficiency: 96 },
  { time: "08:00", battery: 93, motor: 58, efficiency: 94 },
  { time: "12:00", battery: 91, motor: 72, efficiency: 92 },
  { time: "16:00", battery: 88, motor: 68, efficiency: 93 },
  { time: "20:00", battery: 85, motor: 55, efficiency: 95 },
  { time: "Now", battery: 94, motor: 48, efficiency: 97 },
];

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [components, setComponents] = useState<ComponentData[]>(initialComponents);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [vehicleHistory, setVehicleHistory] = useState<VehicleData[]>([]);
  const [metricsData, setMetricsData] = useState<MetricData[]>(initialMetrics);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSync, setLastSync] = useState(new Date());
  const [recordsProcessed, setRecordsProcessed] = useState(12847);
  const [notifications, setNotifications] = useState([
    { id: "n1", message: "Thermal system requires attention", read: false },
    { id: "n2", message: "Inverter efficiency below threshold", read: false },
    { id: "n3", message: "Scheduled maintenance reminder", read: true },
  ]);

  const updateComponent = (id: string, updates: Partial<ComponentData>) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const addVehicleData = (data: VehicleData) => {
    setVehicleHistory((prev) => [...prev, data]);
    setLastSync(new Date());
    setRecordsProcessed((prev) => prev + 1);

    // Update metrics chart with new data point
    const newMetric: MetricData = {
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      battery: Math.min(100, Math.max(0, data.batteryVoltage / 4)),
      motor: data.motorTemp,
      efficiency: Math.max(85, 100 - Math.abs(data.motorTemp - 50) / 2),
    };

    setMetricsData((prev) => {
      const updated = [...prev.slice(1), newMetric];
      return updated;
    });

    // Update component statuses based on new data
    if (data.motorTemp > 70) {
      updateComponent("motor", { status: "warning" });
    } else if (data.motorTemp > 85) {
      updateComponent("motor", { status: "critical" });
    } else {
      updateComponent("motor", { status: "healthy" });
    }

    if (data.batteryVoltage < 350) {
      updateComponent("battery", { status: "warning" });
    } else if (data.batteryVoltage < 300) {
      updateComponent("battery", { status: "critical" });
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        activeNav,
        setActiveNav,
        components,
        updateComponent,
        alerts,
        acknowledgeAlert,
        dismissAlert,
        vehicleHistory,
        addVehicleData,
        metricsData,
        searchQuery,
        setSearchQuery,
        notifications,
        markNotificationRead,
        lastSync,
        recordsProcessed,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
