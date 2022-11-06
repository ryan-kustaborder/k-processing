/**
 * @namespace util
 */

/**
 * Converts Pixel object into hexadeximal integer format
 * @memberof util
 * @param {Pixel[]} pixel
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

const util = { RGBA_to_HEX: RGBA_to_HEX };

export default util;
