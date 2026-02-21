import { useState } from "react";
import { Link } from "react-router-dom";
import { Folder, FileSpreadsheet, LayoutGrid, List as ListIcon, Search, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

type ViewMode = "grid" | "list";

interface DatasetItem {
  id: string;
  type: "folder" | "file";
  name: string;
  owner: string;
  modifiedAt: string;
  size?: string;
  itemsCount?: number;
}

const MOCK_DATA: DatasetItem[] = [
  { id: "f1", type: "folder", name: "Sales Data", owner: "Alice", modifiedAt: "2024-02-20", itemsCount: 5 },
  { id: "f2", type: "folder", name: "Marketing Reports", owner: "Bob", modifiedAt: "2024-02-18", itemsCount: 12 },
  { id: "d1", type: "file", name: "orders_q1.xlsx", owner: "Alice", modifiedAt: "2024-02-19", size: "1.2 MB" },
  { id: "d2", type: "file", name: "customers_2023.csv", owner: "Charlie", modifiedAt: "2024-01-15", size: "4.5 MB" },
  { id: "d3", type: "file", name: "financial_projection.xlsx", owner: "Alice", modifiedAt: "2024-02-10", size: "850 KB" },
];

export default function Datasets() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Datasets</h1>
        <div className="flex items-center gap-2">
           <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search files..."
                className="w-full appearance-none bg-background pl-8"
              />
           </div>
           <div className="flex items-center border rounded-md p-1 bg-muted/20">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                 variant={viewMode === "list" ? "secondary" : "ghost"}
                 size="icon"
                 className="h-8 w-8"
                 onClick={() => setViewMode("list")}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
           </div>
           <Button>Upload</Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {MOCK_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col items-center justify-between rounded-lg border bg-card p-4 transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-sm aspect-[4/3]"
            >
              <Link
                to={item.type === "folder" ? `/datasets?folder=${item.id}` : `/datasets/${item.id}`}
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">View {item.name}</span>
              </Link>
              <div className="flex flex-1 flex-col items-center justify-center gap-2 w-full z-0">
                {item.type === "folder" ? (
                  <Folder className="h-12 w-12 text-blue-400 fill-blue-400/20" />
                ) : (
                  <FileSpreadsheet className="h-12 w-12 text-green-600 fill-green-600/10" />
                )}
                <span className="text-sm font-medium text-center line-clamp-2 w-full break-words">
                  {item.name}
                </span>
              </div>
              <div className="flex w-full items-center justify-between text-xs text-muted-foreground mt-2 z-20 pointer-events-none">
                 <span>{item.type === "folder" ? `${item.itemsCount} items` : item.size}</span>
                 <div className="pointer-events-auto">
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-3 w-3" />
                         </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                         <DropdownMenuItem>Rename</DropdownMenuItem>
                         <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                   </DropdownMenu>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
           <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 p-4 border-b bg-muted/40 font-medium text-sm text-muted-foreground">
              <div className="w-6"></div>
              <div>Name</div>
              <div>Owner</div>
              <div>Modified</div>
              <div className="w-8"></div>
           </div>
           {MOCK_DATA.map((item) => (
             <div
                key={item.id}
                className="relative grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 p-3 items-center hover:bg-muted/50 transition-colors text-sm border-b last:border-0 group"
             >
                <Link
                   to={item.type === "folder" ? `/datasets?folder=${item.id}` : `/datasets/${item.id}`}
                   className="absolute inset-0 z-10"
                />
                <div className="w-6 flex justify-center z-0">
                   {item.type === "folder" ? (
                      <Folder className="h-4 w-4 text-blue-400 fill-blue-400/20" />
                   ) : (
                      <FileSpreadsheet className="h-4 w-4 text-green-600" />
                   )}
                </div>
                <div className="font-medium text-foreground z-0">{item.name}</div>
                <div className="text-muted-foreground z-0">{item.owner}</div>
                <div className="text-muted-foreground z-0">{item.modifiedAt}</div>
                <div className="w-8 flex justify-end z-20">
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                         </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <DropdownMenuItem>Rename</DropdownMenuItem>
                         <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                   </DropdownMenu>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}
