import { config } from "../config.ts";
import { ICompletionService } from "./completion-service.ts";
import { OpenAI, ClientOptions } from "openai";

export class OpenAILikeCompletionService implements ICompletionService {
  public readonly openai: OpenAI;
  constructor(
    public readonly opts: ClientOptions & { modelId: string },
    public readonly promptTemplate = config.promptTemplate
  ) {
    this.openai = new OpenAI(opts);
  }

  getShellCommand(request: string): Promise<string> {
    return this.openai.completions
      .create({
        prompt: this.promptTemplate.replaceAll("{{request}}", request),
        model: this.opts.modelId,
        max_tokens: 100,
        temperature: 0.1,
      })
      .then((res) => res.choices[0].text);
  }
}
