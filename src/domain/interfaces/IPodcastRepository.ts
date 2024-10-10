import { Episode } from "../entities/Episode";
import { Podcast } from "../entities/Podcast";

export interface IPodcastRepository {
  getPodcasts: () => Promise<Podcast[]>;
  getPodcastDetail: (id: string, podcastCount?: number) => Promise<Episode[]>;
}
