import { ProviderV1 } from "@ai-sdk/provider";
import {
  CompletionService,
  ProviderCompletionService,
} from "./completion-service.ts";
import { openai, createOpenAI } from "@ai-sdk/openai";

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
