import pkg from "./deno.json" with { type: "json" };
const version = pkg.version;
const name = pkg.name;
const target = "x86_64-unknown-linux-gnu";
const dist = `${name}-${version}-${target}`;

new Deno.Command("deno", {
  args: `compile --allow-read --allow-run --allow-net --allow-env --target ${target} -o dist/${dist} src/index.ts`.split(
    /\s+/
  ),
}).outputSync();

new Deno.Command("bzip2", {
  args: [dist],
  cwd: "dist",
}).outputSync();

const md5sum = new Deno.Command("md5sum", {
  args: [`${dist}.bz2`],
  cwd: "dist",
}).outputSync().stdout;
Deno.writeFileSync(`dist/${dist}.md5sum.txt`, md5sum);
