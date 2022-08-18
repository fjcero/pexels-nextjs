export const getCurated = async (page: number, perPage: number) =>
  await fetch(
    `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`
  ).then((result) => result.json());
