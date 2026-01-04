import { LucideIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ComponentStatusCardProps {
  title: string;
  icon: LucideIcon;
  status: "healthy" | "warning" | "critical";
  metrics: {
    label: string;
    value: string | number;
    trend?: "up" | "down" | "stable";
  }[];
  predictedFailure?: string;
  lastMaintenance?: string;
  onViewDetails?: () => void;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "healthy":
      return {
        bg: "bg-success/10",
        border: "border-success/30",
        text: "text-success",
        badge: "bg-success/20 text-success",
        glow: "shadow-success/10",
      };
    case "warning":
      return {
        bg: "bg-warning/10",
        border: "border-warning/30",
        text: "text-warning",
        badge: "bg-warning/20 text-warning",
        glow: "shadow-warning/10",
      };
    case "critical":
      return {
        bg: "bg-destructive/10",
        border: "border-destructive/30",
        text: "text-destructive",
        badge: "bg-destructive/20 text-destructive",
        glow: "shadow-destructive/10",
      };
    default:
      return {
        bg: "bg-muted",
        border: "border-border",
        text: "text-muted-foreground",
        badge: "bg-muted text-muted-foreground",
        glow: "",
      };
  }
};

export function ComponentStatusCard({
  title,
  icon: Icon,
  status,
  metrics,
  predictedFailure,
  lastMaintenance,
}: ComponentStatusCardProps) {
  const styles = getStatusStyles(status);

  return (
    <Dialog>
      <div
        className={`glass-panel p-5 border ${styles.border} hover:scale-[1.02] transition-all duration-300 ${styles.glow} shadow-lg group`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${styles.bg}`}>
              <Icon className={`w-5 h-5 ${styles.text}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${styles.badge} font-medium uppercase tracking-wide`}
              >
                {status}
              </span>
            </div>
          </div>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </DialogTrigger>
        </div>

        <div className="space-y-3 mb-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <span className="text-sm font-medium text-foreground">{metric.value}</span>
            </div>
          ))}
        </div>

        {(predictedFailure || lastMaintenance) && (
          <div className="pt-3 border-t border-border/50 space-y-2">
            {predictedFailure && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Predicted Failure</span>
                <span
                  className={`text-xs font-medium ${
                    status === "critical"
                      ? "text-destructive"
                      : status === "warning"
                      ? "text-warning"
                      : "text-success"
                  }`}
                >
                  {predictedFailure}
                </span>
              </div>
            )}
            {lastMaintenance && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Last Maintenance</span>
                <span className="text-xs text-foreground">{lastMaintenance}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${styles.bg}`}>
              <Icon className={`w-5 h-5 ${styles.text}`} />
            </div>
            {title} Details
          </DialogTitle>
          <DialogDescription>Comprehensive component diagnostics and history</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Current Status</p>
              <p className={`text-lg font-semibold ${styles.text} capitalize`}>{status}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Health Score</p>
              <p className="text-lg font-semibold text-foreground">
                {status === "healthy" ? "94%" : status === "warning" ? "72%" : "45%"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Live Metrics</h4>
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between p-2 rounded bg-secondary/30"
              >
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <span className="text-sm font-medium text-foreground">{metric.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Maintenance Info</h4>
            <div className="p-3 rounded-lg bg-secondary/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Service</span>
                <span>{lastMaintenance || "N/A"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Predicted Failure</span>
                <span className={styles.text}>{predictedFailure || "None"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Service</span>
                <span>In 45 days</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button className="flex-1">Schedule Maintenance</Button>
            <Button variant="outline">Export Data</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
