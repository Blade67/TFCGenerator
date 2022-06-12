import { program } from "commander";

import generateChest from "./generators/chest.js";
import generateLargeChest from "./generators/largeChest.js";

program
    .option("-d, --debug", "Enable debug mode")
    .option("--chest")
    .option("--chest-large")
    .option("--chest-trapped")
    .option("--chest-large-trapped, --chest-trapped-large")
    .requiredOption("-t, --type <string...>", "The type of wood to be used as the material.");
program.parse();

const options = program.opts();

if (options.debug) console.log(options);
if (options.chest) {
    for (const type of [...options.type]) {
        await generateChest(type);
    }
}
if (options.chestTrapped) {
    for (const type of [...options.type]) {
        await generateChest(type, true);
    }
}
if (options.chestLarge) {
    for (const type of [...options.type]) {
        await generateLargeChest(type);
    }
}
if (options.chestTrappedLarge) {
    for (const type of [...options.type]) {
        await generateLargeChest(type, true);
    }
}
