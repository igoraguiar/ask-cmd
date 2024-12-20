import process from "node:process";
import { SHELL_COMMAND_PROMPT } from "./completion/constants.ts";

const args = process.argv.slice(2);

function getArg(key: string) {
  const index = args.indexOf(`--${key}`);
  if (index !== -1 && index + 1 < args.length) {
    const provider = args[index + 1];
    args.splice(index, 2);
    return provider;
  }
  return undefined;
}

const provider = getArg("provider") || process.env.ASKCMD_PROVIDER;
const baseUrl = getArg("base-url") || process.env.ASKCMD_BASE_URL;
const apiKey = getArg("api-key") || process.env.ASKCMD_API_KEY;
const modelId = getArg("model-id") || process.env.ASKCMD_MODEL_ID;
const promptTemplate =
  getArg("prompt-template") ||
  process.env.ASKCMD_PROMPT_TEMPLATE ||
  SHELL_COMMAND_PROMPT;
const request = args.join(" ");

export const config = {
  provider,
  apiKey,
  modelId,
  request,
  promptTemplate,
  baseUrl,
};
