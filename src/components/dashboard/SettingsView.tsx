import { useState } from "react";
import { Settings, Bell, Shield, Database, Palette, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export function SettingsView() {
  const [settings, setSettings] = useState({
    // General
    vehicleId: "NEV-2024-001",
    refreshInterval: "30",
    dataRetention: "90",
    // Notifications
    emailAlerts: true,
    pushNotifications: true,
    soundAlerts: false,
    criticalOnly: false,
    // Thresholds
    batteryWarning: "70",
    batteryCritical: "50",
    tempWarning: "75",
    tempCritical: "90",
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleReset = () => {
    setSettings({
      vehicleId: "NEV-2024-001",
      refreshInterval: "30",
      dataRetention: "90",
      emailAlerts: true,
      pushNotifications: true,
      soundAlerts: false,
      criticalOnly: false,
      batteryWarning: "70",
      batteryCritical: "50",
      tempWarning: "75",
      tempCritical: "90",
    });
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">System Settings</h2>
            <p className="text-sm text-muted-foreground">Configure your dashboard preferences</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* General Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium">General Settings</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Default Vehicle ID</Label>
                <Input
                  value={settings.vehicleId}
                  onChange={(e) => setSettings((s) => ({ ...s, vehicleId: e.target.value }))}
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Refresh Interval (seconds)</Label>
                <Select
                  value={settings.refreshInterval}
                  onValueChange={(v) => setSettings((s) => ({ ...s, refreshInterval: v }))}
                >
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data Retention (days)</Label>
                <Select
                  value={settings.dataRetention}
                  onValueChange={(v) => setSettings((s) => ({ ...s, dataRetention: v }))}
                >
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <Label>Email Alerts</Label>
                  <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                </div>
                <Switch
                  checked={settings.emailAlerts}
                  onCheckedChange={(c) => setSettings((s) => ({ ...s, emailAlerts: c }))}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">Browser push notifications</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(c) => setSettings((s) => ({ ...s, pushNotifications: c }))}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <Label>Sound Alerts</Label>
                  <p className="text-xs text-muted-foreground">Play sound for critical alerts</p>
                </div>
                <Switch
                  checked={settings.soundAlerts}
                  onCheckedChange={(c) => setSettings((s) => ({ ...s, soundAlerts: c }))}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <Label>Critical Alerts Only</Label>
                  <p className="text-xs text-muted-foreground">Only notify for critical issues</p>
                </div>
                <Switch
                  checked={settings.criticalOnly}
                  onCheckedChange={(c) => setSettings((s) => ({ ...s, criticalOnly: c }))}
                />
              </div>
            </div>
          </div>

          {/* Threshold Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium">Alert Thresholds</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/30 space-y-3">
                <h4 className="text-sm font-medium">Battery Health (%)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-warning">Warning</Label>
                    <Input
                      type="number"
                      value={settings.batteryWarning}
                      onChange={(e) => setSettings((s) => ({ ...s, batteryWarning: e.target.value }))}
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-destructive">Critical</Label>
                    <Input
                      type="number"
                      value={settings.batteryCritical}
                      onChange={(e) => setSettings((s) => ({ ...s, batteryCritical: e.target.value }))}
                      className="bg-secondary/50"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30 space-y-3">
                <h4 className="text-sm font-medium">Temperature (°C)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-warning">Warning</Label>
                    <Input
                      type="number"
                      value={settings.tempWarning}
                      onChange={(e) => setSettings((s) => ({ ...s, tempWarning: e.target.value }))}
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-destructive">Critical</Label>
                    <Input
                      type="number"
                      value={settings.tempCritical}
                      onChange={(e) => setSettings((s) => ({ ...s, tempCritical: e.target.value }))}
                      className="bg-secondary/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-border/50">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
}
