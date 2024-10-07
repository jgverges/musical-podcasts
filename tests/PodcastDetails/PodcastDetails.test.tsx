import React from "react";
import { render, screen } from "@testing-library/react";
import PodcastDetails from "../../src/features/PodcastDetails/components/PodcastDetails";
import usePodcastDetails from "../../src/features/PodcastDetails/services/usePodcastDetails";
import { BrowserRouter } from "react-router-dom";
import mock from "../__mocks__/Podcast-detail-sm.mock.json";
// import { LoadingProvider } from "../../src/features/common/LoadingContext.OLD";
import {
  extractTitleFromTrack,
  millisecondsToHoursMinutes,
} from "../../src/features/common/utils/FormattingHelpers";

const mockEpisodes = mock.results.filter((detail) => "episodeUrl" in detail);

jest.mock(
  "../../src/features/PodcastDetails/services/usePodcastDetails",
  () => ({
    __esModule: true,
    default: jest.fn(),
  })
);

describe("PodcastDetails Component", () => {
  beforeEach(() => {
    (usePodcastDetails as jest.Mock).mockReturnValue({
      results: mockEpisodes,
      error: null,
    });
    render(
      <BrowserRouter>
        {/* <LoadingProvider> */}
        <PodcastDetails />
        {/* </LoadingProvider> */}
      </BrowserRouter>
    );
  });

  test("renders without crashing", () => {
    (usePodcastDetails as jest.Mock).mockReturnValue({
      results: mockEpisodes,
      error: null,
    });
  });
  test("renders list of podcast episodes with 'trackName' and 'trackTimeMillis' properly", () => {
    const trackName = extractTitleFromTrack(mockEpisodes[0].trackName); // Ish Type Beat
    const trackTimeMillis = millisecondsToHoursMinutes(
      mockEpisodes[1].trackTimeMillis
    ); // 03:10

    const regexTrackName = new RegExp(trackName.replace(/\s+/g, "\\s*"), "i");
    const regexTime = new RegExp(trackTimeMillis.replace(/\s+/g, "\\s*"), "i");

    expect(screen.getByText(regexTrackName)).toBeDefined();
    expect(screen.getByText(regexTime)).toBeDefined();
  });
});
