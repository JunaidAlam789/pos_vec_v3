import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentSales } from "./components/recent-sales"
import { getDashboardStats, getRecentOrders, getProducts, getCategories } from "@/lib/data/actions"
import { SalesChart } from "./components/sales-chart"
import { StockLevels } from "./components/stock-levels"
import { SalesByTime } from "./components/sales-by-time"
import { TopProducts } from "./components/top-products"
import { CategoryPerformance } from "./components/category-performance"
import { getSalesByTimePeriod, getTopSellingProducts, getSalesByCategory } from "@/lib/data/analytics-queries"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Analytics",
  description: "View your business analytics and insights",
}

export default async function AnalyticsPage() {
  const stats = await getDashboardStats()
  const recentOrders = await getRecentOrders(5)
  const products = await getProducts()
  const categories = await getCategories()

  // Get data from our denormalized analytics table
  const dailySales = await getSalesByTimePeriod("day", 7)
  const weeklySales = await getSalesByTimePeriod("week", 8)
  const monthlySales = await getSalesByTimePeriod("month", 6)
  const yearlySales = await getSalesByTimePeriod("year", 3)

  const topProducts = await getTopSellingProducts(5)
  const categoryPerformance = await getSalesByCategory()

  // Format data for charts
  const dailyData = dailySales.map((day) => ({
    name: formatDate(day.date, "MMM d"),
    revenue: day._sum.revenue || 0,
    profit: day._sum.profit || 0,
  }))

  const weeklyData = weeklySales.map((week) => ({
    name: `Week ${week.week}, ${week.year}`,
    revenue: week._sum.revenue || 0,
    profit: week._sum.profit || 0,
  }))

  const monthlyData = monthlySales.map((month) => ({
    name: formatDate(new Date(month.year, month.month - 1, 1), "MMM yyyy"),
    revenue: month._sum.revenue || 0,
    profit: month._sum.profit || 0,
  }))

  const yearlyData = yearlySales.map((year) => ({
    name: year.year.toString(),
    revenue: year._sum.revenue || 0,
    profit: year._sum.profit || 0,
  }))

  const formattedTopProducts = topProducts.map((product) => ({
    productId: product.productId,
    productName: product.productName,
    quantity: product._sum.quantity || 0,
    revenue: product._sum.revenue || 0,
    profit: product._sum.profit || 0,
  }))

  const formattedCategories = categoryPerformance.map((category) => ({
    categoryId: category.categoryId,
    categoryName: category.categoryName,
    revenue: category._sum.revenue || 0,
    quantity: category._sum.quantity || 0,
  }))

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics</h2>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">+{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* New analytics components using denormalized data */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <div className="col-span-1 lg:col-span-4">
          <SalesByTime
            dailyData={dailyData}
            weeklyData={weeklyData}
            monthlyData={monthlyData}
            yearlyData={yearlyData}
          />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <TopProducts products={formattedTopProducts} />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <div className="col-span-1 lg:col-span-4">
          <CategoryPerformance categories={formattedCategories} />
        </div>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made {recentOrders.length} sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales orders={recentOrders} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Stock Levels</CardTitle>
            <CardDescription>Current inventory status across categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <StockLevels products={products} categories={categories} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
