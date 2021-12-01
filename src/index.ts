import { run } from "./day1";

async function main() {
  try {
    await run();
  } catch (e) {
    console.error("FAILED");
    console.error(e);
    process.exit(1);
  }
}

main();
