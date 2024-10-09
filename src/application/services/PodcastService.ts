import { Episode, Podcast } from "../../domain";
import { IPodcastRepository } from "../../domain/interfaces/IPodcastRepository";

export class PodcastService {
  constructor(private repository: IPodcastRepository) {}

  async getPodcasts(): Promise<Podcast[]> {
    return this.repository.getPodcasts();
  }

  async getPodcastDetail(
    id: string,
    podcastCount?: number
  ): Promise<Episode[]> {
    return this.repository.getPodcastDetail(id, podcastCount);
  }
}
