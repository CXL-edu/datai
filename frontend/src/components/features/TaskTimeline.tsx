import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface TaskEvent {
  id: string;
  phase: string;
  action: string;
  status: "pending" | "running" | "success" | "failed";
  timestamp: string;
}

interface TaskTimelineProps {
  events: TaskEvent[];
}

export function TaskTimeline({ events }: TaskTimelineProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Derive overall status from events
  const isRunning = events.some(e => e.status === "running");
  const isFailed = events.some(e => e.status === "failed");
  const lastEvent = events.filter(e => e.status !== "pending").pop() || events[0];

  return (
    <div className="my-4 rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl">
       <div
         className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors"
         onClick={() => setIsOpen(!isOpen)}
       >
          <div className="flex items-center gap-3">
             {isRunning ? (
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
             ) : isFailed ? (
                <XCircle className="h-5 w-5 text-red-500" />
             ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
             )}
             <span className="font-medium text-sm">
                {isRunning ? "Analyzing..." : isFailed ? "Analysis Failed" : "Analysis Complete"}
             </span>
             {isRunning && lastEvent && <span className="text-xs text-muted-foreground ml-2 hidden sm:inline-block truncate max-w-[150px]">{lastEvent.action}</span>}
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
             {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
       </div>

       {isOpen && (
          <div className="border-t p-3 bg-muted/10 space-y-3">
             {events.map((event, index) => (
                <div key={event.id} className="flex gap-3">
                   <div className="flex flex-col items-center">
                      <div className={cn(
                         "h-2 w-2 rounded-full mt-1.5",
                         event.status === "success" ? "bg-green-500" :
                         event.status === "running" ? "bg-blue-500 animate-pulse" :
                         event.status === "failed" ? "bg-red-500" : "bg-muted-foreground/30"
                      )} />
                      {index < events.length - 1 && <div className="w-px h-full bg-border mt-1" />}
                   </div>
                   <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                         <span className={cn(
                            "text-sm font-medium",
                            event.status === "pending" && "text-muted-foreground"
                         )}>{event.action}</span>
                         <span className="text-xs text-muted-foreground font-mono">{event.timestamp}</span>
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">{event.phase}</div>
                   </div>
                </div>
             ))}
          </div>
       )}
    </div>
  );
}
