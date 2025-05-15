import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export type MessageType = "user" | "bot"

export interface Message {
  id: string
  type: MessageType
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === "user"

  return (
    <div className={cn("flex w-full items-start gap-4 py-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/bot-avatar.png" alt="Bot" />
          <AvatarFallback>Bot</AvatarFallback>
        </Avatar>
      )}
      <Card className={cn("max-w-[80%]", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
        <CardContent className="p-3">
          <p className="text-sm">{message.content}</p>
        </CardContent>
      </Card>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/user-avatar.png" alt="User" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
