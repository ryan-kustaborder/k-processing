import KImage from "./data.js";
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

function RGBA_to_HEX(pixel) {
    let r = pixel.r.toString(16);
    let g = pixel.g.toString(16);
    let b = pixel.b.toString(16);
    let a = pixel.a.toString(16);

    if (r.length < 2) {
        r = "0" + r;
    }
    if (g.length < 2) {
        g = "0" + g;
    }
    if (b.length < 2) {
        b = "0" + b;
    }
    if (a.length < 2) {
        a = "0" + a;
    }

    return parseInt("0x" + r + g + b + a, 16);
}

async function writePNG(kimg, path) {
    let data = kimg.pixels;

    let hexData = [];

    for (let i = 0; i < kimg.width; i++) {
        let row = [];

        for (let j = 0; j < kimg.height; j++) {
            row.push(RGBA_to_HEX(data[i][j]));
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

const KProcessing = {
    readImage: readImage,
    writePNG: writePNG,
};

export default KProcessing;
