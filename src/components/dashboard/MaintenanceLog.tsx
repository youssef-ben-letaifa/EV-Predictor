import { useState } from "react";
import { History, Search, Filter, Calendar, Wrench, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MaintenanceRecord {
  id: string;
  date: string;
  component: string;
  type: "scheduled" | "emergency" | "preventive";
  description: string;
  technician: string;
  status: "completed" | "pending" | "in-progress";
  cost: number;
}

const mockRecords: MaintenanceRecord[] = [
  {
    id: "1",
    date: "2025-12-15",
    component: "Battery Pack",
    type: "scheduled",
    description: "Quarterly battery health check and cell balancing",
    technician: "John Smith",
    status: "completed",
    cost: 450,
  },
  {
    id: "2",
    date: "2025-12-01",
    component: "Charging System",
    type: "preventive",
    description: "Connector inspection and cleaning",
    technician: "Maria Garcia",
    status: "completed",
    cost: 120,
  },
  {
    id: "3",
    date: "2025-11-28",
    component: "Electric Motor",
    type: "scheduled",
    description: "Bearing lubrication and vibration analysis",
    technician: "James Wilson",
    status: "completed",
    cost: 380,
  },
  {
    id: "4",
    date: "2025-11-15",
    component: "Cooling Fan",
    type: "preventive",
    description: "Fan blade inspection and motor test",
    technician: "Sarah Chen",
    status: "completed",
    cost: 95,
  },
  {
    id: "5",
    date: "2025-10-10",
    component: "Thermal System",
    type: "emergency",
    description: "Coolant leak repair and system flush",
    technician: "John Smith",
    status: "completed",
    cost: 780,
  },
];

const getTypeStyles = (type: string) => {
  switch (type) {
    case "scheduled":
      return "bg-primary/20 text-primary";
    case "emergency":
      return "bg-destructive/20 text-destructive";
    case "preventive":
      return "bg-success/20 text-success";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function MaintenanceLog() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredRecords = mockRecords.filter((record) => {
    const matchesSearch =
      record.component.toLowerCase().includes(search.toLowerCase()) ||
      record.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || record.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalCost = filteredRecords.reduce((acc, r) => acc + r.cost, 0);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <History className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Maintenance Log</h2>
              <p className="text-sm text-muted-foreground">Complete service history</p>
            </div>
          </div>
          <Button>
            <Wrench className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary/50"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40 bg-secondary/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="preventive">Preventive</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {record.date}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeStyles(record.type)} capitalize`}>
                    {record.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">${record.cost}</span>
                </div>
              </div>
              <h4 className="font-medium text-foreground mb-1">{record.component}</h4>
              <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
              <p className="text-xs text-muted-foreground">Technician: {record.technician}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border/50 flex justify-between">
          <span className="text-sm text-muted-foreground">
            Showing {filteredRecords.length} of {mockRecords.length} records
          </span>
          <span className="text-sm font-medium">
            Total Cost: <span className="text-primary">${totalCost.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
