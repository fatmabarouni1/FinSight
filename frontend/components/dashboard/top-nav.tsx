"use client"

import { useState } from "react"
import { Search, Bell, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const popularTickers = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA"]

export function TopNav() {
  const [searchValue, setSearchValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  const filteredTickers = popularTickers.filter((ticker) =>
    ticker.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleSearch = (ticker: string) => {
    setSearchValue(ticker)
    setShowSuggestions(false)
    router.push(`/dashboard?ticker=${ticker}`)
  }

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-6">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search ticker (e.g., AAPL, MSFT)..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchValue) {
                handleSearch(searchValue.toUpperCase())
              }
            }}
            className="pl-10 h-10 bg-secondary/50 border-border/50 focus:bg-card"
          />
          
          {/* Autocomplete Suggestions */}
          {showSuggestions && searchValue && filteredTickers.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
              {filteredTickers.map((ticker) => (
                <button
                  key={ticker}
                  onClick={() => handleSearch(ticker)}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-secondary transition-colors flex items-center justify-between"
                >
                  <span className="font-medium">{ticker}</span>
                  <span className="text-muted-foreground text-xs">
                    {ticker === "AAPL" && "Apple Inc."}
                    {ticker === "MSFT" && "Microsoft Corp."}
                    {ticker === "GOOGL" && "Alphabet Inc."}
                    {ticker === "AMZN" && "Amazon.com Inc."}
                    {ticker === "NVDA" && "NVIDIA Corp."}
                    {ticker === "META" && "Meta Platforms"}
                    {ticker === "TSLA" && "Tesla Inc."}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">JD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline">John Doe</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
