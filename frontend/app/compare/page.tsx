"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUp, ArrowDown, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

// Sample data
const companiesData: Record<string, {
  name: string
  sector: string
  score: number
  metrics: {
    name: string
    value: number
    displayValue: string
    trend: number
  }[]
  radarData: { axis: string; value: number }[]
}> = {
  AAPL: {
    name: "Apple Inc.",
    sector: "Technology",
    score: 85,
    metrics: [
      { name: "ROE", value: 170, displayValue: "170%", trend: 8.5 },
      { name: "ROA", value: 31, displayValue: "31%", trend: 5.2 },
      { name: "Net Margin", value: 28, displayValue: "28%", trend: 2.1 },
      { name: "EBITDA Margin", value: 32, displayValue: "32%", trend: 1.8 },
      { name: "Debt-to-Equity", value: 1.8, displayValue: "1.8", trend: -5.2 },
      { name: "Current Ratio", value: 0.88, displayValue: "0.88", trend: -3.4 },
      { name: "Revenue Growth", value: 8, displayValue: "8%", trend: 12.5 },
      { name: "Annual Volatility", value: 24, displayValue: "24%", trend: -8.2 },
    ],
    radarData: [
      { axis: "Profitability", value: 85 },
      { axis: "Risk", value: 70 },
      { axis: "Growth", value: 75 },
      { axis: "Liquidity", value: 60 },
      { axis: "Efficiency", value: 88 },
      { axis: "Stability", value: 82 },
    ],
  },
  MSFT: {
    name: "Microsoft Corporation",
    sector: "Technology",
    score: 88,
    metrics: [
      { name: "ROE", value: 38, displayValue: "38%", trend: 4.2 },
      { name: "ROA", value: 19, displayValue: "19%", trend: 3.1 },
      { name: "Net Margin", value: 36, displayValue: "36%", trend: 5.8 },
      { name: "EBITDA Margin", value: 48, displayValue: "48%", trend: 2.4 },
      { name: "Debt-to-Equity", value: 0.42, displayValue: "0.42", trend: -12.5 },
      { name: "Current Ratio", value: 1.77, displayValue: "1.77", trend: 8.2 },
      { name: "Revenue Growth", value: 12, displayValue: "12%", trend: 15.3 },
      { name: "Annual Volatility", value: 22, displayValue: "22%", trend: -5.8 },
    ],
    radarData: [
      { axis: "Profitability", value: 90 },
      { axis: "Risk", value: 85 },
      { axis: "Growth", value: 88 },
      { axis: "Liquidity", value: 82 },
      { axis: "Efficiency", value: 85 },
      { axis: "Stability", value: 90 },
    ],
  },
  GOOGL: {
    name: "Alphabet Inc.",
    sector: "Communication Services",
    score: 72,
    metrics: [
      { name: "ROE", value: 25, displayValue: "25%", trend: -2.1 },
      { name: "ROA", value: 16, displayValue: "16%", trend: -1.8 },
      { name: "Net Margin", value: 22, displayValue: "22%", trend: -4.5 },
      { name: "EBITDA Margin", value: 30, displayValue: "30%", trend: -2.8 },
      { name: "Debt-to-Equity", value: 0.11, displayValue: "0.11", trend: 5.2 },
      { name: "Current Ratio", value: 2.1, displayValue: "2.1", trend: 3.4 },
      { name: "Revenue Growth", value: 6, displayValue: "6%", trend: -8.5 },
      { name: "Annual Volatility", value: 28, displayValue: "28%", trend: 12.2 },
    ],
    radarData: [
      { axis: "Profitability", value: 70 },
      { axis: "Risk", value: 75 },
      { axis: "Growth", value: 65 },
      { axis: "Liquidity", value: 90 },
      { axis: "Efficiency", value: 72 },
      { axis: "Stability", value: 68 },
    ],
  },
  NVDA: {
    name: "NVIDIA Corporation",
    sector: "Technology",
    score: 91,
    metrics: [
      { name: "ROE", value: 69, displayValue: "69%", trend: 45.2 },
      { name: "ROA", value: 45, displayValue: "45%", trend: 38.1 },
      { name: "Net Margin", value: 55, displayValue: "55%", trend: 28.5 },
      { name: "EBITDA Margin", value: 62, displayValue: "62%", trend: 22.4 },
      { name: "Debt-to-Equity", value: 0.41, displayValue: "0.41", trend: -18.5 },
      { name: "Current Ratio", value: 4.17, displayValue: "4.17", trend: 12.2 },
      { name: "Revenue Growth", value: 122, displayValue: "122%", trend: 85.3 },
      { name: "Annual Volatility", value: 42, displayValue: "42%", trend: 18.8 },
    ],
    radarData: [
      { axis: "Profitability", value: 95 },
      { axis: "Risk", value: 60 },
      { axis: "Growth", value: 98 },
      { axis: "Liquidity", value: 95 },
      { axis: "Efficiency", value: 92 },
      { axis: "Stability", value: 70 },
    ],
  },
}

function getScoreColor(score: number) {
  if (score >= 70) return "bg-accent text-accent-foreground"
  if (score >= 40) return "bg-warning text-warning-foreground"
  return "bg-destructive text-destructive-foreground"
}

// Helper to determine which metric value is "better"
function isBetterMetric(name: string, valueA: number, valueB: number): boolean {
  // Lower is better for these metrics
  const lowerIsBetter = ["Debt-to-Equity", "Annual Volatility"]
  if (lowerIsBetter.includes(name)) {
    return valueA < valueB
  }
  return valueA > valueB
}

