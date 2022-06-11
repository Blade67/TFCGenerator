import { program } from "commander";

import generateChest from "./generators/chest.js";

program
    .option("-d, --debug", "Enable debug mode")
    .option("--chest")
    .option("--largechest")
    .option("--trappedchest")
    .requiredOption("-t, --type <string...>", "The type of wood to be used as the material.");
program.parse();

const options = program.opts();

if (options.debug) console.log(options);
if (options.chest) {
    for (const type of [...options.type]) {
        await generateChest(type);
    }
} else {
    throw new Error("Generator not implemented.");
}
