import { PrismaClient } from "@prisma/client"
import { categories, products, users, orders } from "../lib/data/mock"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database seeding...")

  // Clear existing data
  console.log("Clearing existing data...")
  await prisma.salesAnalytics.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Seed categories
  console.log("Seeding categories...")
  const categoryPromises = categories.map((category) =>
    prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        description: category.description,
      },
    }),
  )
  await Promise.all(categoryPromises)

  // Seed products
  console.log("Seeding products...")
  const productPromises = products.map((product) =>
    prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        sku: product.sku,
        categoryId: product.categoryId,
        stock: product.stock,
      },
    }),
  )
  await Promise.all(productPromises)

  // Seed users
  console.log("Seeding users...")
  const userPromises = users.map((user) =>
    prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    }),
  )
  await Promise.all(userPromises)

  // Seed orders
  console.log("Seeding orders...")
  const orderPromises = orders.map((order) =>
    prisma.order.create({
      data: {
        id: order.id,
        customerId: order.customerId,
        status: order.status,
        total: order.total,
        items: {
          create: order.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        createdAt: order.createdAt,
      },
    }),
  )
  await Promise.all(orderPromises)

  // Seed sales analytics data
  console.log("Seeding sales analytics data...")
  await seedSalesAnalytics()

  console.log("Seeding completed successfully!")
}

async function seedSalesAnalytics() {
  // Get all completed orders with their related data
  const completedOrders = await prisma.order.findMany({
    where: {
      status: "COMPLETED",
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
      customer: true,
    },
  })

  console.log(`Found ${completedOrders.length} completed orders to process for analytics`)

  // Prepare analytics entries
  const analyticsEntries = []

  // Process each order
  for (const order of completedOrders) {
    const orderDate = order.createdAt

    // Extract time dimensions for analytics
    const hour = orderDate.getHours()
    const dayOfWeek = orderDate.getDay()
    const day = orderDate.getDate()
    const month = orderDate.getMonth() + 1
    const year = orderDate.getFullYear()

    // Normalize date to start of day for daily aggregation
    const date = new Date(orderDate)
    date.setHours(0, 0, 0, 0)

    // Process each item in the order
    for (const item of order.items) {
      const product = item.product
      const category = product.category

      // Calculate financial metrics
      const revenue = item.price * item.quantity
      const costPerUnit = item.price * 0.6 // Assuming 40% margin
      const cost = costPerUnit * item.quantity
      const profit = revenue - cost

      // Create analytics entry
      analyticsEntries.push({
        date: date,
        productId: product.id,
        productName: product.name,
        categoryId: category.id,
        categoryName: category.name,
        quantity: item.quantity,
        revenue: revenue,
        cost: cost,
        profit: profit,
        discountAmount: 0, // No discounts in our mock data
        hour: hour,
        dayOfWeek: dayOfWeek,
        month: month,
        year: year,
        customerId: order.customerId,
        employeeId: null, // No employee tracking in our mock data
      })
    }
  }

  // Batch insert analytics entries
  if (analyticsEntries.length > 0) {
    await prisma.salesAnalytics.createMany({
      data: analyticsEntries,
    })
    console.log(`Created ${analyticsEntries.length} analytics entries`)
  } else {
    console.log("No analytics entries to create")
  }
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    console.log("Disconnecting from database...")
    await prisma.$disconnect()
  })
