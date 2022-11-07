import KImage from "./objects/KImage.js";
import KPixel from "./objects/KPixel.js";
import util from "./util.js";

/**
 * @namespace blur
 */

/**
 * Applies a 2D Gaussian Blur of specified radius
 * @memberof blur
 *
 * @param {KImage} kimg Source Image
 * @param {int} radius Kernel Radius
 */
function GaussianBlur(kimg, radius) {
    let copy = kimg.clone();

    let kernelWidth = radius * 2 + 1;

    let sigma = Math.max(radius / 2, 1);

    // Generate the kernel
    let kernel = Array(kernelWidth)
        .fill()
        .map(() => Array(kernelWidth));

    let sum = 0;

    for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            let gauss = util.Gaussian2D(x, y, sigma);
            kernel[x + radius][y + radius] = gauss;
            sum += gauss;
        }
    }

    // Normalize Kernel
    for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            kernel[x + radius][y + radius] /= sum;
        }
    }

    return copy.convolve(kernel);
}

function grayscaleAverage(kimg) {
    let copy = kimg.clone();

    for (let i = 0; i < kimg.width; i++) {
        for (let j = 0; j < kimg.height; j++) {
            let p = kimg.pixels[i][j];

            let val = parseInt((p.get(0) + p.get(1) + p.get(2)) / 3);

            copy.pixels[i][j] = new KPixel([val]);
        }
    }

    return copy;
}

const blur = { GaussianBlur: GaussianBlur, grayscaleAverage: grayscaleAverage };
export default blur;
