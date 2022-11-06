import KPixel from "./KPixel.js";

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
}

export default KImage;
