import { useState } from "react";
import { Upload, Database, RefreshCw, Check, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useDashboard } from "@/context/DashboardContext";

export function DataInputPanel() {
  const { addVehicleData, lastSync, recordsProcessed } = useDashboard();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicleId: "",
    mileage: "",
    batteryVoltage: "",
    motorTemp: "",
    ambientTemp: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.vehicleId.trim()) {
      newErrors.vehicleId = "Vehicle ID is required";
    }
    if (!formData.mileage || isNaN(Number(formData.mileage))) {
      newErrors.mileage = "Valid mileage is required";
    }
    if (!formData.batteryVoltage || isNaN(Number(formData.batteryVoltage))) {
      newErrors.batteryVoltage = "Valid voltage is required";
    }
    if (!formData.motorTemp || isNaN(Number(formData.motorTemp))) {
      newErrors.motorTemp = "Valid temperature is required";
    }
    if (!formData.ambientTemp || isNaN(Number(formData.ambientTemp))) {
      newErrors.ambientTemp = "Valid temperature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    addVehicleData({
      vehicleId: formData.vehicleId,
      mileage: Number(formData.mileage),
      batteryVoltage: Number(formData.batteryVoltage),
      motorTemp: Number(formData.motorTemp),
      ambientTemp: Number(formData.ambientTemp),
      timestamp: new Date(),
    });

    setIsLoading(false);

    toast({
      title: "Data Submitted Successfully",
      description: `Telemetry data for ${formData.vehicleId} has been processed.`,
    });

    // Reset form
    setFormData({
      vehicleId: "",
      mileage: "",
      batteryVoltage: "",
      motorTemp: "",
      ambientTemp: "",
    });
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "File Upload Started",
          description: `Processing ${file.name}...`,
        });

        // Simulate file processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast({
          title: "File Processed",
          description: `Successfully imported data from ${file.name}`,
        });
      }
    };
    input.click();
  };

  const timeSinceSync = () => {
    const diff = Math.floor((new Date().getTime() - lastSync.getTime()) / 1000);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  };

  return (
    <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Data Input</h2>
            <p className="text-sm text-muted-foreground">Enter vehicle telemetry</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleId" className="text-sm text-muted-foreground">
              Vehicle ID *
            </Label>
            <Input
              id="vehicleId"
              placeholder="e.g., NEV-2024-001"
              value={formData.vehicleId}
              onChange={(e) => handleInputChange("vehicleId", e.target.value)}
              className={`bg-secondary/50 border-border/50 focus:border-primary/50 ${
                errors.vehicleId ? "border-destructive" : ""
              }`}
            />
            {errors.vehicleId && (
              <p className="text-xs text-destructive">{errors.vehicleId}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="mileage" className="text-sm text-muted-foreground">
              Mileage (km) *
            </Label>
            <Input
              id="mileage"
              type="number"
              placeholder="e.g., 45000"
              value={formData.mileage}
              onChange={(e) => handleInputChange("mileage", e.target.value)}
              className={`bg-secondary/50 border-border/50 focus:border-primary/50 ${
                errors.mileage ? "border-destructive" : ""
              }`}
            />
            {errors.mileage && <p className="text-xs text-destructive">{errors.mileage}</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="batteryVoltage" className="text-sm text-muted-foreground">
              Battery Voltage (V) *
            </Label>
            <Input
              id="batteryVoltage"
              type="number"
              placeholder="e.g., 400"
              value={formData.batteryVoltage}
              onChange={(e) => handleInputChange("batteryVoltage", e.target.value)}
              className={`bg-secondary/50 border-border/50 focus:border-primary/50 ${
                errors.batteryVoltage ? "border-destructive" : ""
              }`}
            />
            {errors.batteryVoltage && (
              <p className="text-xs text-destructive">{errors.batteryVoltage}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="motorTemp" className="text-sm text-muted-foreground">
              Motor Temp (°C) *
            </Label>
            <Input
              id="motorTemp"
              type="number"
              placeholder="e.g., 65"
              value={formData.motorTemp}
              onChange={(e) => handleInputChange("motorTemp", e.target.value)}
              className={`bg-secondary/50 border-border/50 focus:border-primary/50 ${
                errors.motorTemp ? "border-destructive" : ""
              }`}
            />
            {errors.motorTemp && (
              <p className="text-xs text-destructive">{errors.motorTemp}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="ambientTemp" className="text-sm text-muted-foreground">
              Ambient Temp (°C) *
            </Label>
            <Input
              id="ambientTemp"
              type="number"
              placeholder="e.g., 25"
              value={formData.ambientTemp}
              onChange={(e) => handleInputChange("ambientTemp", e.target.value)}
              className={`bg-secondary/50 border-border/50 focus:border-primary/50 ${
                errors.ambientTemp ? "border-destructive" : ""
              }`}
            />
            {errors.ambientTemp && (
              <p className="text-xs text-destructive">{errors.ambientTemp}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button onClick={handleSubmit} disabled={isLoading} className="flex-1">
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Submit Data
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleFileUpload}>
            <FileUp className="w-4 h-4" />
            Upload CSV
          </Button>
        </div>
      </div>

      <div className="mt-5 p-3 rounded-lg bg-secondary/30 border border-border/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last sync</span>
          <span className="text-foreground font-medium">{timeSinceSync()}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted-foreground">Records processed</span>
          <span className="text-primary font-medium">{recordsProcessed.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
