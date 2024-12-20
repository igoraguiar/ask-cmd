import { Buffer } from "node:buffer";
import t from "terminal-kit";
const { terminal: term } = t;
export function initTerm() {
  term.on(
    "key",
    function (
      name: string,
      matches: string[],
      data: { isCharacter: boolean; code: number | Buffer; codepoint: number }
    ) {
      // console.log("'key' event:", JSON.stringify({ name, matches, data }));
      if (name === "CTRL_C" || name === "ESCAPE") {
        term.processExit(0);
      }
    }
  );
  term.grabInput();
}
export { term };
