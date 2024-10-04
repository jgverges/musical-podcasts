import { Image } from "./PodcastListResponse";

export interface PodcastFiltered {
  title: string;
  podcastId: string | number;
  artist: string;
  imageList: Image[];
  summary: string;
}
