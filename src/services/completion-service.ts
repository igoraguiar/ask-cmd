import { generateText, LanguageModelV1 } from "ai";
import { SHELL_COMMAND_PROMPT } from "./constants.ts";
import { ProviderV1 } from "@ai-sdk/provider";

export abstract class CompletionService {
  protected abstract get model(): LanguageModelV1;

  protected get promptTemplate(): string {
    return SHELL_COMMAND_PROMPT;
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
      prompt: SHELL_COMMAND_PROMPT.replaceAll("{{request}}", request),
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
