//import { generateText } from "ai"
import { defaultModel } from "@/lib/ai/config"
import { google } from "@ai-sdk/google"
//import { openai } from "@ai-sdk/openai"
import {OpenAI} from "openai"
import { db } from "@/lib/db"
import type { Product, Category, Order } from "@prisma/client"
import { stringify } from "querystring"
import { GoogleGenAI } from "@google/genai";

 // Function to generate embeddings using OpenAI
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    //console.log("generateEmbedding text input")
 //const GEMINI_API_KEY= process.env.GEMINI_API_KEY
 //const GEMINI_API_KEY=""
 //const OPENAI_API_KEY=""
 const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // GEMINI_API_KEY
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  dangerouslyAllowBrowser: true,
}); 
//const openai= new OpenAI()
//const responselist = await openai.models.list()
// id: 'models/gemini-embedding-exp',
//id: 'models/gemini-2.5-pro-exp-03-25',
//input: text, model: 'models/text-embedding-004', 
//input: text, model: 'models/gemini-embedding-exp-03-07',
 const response = await openai.embeddings.create({
 input: text, model: 'models/text-embedding-004', 

}); 

     /*  const { text: embeddingText } = await generateText({
     //model: openai("text-embedding-3-small"),
     model: google("gemini-2.0-flash"),   
    //   system:"act as embedding generating model, generate embedding for sementic search, dont give extra information in text,use format [0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12]",
 //  system:"act as embedding generating model, generate embedding for scementic search, dont give extra information in text, use format [0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.10.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.06,-0.01,0.19,-0.08,0.02,-0.17,0.13,0.05,-0.10,0.16,-0.03,0.07,-0.12,0.14,-0.06,0.04,-0.15,0.11,0.09,-0.02,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17]",
 system:"act as embedding generating model, generate embedding for sementic search, dont give extra information in text, embedding vector length 32 , format [0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12,0.18,-0.09,0.01,-0.16,0.13,0.05,-0.10,0.17,-0.04,0.08,-0.13,0.15,-0.07,0.03,-0.14,0.12]  ",
      // model: defaultModel,
          prompt: text,
      temperature: 0,
    })     */
   
 /* const embeddingText2 =`{
  "Product_ID": 4,
  "Name": "Potato Chips",
  "Description": "Original flavor",
  "Price": 2.49,
  "SKU": "FOOD002",
  "Category": "Food",
  "Stock": 300
}
`  */
  // const embeddingText=""
 //console.log(`${response.data[0].embedding}`);
  //console.log(response.data)
  // console.log(responselist.data)
   //console.log(embeddingText)
   //const embeddingText= `[0.1,0.2,0.33,0.44,0.55]`
   //return JSON.parse(`${response.data[0].embedding}`)
    return response.data[0].embedding
   
  } catch (error) {
    console.error("Error generating embedding:", error)
    throw new Error("Failed to generate embedding")
  }
}
 
// Function to prepare product data for embedding
export function prepareProductForEmbedding(product: Product & { category?: Category }): string {
  return `
    Product_ID: ${product.id}
    Name: ${product.name}
    Description: ${product.description || ""}
    Price: $${product.price}
    SKU: ${product.sku}
    Category: ${product.category?.name || ""}
    Stock: ${product.stock}
  `.trim()
}

// Function to prepare category data for embedding
export function prepareCategoryForEmbedding(category: Category): string {
  return `
    Category_ID: ${category.id}
    Name: ${category.name}
    Description: ${category.description || ""}
  `.trim()
}

// Function to prepare order data for embedding
export function prepareOrderForEmbedding(order: Order & { customer?: any; items?: any[] }): string {
  const itemsText = order.items
    ? order.items
        .map(
          (item: any) =>
            `Product: ${item.product?.name || "Unknown"}, Quantity: ${item.quantity}, Price: $${item.price}`,
        )
        .join("\n")
    : ""

  return `
    Order_ID: ${order.id}
    Customer: ${order.customer?.name || "Unknown"}
    Status: ${order.status}
    Total: $${order.total}
    Created: ${order.createdAt.toISOString()}
    Items:
    ${itemsText}
  `.trim()
}

// Function to store embeddings in the database
/*  export async function storeEmbedding(content: string, contentType: string, recordId: string, embedding: number[]) {
   console.log("from storeEmbedding")
   console.log(content,contentType,recordId,embedding)
}   
*/
  export async function storeEmbedding(content: string, contentType: string, recordId: string, embedding: number[]) {
 
  try {
  
      // Check if an embedding already exists for this record
    const existingEmbedding = await db.$queryRaw`
      SELECT id FROM "StoreDataEmbedding"
      WHERE "recordId" = ${recordId} AND "contentType" = ${contentType}
    `

    if (Array.isArray(existingEmbedding) && existingEmbedding.length > 0) {
      // Update existing embedding
      await db.$executeRaw`
        UPDATE "StoreDataEmbedding"
        SET 
          content = ${content},
          embedding = ${embedding}::vector,
          "updatedAt" = NOW()
        WHERE "recordId" = ${recordId} AND "contentType" = ${contentType}
      `
    } else {
      // Create new embedding
      await db.$executeRaw`
        INSERT INTO "StoreDataEmbedding" (
          id, content, "contentType", "recordId", embedding, "createdAt", "updatedAt"
        )
        VALUES (
          gen_random_uuid(), ${content}, ${contentType}, ${recordId}, ${embedding}::vector, NOW(), NOW()
        )
      `
    }
  }   
  catch (error) {
    console.error("Error storing embedding:", error)
    throw new Error("Failed to store embedding")
  }
} 
 
// Function to perform semantic search
export async function semanticSearch(query: string, limit = 25): Promise<any[]> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query)

    // Perform vector similarity search
    const results = await db.$queryRaw`
      SELECT 
        e.id, 
        e.content, 
        e."contentType", 
        e."recordId",
        1 - (e.embedding <=> ${queryEmbedding}::vector) as similarity
      FROM "StoreDataEmbedding" e
      ORDER BY e.embedding <=> ${queryEmbedding}::vector
      LIMIT ${limit}
    `

    return Array.isArray(results) ? results : []
  } catch (error) {
    console.error("Error performing semantic search:", error)
    throw new Error("Failed to perform semantic search")
  }
}

// Function to get detailed information about a record based on its ID and type
export async function getRecordDetails(contentType: string, recordId: string): Promise<any> {
  try {
    switch (contentType) {
      case "product":
        return await db.product.findUnique({
          where: { id: recordId },
          include: { category: true },
        })
      case "category":
        return await db.category.findUnique({
          where: { id: recordId },
        })
      case "order":
        return await db.order.findUnique({
          where: { id: recordId },
          include: {
            customer: true,
            items: {
              include: {
                product: true,
              },
            },
          },
        })
      default:
        return null
    }
  } catch (error) {
    console.error(`Error getting details for ${contentType} ${recordId}:`, error)
    return null
  }
}
