import { useEffect, useState } from "react";
import { PodcastListResponse } from "../models/PodcastListResponse";
import { type Podcast } from "../models/Podcast";
import { filterPodcastData } from "./filterPodcastData";
import { PODCAST_LIST_URL } from "./podcastListApiUrls";

function usePodcastList(): {
  podcasts: Podcast[] | null;
  error: string | null;
} {
  const [podcasts, setPodcasts] = useState<Podcast[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const storedPodcasts = localStorage.getItem("podcasts");
        const storedTimestamp = localStorage.getItem("podcasts_Timestamp");

        if (storedPodcasts && storedTimestamp) {
          const lastFetchTime = new Date(storedTimestamp).getTime();
          const currentTime = new Date().getTime();
          const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

          if (currentTime - lastFetchTime < oneDayInMilliseconds) {
            setPodcasts(JSON.parse(storedPodcasts));
            return;
          }
        } else {
          const response = await fetch(PODCAST_LIST_URL);
          const data: PodcastListResponse = await response.json();

          const filteredPodcasts: Podcast[] = filterPodcastData(data);

          localStorage.setItem("podcasts", JSON.stringify(filteredPodcasts));
          localStorage.setItem("podcasts_Timestamp", new Date().toISOString());
          setPodcasts(filteredPodcasts);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error(error);
        } else {
          setError("An unknown error occurred");
          console.error("An unknown error occurred", error);
        }
      }
    };

    fetchPodcasts();
  }, []);
  if (error) console.log(error);

  return { podcasts, error };
}

export default usePodcastList;