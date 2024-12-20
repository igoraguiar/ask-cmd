import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";
import process from "node:process";
import { getCompletionService } from "./services/completion-factory.ts";
import { promptCommand } from "./prompt-command.ts";
import { initTerm } from "./term.ts";
import { config } from "./services/config.ts";

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
