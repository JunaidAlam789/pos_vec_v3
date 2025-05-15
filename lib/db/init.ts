import { db as prisma } from "."

export async function initDatabase() {
  try {
    // Test database connection
    await prisma.$connect()
    console.log("Database connection successful")

    // Check if we need to seed the database
    try {
      const userCount = await prisma.user.count()
      if (userCount === 0) {
        console.log("Database is empty, running seed script...")
        // You would typically run the seed script here
        // For development, you can run `npm run db:seed` manually
      }
    } catch (error) {
      console.error("Error checking database state:", error)
      // Don't throw here, just log the error
    }
  } catch (error) {
    console.error("Failed to initialize database:", error)
    // Handle the error gracefully without throwing
    console.log("Application will continue without database initialization")
  } finally {
    try {
      await prisma.$disconnect()
    } catch (disconnectError) {
      console.error("Error disconnecting from database:", disconnectError)
    }
  }
}
