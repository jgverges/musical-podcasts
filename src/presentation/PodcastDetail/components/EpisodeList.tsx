import React from "react";
import { Link } from "react-router-dom";
import {
  isoDateToDayMonthYear,
  millisecondsToHoursMinutes,
} from "../../common/utils/FormattingHelpers";
import { Episode } from "../../../domain";

interface Props {
  episodes: Episode[];
  podcastId: string | undefined;
}
export default function EpisodeList({ episodes, podcastId }: Props) {
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
