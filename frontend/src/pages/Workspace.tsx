import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, BarChart3, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskTimeline, type TaskEvent } from "@/components/features/TaskTimeline";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  events?: TaskEvent[];
  chart?: boolean;
}

export default function Workspace() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Datai agent. Upload a spreadsheet or ask me a question to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isProcessing]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsProcessing(true);

    // Simulate response
    setTimeout(() => {
       const assistantMsgId = (Date.now() + 1).toString();
       const events: TaskEvent[] = [
          { id: "e1", phase: "read", action: "Reading file...", status: "running", timestamp: "10:00:01" },
          { id: "e2", phase: "understand", action: "Analyzing schema...", status: "pending", timestamp: "10:00:02" },
       ];

       setMessages((prev) => [...prev, {
          id: assistantMsgId,
          role: "assistant",
          content: "I'm analyzing your request...",
          events
       }]);

       // Simulate progress
       setTimeout(() => {
          setMessages((prev) => prev.map(m => m.id === assistantMsgId ? {
             ...m,
             content: "I've analyzed the sales data. Here is the trend for Q1.",
             events: [
                { id: "e1", phase: "read", action: "Reading file...", status: "success", timestamp: "10:00:01" },
                { id: "e2", phase: "understand", action: "Analyzing schema...", status: "success", timestamp: "10:00:02" },
                { id: "e3", phase: "visualize", action: "Generating chart...", status: "success", timestamp: "10:00:03" },
             ],
             chart: true
          } : m));
          setIsProcessing(false);
       }, 2000);
    }, 500);
  };

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="mx-auto max-w-3xl space-y-6 pb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8 mt-1">
                {msg.role === "assistant" ? (
                   <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground rounded-full">
                      <Bot className="h-5 w-5" />
                   </div>
                ) : (
                   <AvatarFallback>U</AvatarFallback>
                )}
              </Avatar>
              <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                 <div className={`rounded-lg p-3 text-sm ${
                    msg.role === "user"
                       ? "bg-primary text-primary-foreground"
                       : "bg-muted"
                 }`}>
                    {msg.content}
                 </div>

                 {msg.events && <TaskTimeline events={msg.events} />}

                 {msg.chart && (
                    <Card className="w-full mt-2 overflow-hidden">
                       <CardHeader>
                          <CardTitle className="text-sm">Sales Trend Q1</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <div className="h-64 w-full bg-muted/50 rounded flex items-center justify-center relative overflow-hidden">
                             {/* Mock Chart Visualization */}
                             <div className="flex items-end gap-2 h-40 w-full px-8 justify-between opacity-80">
                                <div className="w-8 bg-blue-400 h-[30%] rounded-t"></div>
                                <div className="w-8 bg-blue-500 h-[50%] rounded-t"></div>
                                <div className="w-8 bg-blue-600 h-[40%] rounded-t"></div>
                                <div className="w-8 bg-blue-700 h-[80%] rounded-t"></div>
                                <div className="w-8 bg-blue-800 h-[60%] rounded-t"></div>
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                <BarChart3 className="h-16 w-16 text-muted-foreground/30" />
                             </div>
                          </div>
                       </CardContent>
                    </Card>
                 )}
              </div>
            </div>
          ))}
          {isProcessing && (
             <div className="flex gap-4">
                <Avatar className="h-8 w-8 mt-1">
                   <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground rounded-full">
                      <Bot className="h-5 w-5" />
                   </div>
                </Avatar>
                <div className="flex items-center gap-2 text-muted-foreground text-sm bg-muted rounded-lg p-3">
                   <Loader2 className="h-4 w-4 animate-spin" />
                   <span className="animate-pulse">Thinking...</span>
                </div>
             </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4 bg-background">
         <div className="mx-auto max-w-3xl flex gap-2 items-center">
            <Button variant="outline" size="icon" className="shrink-0">
               <Paperclip className="h-4 w-4" />
            </Button>
            <Input
               placeholder="Ask a question about your data..."
               className="flex-1"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && handleSend()}
               disabled={isProcessing}
            />
            <Button onClick={handleSend} disabled={isProcessing || !input.trim()}>
               <Send className="h-4 w-4" />
            </Button>
         </div>
      </div>
    </div>
  );
}
