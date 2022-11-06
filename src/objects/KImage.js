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
}

export default KImage;
