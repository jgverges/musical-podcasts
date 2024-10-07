import { Podcast } from "./entities/Podcast";
import { IPodcastRepository } from "./interfaces/IPodcastRepository";

export class GetPodcastList {
  constructor(private readonly podcastRepository: IPodcastRepository) {}

  async execute(): Promise<Podcast[]> {
    return this.podcastRepository.getPodcasts();
  }
}
