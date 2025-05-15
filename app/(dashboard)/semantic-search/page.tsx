import { SemanticChatbot } from "@/components/chatbot/semantic-chatbot"

export default function SemanticSearchPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Semantic Search Assistant</h1>
      <p className="text-muted-foreground mb-6">
        Ask questions about your store data using natural language. The assistant uses semantic search to find relevant
        information.
      </p>

      <SemanticChatbot />
    </div>
  )
}
