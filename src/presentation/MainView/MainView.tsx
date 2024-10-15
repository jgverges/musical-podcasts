import React, { useEffect, useState } from "react";
import "../styles/MainView/PodcastList.css";
import { useAppStore } from "../../application/stores/useAppStore";
import PodcastList from "./components/PodcastList";
import SearchPodcasts from "./components/SearchPodcasts";
import PodcastCounter from "./components/PodcastCounter";
import usePodcastsList from "./hooks /usePodcastsList";
import { Podcast } from "../../domain";

function MainView() {
  const { podcasts, error, isLoading } = usePodcastsList();
  const { updateLoading, searchTerm, setSearchTerm } = useAppStore();

  useEffect(() => {
    updateLoading(isLoading);
  }, [isLoading]);

  if (error) console.log(error);

  const filteredPodcasts =
    podcasts && podcasts.length > 0
      ? podcasts.filter((podcast: Podcast) => {
          const podcastTitle = podcast.title.toLowerCase();
          const authorName = podcast.artist.toLowerCase();
          const searchTermLower = searchTerm.toLowerCase();
          return (
            podcastTitle.includes(searchTermLower) ||
            authorName.includes(searchTermLower)
          );
        })
      : [];

  return (
    <section className="list-container">
      <div className="list-header">
        <div className="div-right">
          <PodcastCounter
            filteredPodcastsLength={
              filteredPodcasts ? filteredPodcasts.length : 0
            }
          />
          <SearchPodcasts />
        </div>
      </div>

      <PodcastList podcasts={filteredPodcasts} />
    </section>
  );
}

export default MainView;
