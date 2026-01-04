import { Battery, Zap, Thermometer, Gauge, LucideIcon } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

const getStatusColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "text-success";
    case "warning":
      return "text-warning";
    case "critical":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

const getProgressColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-success";
    case "warning":
      return "bg-warning";
    case "critical":
      return "bg-destructive";
    default:
      return "bg-muted";
  }
};

const iconMap: Record<string, LucideIcon> = {
  battery: Battery,
  motor: Zap,
  thermal: Thermometer,
  inverter: Gauge,
};

export function VehicleHealthOverview() {
  const { components } = useDashboard();

  const healthMetrics = components.slice(0, 4).map((comp) => {
    const value = comp.status === "healthy" ? 94 : comp.status === "warning" ? 72 : 45;
    return {
      label: comp.title,
      value,
      unit: "%",
      status: comp.status,
      icon: iconMap[comp.id] || Gauge,
    };
  });

  const overallHealth = Math.round(
    components.reduce(
      (acc, c) =>
        acc + (c.status === "healthy" ? 100 : c.status === "warning" ? 70 : 30),
      0
    ) / components.length
  );

  return (
    <div className="glass-panel p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Vehicle Health Overview</h2>
          <p className="text-sm text-muted-foreground mt-1">Real-time system diagnostics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-3xl font-bold gradient-text">{overallHealth}%</p>
            <p className="text-xs text-muted-foreground">Overall Health</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-primary/30 flex items-center justify-center glow-effect animate-pulse-slow">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="bg-secondary/50 rounded-lg p-4 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`${getStatusColor(metric.status)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-muted-foreground font-medium truncate">
                  {metric.label}
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </span>
                <span className="text-sm text-muted-foreground">{metric.unit}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                    metric.status
                  )}`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
