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

    // Pad the image so we don't have to check indeces
    let padded = util.PadImage(kimg.pixels, radius);

    // Convolve
    for (let x = radius; x < kimg.width + radius - 1; x++) {
        for (let y = radius; y < kimg.height + radius - 1; y++) {
            let rsum = 0;
            let gsum = 0;
            let bsum = 0;
            let asum = 0;

            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    let k = kernel[i + radius][j + radius];

                    let pixel = padded[x + i][y + j];
                    rsum += pixel.r * k;
                    gsum += pixel.g * k;
                    bsum += pixel.b * k;
                    asum += pixel.a * k;
                }
            }

            padded[x - radius][y].r = parseInt(rsum);
            padded[x - radius][y].g = parseInt(gsum);
            padded[x - radius][y].b = parseInt(bsum);
            padded[x - radius][y].a = parseInt(asum);
        }
    }

    // TODO: Replace with returning separate object
    kimg.pixels = padded;
}

const blur = { GaussianBlur: GaussianBlur };
export default blur;
