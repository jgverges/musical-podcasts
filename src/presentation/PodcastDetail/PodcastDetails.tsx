import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../../styles/PodcastDetails/PodcastDetails.css";
import { useAppStore } from "../../application/stores/useAppStore";
import EpisodeList from "./components/EpisodeList";
import { Podcast } from "../../domain";
import DetailCard from "./components/DetailCard";
import usePodcastDetails from "./hooks/usePodcastDetails";

function PodcastDetails() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const location = useLocation();
  const [podcast, setPodcast] = useState<Podcast>();

  useEffect(() => {
    const data = location.state?.data;
    if (data) setPodcast(data);
    if (!data) console.log("Does not find data in location");
  }, []);
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

  return (
    <>
      <DetailCard podcast={podcast} podcastId={podcastId} />
      <EpisodeList episodes={episodes} podcastId={podcastId} />
    </>
  );
}

export default PodcastDetails;
