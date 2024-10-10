import React, { useEffect, useState } from "react";
import PodcastListIem from "./PodcastListItem";
import "../styles/PodcastList/PodcastList.css";
import { type Podcast } from "../../domain";
import usePodcastsList from "../hooks/usePodcastsList";
import { useAppStore } from "../../application/stores/useAppStore";

function PostcastList() {
  const { podcasts, error, isLoading } = usePodcastsList();
  const { updateLoading } = useAppStore();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    updateLoading(isLoading);
  }, [isLoading]);

  if (error) console.log(error);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  const filteredPodcastsLength = filteredPodcasts ? filteredPodcasts.length : 0;

  return (
    <section className="list-container">
      <div className="list-header">
        <div className="div-right">
          <div className="list-counter">{filteredPodcastsLength}</div>
          <div>
            <input
              id="Filter Podcasts"
              name="Filter Podcasts"
              type="text"
              placeholder="Search Podcasts..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="podcasts-list">
        {filteredPodcasts.map((podcast) => (
          <div key={podcast.podcastId}>
            <PodcastListIem key={podcast.podcastId} podcast={podcast} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PostcastList;
