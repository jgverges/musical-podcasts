import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./presentation/common/NotFoundPage";
import "./presentation/styles/main.css";
import Header from "./presentation/common/Header";

const MainView = lazy(() => import("./presentation/MainView/MainView"));
const PodcastDetails = lazy(
  () => import("./presentation/PodcastDetail/PodcastDetails")
);
const EpisodeDetails = lazy(
  () => import("./presentation/EpisodeDetails/EpisodeDetail")
);

function App() {
  return (
    <main className="app">
      <Header />
      <div className="main-content">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route
              path="/podcast/:podcastId"
              index
              element={<PodcastDetails />}
            />
            <Route
              path="/podcast/:podcastId/episode/:episodeId"
              element={<EpisodeDetails />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </main>
  );
}
export default App;
