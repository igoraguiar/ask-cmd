import {
  CompletionService,
  ICompletionService,
} from "./completion/completion-service.ts";
import { GroqCompletionService } from "./completion/groq-completion-service.ts";
import { OpenAICompletionService } from "./completion/openai-completion-service.ts";
import { OpenAILikeCompletionService } from "./completion/openai-like-completion-service.ts";
import { config } from "./config.ts";

export function getCompletionService(): ICompletionService {
  const selectedProvider = config.provider;
  if (!selectedProvider) {
    console.error("Please provide a provider");
    Deno.exit(1);
  }

  switch (selectedProvider) {
    case "groq": {
      const apiKey = config.apiKey;
      // if (!apiKey) {
      //   console.error("Please set GROQ_API_KEY environment variable");
      //   Deno.exit(1);
      // }
      return new GroqCompletionService({ apiKey, modelId: config.modelId });
    }
    case "openai": {
      const apiKey = config.apiKey;
      // if (!apiKey) {
      //   console.error("Please set OPENAI_API_KEY environment variable");
      //   Deno.exit(1);
      // }
      return new OpenAICompletionService({ apiKey, modelId: config.modelId });
    }
    case "openai-like": {
      if (!config.modelId) {
        console.error("Please set MODEL_ID environment variable");
        Deno.exit(-1);
      }
      if (!config.baseUrl) {
        console.error("Please set BASE_URL environment variable");
        Deno.exit(-1);
      }
      return new OpenAILikeCompletionService(
        {
          modelId: config.modelId,
          baseURL: config.baseUrl,
          apiKey: config.apiKey,
        },
        config.promptTemplate
      );
    }
    default: {
      console.error(`Unknown provider: ${selectedProvider}`);
      Deno.exit(1);
    }
  }
}
