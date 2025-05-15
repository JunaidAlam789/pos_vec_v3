"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { processNaturalLanguageQuery, explainQuery } from "@/lib/actions/chatbot-actions"
import { Loader2, Send, Database, Info } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type QueryResult = {
  sqlQuery: string
  results: any[]
  explanation?: string
}

const sampleQuestions = [
  "How many products in store?",
  "List all Categories",
  "List all products",
  "List all Orders",
  "Which customers have spent the most? use customerId",
  "List Stationery items. use categoryId",
  "Show me products with low stock (less than 10 units)",
]

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your database assistant. Ask me anything about your data and I'll try to find the answer.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isExplaining, setIsExplaining] = useState(false)

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
    setQueryResult(null)
    setActiveTab("chat")

    try {
      const response = await processNaturalLanguageQuery(input)

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

      setQueryResult({
        sqlQuery: response.sqlQuery,
        results: response.results,
      })

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `I've found some results for your query. Check the Results tab to see them.`,
          role: "assistant",
          timestamp: new Date(),
        },
      ])

      setActiveTab("results")
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

  const handleExplainQuery = async () => {
    if (!queryResult?.sqlQuery || isExplaining) return

    setIsExplaining(true)

    try {
      const response = await explainQuery(queryResult.sqlQuery)

      if (!response.success) {
        setError(response.error || "Failed to explain the query")
        return
      }

      setQueryResult({
        ...queryResult,
        explanation: response.explanation,
      })
    } catch (err) {
      console.error("Error explaining query:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsExplaining(false)
    }
  }

  return (
    <Card className="w-full h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/database-bot.png" alt="Database Assistant" />
              <AvatarFallback>DB</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">Database Assistant</CardTitle>
          </div>
          <Badge variant="outline" className="ml-2">
            Using Gemini 2.0 Flash
          </Badge>
        </div>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="results" disabled={!queryResult}>
              Results
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
          {queryResult && (
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 pb-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      SQL Query
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExplainQuery}
                      disabled={isExplaining || !!queryResult.explanation}
                    >
                      {isExplaining ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Explaining...
                        </>
                      ) : (
                        <>
                          <Info className="h-3 w-3 mr-1" />
                          Explain Query
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="text-xs bg-background p-3 rounded-md overflow-x-auto">{queryResult.sqlQuery}</pre>
                </div>

                {queryResult.explanation && (
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Query Explanation
                    </h3>
                    <div className="text-sm">{queryResult.explanation}</div>
                  </div>
                )}

                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-medium mb-2">Results</h3>
                  {queryResult.results.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            {Object.keys(queryResult.results[0]).map((key) => (
                              <th key={key} className="px-2 py-2 text-left font-medium">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {queryResult.results.map((row, i) => (
                            <tr key={i} className="border-b">
                              {Object.values(row).map((value: any, j) => (
                                <td key={j} className="px-2 py-2">
                                  {typeof value === "object" ? JSON.stringify(value) : String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No results found</p>
                  )}
                </div>
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>

      <CardFooter className="pt-0">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Ask a question about your data..."
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
