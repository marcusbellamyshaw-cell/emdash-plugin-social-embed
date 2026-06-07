interface CSSObject {
    backgroundImage: string;
    backgroundSize?: string;
}
/**
 * Given a blurhash, returns a data URI of a BMP image. At tiny sizes, this is smaller than a PNG.
 * @param blurhash the blurhash string
 * @param width the width of the generated background image. Keep it tiny. Default is 8 pixels
 * @param height the height of the generated background image. Keep it tiny. Default is 8 pixels
 */
declare function blurhashToDataUri(blurhash: string, width?: number, height?: number): `data:image/bmp;base64,${string}`;
/**
 * Given a blurhash, returns an array of CSS linear-gradient() strings.
 * This is a rough approximation of the blurhash image but as pure CSS.
 * @param blurhash the blurhash string
 * @param columns the number of gradients to generate horizontally. Default is 4
 * @param rows the number of gradients to generate vertically. Default is 3
 */
declare function blurhashToCssGradients(blurhash: string, columns?: number, rows?: number): Array<string>;
/**
 * Given a blurhash, returns an array of CSS linear-gradient() strings.
 * This is a rough approximation of the blurhash image but as pure CSS.
 * @param blurhash the blurhash string
 * @param columns the number of gradients to generate horizontally. Default is 4
 * @param rows the number of gradients to generate vertically. Default is 3
 */
declare function blurhashToCssGradientString(blurhash: string, columns?: number, rows?: number): string;
/**
 * Given a blurhash, returns an object with a CSS background-image property.
 * @param blurhash the blurhash string
 * @param columns the number of gradients to generate horizontally. Default is 4
 * @param rows the number of gradients to generate vertically. Default is 3
 */
declare function blurhashToGradientCssObject(blurhash: string, columns?: number, rows?: number): CSSObject;
/**
 * Given a blurhash, returns an object with CSS background properties to apply to an img.
 * @param blurhash the blurhash string
 * @param width the width of the generated background image. Default is 8 pixels
 * @param height the height of the generated background image. Default is 8 pixels
 */
declare function blurhashToImageCssObject(blurhash: string, width?: number, height?: number): CSSObject;
/**
 * Given a blurhash, returns a CSS string for a background to apply to an img element.
 * @param blurhash the blurhash string
 * @param width the width of the generated background image. Default is 8 pixels
 * @param height the height of the generated background image. Default is 8 pixels
 */
declare function blurhashToImageCssString(blurhash: string, width?: number, height?: number): string;

/**
 * Converts raw RGBA pixels to a data URI
 */
declare function rgbaPixelsToBmp(pixels: Uint8ClampedArray, width: number, height: number): Uint8Array;
declare function imageDataToDataURI<T extends string>(data: Uint8Array, mimeType: T): `data:${T};base64,${string}`;
/**
 * Converts raw RGBA pixels to an array of CSS gradients
 */
declare function pixelsToCssGradients(pixels: Uint8ClampedArray, columns: number, rows: number): Array<string>;

type Colour = [red: number, green: number, blue: number];
type Color = Colour;
type Cluster = {
    centroid: Colour;
    cluster: Colour[];
};
/**
 * Gets a palette of colors from an image using k-means clustering,
 * sorted in descending order by dominance.
 *
 * @param pixels The RGBA pixel data of the image.
 * @param clusterCount The number of colors to return. Defaults to 8.
 * @returns An array of colors as RGB tuples.
 */
declare function getPalette(pixels: Uint8ClampedArray, clusterCount?: number): Colour[];
/**
 * Gets the dominant color in an image. Returns an RGB tuple, e.g. [255, 0, 0] for red.
 * @param pixels The RGBA pixel data of the image.
 * @returns The dominant color as an RGB tuple.
 */
declare function getDominantColor(pixels: Uint8ClampedArray): Colour;
/**
 * Performs k-means clustering on an array of pixel data to create a palette of the most common colors.
 *
 * @param data - The RGBA pixel data to cluster.
 * @param clusterCount - The number of clusters (i.e., colors) to generate.
 * @param sampleSize - The number of pixels to randomly sample from the data. Higher numbers take a long time.
 * @param maxIterations - The maximum number of iterations to perform.
 * @returns An array of the final clusters, sorted by size in descending order.
 */
declare function kMeansClusters(pixels: Uint8ClampedArray, clusterCount: number, sampleSize: number, maxIterations: number): Array<Cluster>;
/**
 * Given a color as an RGB tuple, returns a CSS string e.g. `rgb(255, 0, 0)`
 * @param color
 * @returns string
 */
declare function rgbColorToCssString([red, green, blue]: Colour): string;

export { CSSObject, Cluster, Color, Colour, blurhashToCssGradientString, blurhashToCssGradients, blurhashToDataUri, blurhashToGradientCssObject, blurhashToImageCssObject, blurhashToImageCssString, getDominantColor, getPalette, imageDataToDataURI, kMeansClusters, pixelsToCssGradients, rgbColorToCssString, rgbaPixelsToBmp };
