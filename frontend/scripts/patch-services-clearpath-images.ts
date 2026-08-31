/* Swaps the images on the two `service` docs (order 7 and 8) for
 * clearpath-ref template assets, replacing the custom-uploaded photos.
 *
 * Run:  SANITY_API_TOKEN=... npx tsx scripts/patch-services-clearpath-images.ts
 */
import { createClient } from "@sanity/client";
import * as fs from "node:fs";
import * as path from "node:path";

const client = createClient({
  projectId: "ih14cr70",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

type ImgRef = { _type: "image"; asset: { _type: "reference"; _ref: string } };

async function uploadImg(rel: string): Promise<ImgRef> {
  const filePath = path.join(PUBLIC_DIR, rel);
  if (!fs.existsSync(filePath)) throw new Error(`Image not found: ${filePath}`);
  const stream = fs.createReadStream(filePath);
  const filename = path.basename(filePath);
  const asset = await client.assets.upload("image", stream, { filename });
  console.log(`  uploaded ${rel} -> ${asset._id}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const patches = [
  {
    id: "service-medical-grade-supplementation",
    imgFile: "clearpath-ref/services/TF67zgMSYINSD7dymhKX4rhrTM.jpg",
    imageAlt: "Dark water lit with gold light, representing careful, considered protocol design",
  },
  {
    id: "service-functional-lifestyle-strategies",
    imgFile: "clearpath-ref/services/Ux4Is85LWxm9dXetoVhxJWLGhLI.jpg",
    imageAlt: "Close, tropical greenery, representing daily lifestyle practice",
  },
];

async function main() {
  for (const p of patches) {
    const image = await uploadImg(p.imgFile);
    await client.patch(p.id).set({ image, imageAlt: p.imageAlt }).commit();
    console.log(`  patched ${p.id}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
