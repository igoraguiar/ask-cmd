import { CompletionService } from "./completion-service.ts";
import { OpenAICompletionService } from "./openai-completion-service.ts";
import { GroqCompletionService } from "./groq-completion-service.ts";

export function getCompletionService(provider?: string): CompletionService {
  const selectedProvider =
    provider?.toLowerCase() ??
    Deno.env.get("AI_PROVIDER")?.toLowerCase() ??
    "openai";

  switch (selectedProvider) {
    case "groq": {
      const apiKey = Deno.env.get("GROQ_API_KEY");
      if (!apiKey) {
        console.error("Please set GROQ_API_KEY environment variable");
        Deno.exit(1);
      }
      return new GroqCompletionService({ apiKey });
    }
    case "openai":
    default: {
      const apiKey = Deno.env.get("OPENAI_API_KEY");
      if (!apiKey) {
        console.error("Please set OPENAI_API_KEY environment variable");
        Deno.exit(1);
      }
      return new OpenAICompletionService({ apiKey });
    }
  }
}
