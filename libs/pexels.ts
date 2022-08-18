import { createClient } from "pexels";

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: string;
  liked: boolean;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  avg_color: string;
  alt: string;
}

export const pexels = () => {
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  return apiKey ? createClient(apiKey) : null;
};

export const getCurated = async (page: number, perPage: number) => {
  const client = pexels();
  return await client?.photos.curated({ page, per_page: perPage });
};
