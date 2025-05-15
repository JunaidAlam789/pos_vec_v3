"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Database, RefreshCw, AlertCircle } from "lucide-react"
import { generateAllEmbeddings } from "@/lib/actions/embedding-actions"
import { Progress } from "@/components/ui/progress"

export default function ManageEmbeddingsPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateEmbeddings = async () => {
    try {
      setIsGenerating(true)
      setError(null)
      setResult(null)

      const result = await generateAllEmbeddings()

      if (!result.success) {
        setError(result.error || "Failed to generate embeddings")
        return
      }

      setResult(result)
    } catch (err) {
      console.error("Error generating embeddings:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

  const totalProcessed = result ? result.productsProcessed + result.categoriesProcessed + result.ordersProcessed : 0

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Manage Semantic Search Embeddings</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Embeddings</CardTitle>
          <CardDescription>
            Generate vector embeddings for all store data to enable semantic search capabilities. This process may take
            some time depending on the amount of data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will generate embeddings for all products, categories, and orders in the system. Existing embeddings
            will be updated with the latest data.
          </p>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && result.success && (
            <div className="space-y-4">
              <Alert className="mb-4">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Successfully generated embeddings for your store data.</AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Products processed:</span>
                  <span className="font-medium">{result.productsProcessed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Categories processed:</span>
                  <span className="font-medium">{result.categoriesProcessed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Orders processed:</span>
                  <span className="font-medium">{result.ordersProcessed}</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2">
                  <span>Total items processed:</span>
                  <span>{totalProcessed}</span>
                </div>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Generating embeddings...</span>
              </div>
              <Progress value={45} className="h-2" />
              <p className="text-xs text-muted-foreground">
                This may take several minutes. Please do not close this page.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateEmbeddings} disabled={isGenerating} className="w-full sm:w-auto">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Generate Embeddings
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Semantic Search</CardTitle>
          <CardDescription>Understanding how semantic search works in your POS system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What is Semantic Search?</h3>
            <p className="text-sm text-muted-foreground">
              Semantic search uses AI to understand the meaning behind search queries rather than just matching
              keywords. It enables more natural and intuitive searching of your store data.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">How it Works</h3>
            <p className="text-sm text-muted-foreground">
              1. Store data is converted into vector embeddings using AI models
              <br />
              2. When a search query is made, it's also converted to a vector
              <br />
              3. The system finds store data with vectors most similar to the query
              <br />
              4. Results are ranked by similarity and returned to the user
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Benefits</h3>
            <p className="text-sm text-muted-foreground">
              - More intuitive search experience
              <br />- Find relevant results even with different wording
              <br />- Improved discovery of related items
              <br />- Natural language understanding for chatbot interactions
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
