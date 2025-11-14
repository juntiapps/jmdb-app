// utils/fetchValidImages.ts
import { Images } from "../types/Movie";
import { checkImageExists } from "./checkImageExists";

export async function fetchValidImages(images: Images[], limit = 7) {
  const valid: Images[] = [];

  for (const img of images) {
    if (valid.length >= limit) break;
    const url = img?.url;
    if (!url) continue;

    const ok = await checkImageExists(url);
    if (ok) valid.push(img);
  }

  return valid;
}
