/**
 * Class for representing pixel data
 */
class KPixel {
    /**
     * Data container for individual pixel data
     * @param {int} R Red value of pixel
     * @param {int} G Green value of pixel
     * @param {int} B Blue value of pixel
     * @param {int} A Alpha value of pixel
     */
    constructor(R, G, B, A) {
        this.r = R;
        this.g = G;
        this.b = B;
        this.a = A;
    }

    clone() {
        return new KPixel(this.r, this.g, this.b, this.a);
    }
}

export default KPixel;
