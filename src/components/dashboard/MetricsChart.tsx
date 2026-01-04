import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/context/DashboardContext";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export function MetricsChart() {
  const { metricsData } = useDashboard();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    toast({
      title: "Data Refreshed",
      description: "Chart data has been updated.",
    });
  };

  const handleExport = () => {
    const csvContent =
      "Time,Battery %,Motor Temp,Efficiency\n" +
      metricsData.map((d) => `${d.time},${d.battery},${d.motor},${d.efficiency}`).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `metrics-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Metrics data has been exported to CSV.",
    });
  };

  return (
    <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Performance Trends</h2>
            <p className="text-sm text-muted-foreground">24-hour telemetry data</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 text-xs mr-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">Battery %</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-warning" />
              <span className="text-muted-foreground">Motor Temp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-success" />
              <span className="text-muted-foreground">Efficiency</span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={metricsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="batteryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(190, 95%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(190, 95%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="motorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="hsl(215, 15%, 55%)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(215, 15%, 55%)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 15%, 12%)",
                border: "1px solid hsl(220, 15%, 25%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(210, 20%, 95%)" }}
            />
            <Area
              type="monotone"
              dataKey="battery"
              stroke="hsl(190, 95%, 50%)"
              strokeWidth={2}
              fill="url(#batteryGradient)"
              name="Battery %"
            />
            <Area
              type="monotone"
              dataKey="motor"
              stroke="hsl(38, 92%, 50%)"
              strokeWidth={2}
              fill="url(#motorGradient)"
              name="Motor Temp (°C)"
            />
            <Area
              type="monotone"
              dataKey="efficiency"
              stroke="hsl(142, 70%, 45%)"
              strokeWidth={2}
              fill="url(#efficiencyGradient)"
              name="Efficiency %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
