import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";
import process from "node:process";
import { getCompletionService } from "./services/completion-factory.ts";
import { promptCommand } from "./prompt-command.ts";
import { initTerm } from "./term.ts";
import { config } from "./services/config.ts";
import { args } from "./args.ts";
import pkg from "../deno.json" with { type: "json" };

function printHelp() {
  const version = getVersion();
  console.log(`ask-cmd v${version}

${colors.bold("NAME")}
  ask-cmd - convert natural language requests into Linux shell commands using AI

${colors.bold("SYNOPSIS")}
  ask-cmd [OPTIONS] <command request>

${colors.bold("DESCRIPTION")}
  A CLI tool that uses AI to convert natural language requests into appropriate shell
  commands. It presents the generated command for review before execution.

${colors.bold("OPTIONS")}
  --provider <provider>    Set the completion provider (openai, groq, openai-like)
  --base-url <url>         Set the base URL for the completion provider
  --api-key <key>          Set the API key for the completion provider
  --model-id <id>          Set the model ID for the completion provider
  --prompt-template <template>  Set the template to use for the prompt
  --help                   Display this help information
  --version                Display version information

${colors.bold("ENVIRONMENT")}
  ASK_CMD_PROVIDER         Alternative to --provider
  ASK_CMD_API_KEY          Alternative to --api-key
  OPENAI_API_KEY           OpenAI-specific API key
  GROQ_API_KEY             Groq-specific API key
  ASK_CMD_MODEL_ID         Alternative to --model-id
  ASK_CMD_BASE_URL         Alternative to --base-url
  ASK_CMD_PROMPT_TEMPLATE  Alternative to --prompt-template

${colors.bold("KEYS")}
  ENTER                  Execute the generated command
  CTRL+C or ESC          Exit without executing`);
}

function getVersion() {
  return pkg.version;
}

if (args.help) {
  printHelp();
  process.exit(0);
}

if (args.version) {
  console.log(`ask-cmd v${getVersion()}`);
  process.exit(0);
}

initTerm();

/**
 *  Execute and the command output in the terminal
 * @param command
 */
async function executeCommand(command: string): Promise<void> {
  try {
    const process = new Deno.Command("sh", {
      args: ["-c", command],
      stdout: "piped",
      stderr: "piped",
    });

    const { stdout, stderr } = await process.output();

    await Deno.stdout.write(stdout);
    await Deno.stderr.write(stderr);
  } catch (error) {
    console.error(colors.red(`Failed to execute command: ${error}`));
    throw error;
  }
}

async function main() {
  const request = config.request;
  if (!request) {
    console.error("Please provide a command request");
    process.exit(1);
  }

  const completionService = getCompletionService();

  try {
    const command = await completionService.getShellCommand(request);
    const editedCommand = await promptCommand(command);
    console.log();
    await executeCommand(editedCommand);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

if (import.meta.main) {
  main();
}
