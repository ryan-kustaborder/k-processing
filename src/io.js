import KImage from "./objects/KImage.js";
import util from "./util.js";

import pixels from "image-pixels";
import Jimp from "jimp";

/**
 *
 * @param {string} path Relataive path to image
 *
 * @returns {KImage} New Image Object
 */
async function readImage(path) {
    var { data, width, height } = await pixels(
        "./test-lib/horizontal-gradient.png"
    );

    let image = [];
    let x = 0;
    let row = [];

    for (let i = 0; i < data.length; i += 4) {
        row.push({
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
            a: data[i + 3],
        });

        x++;

        if (x == width) {
            image.push(row);
            row = [];
            x = 0;
        }
    }

    let kimg = new KImage(image);

    return kimg;
}

/**
 * Writes a given image as a PNG to specified path
 * @param {KImage} kimg
 * @param {string} path
 */
async function writePNG(kimg, path) {
    let data = kimg.pixels;

    let hexData = [];

    for (let i = 0; i < kimg.width; i++) {
        let row = [];

        for (let j = 0; j < kimg.height; j++) {
            row.push(util.RGBA_to_HEX(data[i][j]));
        }

        hexData.push(row);
    }

    let outputImage = new Jimp(kimg.width, kimg.height, function (err, image) {
        if (err) throw err;

        hexData.forEach((row, y) => {
            row.forEach((color, x) => {
                image.setPixelColor(color, x, y);
            });
        });

        image.write(path, (err) => {
            if (err) throw err;
        });
    });
}

const io = { readImage: readImage, writePNG: writePNG };
export default io;