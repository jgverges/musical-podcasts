import React from "react";
import { Link } from "react-router-dom";
import "../../styles/MainView/PodcastListItem.css";
import { Podcast } from "../../../domain";

interface PodcastListItemProps {
  readonly podcast: Podcast;
}
function PodcastListItem({ podcast }: PodcastListItemProps) {
  const image60Height = podcast?.imageList.find(
    (image) => image.attributes.height === "60"
  );

  return (
    <Link
      to={`/podcast/${podcast.podcastId}`}
      state={{ data: podcast }}
      className="no-underline"
    >
      <article className="card">
        <img src={image60Height?.label} alt={podcast.title} loading="lazy" />
        <div className="card-details">
          <h2>{podcast.title.toUpperCase().substring(0, 100)}</h2>
          <p>{podcast.artist}</p>
        </div>
      </article>
    </Link>
  );
}

export default PodcastListItem;
