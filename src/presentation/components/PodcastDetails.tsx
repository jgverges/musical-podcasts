import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  isoDateToDayMonthYear,
  millisecondsToHoursMinutes,
} from "../common/utils/FormattingHelpers";
import "../styles/PodcastDetails/PodcastDetails.css";
import usePodcastDetails from "../hooks/usePodcastDetails";
import { useAppStore } from "../../application/stores/useAppStore";

function PodcastDetails() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const {
    data: episodes,
    error,
    isLoading: isLoadingDetails,
  } = usePodcastDetails(podcastId);

  const { updateLoading } = useAppStore();

  useEffect(() => {
    updateLoading(isLoadingDetails || (episodes && episodes.length <= 2));
  }, [isLoadingDetails]);

  if (error) {
    console.log(error);
    return;
  }

  episodes.forEach((detail) => {
    if (!detail.title || !detail.duration || !detail.releaseDate)
      console.log(`Missing information  in episode`);
  });

  const resultsLength = episodes.length;

  return (
    <section className="episodes-list">
      <div className="episodes-counter">
        Episodes: {episodes && episodes.length > 0 ? resultsLength : ""}
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
            {episodes.map((episode, index) => (
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
                    {episode.title}
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
                    {!!episode.duration &&
                      millisecondsToHoursMinutes(episode.duration)}
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
