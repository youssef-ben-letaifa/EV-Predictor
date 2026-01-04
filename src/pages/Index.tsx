import { Battery, Zap, Thermometer, Gauge, Cable, Fan, LucideIcon } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { VehicleHealthOverview } from "@/components/dashboard/VehicleHealthOverview";
import { ComponentStatusCard } from "@/components/dashboard/ComponentStatusCard";
import { PredictiveAlerts } from "@/components/dashboard/PredictiveAlerts";
import { DataInputPanel } from "@/components/dashboard/DataInputPanel";
import { MetricsChart } from "@/components/dashboard/MetricsChart";
import { MaintenanceLog } from "@/components/dashboard/MaintenanceLog";
import { ReportsView } from "@/components/dashboard/ReportsView";
import { SettingsView } from "@/components/dashboard/SettingsView";
import { ComponentDetailView } from "@/components/dashboard/ComponentDetailView";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import { useState } from "react";

const iconMap: Record<string, LucideIcon> = {
  battery: Battery,
  motor: Zap,
  thermal: Thermometer,
  charging: Cable,
  inverter: Gauge,
  cooling: Fan,
};

function DashboardContent() {
  const { activeNav, components, searchQuery } = useDashboard();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const filteredComponents = components.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Component detail view
  if (selectedComponent) {
    return (
      <ComponentDetailView
        componentId={selectedComponent}
        onBack={() => setSelectedComponent(null)}
      />
    );
  }

  // Render different views based on active nav
  const renderContent = () => {
    switch (activeNav) {
      case "Dashboard":
        return (
          <>
            <VehicleHealthOverview />
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Component Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredComponents.map((component, index) => (
                  <div
                    key={component.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="animate-scale-in cursor-pointer"
                    onClick={() => setSelectedComponent(component.id)}
                  >
                    <ComponentStatusCard
                      title={component.title}
                      icon={iconMap[component.id] || Gauge}
                      status={component.status}
                      metrics={component.metrics}
                      predictedFailure={component.predictedFailure}
                      lastMaintenance={component.lastMaintenance}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PredictiveAlerts />
              <DataInputPanel />
            </div>
            <MetricsChart />
          </>
        );

      case "Battery System":
        const battery = components.find((c) => c.id === "battery");
        return battery ? (
          <ComponentDetailView componentId="battery" onBack={() => {}} />
        ) : null;

      case "Motor & Inverter":
        return (
          <div className="space-y-6">
            <ComponentDetailView componentId="motor" onBack={() => {}} />
            <ComponentDetailView componentId="inverter" onBack={() => {}} />
          </div>
        );

      case "Thermal Management":
        return <ComponentDetailView componentId="thermal" onBack={() => {}} />;

      case "Maintenance Log":
        return <MaintenanceLog />;

      case "Reports":
        return <ReportsView />;

      case "Settings":
        return <SettingsView />;

      default:
        return (
          <div className="glass-panel p-12 text-center">
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">This section is under development.</p>
          </div>
        );
    }
  };

  return <>{renderContent()}</>;
}

const Index = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 space-y-6 overflow-auto min-h-[calc(100vh-4rem)]">
            <DashboardContent />
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Index;
