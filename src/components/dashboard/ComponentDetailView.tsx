import { Battery, Zap, Thermometer, Gauge, Cable, Fan, ArrowLeft, TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/context/DashboardContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const iconMap: Record<string, LucideIcon> = {
  battery: Battery,
  motor: Zap,
  thermal: Thermometer,
  charging: Cable,
  inverter: Gauge,
  cooling: Fan,
};

const mockHistory = [
  { date: "Week 1", health: 98 },
  { date: "Week 2", health: 97 },
  { date: "Week 3", health: 96 },
  { date: "Week 4", health: 94 },
];

interface ComponentDetailViewProps {
  componentId: string;
  onBack: () => void;
}

export function ComponentDetailView({ componentId, onBack }: ComponentDetailViewProps) {
  const { components } = useDashboard();
  const component = components.find((c) => c.id === componentId);

  if (!component) {
    return (
      <div className="glass-panel p-6 text-center">
        <p className="text-muted-foreground">Component not found</p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const Icon = iconMap[componentId] || Gauge;
  const statusColor =
    component.status === "healthy"
      ? "text-success"
      : component.status === "warning"
      ? "text-warning"
      : "text-destructive";

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{component.title}</h2>
            <span className={`text-sm ${statusColor} capitalize font-medium`}>{component.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {component.metrics.map((metric, idx) => {
            const trend = idx === 0 ? "up" : idx === 1 ? "stable" : "down";
            return (
              <div key={metric.label} className="p-4 rounded-lg bg-secondary/50 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  {trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : trend === "down" ? (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  ) : (
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border/30">
            <h4 className="font-medium mb-2">Predicted Failure</h4>
            <p className={`text-lg font-semibold ${statusColor}`}>{component.predictedFailure}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50 border border-border/30">
            <h4 className="font-medium mb-2">Last Maintenance</h4>
            <p className="text-lg font-semibold text-foreground">{component.lastMaintenance}</p>
          </div>
        </div>

        <h3 className="font-semibold mb-4">Health Trend (Last 4 Weeks)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockHistory}>
              <defs>
                <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(190, 95%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(190, 95%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
              <XAxis dataKey="date" stroke="hsl(215, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(215, 15%, 55%)" fontSize={11} domain={[80, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 15%, 12%)",
                  border: "1px solid hsl(220, 15%, 25%)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="health"
                stroke="hsl(190, 95%, 50%)"
                strokeWidth={2}
                fill="url(#healthGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-3 mt-6">
          <Button className="flex-1">Schedule Maintenance</Button>
          <Button variant="outline">Export History</Button>
          <Button variant="outline">Run Diagnostics</Button>
        </div>
      </div>
    </div>
  );
}
