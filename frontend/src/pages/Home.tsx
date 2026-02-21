import { Link } from "react-router-dom";
import { ArrowRight, Upload, MessageSquare, FileText, BarChart3, PieChart, TrendingUp, Table } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4 md:px-6 mx-auto">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Table className="h-6 w-6 text-primary" />
              <span className="hidden font-bold sm:inline-block">Datai</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/workspace/new" className="transition-colors hover:text-foreground/80 text-foreground/60">Workspace</Link>
              <Link to="/datasets" className="transition-colors hover:text-foreground/80 text-foreground/60">Datasets</Link>
              <Link to="/settings" className="transition-colors hover:text-foreground/80 text-foreground/60">Settings</Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
               <Link to="/workspace/new">
                  <Button>Get Started</Button>
               </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4">
             <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Turn Spreadsheets into <span className="text-primary">Decisions instantly</span>
             </h1>
             <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Unlock deep insights from your data using our advanced AI agent. Ask questions in plain English and get instant results, charts, and automated reports.
             </p>
             <div className="space-x-4">
                <Link to="/workspace/new">
                  <Button size="lg" className="h-12 px-8 text-lg">Start Analysis</Button>
                </Link>
                <Link to="#">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-lg">Watch Demo</Button>
                </Link>
             </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container space-y-6 bg-slate-50 dark:bg-slate-900 py-8 md:py-12 lg:py-24 rounded-3xl my-8 mx-auto px-4">
           <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-display text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">How it Works</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                 Three simple steps to transform your raw data into actionable insights.
              </p>
           </div>
           <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                 <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <Upload className="h-12 w-12 text-primary" />
                    <div className="space-y-2">
                       <h3 className="font-bold">1. Upload</h3>
                       <p className="text-sm text-muted-foreground">Securely import your .csv or .xlsx files.</p>
                    </div>
                 </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                 <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <MessageSquare className="h-12 w-12 text-primary" />
                    <div className="space-y-2">
                       <h3 className="font-bold">2. Chat</h3>
                       <p className="text-sm text-muted-foreground">Ask questions about your data in plain English.</p>
                    </div>
                 </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                 <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <FileText className="h-12 w-12 text-primary" />
                    <div className="space-y-2">
                       <h3 className="font-bold">3. Report</h3>
                       <p className="text-sm text-muted-foreground">Get visual insights and export reports.</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

         {/* Templates Section */}
         <section className="container py-8 md:py-12 lg:py-24 mx-auto px-4">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
               <h2 className="font-display text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">Quick Start Scenarios</h2>
               <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                  Choose a template to get started instantly.
               </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8">
               {/* Template Cards */}
               <div className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md">
                  <div className="flex flex-col gap-4 p-4">
                     <div className="h-32 bg-muted/50 rounded-md flex items-center justify-center">
                        <TrendingUp className="h-10 w-10 text-muted-foreground" />
                     </div>
                     <h3 className="font-bold">Sales Trend</h3>
                     <p className="text-sm text-muted-foreground">Analyze monthly revenue growth.</p>
                     <Button variant="ghost" className="w-full justify-start pl-0 hover:pl-2 transition-all text-primary font-bold">Use Template <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </div>
               </div>
               <div className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md">
                  <div className="flex flex-col gap-4 p-4">
                     <div className="h-32 bg-muted/50 rounded-md flex items-center justify-center">
                        <PieChart className="h-10 w-10 text-muted-foreground" />
                     </div>
                     <h3 className="font-bold">Budget Variance</h3>
                     <p className="text-sm text-muted-foreground">Compare projected vs actual spending.</p>
                     <Button variant="ghost" className="w-full justify-start pl-0 hover:pl-2 transition-all text-primary font-bold">Use Template <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </div>
               </div>
               <div className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md">
                  <div className="flex flex-col gap-4 p-4">
                     <div className="h-32 bg-muted/50 rounded-md flex items-center justify-center">
                        <BarChart3 className="h-10 w-10 text-muted-foreground" />
                     </div>
                     <h3 className="font-bold">Inventory Opt</h3>
                     <p className="text-sm text-muted-foreground">Optimize stock levels and costs.</p>
                     <Button variant="ghost" className="w-full justify-start pl-0 hover:pl-2 transition-all text-primary font-bold">Use Template <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </div>
               </div>
            </div>
         </section>
      </main>

      <footer className="py-6 md:px-8 md:py-0 border-t">
         <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
               © 2024 Datai AI. All rights reserved.
            </p>
         </div>
      </footer>
    </div>
  )
}
