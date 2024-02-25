/**
 * Class for representing pixel data
 */
class KPixel {
    constructor(data) {
        this.data = data;
    }

    /**
     * Gets pixel's value for specified channel
     * @param {*} i
     * @returns
     */
    get(i) {
        return this.data[i];
    }
}

export default KPixel;
