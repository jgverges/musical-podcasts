import {
  ALLORIGIN_URL,
  PODCAST_DETAIL_BASE_URL,
} from "./podcastDetailsApiUrls";

export const getPodcastDetail = async (
  podcastId: string,
  podcastCount: number = 2
) => {
  const PROXY_URL =
    ALLORIGIN_URL +
    encodeURIComponent(
      `${PODCAST_DETAIL_BASE_URL}&id=${podcastId}&limit=${podcastCount}`
    );

  const res = await fetch(PROXY_URL);

  if (!res.ok) throw new Error("Error fetching podcast details");

  const data = await res.json();
  const { results } = await JSON.parse(data.contents);
  return results;
};
