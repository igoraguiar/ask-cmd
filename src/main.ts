import { getCompletionService } from "./services/completion-factory.ts";
import childProcess from "node:child_process";
import process from "node:process";

const placeCommandInTerminal = (command: string) => {
  process.stdout.on("close", () => {
    console.log("Closed");
  });

  childProcess.exec(`xdotool type '${command}'`);
};

async function main() {
  const args = process.argv.slice(2);
  const providerIndex = args.indexOf("--provider");
  let provider: string | undefined;

  if (providerIndex !== -1 && providerIndex + 1 < args.length) {
    provider = args[providerIndex + 1];
    args.splice(providerIndex, 2);
  }

  const request = args.at(-1);

  if (!request) {
    console.error("Please provide a command request");
    process.exit(1);
  }

  const completionService = getCompletionService(provider);

  try {
    const command = await completionService.getShellCommand(request);
    placeCommandInTerminal(command);
    // await Deno.stdout.write(new TextEncoder().encode(command));
    // process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

if (import.meta.main) {
  main();
}
