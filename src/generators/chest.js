import jimp from "jimp";
import chalk from "chalk";
import fs from "fs";

/**
 * @param {String} type - The type of wood to be used as the material.
 */
async function generateChest(type) {
    if (!fs.existsSync(`./input/sheet/${type}.png`) || !fs.existsSync(`./input/log/${type}.png`))
        return console.error(chalk.red("❌"), "Textures(s) for type", chalk.blue(type), "not found.");

    const plank = await jimp.read(`./input/sheet/${type}.png`);
    await plank.resize(14, 14, jimp.RESIZE_NEAREST_NEIGHBOR);
    const bark = await jimp.read(`./input/log/${type}.png`);

    const chestNegative = await jimp.read("./templates/chest_negative.png");
    const chestPositive = await jimp.read("./templates/chest_positive.png");
    const chestOverlay = await jimp.read("./templates/chest_overlay.png");

    const largeBark = await new jimp(64, 64);
    const largePlank = await new jimp(64, 64);
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            largeBark.blit(bark, x * 16, y * 16);
            largePlank.blit(plank, x * 14, y * 14);
        }
    }

    const chestBorder = await new jimp(64, 64);
    chestBorder.blit(largeBark, 0, 0);
    chestBorder.mask(chestNegative);
    const chestInner = await new jimp(64, 64);
    chestInner.blit(largePlank, 0, 0);
    chestInner.mask(chestPositive);

    const chest = await new jimp(64, 64);
    chest.blit(chestBorder, 0, 0);
    chest.blit(chestInner, 0, 0);
    chest.blit(chestOverlay, 0, 0);
    chest.write(`./output/chest_${type}.png`);

    console.log(chalk.green("✔"), "Generated chest for type", chalk.blue(type));
}

export default generateChest;
