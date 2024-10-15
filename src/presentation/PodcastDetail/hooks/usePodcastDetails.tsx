import { useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { useAppStore } from "../../../application/stores/useAppStore";
import { Episode } from "../../../domain";

export function usePodcastDetails(podcastId: string | undefined) {
  const podcastService = useAppStore((state) => state.podcastService);

  const [initialQuery, fullQuery] = useQueries({
    queries: [
      {
        queryKey: ["podcastDetail", podcastId, "Initial"],
        queryFn: () => {
          if (!podcastId) {
            console.error("podcastId is not defined");
            return;
          }
          return podcastService.getPodcastDetail(podcastId, 2);
        },
        enabled: !!podcastId,
      },
      {
        queryKey: ["podcastDetail", podcastId, "Full"],
        queryFn: () => {
          if (!podcastId) {
            console.error("podcastId is not defined");
            return;
          }
          return podcastService.getPodcastDetail(podcastId, 10);
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

  const data: Episode[] = fullQuery.data || initialQuery.data || [];
  const isLoading = initialQuery.isLoading || fullQuery.isLoading;
  const error = fullQuery.error || initialQuery.error;

  return {
    data,
    error,
    isLoading,
  };
}

export default usePodcastDetails;
