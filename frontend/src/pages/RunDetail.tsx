import { useParams } from "react-router-dom";
import { CheckCircle2, Clock, BarChart3, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RunDetail() {
  const { runId } = useParams();

  // Mock Data
  const run = {
     id: runId || "r_001",
     status: "success",
     duration: "4.2s",
     startedAt: "2024-02-20 10:00:00",
     steps: [
        { name: "Read File", status: "success", duration: "0.5s", logs: ["Reading orders_q1.xlsx", "Detected 15,420 rows"] },
        { name: "Understand Schema", status: "success", duration: "1.2s", logs: ["Identified 18 columns", "Detected date field: Order Date"] },
        { name: "Analyze Data", status: "success", duration: "1.5s", logs: ["Grouping by Order Date (Month)", "Calculating Sum(Sales)"] },
        { name: "Visualize", status: "success", duration: "1.0s", logs: ["Generating Bar Chart"] },
     ]
  };

  return (
     <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full h-full">
        <div className="flex items-center justify-between">
           <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                 Run #{run.id}
                 <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">Success</Badge>
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                 <Clock className="h-4 w-4" /> Duration: {run.duration} • Started: {run.startedAt}
              </p>
           </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
           <div className="md:col-span-2 space-y-6">
              <Card>
                 <CardHeader>
                    <CardTitle>Execution Steps</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="relative border-l ml-3 pl-6 space-y-8">
                       {run.steps.map((step, i) => (
                          <div key={i} className="relative pb-8 last:pb-0">
                             <div className="absolute -left-[36px] bg-green-500 rounded-full p-1 shadow-sm border-2 border-background flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4 text-white" />
                             </div>
                             <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{step.name}</h3>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{step.duration}</span>
                             </div>
                             <div className="bg-muted/30 rounded-md p-3 text-xs font-mono text-muted-foreground border">
                                {step.logs.map((log, j) => (
                                   <div key={j} className="py-0.5 border-b last:border-0 border-border/50">{log}</div>
                                ))}
                             </div>
                          </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>
           </div>

           <div className="space-y-6">
              <Card>
                 <CardHeader>
                    <CardTitle>Artifacts</CardTitle>
                    <CardDescription>Generated during this run</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4 flex items-center gap-4 hover:bg-accent/50 cursor-pointer transition-colors group">
                       <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-md group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                          <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                       </div>
                       <div>
                          <div className="font-medium text-sm">Sales Trend Chart</div>
                          <div className="text-xs text-muted-foreground">PNG • 45KB</div>
                       </div>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center gap-4 hover:bg-accent/50 cursor-pointer transition-colors group">
                       <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-md group-hover:bg-orange-200 dark:group-hover:bg-orange-900/40 transition-colors">
                          <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                       </div>
                       <div>
                          <div className="font-medium text-sm">Analysis Summary</div>
                          <div className="text-xs text-muted-foreground">Text • 2KB</div>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>
     </div>
  );
}
