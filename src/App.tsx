import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./presentation/common/NotFoundPage";
import PodcastLayout from "./presentation/components/PodcastLayout";
import "./presentation/styles/main.css";
import Header from "./presentation/common/Header";

const PodcastList = lazy(() => import("./presentation/components/PodcastList"));
const PodcastDetails = lazy(
  () => import("./presentation/components/PodcastDetails")
);
const EpisodeDetails = lazy(
  () => import("./presentation/components/EpisodeDetail")
);

function App() {
  return (
    <main className="app">
      <Header />
      <div className="main-content">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<PodcastList />} />
            <Route path="/podcast" element={<PodcastLayout />}>
              <Route path=":podcastId" index element={<PodcastDetails />} />
              <Route
                path=":podcastId/episode/:episodeId"
                element={<EpisodeDetails />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </main>
  );
}
export default App;
