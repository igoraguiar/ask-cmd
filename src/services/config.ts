import process from "node:process";
import { SHELL_COMMAND_PROMPT } from "./completion/constants.ts";
import { args } from "../args.ts";

const ENV_VAR_PREFIX = "ASK_CMD_";
const ENV_VAR_KEYS = {
  provider: "PROVIDER",
  baseUrl: "BASE_URL",
  apiKey: "API_KEY",
  modelId: "MODEL_ID",
  promptTemplate: "PROMPT_TEMPLATE",
} as const;

function getEnvKey(key: keyof typeof ENV_VAR_KEYS) {
  return `${ENV_VAR_PREFIX}${ENV_VAR_KEYS[key]}`;
}

const getEnvVar = (key: keyof typeof ENV_VAR_KEYS) =>
  process.env[getEnvKey(key)];

const provider = args.provider || getEnvVar("provider");
const baseUrl = args.baseUrl || getEnvVar("baseUrl");
const apiKey = args.apiKey || getEnvVar("apiKey");
const modelId = args.modelId || getEnvVar("modelId");
const promptTemplate =
  args.promptTemplate || getEnvVar("promptTemplate") || SHELL_COMMAND_PROMPT;
const request = args.remaining;

export const config = {
  provider,
  apiKey,
  modelId,
  request,
  promptTemplate,
  baseUrl,
};
