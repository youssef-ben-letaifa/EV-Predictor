import { useState } from "react";
import { Car, Settings, Bell, Search, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboard } from "@/context/DashboardContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function Header() {
  const { searchQuery, setSearchQuery, notifications, markNotificationRead } = useDashboard();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    autoRefresh: true,
    notifications: true,
    darkMode: true,
    soundAlerts: false,
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 glow-effect">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">NEV Predictive Maintenance</h1>
              <p className="text-xs text-muted-foreground">Intelligent Diagnostics System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-9 bg-secondary/50 border-border/50 focus:border-primary/50"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive rounded-full text-[10px] flex items-center justify-center text-destructive-foreground font-medium">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-card border-border">
              <div className="px-3 py-2 border-b border-border">
                <h4 className="font-semibold text-sm">Notifications</h4>
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex items-start gap-3 p-3 cursor-pointer"
                    onClick={() => markNotificationRead(notification.id)}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 ${
                        notification.read ? "bg-muted" : "bg-primary"
                      }`}
                    />
                    <span className={notification.read ? "text-muted-foreground" : "text-foreground"}>
                      {notification.message}
                    </span>
                    {!notification.read && <Check className="w-4 h-4 ml-auto text-muted-foreground" />}
                  </DropdownMenuItem>
                ))
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-primary text-sm justify-center">
                Mark all as read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>System Settings</DialogTitle>
                <DialogDescription>Configure your dashboard preferences</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-refresh">Auto Refresh Data</Label>
                  <Switch
                    id="auto-refresh"
                    checked={settings.autoRefresh}
                    onCheckedChange={(checked) =>
                      setSettings((s) => ({ ...s, autoRefresh: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Push Notifications</Label>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) =>
                      setSettings((s) => ({ ...s, notifications: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound">Sound Alerts</Label>
                  <Switch
                    id="sound"
                    checked={settings.soundAlerts}
                    onCheckedChange={(checked) =>
                      setSettings((s) => ({ ...s, soundAlerts: checked }))
                    }
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="w-px h-8 bg-border/50 mx-2" />

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Engineer</p>
              <p className="text-xs text-muted-foreground">Admin Access</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">E</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
