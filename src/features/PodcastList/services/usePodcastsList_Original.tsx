import { useEffect, useState } from "react";
import { PodcastListResponse } from "../models/PodcastListResponse";
import { type PodcastFiltered } from "../models/PodcastFiltered";
import { filterPodcastData } from "./filterPodcastData";
import { PODCAST_LIST_URL } from "./podcastListApiUrls";
import { useLoading } from "../../common/LoadingContext";

function usePodcastList(): {
  podcasts: PodcastFiltered[] | null;
  error: string | null;
} {
  const [podcasts, setPodcasts] = useState<PodcastFiltered[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchPodcasts = async () => {
      const podcastList = "podcastList";
      const podcastListTimestamp = "podcastList_Timestamp";

      try {
        setLoading(true);
        const storedPodcasts = localStorage.getItem(podcastList);
        const storedTimestamp = localStorage.getItem(podcastListTimestamp);

        if (storedPodcasts && storedTimestamp) {
          const lastFetchTime = new Date(storedTimestamp).getTime();
          const currentTime = new Date().getTime();
          const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

          if (currentTime - lastFetchTime < oneDayInMilliseconds) {
            setPodcasts(JSON.parse(storedPodcasts));
            return;
          }
        } else {
          const response = await fetch(PODCAST_LIST_URL, {
            signal: abortCont.signal,
          });
          if (!abortCont.signal.aborted) {
            const data: PodcastListResponse = await response.json();

            const filteredPodcasts: PodcastFiltered[] = filterPodcastData(data);

            localStorage.setItem(podcastList, JSON.stringify(filteredPodcasts));
            localStorage.setItem(
              podcastListTimestamp,
              new Date().toISOString()
            );
            setPodcasts(filteredPodcasts);
          }
        }
      } catch (error) {
        if (abortCont.signal.aborted) {
          // console.log("CLEAN UP with ABORT CONTROLLER");
        } else {
          if (error instanceof Error) {
            setError(error.message);
            console.log(error);
          } else {
            setError("An unknown error occurred");
            console.log("An unknown error occurred", error);
          }
        }
      } finally {
        if (!abortCont.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPodcasts();

    return () => abortCont.abort();
  }, [setLoading]);
  if (error) console.log(error);

  return { podcasts, error };
}

export default usePodcastList;
