import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = sanityClient({
  projectId: "3yi22w70",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
