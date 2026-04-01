"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Line chart data
const lineChartData = [
  { year: "2021", ROE: 120, ROA: 25, NetMargin: 24 },
  { year: "2022", ROE: 145, ROA: 28, NetMargin: 25 },
  { year: "2023", ROE: 160, ROA: 29, NetMargin: 26 },
  { year: "2024", ROE: 155, ROA: 27, NetMargin: 24 },
  { year: "2025", ROE: 170, ROA: 31, NetMargin: 28 },
]

// Bar chart data
const barChartData = [
  { name: "ROE", company: 170, sector: 120 },
  { name: "ROA", company: 31, sector: 22 },
  { name: "Net Margin", company: 28, sector: 18 },
  { name: "D/E Ratio", company: 180, sector: 150 },
  { name: "Current", company: 88, sector: 95 },
  { name: "Revenue", company: 8, sector: 5 },
]

// Radar chart data
const radarChartData = [
  { axis: "Profitability", company: 85, sector: 65 },
  { axis: "Risk", company: 70, sector: 60 },
  { axis: "Growth", company: 90, sector: 70 },
  { axis: "Liquidity", company: 75, sector: 80 },
  { axis: "Efficiency", company: 88, sector: 72 },
  { axis: "Stability", company: 82, sector: 68 },
]

const timeRanges = ["1Y", "3Y", "5Y"]

export function RatioEvolutionChart({ loading }: { loading?: boolean }) {
  const [range, setRange] = useState("5Y")

  if (loading) {
    return <ChartSkeleton title="Ratio Evolution" />
  }

  return (
    <div className="p-5 rounded-xl border border-border/50 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Ratio Evolution</h3>
        <div className="flex items-center gap-1">
          {timeRanges.map((r) => (
            <Button
              key={r}
              variant="ghost"
              size="sm"
              onClick={() => setRange(r)}
              className={cn(
                "h-7 px-3 text-xs",
                range === r
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground"
              )}
            >
              {r}
            </Button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D9" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#8B8178" />
          <YAxis tick={{ fontSize: 12 }} stroke="#8B8178" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E8E2D9",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line
            type="monotone"
            dataKey="ROE"
            stroke="#9BC4A0"
            strokeWidth={2}
            dot={{ fill: "#9BC4A0", strokeWidth: 0, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="ROA"
            stroke="#F5D9B0"
            strokeWidth={2}
            dot={{ fill: "#F5D9B0", strokeWidth: 0, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="NetMargin"
            stroke="#D9CFC2"
            strokeWidth={2}
            dot={{ fill: "#D9CFC2", strokeWidth: 0, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CompanySectorChart({ loading }: { loading?: boolean }) {
  if (loading) {
    return <ChartSkeleton title="Company vs Sector" />
  }

  return (
    <div className="p-5 rounded-xl border border-border/50 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Company vs Sector</h3>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-[#9BC4A0]" />
            <span className="text-muted-foreground">Company</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-[#F5D9B0]" />
            <span className="text-muted-foreground">Sector Avg</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={barChartData} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D9" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#8B8178" />
          <YAxis tick={{ fontSize: 12 }} stroke="#8B8178" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E8E2D9",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="company" fill="#9BC4A0" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sector" fill="#F5D9B0" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ProfileRadarChart({ loading }: { loading?: boolean }) {
  if (loading) {
    return <ChartSkeleton title="Financial Profile" />
  }

  return (
    <div className="p-5 rounded-xl border border-border/50 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Financial Profile</h3>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-[#9BC4A0]" />
            <span className="text-muted-foreground">Company</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-[#F5D9B0] opacity-50" />
            <span className="text-muted-foreground">Sector</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarChartData}>
          <PolarGrid stroke="#E8E2D9" />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11 }} stroke="#8B8178" />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fontSize: 10 }}
            stroke="#8B8178"
          />
          <Radar
            name="Sector"
            dataKey="sector"
            stroke="#F5D9B0"
            fill="#F5D9B0"
            fillOpacity={0.3}
            strokeDasharray="5 5"
          />
          <Radar
            name="Company"
            dataKey="company"
            stroke="#9BC4A0"
            fill="#9BC4A0"
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
    </div>
  )
}

function ChartSkeleton({ title }: { title: string }) {
  return (
    <div className="p-5 rounded-xl border border-border/50 bg-card animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-32 bg-secondary rounded" />
        <div className="h-6 w-24 bg-secondary rounded" />
      </div>
      <div className="h-[240px] bg-secondary/50 rounded-lg flex items-center justify-center">
        <div className="text-muted-foreground/50 text-sm">Loading {title}...</div>
      </div>
    </div>
  )
}
