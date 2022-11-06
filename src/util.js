import KPixel from "./objects/KPixel.js";

/**
 * @namespace util
 */

/**
 * Converts Pixel object into hexadeximal integer format
 * @memberof util
 * @param {KPixel} pixel KPixel to be encoded
 *
 * @returns {int} Hexidecimal Integer
 */
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

function Gaussian2D(x, y, sigma) {
    // Calculate exponential
    let num = x * x + y * y;
    let den = 2 * sigma * sigma;
    let exp = Math.E ** (-1 * (num / den));

    // Calculate Multiplier
    let mult = 1 / (2 * Math.PI * sigma * sigma);

    return exp * mult;
}

function PadImage(pixels, n = 1) {
    for (let i = 0; i < n; i++) {
        let blank = new KPixel(0, 0, 0, 255);
        let horizontal = Array(pixels.length + 2).fill(blank);

        // Add padding to top
        pixels.unshift(horizontal);

        // Add Padding to sides
        pixels.forEach((row) => {
            row.unshift(blank);
            row.push(blank);
        });

        // Add Paddinf to bottom
        pixels.push(horizontal);
    }

    return pixels;
}

const util = {
    RGBA_to_HEX: RGBA_to_HEX,
    Gaussian2D: Gaussian2D,
    PadImage: PadImage,
};

export default util;
