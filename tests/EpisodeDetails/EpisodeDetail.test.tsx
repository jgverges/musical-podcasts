import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import EpisodeDetails from "../../src/presentation/components/EpisodeDetail";
// import { LoadingProvider } from "../../src/features/common/LoadingContext.OLD";

const mockData = {
  episodeUrl: "episode-url",
  trackName: "Episode Title",
  description: "Episode Description",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      data: mockData,
    },
  }),
}));

describe("EpisodeDetails component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/episode/123"]}>
        {/* <LoadingProvider> */}
        <Routes>
          <Route path="/episode/:episodeId" element={<EpisodeDetails />} />
        </Routes>
        {/* </LoadingProvider> */}
      </MemoryRouter>
    );
  });

  test("should render episode trackName and description correctly", () => {
    expect(screen.getByText(mockData.trackName)).toBeDefined();
    expect(screen.getByText(mockData.description)).toBeDefined();
  });

  test("should render an audio HTML element in episode details", () => {
    const audioElement = screen
      .getByText(mockData.trackName)
      .closest("div")
      ?.querySelector("audio");
    expect(audioElement).toBeDefined();
    expect(audioElement?.getAttribute("src")).toBe(mockData.episodeUrl);
  });
});
