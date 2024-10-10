import React, { useEffect } from "react";
// import { useStorage } from "../..";
import { useAppStore } from "../../application/stores/useAppStore";

interface AudioPlayerProps {
  src: string;
}

function AudioPlayer({ src }: AudioPlayerProps) {
  const { updateLoading } = useAppStore();

  useEffect(() => {
    updateLoading(true);
  }, []);

  const handleLoadedData = () => {
    updateLoading(false);
  };
  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.log(e.currentTarget.error?.code);
  };
  return (
    <figure>
      <audio
        src={src}
        controls
        onError={handleError}
        onLoadedData={handleLoadedData}
      >
        Your browser does not support the audio element.
        <track kind="metadata" src="" />
      </audio>
    </figure>
  );
}

export default AudioPlayer;
