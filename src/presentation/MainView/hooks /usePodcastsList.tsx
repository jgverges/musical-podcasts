import { useQuery } from "@tanstack/react-query";
import { Podcast } from "../../../domain";
import { useAppStore } from "../../../application/stores/useAppStore";

function usePodcastList() {
  const podcastService = useAppStore((state) => state.podcastService);
  const { data, error, isLoading } = useQuery<Podcast[]>({
    queryKey: ["podcats"],
    queryFn: async () => podcastService.getPodcasts(),
  });

  return { podcasts: data, error, isLoading };
}

export default usePodcastList;
