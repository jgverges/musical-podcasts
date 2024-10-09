import { Episode, Podcast } from "../../domain";
import { IPodcastRepository } from "../../domain/interfaces/IPodcastRepository";
// import { transformApiResponseToPodcasts } from "../../features/PodcastList/services/filterPodcastData";
import { podcastApi } from "../api/podcastApi";
import {
  transformApiResponseToPodcasts,
  transformToEpisode,
} from "../mappers/podcastMapper";

export class PodcastRepository implements IPodcastRepository {
  async getPodcasts(): Promise<Podcast[]> {
    const response = await podcastApi.getPodcasts();

    return transformApiResponseToPodcasts(response);
  }

  async getPodcastDetail(
    id: string,
    podcastCount?: number
  ): Promise<Episode[]> {
    const response = await podcastApi.getPodcastDetail(id, podcastCount);

    return transformToEpisode(response);
  }
}
