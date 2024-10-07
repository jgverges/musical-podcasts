import { PodcastListResponse } from "../models/PodcastListResponse";
import { filterPodcastData } from "./filterPodcastData";
import { PODCAST_LIST_URL } from "./podcastListApiUrls";
import { useQuery } from "@tanstack/react-query";
import { Podcast } from "../../../domain";

const getPodcasts = async (): Promise<PodcastListResponse> => {
  const res = await fetch(PODCAST_LIST_URL);

  if (!res.ok) throw new Error("Error fetching Podtcsts");
  const data: PodcastListResponse = await res.json();
  return data;
};

function usePodcastList() {
  const { data, error, isLoading } = useQuery<PodcastListResponse>({
    queryKey: ["podcats"],
    queryFn: () => getPodcasts(),
  });
  const podcasts: Podcast[] = data ? filterPodcastData(data) : [];
  return { podcasts, error, isLoading };
}

export default usePodcastList;
