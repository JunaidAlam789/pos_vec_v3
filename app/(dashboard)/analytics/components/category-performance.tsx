"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { formatCurrency } from "@/lib/utils"

interface CategoryData {
  categoryId: string
  categoryName: string
  revenue: number
  quantity: number
}

interface CategoryPerformanceProps {
  categories: CategoryData[]
}

export function CategoryPerformance({ categories }: CategoryPerformanceProps) {
  // Generate a unique color for each category
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
  ]

  const data = categories.map((category, index) => ({
    name: category.categoryName,
    value: category.revenue,
    quantity: category.quantity,
    color: COLORS[index % COLORS.length],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>Revenue distribution across product categories</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
