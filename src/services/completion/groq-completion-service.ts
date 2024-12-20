import { createGroq, groq } from "@ai-sdk/groq";
import { ProviderV1 } from "@ai-sdk/provider";
import { ProviderCompletionService } from "./completion-service.ts";
type ModelId = Parameters<typeof groq>[0];
export class GroqCompletionService extends ProviderCompletionService<ModelId> {
  constructor(
    public readonly opts?: {
      modelId?: ModelId;
      apiKey?: string;
    }
  ) {
    super({ modelId: opts?.modelId ?? "llama-3.3-70b-versatile" });
  }

  override createProvider() {
    return (
      this.opts?.apiKey ? createGroq({ apiKey: this.opts?.apiKey }) : groq
    ) as ProviderV1;
  }
}
