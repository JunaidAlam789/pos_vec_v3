"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle } from "lucide-react"
import { explainQuery } from "@/lib/actions/chatbot-actions"
import { Skeleton } from "@/components/ui/skeleton"

interface QueryResultsProps {
  sqlQuery: string
  results: any[]
}

export function QueryResults({ sqlQuery, results }: QueryResultsProps) {
  const [explanation, setExplanation] = useState<string | null>(null)
  const [isExplaining, setIsExplaining] = useState(false)

  // Get column names from the first result
  const columns = results.length > 0 ? Object.keys(results[0]) : []

  const handleExplainQuery = async () => {
    setIsExplaining(true)
    try {
      const response = await explainQuery(sqlQuery)
      if (response.success) {
        setExplanation(response.explanation)
      } else {
        setExplanation(`Error explaining query: ${response.error}`)
      }
    } catch (error) {
      setExplanation("Failed to explain the query. Please try again.")
    } finally {
      setIsExplaining(false)
    }
  }

  return (
    <Card className="w-full mt-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Query Results</CardTitle>
        <Button variant="outline" size="sm" className="h-8 gap-1" onClick={handleExplainQuery} disabled={isExplaining}>
          <HelpCircle className="h-4 w-4" />
          Explain Query
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="results">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="results">Results ({results.length})</TabsTrigger>
            <TabsTrigger value="query">SQL Query</TabsTrigger>
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
          </TabsList>
          <TabsContent value="results" className="p-4">
            {results.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead key={column}>{column}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((column) => (
                          <TableCell key={`${rowIndex}-${column}`}>
                            {typeof row[column] === "object" ? JSON.stringify(row[column]) : String(row[column] ?? "")}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">No results found</p>
            )}
          </TabsContent>
          <TabsContent value="query" className="p-4">
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>{sqlQuery}</code>
            </pre>
          </TabsContent>
          <TabsContent value="explanation" className="p-4">
            {isExplaining ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ) : explanation ? (
              <div className="prose prose-sm max-w-none">{explanation}</div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">
                Click "Explain Query" to see an explanation of the SQL query
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
