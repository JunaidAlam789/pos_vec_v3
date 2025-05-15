import { google } from "@ai-sdk/google"

// Configure the default model to use
export const defaultModel = google("gemini-2.0-flash")

// You can add more models here if needed
export const models = {
  gemini: google("gemini-2.0-flash"),
  geminiPro: google("gemini-1.5-pro"),
}