interface CompanyColumnProps {
  ticker: string
  data: typeof companiesData.AAPL
  otherData: typeof companiesData.AAPL | null
  onSearch: (ticker: string) => void
  searchValue: string
  onSearchChange: (value: string) => void
}

function CompanyColumn({
  ticker,
  data,
  otherData,
  onSearch,
  searchValue,
  onSearchChange,
}: CompanyColumnProps) {
  return (
    <div className="flex-1 space-y-4">
      {/* Ticker Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Enter ticker..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchValue) {
              onSearch(searchValue.toUpperCase())
            }
          }}
          className="pl-10 h-10 bg-card border-border/50"
        />
      </div>

      {/* Company Header */}
      <div className="p-4 rounded-xl border border-border/50 bg-card text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold mx-auto mb-3">
          {ticker.slice(0, 2)}
        </div>
        <h3 className="font-semibold text-foreground">{data.name}</h3>
        <Badge variant="outline" className="mt-1 text-xs">
          {data.sector}
        </Badge>
        <div
          className={cn(
            "inline-flex items-center justify-center h-10 w-10 rounded-lg text-lg font-bold mt-3",
            getScoreColor(data.score)
          )}
        >
          {data.score}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="space-y-2">
        {data.metrics.map((metric) => {
          const otherMetric = otherData?.metrics.find((m) => m.name === metric.name)
          const isWinning = otherMetric
            ? isBetterMetric(metric.name, metric.value, otherMetric.value)
            : null
          const isLosing = otherMetric
            ? !isBetterMetric(metric.name, metric.value, otherMetric.value) &&
              metric.value !== otherMetric.value
            : null

          return (
            <div
              key={metric.name}
              className={cn(
                "p-3 rounded-lg border border-border/50 transition-colors",
                isWinning && "bg-accent/5 border-accent/20",
                isLosing && "bg-destructive/5 border-destructive/20",
                !isWinning && !isLosing && "bg-card"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {metric.name}
                </span>
                {isWinning && <Check className="h-3.5 w-3.5 text-accent" />}
                {isLosing && <X className="h-3.5 w-3.5 text-destructive" />}
              </div>
              <div className="flex items-end justify-between">
                <span className="text-lg font-bold text-foreground">
                  {metric.displayValue}
                </span>
                <div
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    metric.trend >= 0 ? "text-accent" : "text-destructive"
                  )}
                >
                  {metric.trend >= 0 ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {Math.abs(metric.trend)}%
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ComparePage() {
  const [tickerA, setTickerA] = useState("AAPL")
  const [tickerB, setTickerB] = useState("MSFT")
  const [searchA, setSearchA] = useState("AAPL")
  const [searchB, setSearchB] = useState("MSFT")

  const dataA = companiesData[tickerA] || companiesData.AAPL
  const dataB = companiesData[tickerB] || companiesData.MSFT

  // Combine radar data for overlay
  const combinedRadarData = dataA.radarData.map((item) => ({
    axis: item.axis,
    companyA: item.value,
    companyB: dataB.radarData.find((b) => b.axis === item.axis)?.value || 0,
  }))

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compare Companies</h1>
          <p className="text-muted-foreground mt-1">
            Side-by-side financial analysis of two companies
          </p>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Company A */}
          <CompanyColumn
            ticker={tickerA}
            data={dataA}
            otherData={dataB}
            searchValue={searchA}
            onSearchChange={setSearchA}
            onSearch={(t) => {
              if (companiesData[t]) setTickerA(t)
            }}
          />

          {/* Center Radar Chart */}
          <div className="w-[400px] shrink-0">
            <div className="sticky top-24 p-5 rounded-xl border border-border/50 bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Profile Comparison</h3>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-[#9BC4A0]" />
                  <span className="text-muted-foreground">{tickerA}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-[#F5D9B0]" />
                  <span className="text-muted-foreground">{tickerB}</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={combinedRadarData}>
                  <PolarGrid stroke="#E8E2D9" />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={{ fontSize: 11 }}
                    stroke="#8B8178"
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fontSize: 10 }}
                    stroke="#8B8178"
                  />
                  <Radar
                    name={tickerA}
                    dataKey="companyA"
                    stroke="#9BC4A0"
                    fill="#9BC4A0"
                    fillOpacity={0.5}
                  />
                  <Radar
                    name={tickerB}
                    dataKey="companyB"
                    stroke="#F5D9B0"
                    fill="#F5D9B0"
                    fillOpacity={0.5}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E8E2D9",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>

              {/* Quick Stats */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {tickerA} Score
                    </p>
                    <Badge className={cn("text-lg font-bold", getScoreColor(dataA.score))}>
                      {dataA.score}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {tickerB} Score
                    </p>
                    <Badge className={cn("text-lg font-bold", getScoreColor(dataB.score))}>
                      {dataB.score}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company B */}
          <CompanyColumn
            ticker={tickerB}
            data={dataB}
            otherData={dataA}
            searchValue={searchB}
            onSearchChange={setSearchB}
            onSearch={(t) => {
              if (companiesData[t]) setTickerB(t)
            }}
          />
        </div>

        {/* Available Tickers Note */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <span className="text-sm text-muted-foreground">Available tickers:</span>
          {Object.keys(companiesData).map((t) => (
            <Button
              key={t}
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => {
                if (tickerA !== t) setTickerA(t)
                else if (tickerB !== t) setTickerB(t)
              }}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
