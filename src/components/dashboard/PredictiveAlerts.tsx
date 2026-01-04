import { AlertTriangle, Clock, ArrowRight, CheckCircle2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/context/DashboardContext";
import { toast } from "@/hooks/use-toast";

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case "high":
      return {
        bg: "bg-destructive/10",
        border: "border-destructive/40",
        icon: "text-destructive",
        badge: "bg-destructive/20 text-destructive",
      };
    case "medium":
      return {
        bg: "bg-warning/10",
        border: "border-warning/40",
        icon: "text-warning",
        badge: "bg-warning/20 text-warning",
      };
    case "low":
      return {
        bg: "bg-primary/10",
        border: "border-primary/40",
        icon: "text-primary",
        badge: "bg-primary/20 text-primary",
      };
    default:
      return {
        bg: "bg-muted",
        border: "border-border",
        icon: "text-muted-foreground",
        badge: "bg-muted text-muted-foreground",
      };
  }
};

export function PredictiveAlerts() {
  const { alerts, acknowledgeAlert, dismissAlert, components } = useDashboard();

  const activeAlerts = alerts.filter((a) => !a.acknowledged);
  const healthyComponents = components.filter((c) => c.status === "healthy").length;

  const handleAcknowledge = (id: string, component: string) => {
    acknowledgeAlert(id);
    toast({
      title: "Alert Acknowledged",
      description: `${component} alert has been acknowledged.`,
    });
  };

  const handleDismiss = (id: string, component: string) => {
    dismissAlert(id);
    toast({
      title: "Alert Dismissed",
      description: `${component} alert has been removed.`,
    });
  };

  const handleAction = (recommendation: string) => {
    toast({
      title: "Action Initiated",
      description: recommendation,
    });
  };

  return (
    <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Predictive Alerts</h2>
            <p className="text-sm text-muted-foreground">AI-powered failure predictions</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground">
          {activeAlerts.length} Active
        </span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {activeAlerts.length === 0 ? (
          <div className="p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
            <p className="text-foreground font-medium">All Clear</p>
            <p className="text-sm text-muted-foreground">No active alerts at this time</p>
          </div>
        ) : (
          activeAlerts.map((alert, index) => {
            const styles = getSeverityStyles(alert.severity);
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${styles.border} ${styles.bg} transition-all duration-300 hover:scale-[1.01] animate-fade-in`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${styles.icon}`} />
                    <span className="font-medium text-foreground">{alert.component}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${styles.badge} font-medium uppercase`}
                    >
                      {alert.severity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleAcknowledge(alert.id, alert.component)}
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleDismiss(alert.id, alert.component)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        Est. failure: <strong className="text-foreground">{alert.timeToFailure}</strong>
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={() => handleAction(alert.recommendation)}
                  >
                    {alert.recommendation}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-success/5 border border-success/20 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-success" />
        <div>
          <p className="text-sm font-medium text-foreground">{healthyComponents} Components Optimal</p>
          <p className="text-xs text-muted-foreground">No immediate action required</p>
        </div>
      </div>
    </div>
  );
}
