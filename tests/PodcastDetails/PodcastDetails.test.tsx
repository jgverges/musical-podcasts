import React from "react";
import { render, screen } from "@testing-library/react";
import PodcastDetails from "../../src/presentation/PodcastDetail/PodcastDetails";
import { BrowserRouter } from "react-router-dom";
import mock from "../__mocks__/Podcast-detail-sm.mock.json";
import { millisecondsToHoursMinutes } from "../../src/presentation/common/utils/FormattingHelpers";
import usePodcastDetails from "../../src/presentation/PodcastDetail/hooks/usePodcastDetails";

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
    const trackName = mockEpisodes[0].trackName; // Ish Type Beat
    const trackTimeMillis = millisecondsToHoursMinutes(
      mockEpisodes[1].trackTimeMillis
    ); // 03:10

    const regexTrackName = new RegExp(trackName.replace(/\s+/g, "\\s*"), "i");
    const regexTime = new RegExp(trackTimeMillis.replace(/\s+/g, "\\s*"), "i");

    expect(screen.getByText(regexTrackName)).toBeDefined();
    expect(screen.getByText(regexTime)).toBeDefined();
  });
});
