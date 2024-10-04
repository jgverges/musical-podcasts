import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./features/common/NotFoundPage";
import PodcastLayout from "./features/PodcastDetails/components/PodcastLayout";
import "./styles/main.css";
import { LoadingProvider } from "./features/common/LoadingContext";
import Header from "./features/common/Header";

const PodcastList = lazy(
  () => import("../src/features/PodcastList/components/PodcastList")
);
const PodcastDetails = lazy(
  () => import("../src/features/PodcastDetails/components/PodcastDetails")
);
const EpisodeDetails = lazy(
  () => import("./features/EpisodeDetails/components/EpisodeDetail")
);

function App() {
  return (
    <LoadingProvider>
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
    </LoadingProvider>
  );
}
export default App;
