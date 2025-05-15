import type { Metadata } from "next"
import { Chatbot } from "@/components/chatbot/chatbot"

export const metadata: Metadata = {
  title: "Database Assistant",
  description: "Ask questions about your data in natural language",
}

export default function DatabaseAssistantPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Database Assistant</h1>
        <p className="text-muted-foreground">
          Ask questions about your data in natural language and get instant answers
        </p>
      </div>

      <div className="grid gap-6">
        <Chatbot />
      </div>
    </div>
  )
}
