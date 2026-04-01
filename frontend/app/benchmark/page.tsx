"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const sectors = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Consumer Cyclical",
  "Communication Services",
  "Industrials",
  "Consumer Defensive",
  "Energy",
  "Utilities",
  "Real Estate",
]

const benchmarkData = [
  { metric: "ROE", value: 28, sectorAvg: 22, percentile: 85 },
  { metric: "ROA", value: 18, sectorAvg: 14, percentile: 78 },
  { metric: "Net Margin", value: 24, sectorAvg: 18, percentile: 82 },
  { metric: "EBITDA Margin", value: 32, sectorAvg: 25, percentile: 75 },
  { metric: "Debt/Equity", value: 0.8, sectorAvg: 1.2, percentile: 88 },
  { metric: "Current Ratio", value: 1.5, sectorAvg: 1.3, percentile: 65 },
  { metric: "Revenue Growth", value: 12, sectorAvg: 8, percentile: 72 },
  { metric: "Volatility", value: 22, sectorAvg: 28, percentile: 80 },
]

const topPerformers = [
  { ticker: "NVDA", name: "NVIDIA Corp", score: 91, change: 15.2 },
  { ticker: "MSFT", name: "Microsoft", score: 88, change: 8.4 },
  { ticker: "AAPL", name: "Apple Inc", score: 85, change: 5.2 },
  { ticker: "AMD", name: "AMD Inc", score: 82, change: 12.8 },
  { ticker: "AVGO", name: "Broadcom", score: 79, change: 6.1 },
]

function getPercentileColor(percentile: number) {
  if (percentile >= 75) return "#9BC4A0"
  if (percentile >= 50) return "#F5D9B0"
  return "#E8B4B4"
}

function getScoreColor(score: number) {
  if (score >= 70) return "bg-accent text-accent-foreground"
  if (score >= 40) return "bg-warning text-warning-foreground"
  return "bg-destructive text-destructive-foreground"
}

export default function BenchmarkPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              Sector Benchmark
            </h1>
            <p className="text-muted-foreground mt-1">
              Compare performance metrics against sector averages
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="Technology">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Benchmark Chart */}
          <div className="col-span-2 p-6 rounded-xl border border-border/50 bg-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">
                Percentile Ranking vs Technology Sector
              </h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-[#9BC4A0]" />
                  <span className="text-muted-foreground">Top Quartile</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-[#F5D9B0]" />
                  <span className="text-muted-foreground">Middle</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-[#E8B4B4]" />
                  <span className="text-muted-foreground">Bottom Quartile</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={benchmarkData}
                layout="vertical"
                margin={{ left: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D9" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  stroke="#8B8178"
                />
                <YAxis
                  type="category"
                  dataKey="metric"
                  tick={{ fontSize: 12 }}
                  stroke="#8B8178"
                  width={70}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E8E2D9",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value}th percentile`, "Rank"]}
                />
                <Bar dataKey="percentile" radius={[0, 4, 4, 0]}>
                  {benchmarkData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getPercentileColor(entry.percentile)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performers */}
          <div className="p-6 rounded-xl border border-border/50 bg-card">
            <h3 className="font-semibold text-foreground mb-4">
              Top Performers in Sector
            </h3>
            <div className="space-y-3">
              {topPerformers.map((item, index) => (
                <div
                  key={item.ticker}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-5">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{item.ticker}</p>
                      <p className="text-xs text-muted-foreground">{item.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn("font-semibold", getScoreColor(item.score))}>
                      {item.score}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Detail Table */}
        <div className="p-6 rounded-xl border border-border/50 bg-card">
          <h3 className="font-semibold text-foreground mb-4">Detailed Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Metric
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Your Value
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Sector Avg
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Difference
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Percentile
                  </th>
                </tr>
              </thead>
              <tbody>
                {benchmarkData.map((row) => {
                  const diff = ((row.value - row.sectorAvg) / row.sectorAvg) * 100
                  const isPositive = row.metric === "Volatility" || row.metric === "Debt/Equity" 
                    ? diff < 0 
                    : diff > 0

                  return (
                    <tr key={row.metric} className="border-b border-border/30">
                      <td className="py-3 px-4 font-medium text-foreground">
                        {row.metric}
                      </td>
                      <td className="py-3 px-4 text-right text-foreground">
                        {row.value}
                        {row.metric !== "Debt/Equity" && row.metric !== "Current Ratio" && "%"}
                      </td>
                      <td className="py-3 px-4 text-right text-muted-foreground">
                        {row.sectorAvg}
                        {row.metric !== "Debt/Equity" && row.metric !== "Current Ratio" && "%"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div
                          className={cn(
                            "inline-flex items-center gap-1 text-sm font-medium",
                            isPositive ? "text-accent" : "text-destructive",
                            Math.abs(diff) < 5 && "text-muted-foreground"
                          )}
                        >
                          {Math.abs(diff) < 5 ? (
                            <Minus className="h-3.5 w-3.5" />
                          ) : isPositive ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" />
                          )}
                          {Math.abs(diff).toFixed(1)}%
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "font-medium",
                            row.percentile >= 75 && "bg-accent/10 text-accent",
                            row.percentile >= 50 &&
                              row.percentile < 75 &&
                              "bg-warning/10 text-warning",
                            row.percentile < 50 && "bg-destructive/10 text-destructive"
                          )}
                        >
                          {row.percentile}th
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
