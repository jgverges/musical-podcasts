import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  extractTitleFromTrack,
  isoDateToDayMonthYear,
  millisecondsToHoursMinutes,
} from "../../common/utils/FormattingHelpers";
import "../../../styles/PodcastDetails/PodcastDetails.css";
import usePodcastDetails from "../services/usePodcastDetails";
import {
  Episode,
  PodcastDetailOrEpisode,
} from "../models/PodcastDetailsResponse";
import { useStorage } from "../../..";

function PodcastDetails() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const {
    data,
    error,
    isLoading: isLoadingDetails,
  } = usePodcastDetails(podcastId);
  const { updateLoading } = useStorage();

  // Global Loading: is special because we prefecth 2 values before the fetch complete with at least 3 values
  useEffect(() => {
    updateLoading(isLoadingDetails || (data && data.length <= 2));
  }, [isLoadingDetails]);

  if (error) {
    console.log(error);
    return;
  }

  const episodes = data.filter(
    (item: PodcastDetailOrEpisode): item is Episode => "episodeUrl" in item
  );

  episodes.forEach((detail) => {
    if (!detail.trackName || !detail.trackTimeMillis || !detail.releaseDate)
      console.log(`Missing information  in episode: ${detail?.collectionName}`);
  });

  const resultsLength = episodes.length;

  return (
    <section className="episodes-list">
      <div className="episodes-counter">
        Episodes: {data && data.length > 0 ? resultsLength : ""}
      </div>
      {resultsLength > 0 && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode: Episode, index) => (
              <tr
                key={episode.episodeUrl}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>
                  <Link
                    to={`/podcast/${podcastId}/episode/${podcastId}`}
                    state={{ data: episode }}
                    className="no-underline"
                  >
                    {extractTitleFromTrack(episode.trackName)}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/podcast/${podcastId}/episode/${podcastId}`}
                    state={{ data: episode }}
                    className="no-underline cell-black"
                  >
                    {isoDateToDayMonthYear(episode.releaseDate)}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/podcast/${podcastId}/episode/${podcastId}`}
                    state={{ data: episode }}
                    className="no-underline cell-black"
                  >
                    {episode.trackTimeMillis &&
                      millisecondsToHoursMinutes(episode.trackTimeMillis)}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default PodcastDetails;
