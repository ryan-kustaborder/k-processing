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

/**
 * Calculates value of 2D Gaussian equation at a given point
 * @memberof util
 *
 * @param {int} x x position
 * @param {int} y y position
 * @param {float} sigma standard deviation
 *
 * @returns {float} Gaussian value
 */
function Gaussian2D(x, y, sigma) {
    // Calculate exponential
    let num = x * x + y * y;
    let den = 2 * sigma * sigma;
    let exp = Math.E ** (-1 * (num / den));

    // Calculate Multiplier
    let mult = 1 / (2 * Math.PI * sigma * sigma);

    return exp * mult;
}

/**
 * Pads the given pixels with n amount of pixels
 * @memberof util
 *
 * @param {KPixel[][]} pixels
 * @param {int} n
 *
 * @returns {KPixel[][]} padded pixels
 */
function PadImage(array, n = 1) {
    if (n == 0) {
        return array;
    }

    const top = array[0];
    const bot = array[array.length - 1];

    array.push(top);
    array.unshift(bot);

    array = array.map((a) => {
        a = [a[0], ...a, a[a.length - 1]];
        return a;
    });

    return PadImage(array, n - 1);
}

function addPadding(array, fill) {}

const util = {
    RGBA_to_HEX: RGBA_to_HEX,
    Gaussian2D: Gaussian2D,
    PadImage: PadImage,
};

export default util;
