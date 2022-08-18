import { createClient } from "pexels";

export const pexels = () => {
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  return apiKey ? createClient(apiKey) : null;
};

export const getCurated = async (page: number, perPage: number) => {
  const client = pexels();
  return await client?.photos.curated({ page, per_page: perPage });
};
