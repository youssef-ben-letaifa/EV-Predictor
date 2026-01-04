import {
  LayoutDashboard,
  Battery,
  Cpu,
  Thermometer,
  History,
  FileText,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/DashboardContext";

interface NavItem {
  icon: React.ElementType;
  label: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Battery, label: "Battery System", badge: "1" },
  { icon: Cpu, label: "Motor & Inverter" },
  { icon: Thermometer, label: "Thermal Management", badge: "!" },
  { icon: History, label: "Maintenance Log" },
  { icon: FileText, label: "Reports" },
];

export function Sidebar() {
  const { activeNav, setActiveNav, alerts } = useDashboard();

  const activeAlerts = alerts.filter((a) => !a.acknowledged);
  const systemLoad = Math.round((activeAlerts.length / 10) * 100);

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] border-r border-border/50 bg-card/30 backdrop-blur-xl sticky top-16 flex flex-col">
      <nav className="p-4 space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = activeNav === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded text-xs font-medium",
                    item.badge === "!"
                      ? "bg-warning/20 text-warning"
                      : "bg-destructive/20 text-destructive"
                  )}
                >
                  {item.badge}
                </span>
              )}
              <ChevronRight
                className={cn(
                  "w-4 h-4 opacity-0 -translate-x-2 transition-all",
                  "group-hover:opacity-100 group-hover:translate-x-0",
                  isActive && "opacity-100 translate-x-0"
                )}
              />
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <button
          onClick={() => setActiveNav("Settings")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
            activeNav === "Settings"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>

        <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border/30">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground">System Status</span>
            <span
              className={cn(
                "font-medium",
                activeAlerts.length === 0
                  ? "text-success"
                  : activeAlerts.length < 3
                  ? "text-warning"
                  : "text-destructive"
              )}
            >
              {activeAlerts.length === 0 ? "Optimal" : `${activeAlerts.length} Alerts`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  activeAlerts.length === 0
                    ? "bg-success"
                    : activeAlerts.length < 3
                    ? "bg-warning"
                    : "bg-destructive"
                )}
                style={{ width: `${100 - systemLoad}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{100 - systemLoad}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
