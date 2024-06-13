import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = sanityClient({
  projectId: "3yi22w70", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is usually 'production'
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "2021-10-21", // use a UTC date string
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
