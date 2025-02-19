import { Episode, Podcast } from "../../domain";
import {
  EpisodeAPI,
  PodcastDetailOrEpisode,
} from "../api/types/PodcastDetailsResponse";
import { PodcastListResponse } from "../api/types/PodcastListResponse";

export const transformToEpisode = (
  results: PodcastDetailOrEpisode[]
): Episode[] => {
  const episodesAPI = results.filter(
    (item): item is EpisodeAPI => "episodeUrl" in item
  );

  return episodesAPI.map((episodeAPI) => ({
    id: String(episodeAPI.trackId),
    title: episodeAPI.trackName,
    description: episodeAPI.description,
    releaseDate: episodeAPI.releaseDate,
    duration: episodeAPI.trackTimeMillis,
    episodeUrl: episodeAPI.episodeUrl,
  }));
};

export function transformApiResponseToPodcasts(
  data: PodcastListResponse
): Podcast[] {
  const podcasts: Podcast[] = [];

  if (data?.feed?.entry && Array.isArray(data.feed.entry)) {
    data.feed.entry.forEach((entry) => {
      const { label: title } = entry["im:name"] || {};
      const podcastId = entry.id.attributes?.["im:id"];
      const summary = entry["summary"] ? entry["summary"].label : "";
      const { label: artist } = entry["im:artist"] || {};
      const imageList = entry["im:image"] || [];

      if (title && podcastId && artist && summary && imageList) {
        const podcastFiltered: Podcast = {
          title,
          podcastId,
          artist,
          imageList,
          summary,
        };
        podcasts.push(podcastFiltered);
      }
    });
  }
  if (!podcasts || podcasts.length === 0)
    console.log("Error filtering the data");

  return podcasts;
}
