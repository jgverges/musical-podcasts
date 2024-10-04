import React, { useEffect } from "react";
import { useLoading } from "./LoadingContext";

interface AudioPlayerProps {
  src: string;
}

function AudioPlayer({ src }: AudioPlayerProps) {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
  }, []);

  const handleLoadedData = () => {
    setLoading(false);
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
      </audio>
    </figure>
  );
}

export default AudioPlayer;
