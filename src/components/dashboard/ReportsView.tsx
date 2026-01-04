import { FileText, Download, Calendar, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Report {
  id: string;
  title: string;
  type: "health" | "maintenance" | "performance" | "cost";
  date: string;
  size: string;
}

const reports: Report[] = [
  { id: "1", title: "Monthly Health Summary - December 2025", type: "health", date: "2025-12-31", size: "2.4 MB" },
  { id: "2", title: "Q4 Maintenance Report", type: "maintenance", date: "2025-12-28", size: "5.1 MB" },
  { id: "3", title: "Annual Performance Analysis", type: "performance", date: "2025-12-25", size: "8.7 MB" },
  { id: "4", title: "Cost Analysis Report - 2025", type: "cost", date: "2025-12-20", size: "1.8 MB" },
  { id: "5", title: "Battery Degradation Trends", type: "health", date: "2025-12-15", size: "3.2 MB" },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "health":
      return <TrendingUp className="w-5 h-5 text-success" />;
    case "maintenance":
      return <FileText className="w-5 h-5 text-primary" />;
    case "performance":
      return <BarChart3 className="w-5 h-5 text-warning" />;
    case "cost":
      return <PieChart className="w-5 h-5 text-destructive" />;
    default:
      return <FileText className="w-5 h-5 text-muted-foreground" />;
  }
};

export function ReportsView() {
  const handleDownload = (report: Report) => {
    toast({
      title: "Download Started",
      description: `Downloading ${report.title}...`,
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your custom report is being generated...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Reports</h2>
              <p className="text-sm text-muted-foreground">Generated analysis and documentation</p>
            </div>
          </div>
          <Button onClick={handleGenerateReport}>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <TrendingUp className="w-8 h-8 text-success mb-2" />
            <p className="text-2xl font-bold text-foreground">94%</p>
            <p className="text-sm text-muted-foreground">Fleet Health</p>
          </div>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <FileText className="w-8 h-8 text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">47</p>
            <p className="text-sm text-muted-foreground">Services Completed</p>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <BarChart3 className="w-8 h-8 text-warning mb-2" />
            <p className="text-2xl font-bold text-foreground">97.2%</p>
            <p className="text-sm text-muted-foreground">Avg Efficiency</p>
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <PieChart className="w-8 h-8 text-destructive mb-2" />
            <p className="text-2xl font-bold text-foreground">$24.5K</p>
            <p className="text-sm text-muted-foreground">YTD Maintenance</p>
          </div>
        </div>

        <h3 className="font-semibold mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-secondary">{getTypeIcon(report.type)}</div>
                <div>
                  <h4 className="font-medium text-foreground">{report.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDownload(report)}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
