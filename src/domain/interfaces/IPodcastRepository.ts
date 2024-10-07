import { Podcast } from "../entities/Podcast";
import { PodcastDetailOrEpisode } from "../PodcastDetailsResponse";

export interface IPodcastRepository {
  getPodcasts(): Promise<Podcast[]>;
  getPodcastDetail(id: string): Promise<PodcastDetailOrEpisode>;
}
