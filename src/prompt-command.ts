// @ts-types="npm:@types/terminal-kit"
import t from "terminal-kit";
const { terminal: term } = t;

export function promptCommand(originalCommand: string): Promise<string> {
  term("Command to run <enter to confirm>: ");
  return new Promise((resolve) => {
    term.inputField(
      { default: originalCommand },
      function (error: any, input?: string) {
        term.getCursorLocation((error, x, y) => {
          if (x != null) {
            term.move(-x, -2);
            term.deleteLine(3);
            term.bgBlack.green(input || originalCommand);
          }
          term.grabInput(false);
          resolve(input || originalCommand);
        });
      }
    );
  });
}
