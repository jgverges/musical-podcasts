import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../../styles/PodcastDetails/PodcastLayout.css";
import { Podcast } from "../../../domain";

interface Props {
  podcastId: string | undefined;
  podcast: Podcast | undefined;
}
export default function DetailCard({ podcastId, podcast }: Props) {
  const image170Height = podcast?.imageList.find(
    (image) => image.attributes.height === "170"
  );

  return (
    <>
      <Link
        to={`/podcast/${podcastId}`}
        state={{ data: podcast }}
        className="no-underline"
      >
        <article className="single-card">
          <img
            onLoad={(e) => e.currentTarget.classList.add("image-loaded")}
            src={image170Height?.label}
            alt={podcast?.title}
            className="image shared-podcast-img"
          />

          <h2>{podcast?.title}</h2>
          <h3>Description</h3>
          <p>{podcast?.summary.slice(0, 600)}</p>
        </article>
      </Link>
      <Outlet />
    </>
  );
}
