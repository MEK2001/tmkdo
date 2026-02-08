import createImageUrlBuilder from '@sanity/image-url';
import { client } from './sanity.client';

const builder = createImageUrlBuilder(client);

/**
 * Generate optimized image URLs from Sanity image sources
 * @param source - Sanity image source object
 * @returns Image URL builder
 */
export const urlFor = (source: any) => {
  return builder.image(source);
};
