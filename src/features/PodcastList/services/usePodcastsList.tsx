import { PodcastListResponse } from "../models/PodcastListResponse";
import { type PodcastFiltered } from "../models/PodcastFiltered";
import { filterPodcastData } from "./filterPodcastData";
import { PODCAST_LIST_URL } from "./podcastListApiUrls";
import { useQuery } from "@tanstack/react-query";

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
  const filteredPodcasts: PodcastFiltered[] = data
    ? filterPodcastData(data)
    : [];
  return { filteredPodcasts, error, isLoading };
}

export default usePodcastList;
