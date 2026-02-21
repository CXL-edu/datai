import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet, BarChart2, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DatasetDetail() {
  const { datasetId } = useParams();

  // Mock Data
  const dataset = {
    id: datasetId,
    name: "orders_q1.xlsx",
    size: "1.2 MB",
    rows: 15420,
    columns: 18,
    sheets: ["Orders", "Returns", "People"],
    missingRate: "2.4%",
    fields: [
      { name: "Order ID", type: "String", missing: 0 },
      { name: "Order Date", type: "Date", missing: 0 },
      { name: "Customer Name", type: "String", missing: 0 },
      { name: "Segment", type: "String", missing: 0 },
      { name: "City", type: "String", missing: 0 },
      { name: "State", type: "String", missing: 0 },
      { name: "Region", type: "String", missing: 0 },
      { name: "Product ID", type: "String", missing: 0 },
      { name: "Category", type: "String", missing: 0 },
      { name: "Sub-Category", type: "String", missing: 0 },
      { name: "Sales", type: "Number", missing: 5 },
      { name: "Quantity", type: "Number", missing: 0 },
      { name: "Discount", type: "Number", missing: 0 },
      { name: "Profit", type: "Number", missing: 0 },
    ],
    sample: [
      { "Order ID": "CA-2016-152156", "Order Date": "2016-11-08", "Customer Name": "Claire Gute", "Sales": 261.96, "Profit": 41.91 },
      { "Order ID": "CA-2016-152156", "Order Date": "2016-11-08", "Customer Name": "Claire Gute", "Sales": 731.94, "Profit": 219.58 },
      { "Order ID": "CA-2016-138688", "Order Date": "2016-06-12", "Customer Name": "Darrin Van Huff", "Sales": 14.62, "Profit": 6.87 },
      { "Order ID": "US-2015-108966", "Order Date": "2015-10-11", "Customer Name": "Sean O'Donnell", "Sales": 957.57, "Profit": -383.03 },
      { "Order ID": "US-2015-108966", "Order Date": "2015-10-11", "Customer Name": "Sean O'Donnell", "Sales": 22.36, "Profit": 2.51 },
    ]
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/datasets">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-green-600" />
            {dataset.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dataset.size} • {dataset.rows.toLocaleString()} rows • {dataset.columns} columns
          </p>
        </div>
        <div className="flex gap-2">
           <Link to={`/workspace/new?datasetId=${dataset.id}`}>
             <Button>Analyze in Workspace</Button>
           </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataset.rows.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Columns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataset.columns}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sheets</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex flex-wrap gap-1">
                {dataset.sheets.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-muted-foreground">Missing Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{dataset.missingRate}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 h-full overflow-hidden">
        {/* Field Distribution */}
        <Card className="md:col-span-1 flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <BarChart2 className="h-5 w-5" /> Fields
            </CardTitle>
            <CardDescription>Column types and quality</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
             <ScrollArea className="h-[400px]">
                <div className="flex flex-col">
                   {dataset.fields.map((field, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-muted/50">
                         <div className="flex flex-col">
                            <span className="font-medium text-sm">{field.name}</span>
                            <span className="text-xs text-muted-foreground">{field.type}</span>
                         </div>
                         {field.missing > 0 && (
                            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                               {field.missing}% null
                            </Badge>
                         )}
                      </div>
                   ))}
                </div>
             </ScrollArea>
          </CardContent>
        </Card>

        {/* Sample Data */}
        <Card className="md:col-span-2 flex flex-col overflow-hidden">
           <CardHeader>
              <CardTitle className="flex items-center gap-2">
                 <TableIcon className="h-5 w-5" /> Sample Data
              </CardTitle>
              <CardDescription>First 5 rows preview</CardDescription>
           </CardHeader>
           <CardContent className="flex-1 overflow-auto p-0">
              <div className="relative w-full overflow-auto">
                 <table className="w-full caption-bottom text-sm text-left">
                    <thead className="[&_tr]:border-b">
                       <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          {Object.keys(dataset.sample[0]).map((h) => (
                             <th key={h} className="h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                {h}
                             </th>
                          ))}
                       </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                       {dataset.sample.map((row, i) => (
                          <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                             {Object.values(row).map((cell: any, j) => (
                                <td key={j} className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                   {cell}
                                </td>
                             ))}
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
