import util from "./util.js";

/**
 * @namespace blur
 */

function GaussianBlur(kimg) {
    let radius = 16;
    let kernelWidth = radius * 2 + 1;

    let sigma = Math.max(radius / 2, 1);

    let kernel = Array(kernelWidth)
        .fill()
        .map(() => Array(kernelWidth));

    for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            kernel[x + radius][y + radius] = util.Gaussian2D(x, y, sigma);
        }
    }

    // TODO: copy image when deep copy implemented
    let padded = util.PadImage(kimg.pixels, radius);

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

    kimg.pixels = padded;
}

const blur = { GaussianBlur: GaussianBlur };
export default blur;
