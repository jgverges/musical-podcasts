import { useEffect } from "react";
import { PodcastDetailOrEpisode } from "../models/PodcastDetailsResponse";
import { useQueries } from "@tanstack/react-query";
import { getPodcastDetail } from "./getPodcastDetail";

export function usePodcastDetails(podcastId: string | undefined) {
  const [initialQuery, fullQuery] = useQueries({
    queries: [
      {
        queryKey: ["podcastDetail", podcastId, "Initial"],
        queryFn: () => {
          if (!podcastId) {
            console.error("podcastId is not defined");
            return; // Manejar el caso donde podcastId no está disponible.
          }
          return getPodcastDetail(podcastId, 2);
        },
        enabled: !!podcastId,
      },
      {
        queryKey: ["podcastDetail", podcastId, "Full"],
        queryFn: () => {
          if (!podcastId) {
            console.error("podcastId is not defined");
            return; // Manejar el caso donde podcastId no está disponible.
          }
          return getPodcastDetail(podcastId, 10);
        },
        enabled: !!podcastId,
      },
    ],
  });

  useEffect(() => {
    if (podcastId) {
      fullQuery.refetch();
    }
  }, [podcastId]);

  const data: PodcastDetailOrEpisode[] =
    fullQuery.data || initialQuery.data || [];
  const isLoading = initialQuery.isLoading || fullQuery.isLoading;
  const error = fullQuery.error || initialQuery.error;

  return {
    data,
    error,
    isLoading,
  };
}

export default usePodcastDetails;
