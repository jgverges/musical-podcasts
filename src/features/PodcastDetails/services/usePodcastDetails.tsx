import { useEffect } from "react";
import { PodcastDetail, Episode } from "../models/PodcastDetailsResponse";
import { useQuery } from "@tanstack/react-query";
import { getPodcastDetail } from "./getPodcastDetail";

export function usePodcastDetails(podcastId: string | undefined) {
  // Initial fetch to get 2 values
  const initialQuery = useQuery<PodcastDetail[] | Episode[]>({
    queryKey: ["podcastDetail", podcastId, "initial"],
    queryFn: () => getPodcastDetail(podcastId!, 2),
    enabled: !!podcastId,
  });

  // Second  fetch to get all values
  const fullQuery = useQuery<PodcastDetail[] | Episode[]>({
    queryKey: ["podcastDetail", podcastId, "full"],
    queryFn: () => getPodcastDetail(podcastId!, 10),
    enabled: !!podcastId && !initialQuery.isLoading,
  });

  // Effect to invalidate cache when change postId
  useEffect(() => {
    if (podcastId) {
      fullQuery.refetch();
    }
  }, [podcastId]);

  const data = fullQuery.data || initialQuery.data || [];
  const isLoading = initialQuery.isLoading || fullQuery.isLoading;
  const error = fullQuery.error || initialQuery.error;

  return {
    data,
    error,
    isLoading,
  };
}

export default usePodcastDetails;
