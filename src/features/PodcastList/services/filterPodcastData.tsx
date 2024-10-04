import { PodcastFiltered } from "../models/PodcastFiltered";
import { PodcastListResponse } from "../models/PodcastListResponse";

export function filterPodcastData(
  data: PodcastListResponse
): PodcastFiltered[] {
  const podcasts: PodcastFiltered[] = [];

  if (data?.feed?.entry && Array.isArray(data.feed.entry)) {
    data.feed.entry.forEach((entry) => {
      const { label: title } = entry["im:name"] || {};
      const podcastId = entry.id.attributes?.["im:id"];
      const summary = entry["summary"] ? entry["summary"].label : "";
      const { label: artist } = entry["im:artist"] || {};
      const imageList = entry["im:image"] || [];

      if (title && podcastId && artist && summary && imageList) {
        const PodcastFiltered: PodcastFiltered = {
          title,
          podcastId,
          artist,
          imageList,
          summary,
        };
        podcasts.push(PodcastFiltered);
      }
    });
  }
  if (!podcasts || podcasts.length === 0)
    console.log("Error filtering the data");

  return podcasts;
}
