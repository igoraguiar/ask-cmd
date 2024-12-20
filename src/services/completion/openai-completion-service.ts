import { createOpenAI, openai } from "@ai-sdk/openai";
import { ProviderV1 } from "@ai-sdk/provider";
import { ProviderCompletionService } from "./completion-service.ts";

type ModelId = Parameters<typeof openai>[0];
export class OpenAICompletionService extends ProviderCompletionService<ModelId> {
  constructor(
    public readonly opts?: {
      modelId?: ModelId;
      apiKey?: string;
    }
  ) {
    super({ modelId: opts?.modelId ?? "gpt-4o-mini" });
  }

  override createProvider() {
    return (
      this.opts?.apiKey ? createOpenAI({ apiKey: this.opts?.apiKey }) : openai
    ) as ProviderV1;
  }
}
