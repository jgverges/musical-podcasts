import React from "react";

interface Props {
  filteredPodcastsLength: number;
}
export default function PodcastCounter({ filteredPodcastsLength }: Props) {
  return <div className="list-counter">{filteredPodcastsLength}</div>;
}
