import type { Category, Order, Product, User } from "./schema"

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "ADMIN",
    avatar: "/avatars/admin.png",
  },
  {
    id: "2",
    name: "Staff User",
    email: "staff@example.com",
    role: "STAFF",
    avatar: "/avatars/staff.png",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@example.com",
    role: "CUSTOMER",
    avatar: "/avatars/john.png",
  },
  {
    id: "4",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "CUSTOMER",
    avatar: "/avatars/jane.png",
  },
  {
    id: "5",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "CUSTOMER",
    avatar: "/avatars/robert.png",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "CUSTOMER",
    avatar: "/avatars/emily.png",
  },
]

export const categories: Category[] = [
  {
    id: "1",
    name: "Beverages",
    description: "Soft drinks, coffees, teas, beers, and ales",
  },
  {
    id: "2",
    name: "Food",
    description: "Sweet and savory snacks",
  },
  {
    id: "3",
    name: "Electronics",
    description: "Phones, tablets, laptops, and accessories",
  },
  {
    id: "4",
    name: "Stationery",
    description: "Office and school supplies",
  },
]

const existingProducts: Product[] = [
  {
    id: "1",
    name: "Coffee",
    description: "Premium Arabica coffee",
    price: 3.99,
    image: "/products/coffee.jpg",
    sku: "BEV001",
    categoryId: "1",
    stock: 100,
  },
  {
    id: "2",
    name: "Green Tea",
    description: "Organic green tea",
    price: 2.99,
    image: "/products/tea.jpg",
    sku: "BEV002",
    categoryId: "1",
    stock: 150,
  },
  {
    id: "3",
    name: "Chocolate Bar",
    description: "Dark chocolate",
    price: 1.99,
    image: "/products/chocolate.jpg",
    sku: "FOOD001",
    categoryId: "2",
    stock: 200,
  },
  {
    id: "4",
    name: "Potato Chips",
    description: "Original flavor",
    price: 2.49,
    image: "/products/chips.jpg",
    sku: "FOOD002",
    categoryId: "2",
    stock: 300,
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    description: "Bluetooth 5.0",
    price: 49.99,
    image: "/products/earbuds.jpg",
    sku: "ELEC001",
    categoryId: "3",
    stock: 50,
  },
]

