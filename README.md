# POS (Point of Sale) System

A modern Point of Sale system built with Next.js 14, Prisma, SQLite, and shadcn/ui.

## Features

- 📊 Dashboard with real-time analytics
- 🛍️ Product management
- 📦 Order processing
- 👥 Customer management
- 🛒 Checkout system
- 🎨 Dark/Light mode
- 📱 Responsive design

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [SQLite](https://www.sqlite.org/) - Database
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/pos.git
cd pos

https://www.prisma.io/orm

pnpm install prisma --save-dev

pnpm prisma init --datasource-provider sqlite

pnpm i @prisma/client

pnpm prisma migrate dev --name init

pnpm prisma db push
pnpm prisma db pull
pnpm prisma db generate
pnpm prisma studio

https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help

"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
npx prisma db seed

/ This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Category {
  id          String    @id @default(uuid())
  name        String
  description String?
  products    Product[]
}

model Product {
  id          String      @id @default(uuid())
  name        String
  description String?
  price       Float
  image       String?
  sku         String      @unique
  stock       Int         @default(0)
  category    Category    @relation(fields: [categoryId], references: [id])
  categoryId  String
  orderItems  OrderItem[]
}

model User {
  id     String  @id @default(uuid())
  name   String
  email  String  @unique
  role   String  @default("customer")
  avatar String?
  orders Order[]
}

model Order {
  id         String      @id @default(uuid())
  customer   User        @relation(fields: [customerId], references: [id])
  customerId String
  status     String      @default("pending")
  total      Float
  items      OrderItem[]
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
}

model OrderItem {
  id        String  @id @default(uuid())
  order     Order   @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product @relation(fields: [productId], references: [id])
  productId String
  quantity  Int
  price     Float
}

// Denormalized table for analytics
model SalesAnalytics {
  id           String   @id @default(uuid())
  orderId      String
  productId    String
  productName  String
  categoryId   String
  categoryName String
  customerId   String
  customerName String
  quantity     Int
  unitPrice    Float
  revenue      Float
  cost         Float
  profit       Float
  timestamp    DateTime
  hour         Int
  day          Int
  month        Int
  year         Int
  dayOfWeek    Int

  @@index([productId])
  @@index([categoryId])
  @@index([customerId])
  @@index([timestamp])
  @@index([year, month, day])
  @@index([dayOfWeek])
  @@index([hour])
}
