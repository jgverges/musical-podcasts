import React from "react";
import { Podcast } from "../../../domain";
import PodcastListItem from "./PodcastListItem";

interface Props {
  podcasts: Podcast[];
}
export const PodcastList = ({ podcasts }: Props) => {
  return (
    <div className="podcasts-list">
      {podcasts?.map((podcast) => (
        <div key={podcast.podcastId}>
          <PodcastListItem key={podcast.podcastId} podcast={podcast} />
        </div>
      ))}
    </div>
  );
};

export default PodcastList;
