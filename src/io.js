import KImage from "./objects/KImage.js";
import KPixel from "./objects/KPixel.js";
import util from "./util.js";

import pixels from "image-pixels";
import Jimp from "jimp";

/**
 * @namespace io
 */

/**
 * Reads in a given image and returns a KImage object
 * @async
 * @memberof io
 *
 * @param {string} path Relataive path to image
 *
 * @returns {KImage} New Image Object
 */
async function readImage(path) {
    var { data, width, height } = await pixels(path);

    let image = [];
    let x = 0;
    let row = [];

    for (let i = 0; i < data.length; i += 4) {
        row.push(new KPixel([data[i], data[i + 1], data[i + 2], data[i + 3]]));

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
 * @async
 * @memberof io
 *
 * @param {KImage} KImage Object
 * @param {string} path
 */
async function writePNG(kimg, path) {
    let data = kimg.pixels;
    let channels = kimg.pixels[0][0].data.length;

    let hexData = [];

    for (let i = 0; i < kimg.width; i++) {
        let row = [];

        for (let j = 0; j < kimg.height; j++) {
            if (channels == 4) row.push(util.RGBA_to_HEX(data[i][j]));
            else if (channels == 1) row.push(util.A_to_HEX(data[i][j]));
        }

        hexData.push(row);
    }

    let outputImage = new Jimp(kimg.height, kimg.width, function (err, image) {
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
