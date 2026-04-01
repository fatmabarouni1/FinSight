"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CompanyHeader, CompanyHeaderSkeleton } from "@/components/dashboard/company-header"
import { MetricCard, MetricCardSkeleton } from "@/components/dashboard/metric-card"
import { AICommentary, AICommentarySkeleton } from "@/components/dashboard/ai-commentary"
import {
  RatioEvolutionChart,
  CompanySectorChart,
  ProfileRadarChart,
} from "@/components/dashboard/analysis-charts"
import { ErrorState } from "@/components/dashboard/error-state"

// Sample data for different tickers
const companyData: Record<string, {
  name: string
  sector: string
  score: number
  metrics: Array<{
    name: string
    value: string
    trend: number
    status: "good" | "warning" | "bad"
  }>
  aiCommentary: {
    strengths: string[]
    weaknesses: string[]
    risks: string[]
    recommendation: string
    confidence: "High" | "Medium" | "Low"
  }
}> = {
  AAPL: {
    name: "Apple Inc.",
    sector: "Technology",
    score: 85,
    metrics: [
      { name: "ROE", value: "170%", trend: 8.5, status: "good" },
      { name: "ROA", value: "31%", trend: 5.2, status: "good" },
      { name: "Net Margin", value: "28%", trend: 2.1, status: "good" },
      { name: "EBITDA Margin", value: "32%", trend: 1.8, status: "good" },
      { name: "Debt-to-Equity", value: "1.8", trend: -5.2, status: "warning" },
      { name: "Current Ratio", value: "0.88", trend: -3.4, status: "warning" },
      { name: "Revenue Growth", value: "8%", trend: 12.5, status: "good" },
      { name: "Annual Volatility", value: "24%", trend: -8.2, status: "good" },
    ],
    aiCommentary: {
      strengths: [
        "Industry-leading profit margins driven by premium pricing power",
        "Exceptional brand loyalty with high customer retention rates",
        "Strong services segment growth providing recurring revenue",
      ],
      weaknesses: [
        "High dependency on iPhone sales for majority of revenue",
        "Current ratio below 1.0 indicates potential liquidity concerns",
        "Limited growth in mature smartphone markets",
      ],
      risks: [
        "Regulatory pressure on App Store fees could impact services margin",
        "Supply chain concentration in Asia poses geopolitical risks",
        "Currency headwinds from strong US dollar affecting international revenue",
      ],
      recommendation:
        "Apple remains a strong buy for long-term investors seeking quality growth. The company's ecosystem moat and services expansion provide defensible competitive advantages. Consider accumulating on market pullbacks with a 3-5 year investment horizon.",
      confidence: "High",
    },
  },
  MSFT: {
    name: "Microsoft Corporation",
    sector: "Technology",
    score: 88,
    metrics: [
      { name: "ROE", value: "38%", trend: 4.2, status: "good" },
      { name: "ROA", value: "19%", trend: 3.1, status: "good" },
      { name: "Net Margin", value: "36%", trend: 5.8, status: "good" },
      { name: "EBITDA Margin", value: "48%", trend: 2.4, status: "good" },
      { name: "Debt-to-Equity", value: "0.42", trend: -12.5, status: "good" },
      { name: "Current Ratio", value: "1.77", trend: 8.2, status: "good" },
      { name: "Revenue Growth", value: "12%", trend: 15.3, status: "good" },
      { name: "Annual Volatility", value: "22%", trend: -5.8, status: "good" },
    ],
    aiCommentary: {
      strengths: [
        "Azure cloud platform showing consistent double-digit growth",
        "Diversified revenue streams across enterprise and consumer segments",
        "Strong balance sheet with low debt levels",
      ],
      weaknesses: [
        "Gaming segment facing increased competition and declining Xbox sales",
        "LinkedIn growth slowing in mature markets",
        "Heavy R&D spending on AI may take time to monetize",
      ],
      risks: [
        "AI competition intensifying with OpenAI partnership dependencies",
        "Enterprise IT spending slowdown could impact cloud growth",
        "Antitrust scrutiny on Activision acquisition integration",
      ],
      recommendation:
        "Microsoft offers the best risk-adjusted exposure to AI and cloud computing trends. The company's enterprise relationships and comprehensive product suite create high switching costs. Strong buy for portfolios seeking stable technology exposure.",
      confidence: "High",
    },
  },
  GOOGL: {
    name: "Alphabet Inc.",
    sector: "Communication Services",
    score: 72,
    metrics: [
      { name: "ROE", value: "25%", trend: -2.1, status: "good" },
      { name: "ROA", value: "16%", trend: -1.8, status: "good" },
      { name: "Net Margin", value: "22%", trend: -4.5, status: "warning" },
      { name: "EBITDA Margin", value: "30%", trend: -2.8, status: "good" },
      { name: "Debt-to-Equity", value: "0.11", trend: 5.2, status: "good" },
      { name: "Current Ratio", value: "2.1", trend: 3.4, status: "good" },
      { name: "Revenue Growth", value: "6%", trend: -8.5, status: "warning" },
      { name: "Annual Volatility", value: "28%", trend: 12.2, status: "warning" },
    ],
    aiCommentary: {
      strengths: [
        "Dominant position in digital advertising with Google Search",
        "YouTube remains largest video platform with growing shorts engagement",
        "Google Cloud Platform gaining enterprise market share",
      ],
      weaknesses: [
        "Heavy reliance on advertising revenue vulnerable to economic cycles",
        "AI search threats from competitors could disrupt core business",
        "Other Bets segment continues to generate significant losses",
      ],
      risks: [
        "DOJ antitrust case could force structural changes or divestitures",
        "Privacy regulations reducing ad targeting effectiveness",
        "ChatGPT and AI assistants disrupting traditional search behavior",
      ],
      recommendation:
        "Alphabet faces near-term headwinds from AI disruption concerns but trades at reasonable valuations. The company's AI capabilities with Gemini and strong cash position provide optionality. Hold with selective accumulation for patient investors.",
      confidence: "Medium",
    },
  },
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const ticker = searchParams.get("ticker")?.toUpperCase() || "AAPL"
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    
    // Simulate API call
    const timer = setTimeout(() => {
      if (!companyData[ticker]) {
        setError(true)
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [ticker])

  const data = companyData[ticker] || companyData.AAPL

  if (error && !companyData[ticker]) {
    return (
      <div className="space-y-6">
        <ErrorState
          message={`Data unavailable for ${ticker}`}
          description="Using fallback data source. Some information may be limited or outdated."
        />
        <DashboardData ticker="AAPL" data={companyData.AAPL} loading={false} />
      </div>
    )
  }

  return <DashboardData ticker={ticker} data={data} loading={loading} />
}

function DashboardData({
  ticker,
  data,
  loading,
}: {
  ticker: string
  data: typeof companyData.AAPL
  loading: boolean
}) {
  return (
    <div className="space-y-6">
      {/* Company Header */}
      {loading ? (
        <CompanyHeaderSkeleton />
      ) : (
        <CompanyHeader
          ticker={ticker}
          name={data.name}
          sector={data.sector}
          score={data.score}
          lastUpdated="2h ago"
        />
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        {loading
          ? [...Array(8)].map((_, i) => <MetricCardSkeleton key={i} />)
          : data.metrics.map((metric) => (
              <MetricCard
                key={metric.name}
                name={metric.name}
                value={metric.value}
                trend={metric.trend}
                status={metric.status}
              />
            ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-4">
        <RatioEvolutionChart loading={loading} />
        <CompanySectorChart loading={loading} />
        <ProfileRadarChart loading={loading} />
      </div>

      {/* AI Commentary */}
      {loading ? (
        <AICommentarySkeleton />
      ) : (
        <AICommentary
          strengths={data.aiCommentary.strengths}
          weaknesses={data.aiCommentary.weaknesses}
          risks={data.aiCommentary.risks}
          recommendation={data.aiCommentary.recommendation}
          confidence={data.aiCommentary.confidence}
        />
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="space-y-6">
            <CompanyHeaderSkeleton />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <MetricCardSkeleton key={i} />
              ))}
            </div>
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </DashboardLayout>
  )
}
