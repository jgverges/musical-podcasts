export interface Image {
  label: string;
  attributes: {
    height: string;
  };
}

export interface Podcast {
  title: string;
  podcastId: string | number;
  artist: string;
  imageList: Image[];
  summary: string;
}
