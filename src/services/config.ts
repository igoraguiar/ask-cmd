import process from "node:process";
import { SHELL_COMMAND_PROMPT } from "./completion/constants.ts";
import { args } from "../args.ts";

const provider = args.provider || process.env.ASKCMD_PROVIDER;
const baseUrl = args.baseUrl || process.env.ASKCMD_BASE_URL;
const apiKey = args.apiKey || process.env.ASKCMD_API_KEY;
const modelId = args.modelId || process.env.ASKCMD_MODEL_ID;
const promptTemplate =
  args.promptTemplate ||
  process.env.ASKCMD_PROMPT_TEMPLATE ||
  SHELL_COMMAND_PROMPT;
const request = args.remaining;

export const config = {
  provider,
  apiKey,
  modelId,
  request,
  promptTemplate,
  baseUrl,
};
