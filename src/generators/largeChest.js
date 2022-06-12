import jimp from "jimp";
import chalk from "chalk";
import fs from "fs";

/**
 * @param {String} type - The type of wood to be used as the material.
 * @param {Boolean} trapped - Whether or not the chest is trapped.
 */
async function generateLargeChest(type, trapped = false) {
    if (!fs.existsSync(`./input/sheet/${type}.png`) || !fs.existsSync(`./input/log/${type}.png`))
        return console.error(chalk.red("❌"), "Textures(s) for type", chalk.blue(type), "not found.");

    const plank = await jimp.read(`./input/sheet/${type}.png`);
    const bark = await jimp.read(`./input/log/${type}.png`);

    const chestLeftNegative = await jimp.read("./templates/chest_large_left_negative.png");
    const chestLeftPositive = await jimp.read("./templates/chest_large_left_positive.png");
    const chestLeftOverlay = await jimp.read("./templates/chest_large_left_overlay.png");
    const chestRightNegative = await jimp.read("./templates/chest_large_right_negative.png");
    const chestRightPositive = await jimp.read("./templates/chest_large_right_positive.png");
    const chestRightOverlay = await jimp.read("./templates/chest_large_right_overlay.png");

    const largeLeftBark = await new jimp(64, 64);
    const largeLeftPlank = await new jimp(64, 64);
    const largeRightBark = await new jimp(64, 64);
    const largeRightPlank = await new jimp(64, 64);
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            largeLeftBark.blit(bark, x * 16, y * 16);
            largeLeftPlank.blit(plank, x * 16, y * 16);
            largeRightBark.blit(bark, x * 16, y * 16);
            largeRightPlank.blit(plank, x * 16, y * 16);
        }
    }

    const chestLeftBorder = await new jimp(64, 64);
    chestLeftBorder.blit(largeLeftBark, 0, 0);
    chestLeftBorder.mask(chestLeftNegative);
    const chestRightBorder = await new jimp(64, 64);
    chestRightBorder.blit(largeRightBark, 0, 0);
    chestRightBorder.mask(chestRightNegative);

    const chestLeftInner = await new jimp(64, 64);
    chestLeftInner.blit(largeLeftPlank, 0, 0);
    chestLeftInner.mask(chestLeftPositive);
    const chestRightInner = await new jimp(64, 64);
    chestRightInner.blit(largeRightPlank, 0, 0);
    chestRightInner.mask(chestRightPositive);

    const chestLeft = await new jimp(64, 64);
    chestLeft.blit(chestLeftBorder, 0, 0);
    chestLeft.blit(chestLeftInner, 0, 0);
    chestLeft.blit(chestLeftOverlay, 0, 0);

    const chestRight = await new jimp(64, 64);
    chestRight.blit(chestRightBorder, 0, 0);
    chestRight.blit(chestRightInner, 0, 0);
    chestRight.blit(chestRightOverlay, 0, 0);

    if (trapped) {
        const chestLeftTrappedOverlay = await jimp.read("./templates/chest_large_left_trapped_overlay.png");
        const chestRightTrappedOverlay = await jimp.read("./templates/chest_large_right_trapped_overlay.png");
        chestLeft.blit(chestLeftTrappedOverlay, 0, 0);
        chestRight.blit(chestRightTrappedOverlay, 0, 0);
    }

    chestLeft.write(
        `./output/chest/large${trapped ? "_trapped" : ""}/large_chest_left_${trapped ? "trapped_" : ""}${type}.png`
    );
    chestRight.write(
        `./output/chest/large${trapped ? "_trapped" : ""}/large_chest_right_${trapped ? "trapped_" : ""}${type}.png`
    );

    console.log(
        chalk.green("✔"),
        "Generated",
        chalk.yellow(`large ${trapped ? "trapped " : ""}chest`),
        "for type",
        chalk.blue(type)
    );
}

export default generateLargeChest;
