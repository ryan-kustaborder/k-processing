import KPixel from "./KPixel.js";
import util from "../util.js";

/**
 * Data container for images
 * @class
 */
class KImage {
    /**
     * Create a KImage
     * @param {Pixel[][]} Image pixel data
     */
    constructor(pixels) {
        this.pixels = pixels;
        this.width = pixels.length;
        this.height = pixels[0].length;
    }

    clone() {
        let fresh = [];

        for (let i = 0; i < this.width; i++) {
            let row = [];

            for (let j = 0; j < this.height; j++) {
                let src = this.pixels[i][j];
                row.push(new KPixel(src.r, src.g, src.b, src.a));
            }
            fresh.push(row);
        }

        return new KImage(fresh);
    }

    convolve(kernel) {
        let copy = this.clone();
        let radius = (kernel.length - 1) / 2;

        // Pad the image to prevent index errors
        let padded = util.PadImage(this.pixels, radius);

        // Convolve
        let result = [];

        for (let x = radius; x < copy.width + radius; x++) {
            let row = [];

            for (let y = radius; y < copy.height + radius; y++) {
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

                row.push(
                    new KPixel(
                        parseInt(rsum),
                        parseInt(gsum),
                        parseInt(bsum),
                        parseInt(asum)
                    )
                );
            }
            result.push(row);
        }

        copy.pixels = result;

        return copy;
    }
}

export default KImage;