const stationeryProducts: Product[] = [
  {
    id: "6",
    name: "Ballpoint Pen (Blue)",
    description: "Smooth writing ballpoint pen",
    price: 1.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT001",
    categoryId: "4",
    stock: 500,
  },
  {
    id: "7",
    name: "Mechanical Pencil",
    description: "0.5mm mechanical pencil",
    price: 2.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT002",
    categoryId: "4",
    stock: 300,
  },
  {
    id: "8",
    name: "Notebook (A5)",
    description: "100 pages lined notebook",
    price: 4.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT003",
    categoryId: "4",
    stock: 200,
  },
  {
    id: "9",
    name: "Eraser Pack",
    description: "Pack of 3 white erasers",
    price: 1.49,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT004",
    categoryId: "4",
    stock: 400,
  },
  {
    id: "10",
    name: "Highlighter Set",
    description: "Set of 5 fluorescent colors",
    price: 5.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT005",
    categoryId: "4",
    stock: 150,
  },
  {
    id: "11",
    name: "Sticky Notes",
    description: "Pack of 100 sheets",
    price: 2.49,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT006",
    categoryId: "4",
    stock: 300,
  },
  {
    id: "12",
    name: "Ruler (30cm)",
    description: "Clear plastic ruler",
    price: 1.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT007",
    categoryId: "4",
    stock: 250,
  },
  {
    id: "13",
    name: "Scissors",
    description: "Stainless steel scissors",
    price: 3.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT008",
    categoryId: "4",
    stock: 150,
  },
  {
    id: "14",
    name: "Glue Stick",
    description: "Non-toxic glue stick",
    price: 1.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT009",
    categoryId: "4",
    stock: 200,
  },
  {
    id: "15",
    name: "Paper Clips",
    description: "Box of 100 clips",
    price: 1.49,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT010",
    categoryId: "4",
    stock: 400,
  },
  {
    id: "16",
    name: "Stapler",
    description: "Desktop stapler with staples",
    price: 6.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT011",
    categoryId: "4",
    stock: 100,
  },
  {
    id: "17",
    name: "File Folders",
    description: "Pack of 12 manila folders",
    price: 7.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT012",
    categoryId: "4",
    stock: 150,
  },
  {
    id: "18",
    name: "Binder Clips",
    description: "Assorted sizes, 30 pieces",
    price: 3.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT013",
    categoryId: "4",
    stock: 200,
  },
  {
    id: "19",
    name: "Correction Tape",
    description: "White correction tape",
    price: 2.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT014",
    categoryId: "4",
    stock: 180,
  },
  {
    id: "20",
    name: "Index Cards",
    description: "Pack of 100 ruled cards",
    price: 1.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT015",
    categoryId: "4",
    stock: 250,
  },
  // ... continuing with more stationery items
  {
    id: "21",
    name: "Pencil Case",
    description: "Zippered pencil pouch",
    price: 4.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT016",
    categoryId: "4",
    stock: 120,
  },
  {
    id: "22",
    name: "Permanent Marker",
    description: "Black permanent marker",
    price: 2.49,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT017",
    categoryId: "4",
    stock: 300,
  },
  {
    id: "23",
    name: "Push Pins",
    description: "Box of 100 colored pins",
    price: 1.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT018",
    categoryId: "4",
    stock: 400,
  },
  {
    id: "24",
    name: "Calculator",
    description: "Basic desktop calculator",
    price: 8.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT019",
    categoryId: "4",
    stock: 80,
  },
  {
    id: "25",
    name: "Rubber Bands",
    description: "Assorted sizes, 100g",
    price: 1.49,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT020",
    categoryId: "4",
    stock: 300,
  },
  // ... continuing with more items
  {
    id: "26",
    name: "Desk Organizer",
    description: "Multi-compartment organizer",
    price: 12.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT021",
    categoryId: "4",
    stock: 50,
  },
  {
    id: "27",
    name: "Pencil Sharpener",
    description: "Manual pencil sharpener",
    price: 2.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT022",
    categoryId: "4",
    stock: 150,
  },
  {
    id: "28",
    name: "Tape Dispenser",
    description: "Desktop tape dispenser",
    price: 4.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT023",
    categoryId: "4",
    stock: 100,
  },
  {
    id: "29",
    name: "Letter Tray",
    description: "Stackable letter tray",
    price: 9.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT024",
    categoryId: "4",
    stock: 75,
  },
  {
    id: "30",
    name: "Clipboard",
    description: "Standard size clipboard",
    price: 3.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT025",
    categoryId: "4",
    stock: 120,
  },
  // ... and more items
  {
    id: "31",
    name: "Notebook Dividers",
    description: "5-tab dividers set",
    price: 3.49,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT026",
    categoryId: "4",
    stock: 200,
  },
  {
    id: "32",
    name: "Pencil Lead Refills",
    description: "0.5mm lead refills",
    price: 1.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT027",
    categoryId: "4",
    stock: 250,
  },
  {
    id: "33",
    name: "Whiteboard Marker",
    description: "4-color set",
    price: 6.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT028",
    categoryId: "4",
    stock: 150,
  },
  {
    id: "34",
    name: "Document Holder",
    description: "Adjustable document holder",
    price: 14.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT029",
    categoryId: "4",
    stock: 50,
  },
  {
    id: "35",
    name: "Desk Calendar",
    description: "Monthly desk calendar",
    price: 7.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT030",
    categoryId: "4",
    stock: 100,
  },
  // Additional items
  {
    id: "36",
    name: "Fountain Pen",
    description: "Classic fountain pen",
    price: 19.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT031",
    categoryId: "4",
    stock: 50,
  },
  {
    id: "37",
    name: "Ink Cartridges",
    description: "Pack of 10 ink cartridges",
    price: 4.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT032",
    categoryId: "4",
    stock: 200,
  },
  {
    id: "38",
    name: "Desk Pad",
    description: "Large desk pad calendar",
    price: 11.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT033",
    categoryId: "4",
    stock: 75,
  },
  {
    id: "39",
    name: "Paper Punch",
    description: "2-hole paper punch",
    price: 8.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT034",
    categoryId: "4",
    stock: 100,
  },
  {
    id: "40",
    name: "Stamp Pad",
    description: "Blue ink stamp pad",
    price: 3.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT035",
    categoryId: "4",
    stock: 150,
  },
  {
    id: "41",
    name: "Pencil Set",
    description: "12 graphite pencils",
    price: 5.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT036",
    categoryId: "4",
    stock: 200,
  },
  {
    id: "42",
    name: "Sticky Tabs",
    description: "Page marker tabs",
    price: 2.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT037",
    categoryId: "4",
    stock: 300,
  },
  {
    id: "43",
    name: "Envelope Pack",
    description: "50 business envelopes",
    price: 6.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT038",
    categoryId: "4",
    stock: 150,
  },
  {
    id: "44",
    name: "Rubber Stamp",
    description: "Custom rubber stamp",
    price: 9.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT039",
    categoryId: "4",
    stock: 100,
  },
  {
    id: "45",
    name: "Desk Mat",
    description: "Non-slip desk mat",
    price: 15.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT040",
    categoryId: "4",
    stock: 80,
  },
  {
    id: "46",
    name: "Business Cards",
    description: "100 blank cards",
    price: 8.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT041",
    categoryId: "4",
    stock: 200,
  },
  {
    id: "47",
    name: "Label Maker",
    description: "Handheld label maker",
    price: 24.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT042",
    categoryId: "4",
    stock: 50,
  },
  {
    id: "48",
    name: "Label Tape",
    description: "2-pack label tape",
    price: 7.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT043",
    categoryId: "4",
    stock: 150,
  },
  {
    id: "49",
    name: "Desk Clock",
    description: "Digital desk clock",
    price: 12.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT044",
    categoryId: "4",
    stock: 75,
  },
  {
    id: "50",
    name: "Magazine Holder",
    description: "Metal magazine rack",
    price: 16.99,
    image: "/placeholder.svg?height=100&width=100",
    sku: "STAT045",
    categoryId: "4",
    stock: 60,
  },
]

