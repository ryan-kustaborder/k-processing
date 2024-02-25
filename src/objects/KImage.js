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

        this.channels = pixels[0][0].data.length;
    }

    /**
     * Deep copy method
     * @returns {KImage} Copy of image
     */
    clone() {
        let fresh = [];

        for (let i = 0; i < this.width; i++) {
            let row = [];

            for (let j = 0; j < this.height; j++) {
                let src = this.pixels[i][j];

                let p = [];

                for (let c = 0; c < this.channels; c++) {
                    p.push(src.get(c));
                }

                row.push(new KPixel(p));
            }
            fresh.push(row);
        }

        return new KImage(fresh);
    }

    /**
     * Convolves the image with the given kernel
     * @param {float[][]} kernel kernel
     * @returns {KImage} Convolved image
     */
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
                let sums = Array(this.channels).fill(0);

                for (let i = -radius; i <= radius; i++) {
                    for (let j = -radius; j <= radius; j++) {
                        let k = kernel[i + radius][j + radius];

                        let pixel = padded[x + i][y + j];

                        if (this.channels == 4) {
                            sums[0] = pixel.get(0) * k;
                            sums[1] = pixel.get(1) * k;
                            sums[2] = pixel.get(2) * k;
                            sums[3] = pixel.get(3) * k;
                        } else {
                            sums[0] = pixel.get(0) * k;
                        }
                    }
                }

                for (let c = 0; c < this.channels; c++) {
                    sums[c] = parseInt(sums[c]);
                }

                row.push(new KPixel(sums));
            }
            result.push(row);
        }

        copy.pixels = result;

        return copy;
    }
}

export default KImage;
