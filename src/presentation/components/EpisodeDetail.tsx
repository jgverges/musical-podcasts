import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/EpisodeDetails/EpisodeDetail.css";
import AudioPlayer from "../common/AudioPlayer";
import { Episode } from "../../domain";

function EpisodeDetails() {
  const location = useLocation();

  const receivedData: Episode = location.state?.data;

  if (!receivedData) {
    console.log("Error getting data from useLocation");
    return;
  }

  const { episodeUrl, title, description } = receivedData;

  if (!episodeUrl || !title || !description) {
    console.log(`Missing information  in episode`);
  }

  return (
    <article className="episode-detail">
      <h2 className="episode-detail-title">{title}</h2>
      <p>{!!description && description.slice(0, 1000)} </p>
      <AudioPlayer src={episodeUrl} />
    </article>
  );
}

export default EpisodeDetails;