export const products: Product[] = [...existingProducts, ...stationeryProducts]

// Generate dates for the past 6 months
function generatePastDate(daysAgo: number): Date {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date
}

// Helper to create order items
function createOrderItems(items: { productId: string; quantity: number }[]): any[] {
  return items.map((item, index) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) throw new Error(`Product with ID ${item.productId} not found`)

    return {
      id: `item-${Date.now()}-${index}`,
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
    }
  })
}

// Helper to calculate order total
function calculateOrderTotal(items: any[]): number {
  return items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) throw new Error(`Product with ID ${item.productId} not found`)

    return total + product.price * item.quantity
  }, 0)
}

// Expanded orders with more variety for better analytics
export const orders: Order[] = [
  // Original orders
  {
    id: "1",
    customerId: "3",
    status: "COMPLETED",
    total: 8.97,
    items: [
      {
        id: "1",
        productId: "1",
        quantity: 2,
        price: 3.99,
      },
      {
        id: "2",
        productId: "3",
        quantity: 1,
        price: 1.99,
      },
    ],
    createdAt: new Date("2024-02-24T10:00:00"),
  },
  {
    id: "2",
    customerId: "3",
    status: "PROCESSING",
    total: 54.97,
    items: [
      {
        id: "3",
        productId: "5",
        quantity: 1,
        price: 49.99,
      },
      {
        id: "4",
        productId: "2",
        quantity: 2,
        price: 2.99,
      },
    ],
    createdAt: new Date("2024-02-25T09:30:00"),
  },

  // Additional orders for better analytics data
  // January orders
  {
    id: "3",
    customerId: "4",
    status: "COMPLETED",
    total: 29.95,
    items: createOrderItems([
      { productId: "1", quantity: 3 },
      { productId: "4", quantity: 2 },
      { productId: "6", quantity: 5 },
    ]),
    createdAt: generatePastDate(150), // January
  },
  {
    id: "4",
    customerId: "5",
    status: "COMPLETED",
    total: 74.95,
    items: createOrderItems([
      { productId: "5", quantity: 1 },
      { productId: "8", quantity: 5 },
    ]),
    createdAt: generatePastDate(145), // January
  },
  {
    id: "5",
    customerId: "6",
    status: "COMPLETED",
    total: 42.5,
    items: createOrderItems([
      { productId: "10", quantity: 2 },
      { productId: "12", quantity: 3 },
      { productId: "15", quantity: 10 },
    ]),
    createdAt: generatePastDate(140), // January
  },

  // February orders
  {
    id: "6",
    customerId: "3",
    status: "COMPLETED",
    total: 89.97,
    items: createOrderItems([
      { productId: "5", quantity: 1 },
      { productId: "16", quantity: 2 },
      { productId: "24", quantity: 3 },
    ]),
    createdAt: generatePastDate(120), // February
  },
  {
    id: "7",
    customerId: "4",
    status: "COMPLETED",
    total: 35.92,
    items: createOrderItems([
      { productId: "2", quantity: 4 },
      { productId: "3", quantity: 10 },
    ]),
    createdAt: generatePastDate(115), // February
  },
  {
    id: "8",
    customerId: "5",
    status: "CANCELLED",
    total: 149.97,
    items: createOrderItems([
      { productId: "36", quantity: 3 },
      { productId: "47", quantity: 2 },
    ]),
    createdAt: generatePastDate(110), // February
  },

  // March orders
  {
    id: "9",
    customerId: "6",
    status: "COMPLETED",
    total: 67.85,
    items: createOrderItems([
      { productId: "7", quantity: 5 },
      { productId: "9", quantity: 10 },
      { productId: "11", quantity: 5 },
      { productId: "13", quantity: 5 },
    ]),
    createdAt: generatePastDate(90), // March
  },
  {
    id: "10",
    customerId: "3",
    status: "COMPLETED",
    total: 124.95,
    items: createOrderItems([
      { productId: "26", quantity: 1 },
      { productId: "34", quantity: 5 },
      { productId: "45", quantity: 2 },
    ]),
    createdAt: generatePastDate(85), // March
  },
  {
    id: "11",
    customerId: "4",
    status: "COMPLETED",
    total: 59.9,
    items: createOrderItems([
      { productId: "33", quantity: 5 },
      { productId: "41", quantity: 5 },
    ]),
    createdAt: generatePastDate(80), // March
  },

  // April orders
  {
    id: "12",
    customerId: "5",
    status: "COMPLETED",
    total: 45.92,
    items: createOrderItems([
      { productId: "1", quantity: 5 },
      { productId: "3", quantity: 10 },
      { productId: "6", quantity: 5 },
    ]),
    createdAt: generatePastDate(60), // April
  },
  {
    id: "13",
    customerId: "6",
    status: "COMPLETED",
    total: 199.8,
    items: createOrderItems([{ productId: "5", quantity: 4 }]),
    createdAt: generatePastDate(55), // April
  },
  {
    id: "14",
    customerId: "3",
    status: "COMPLETED",
    total: 79.92,
    items: createOrderItems([
      { productId: "16", quantity: 5 },
      { productId: "17", quantity: 5 },
    ]),
    createdAt: generatePastDate(50), // April
  },

  // May orders
  {
    id: "15",
    customerId: "4",
    status: "COMPLETED",
    total: 149.85,
    items: createOrderItems([
      { productId: "36", quantity: 5 },
      { productId: "37", quantity: 10 },
    ]),
    createdAt: generatePastDate(30), // May
  },
  {
    id: "16",
    customerId: "5",
    status: "PROCESSING",
    total: 99.95,
    items: createOrderItems([
      { productId: "47", quantity: 2 },
      { productId: "48", quantity: 5 },
      { productId: "49", quantity: 2 },
    ]),
    createdAt: generatePastDate(25), // May
  },
  {
    id: "17",
    customerId: "6",
    status: "COMPLETED",
    total: 39.92,
    items: createOrderItems([{ productId: "1", quantity: 10 }]),
    createdAt: generatePastDate(20), // May
  },

  // June orders (current month)
  {
    id: "18",
    customerId: "3",
    status: "COMPLETED",
    total: 59.88,
    items: createOrderItems([{ productId: "2", quantity: 20 }]),
    createdAt: generatePastDate(15), // June
  },
  {
    id: "19",
    customerId: "4",
    status: "COMPLETED",
    total: 49.9,
    items: createOrderItems([
      { productId: "3", quantity: 10 },
      { productId: "4", quantity: 10 },
    ]),
    createdAt: generatePastDate(10), // June
  },
  {
    id: "20",
    customerId: "5",
    status: "PROCESSING",
    total: 249.95,
    items: createOrderItems([{ productId: "5", quantity: 5 }]),
    createdAt: generatePastDate(5), // June
  },
  {
    id: "21",
    customerId: "6",
    status: "PENDING",
    total: 29.95,
    items: createOrderItems([{ productId: "6", quantity: 15 }]),
    createdAt: generatePastDate(2), // June
  },
  {
    id: "22",
    customerId: "3",
    status: "PENDING",
    total: 59.9,
    items: createOrderItems([{ productId: "7", quantity: 20 }]),
    createdAt: generatePastDate(1), // June
  },

  // Today's orders
  {
    id: "23",
    customerId: "4",
    status: "PENDING",
    total: 99.8,
    items: createOrderItems([{ productId: "8", quantity: 20 }]),
    createdAt: new Date(), // Today
  },
  {
    id: "24",
    customerId: "5",
    status: "PENDING",
    total: 29.8,
    items: createOrderItems([{ productId: "9", quantity: 20 }]),
    createdAt: new Date(), // Today
  },
]
