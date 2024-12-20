import { ProviderV1 } from "@ai-sdk/provider";
import { generateText, LanguageModelV1 } from "ai";
import { config } from "../config.ts";

export interface ICompletionService {
  getShellCommand(request: string): Promise<string>;
}

export abstract class CompletionService implements ICompletionService {
  protected abstract get model(): LanguageModelV1;

  protected get promptTemplate(): string {
    return config.promptTemplate;
  }

  protected get maxTokens(): number {
    return 100;
  }

  protected get temperature(): number {
    return 0.1;
  }

  protected async genText(request: string): Promise<string> {
    const { text } = await generateText({
      model: this.model,
      prompt: this.promptTemplate.replaceAll("{{request}}", request),
      maxTokens: this.maxTokens,
      temperature: this.temperature,
    });
    return text;
  }

  getShellCommand(request: string): Promise<string> {
    return this.genText(request);
  }
}

export abstract class ProviderCompletionService<
  ModelId extends string = string
> extends CompletionService {
  readonly provider: ProviderV1;
  readonly model: LanguageModelV1;
  constructor(opts: { modelId: ModelId }) {
    super();
    this.provider = this.createProvider();
    this.model = this.provider.languageModel(opts.modelId);
  }

  abstract createProvider(): ProviderV1;
}
