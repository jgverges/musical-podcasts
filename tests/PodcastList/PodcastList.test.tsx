import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PodcastList from "../../src/features/PodcastList/components/PodcastList";
// import { LoadingProvider } from "../../src/features/common/LoadingContext.OLD";
import usePodcastsList from "../../src/features/PodcastList/services/usePodcastsList";
import { BrowserRouter } from "react-router-dom";
import { Podcast } from "../../src/domain";

const mockPodcasts: Podcast[] = [
  {
    title: "Podcast 1",
    artist: "Artist 1",
    podcastId: "1",
    imageList: [],
    summary: "",
  },
  {
    title: "Podcast 2",
    artist: "Artist 2",
    podcastId: "2",
    imageList: [],
    summary: "",
  },
];

jest.mock("../../src/features/PodcastList/services/usePodcastsList", () => ({
  __esModule: true,
  default: jest.fn(() => ({ podcasts: [...mockPodcasts], error: null })),
}));

describe("PodcastList Component", () => {
  beforeEach(() => {
    (usePodcastsList as jest.Mock).mockReturnValue({
      podcasts: mockPodcasts,
      error: null,
    });
    render(
      <BrowserRouter>
        {/* <LoadingProvider> */}
        <PodcastList />
        {/* </LoadingProvider> */}
      </BrowserRouter>
    );
  });

  test("renders a podcast list without crashing", () => {
    expect(screen.getByText(mockPodcasts[0].artist)).toBeDefined();
    expect(screen.getByText(mockPodcasts[1].artist)).toBeDefined();
  });

  test("searches for podcasts properly", async () => {
    fireEvent.change(screen.getByPlaceholderText(/Search Podcasts.../i), {
      target: { value: mockPodcasts[0].artist },
    });

    await waitFor(() => {
      expect(screen.queryByText(mockPodcasts[0].artist)).toBeDefined();
      expect(screen.queryByText(mockPodcasts[1].artist)).toBeNull();
    });
  });

  test("displays correct number of filtered podcasts", () => {
    const searchTerm = mockPodcasts[0].artist;
    fireEvent.change(screen.getByPlaceholderText(/Search Podcasts.../i), {
      target: { value: searchTerm },
    });
    expect(screen.getByText(1)).toBeDefined();
  });
});
