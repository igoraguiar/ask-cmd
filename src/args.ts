import process from "node:process";

function getArg(args: string[], key: string) {
  const index = args.indexOf(`--${key}`);
  if (index !== -1 && index + 1 < args.length) {
    const provider = args[index + 1];
    args.splice(index, 2);
    return provider;
  }
  return undefined;
}

function hasArg(args: string[], key: string) {
  const index = args.indexOf(`--${key}`);
  if (index !== -1) {
    args.splice(index, 1);
    return true;
  }
  return false;
}

export function parseArgs(args: string[] = process.argv.slice(2)) {
  args = [...args];
  const help = hasArg(args, "help");
  const version = hasArg(args, "version");
  const provider = getArg(args, "provider") || process.env.ASKCMD_PROVIDER;
  const baseUrl = getArg(args, "base-url") || process.env.ASKCMD_BASE_URL;
  const apiKey = getArg(args, "api-key") || process.env.ASKCMD_API_KEY;
  const modelId = getArg(args, "model-id") || process.env.ASKCMD_MODEL_ID;
  const promptTemplate = getArg(args, "prompt-template");
  const remaining = args.join(" ");
  return {
    provider,
    apiKey,
    modelId,
    promptTemplate,
    baseUrl,
    help,
    version,
    remaining,
  };
}

export const args = parseArgs();
