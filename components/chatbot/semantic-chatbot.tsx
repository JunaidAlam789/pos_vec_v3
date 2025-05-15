"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { processChatbotQuery } from "@/lib/actions/semantic-chatbot-actions"
import { Loader2, Send, Search, Info, Tag, ShoppingCart, Package } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type SearchResult = {
  contentType: string
  recordId: string
  content: string
  similarity: number
  details: any
}

const sampleQuestions = [
  "What products do we have in the electronics category?",
  "Show me information about our best-selling product",
  "When was the last order placed and what did it contain?",
  "Do we have any products with low stock?",
  "What's the total revenue from orders in the last month?",
]

export function SemanticChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your store assistant powered by Gemini 2.0 Flash. Ask me anything about your products, orders, or customers.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus()
    }
  }, [isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)
    setSearchResults([])
    setActiveTab("chat")

    try {
      const response = await processChatbotQuery(input)

      if (!response.success) {
        setError(response.error || "Failed to process your query")
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content: `I couldn't process that query: ${response.error}`,
            role: "assistant",
            timestamp: new Date(),
          },
        ])
        return
      }

      setSearchResults(response.searchResults || [])

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: response.response,
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    } catch (err) {
      console.error("Error processing query:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `Sorry, I encountered an error: ${err instanceof Error ? err.message : "Unknown error"}`,
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSampleQuestion = (question: string) => {
    setInput(question)
  }

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case "product":
        return <Package className="h-4 w-4" />
      case "category":
        return <Tag className="h-4 w-4" />
      case "order":
        return <ShoppingCart className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const formatContentType = (contentType: string) => {
    return contentType.charAt(0).toUpperCase() + contentType.slice(1)
  }

  return (
    <Card className="w-full h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/store-assistant.png" alt="Store Assistant" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">Store Assistant</CardTitle>
          </div>
          <Badge variant="outline" className="ml-2 flex items-center gap-1">
            <span className="text-green-500">●</span> Gemini 2.0 Flash
          </Badge>
        </div>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="results" disabled={searchResults.length === 0}>
              Search Results
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col px-4 pt-2">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {error && <p className="text-destructive text-sm mt-2 mb-2">{error}</p>}

          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-2">Sample questions:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {sampleQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSampleQuestion(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="results" className="flex-1 flex flex-col px-4 pt-2">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 pb-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Semantic Search Results
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  These are the most relevant items from your store data based on your query. Results are ranked by
                  semantic similarity.
                </p>

                {searchResults.length > 0 ? (
                  <div className="space-y-3">
                    {searchResults.map((result, index) => (
                      <div key={index} className="bg-background rounded-md p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getContentTypeIcon(result.contentType)}
                            <span className="font-medium">{formatContentType(result.contentType)}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {(result.similarity * 100).toFixed(1)}% match
                          </Badge>
                        </div>

                        <div className="text-xs text-muted-foreground mb-2">
                          {result.content.split("\n").map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>

                        {result.details && (
                          <div className="mt-2 pt-2 border-t border-border">
                            <p className="text-xs font-medium mb-1">Details:</p>
                            <div className="text-xs">
                              {result.contentType === "product" && (
                                <>
                                  <p>
                                    <span className="font-medium">Name:</span> {result.details.name}
                                  </p>
                                  <p>
                                    <span className="font-medium">Price:</span> ${result.details.price}
                                  </p>
                                  <p>
                                    <span className="font-medium">Stock:</span> {result.details.stock}
                                  </p>
                                </>
                              )}
                              {result.contentType === "category" && (
                                <>
                                  <p>
                                    <span className="font-medium">Name:</span> {result.details.name}
                                  </p>
                                  <p>
                                    <span className="font-medium">Description:</span> {result.details.description}
                                  </p>
                                </>
                              )}
                              {result.contentType === "order" && (
                                <>
                                  <p>
                                    <span className="font-medium">Customer:</span> {result.details.customer?.name}
                                  </p>
                                  <p>
                                    <span className="font-medium">Total:</span> ${result.details.total}
                                  </p>
                                  <p>
                                    <span className="font-medium">Status:</span> {result.details.status}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No search results found</p>
                )}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <CardFooter className="pt-0">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Ask about your store data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
