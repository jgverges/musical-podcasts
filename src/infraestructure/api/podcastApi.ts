import { PodcastDetailOrEpisode } from "./types/PodcastDetailsResponse";
import { PodcastListResponse } from "./types/PodcastListResponse";

export const PODCAST_LIST_URL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
export const PODCAST_DETAIL_BASE_URL = `https://itunes.apple.com/lookup?imedia=podcast&entity=podcastEpisode`;
export const ALLORIGIN_URL = "https://api.allorigins.win/get?url=";

export const podcastApi = {
  getPodcasts: async (): Promise<PodcastListResponse> => {
    const res = await fetch(PODCAST_LIST_URL);

    if (!res.ok) throw new Error("Error fetching Podtcsts");
    const data: PodcastListResponse = await res.json();
    return data;
  },

  getPodcastDetail: async (
    podcastId: string,
    podcastCount: number = 2
  ): Promise<PodcastDetailOrEpisode[]> => {
    const PROXY_URL =
      ALLORIGIN_URL +
      encodeURIComponent(
        `${PODCAST_DETAIL_BASE_URL}&id=${podcastId}&limit=${podcastCount}`
      );

    const res = await fetch(PROXY_URL);

    if (!res.ok) throw new Error("Error fetching podcast details");

    const data = await res.json();
    const { results }: { results: PodcastDetailOrEpisode[] } = await JSON.parse(
      data.contents
    );
    return results;
  },
};
