"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { formatCurrency } from "@/lib/utils"

interface SalesDataPoint {
  name: string
  revenue: number
  profit: number
}

interface SalesByTimeProps {
  dailyData: SalesDataPoint[]
  weeklyData: SalesDataPoint[]
  monthlyData: SalesDataPoint[]
  yearlyData: SalesDataPoint[]
}

export function SalesByTime({ dailyData, weeklyData, monthlyData, yearlyData }: SalesByTimeProps) {
  const [activeTab, setActiveTab] = useState("daily")

  const getActiveData = () => {
    switch (activeTab) {
      case "daily":
        return dailyData
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      case "yearly":
        return yearlyData
      default:
        return dailyData
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Over Time</CardTitle>
        <CardDescription>View your sales trends across different time periods</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getActiveData()}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Period: ${label}`}
                />
                <Bar dataKey="revenue" name="Revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
