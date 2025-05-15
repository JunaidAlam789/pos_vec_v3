import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { db } from "@/lib/db"

// Function to get the database schema
async function getDatabaseSchema() {
  // This is a simplified schema representation based on the project's data model
   // createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, from products
   //createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, from category table
  return `
  -- User/Customers Table
  CREATE TABLE user (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL, -- ADMIN, STAFF, CUSTOMER
    address TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  -- Product Table
  CREATE TABLE Product (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL NOT NULL,
    image TEXT,
    sku TEXT NOT NULL UNIQUE,
    categoryId TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,   
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES Category(id)
  );

  -- Category Table
  CREATE TABLE Category (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  -- Order Table
  CREATE TABLE Order (
    id TEXT PRIMARY KEY,
    orderNumber TEXT NOT NULL,
    customerId TEXT NOT NULL,
    subtotal DECIMAL NOT NULL,
    tax DECIMAL NOT NULL,
    total DECIMAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING', -- PENDING, PROCESSING, SHIPPED, DELIVERED, COMPLETED, CANCELLED
    paymentMethod TEXT NOT NULL,
    notes TEXT,
    shippingAddress JSONB,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES users(id)
  );

  -- OrderItem Table
  CREATE TABLE OrderItem (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (productId) REFERENCES products(id)
  );

  -- SalesAnalytics Table
  CREATE TABLE SalesAnalytics (
    id TEXT PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    productId TEXT NOT NULL,
    productName TEXT NOT NULL,
    categoryId TEXT NOT NULL,
    categoryName TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    revenue DECIMAL NOT NULL,
    cost DECIMAL NOT NULL,
    profit DECIMAL NOT NULL,
    discountAmount DECIMAL NOT NULL,
    hour INTEGER NOT NULL,
    dayOfWeek INTEGER NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    customerId TEXT,
    employeeId TEXT,
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id),
    FOREIGN KEY (customerId) REFERENCES users(id)
  );
  `
}

// Function to generate SQL from natural language
//5. donot use three backticks, use one backticks and donot use sql word in query string, use semi colon
//4. use customerId and categoryId for column names
 //4. In SQL query use double quote in name of table and use camel case for name of table           
//5. In SQL query use customerId and categoryId for column names
 export async function generateSQLFromNaturalLanguage(question: string): Promise<string> {
  try {
    const schema = await getDatabaseSchema()

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      system: `You are a SQL expert that translates natural language questions into PostgreSQL queries.
      
      The database schema is as follows:
      ${schema}
      
      Your task is to:
      1. Analyze the user's question
      2. Generate a valid PostgreSQL query that answers their question
      3. Return ONLY the SQL query without any explanations or markdown      
      4. In SQL query use double quote in name of table and use camel case for name of table
      
      Make sure your queries are secure and efficient. Use appropriate joins, where clauses, and aggregations as needed.
      If you cannot generate a valid query for the question, respond with "I cannot generate a SQL query for this question."`,
      prompt: question,
    })
    const text2=text.slice(7,-4)
    //const text2= `SELECT count(*) FROM "Product";`
    //const text2=`SELECT * FROM "Product" WHERE categoryId = (SELECT id FROM "Category" WHERE name = 'Stationery');`
    return text2.trim()
  } catch (error) {
    console.error("Error generating SQL query:", error)
    throw new Error("Failed to generate SQL query")
  }
}

// Function to execute SQL query and return results
export async function executeSQLQuery(query: string): Promise<any[]> {
  try {
    // Execute the query using Prisma's $queryRawUnsafe
    // This is potentially dangerous in production without proper validation
   //query=`SELECT count(*) FROM "Product";`
    const results = await db.$queryRawUnsafe(query)
    return Array.isArray(results) ? results : [results]
  } catch (error) {
    
    console.error("Error executing SQL query:", error)
    throw new Error(`Failed to execute SQL query: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Function to explain the SQL query in natural language
export async function explainSQLQuery(query: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      system: `You are a SQL expert that explains PostgreSQL queries in simple terms.
      
      Your task is to:
      1. Analyze the SQL query
      2. Explain what the query does in simple, non-technical language
      3. Break down the explanation by clause (SELECT, FROM, WHERE, etc.)
      
      Make your explanation clear and concise, focusing on what information the query is retrieving.`,
      prompt: query,
    })

    return text.trim()
  } catch (error) {
    console.error("Error explaining SQL query:", error)
    throw new Error("Failed to explain SQL query")
  }
}
