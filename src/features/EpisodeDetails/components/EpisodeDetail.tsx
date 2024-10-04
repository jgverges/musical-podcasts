import React from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/EpisodeDetails/EpisodeDetail.css";
import { extractTitleFromTrack } from "../../common/utils/FormattingHelpers";
import AudioPlayer from "../../common/AudioPlayer";

function EpisodeDetails() {
  const location = useLocation();

  const receivedData = location.state?.data;
  if (!receivedData) {
    console.log("Error getting data from useLocation");
    return;
  }

  const { episodeUrl, trackName, description } = receivedData;

  return (
    <article className="episode-detail">
      <h2 className="episode-detail-title">
        {extractTitleFromTrack(trackName)}
      </h2>
      <p>{description} </p>
      <AudioPlayer src={episodeUrl} />
    </article>
  );
}
export default EpisodeDetails;
